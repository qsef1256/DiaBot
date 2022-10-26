// Dia Minecraft Bot For Plugin/Skript Testing
// Author: qsef1256

const mineflayer = require('mineflayer')
const readline = require('readline')
const portscanner = require('portscanner')

const options = {
  username: process.argv[2],
  password: !process.argv[3] ? null : process.argv[3],
  version: !process.argv[4] ? "1.19.2" : process.argv[4],
  host: !process.argv[5] ? "localhost" : process.argv[5],
  port: !process.argv[6] ? 25565 : process.argv[6]
}

const bot = mineflayer.createBot(options)
const owner = 'qsef1256'
const version = '0.45.2'

const inventoryViewer = require('mineflayer-web-inventory')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow, GoalBreakBlock } = require('mineflayer-pathfinder').goals
const armorManager = require('mineflayer-armor-manager')
const pvp = require('mineflayer-pvp').plugin
// const Block = require('prismarine-block')(bot.version)

const rl = readline.createInterface({ // 터미널 입력
  input: process.stdin,
  output: process.stdout,
})

var freePort
portscanner.findAPortNotInUse(3001, 4000, '127.0.0.1', function(error, port) {
  freePort = port
})

let viewer = {
  port: freePort
}

let debug = true // 디버그 모드 설정
// let block = new Block(1,1,0) // 선택 블록 설정
let mcData, defaultMove

bot.loadPlugin(pathfinder)
bot.loadPlugin(armorManager)
bot.loadPlugin(pvp)
inventoryViewer(bot, viewer) // 인벤토리 뷰어

rl.on('line', (input) => {
  botCommand(console, input)
})

console.log(options)

bot.on('spawn', () => {
  sleep(500).then(() => {
    mcData = require('minecraft-data')(bot.version)
    defaultMove = new Movements(bot, mcData)
    bot.entity = bot.players[bot.username].entity
  })
})

// 에센셜 채팅 귓말
bot.once('spawn', () => {

  bot.chatAddPattern(
    /^\[(.+) -> .+\] (.+)$/,
    'whisper'
  )
  bot.on('whisper', botCommand)

})

/* bot.on('windowOpen', (window) => {
  console.log("Inventory title: " + window.title)
}) */

// 디버그 정보 출력

function DebugOutput() {
  console.log('bot.version: ' + bot.version)

  bot.on('path_update', (r) => {
    const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
    console.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${r.visitedNodes} nodes, ${nodesPerTick} nodes/tick)`)
  })

  bot.on('goal_reached', (goal) => {
    console.log('Here I am !')
  })

  bot.on('path_reset', (reason) => {
    console.log(`Path was reset for reason: ${reason}`)
  })
}

// 인게임 명령어
function botCommand(username, message) {

  if (!(username == owner || username == console)) return
  if (username === bot.username) return

  console.log(username + ' whispered: ' + message)

  let arg = message.split(' ') // command 분리
  let cmd = arg[0]

  if (cmd == 'help') {
    botOutput(username, 'Check Diabot\'s command list here: https://github.com/qsef1256/DiaBot')
  }

  if (cmd == 'quit' || cmd == "exit") {
    botOutput(username, 'Quit by ' + username)
    closeBot()
    return
  }

  if (cmd == 'info') {
    botOutput(username, 'Dia Minecraft Bot, Version: ' + version)
    return
  }

  if (cmd == 'chat') {
    if (!arg[1]) { botOutput(username, 'Chat must be need arguments'); return }
    bot.chat(message.substring(5))
    return
  }

  if (cmd == 'close') {
    botOutput(username, 'Inventory closed')
    bot.closeWindow(bot.inventory)
    return
  }

  if (cmd == 'click') {
    const slotCount = bot.inventory.slots.length - 1
    if (!arg[1]) { botOutput(username, 'Click must be need a slot'); return }
    if (slotCount < arg[1] || arg[1] < 0) { botOutput(username, 'Can\'t click input slot'); return }
    bot.simpleClick.leftMouse(arg[1])
    return
  }

  if (cmd == 'inv' || cmd == 'swap') {
    const slotCount = bot.inventory.slots.length - 1
    if (!arg[2]) { botOutput(username, 'Move Item must be need slot and destination'); return }
    if (slotCount < arg[1] || slotCount < arg[2] || arg[1] < 0 || arg[2] < 0) {
      botOutput(username, 'Can\'t move input slot')
      return
    }
    botOutput(username, 'Item Swapped ' + arg[1] + " and " + arg[2])
    bot.moveSlotItem(arg[1], arg[2])
    return
  }

  if (cmd == 'webinv' || cmd == 'showinv') {
    botOutput(username, "Open web inventory")
    openWeb("http://localhost:" + viewer.port)
  }

  if (cmd == 'hand' || cmd == 'hotbar') {
    if (!arg[1]) { botOutput(username, 'Change Quickbar Slot must be need a slot'); return }
    if (arg[1] < 0 || arg[1] > 8) { botOutput(username, 'Invaild slot'); return }
    botOutput(username, 'Change hands to slot ' + arg[1])
    bot.setQuickBarSlot(arg[1])
    return
  }

  if (cmd == 'unequip') {
    botOutput(username, 'Unequip All Items')
    botUnequip()
    return
  }

  if (cmd == 'come') {
    let target = null
    target = bot.players[username].entity
    if (!target) { botOutput(username, 'Can\'t see you'); return }
    botCome(target)
    return
  }

  if (cmd == 'follow') {
    let target = null
    if (!arg[1]) {
      if (username == console) { botOutput(username, 'Can\'t Follow Console'); return }
      target = bot.players[username].entity
    } else {
      target = bot.players[arg[1]].entity
    }

    if (!target) { botOutput(username, 'Can\'t see ' + target?.username); return }
    botOutput(username, 'Start Following ' + target.username)
    botFollow(target)
    return
  }

  if (cmd == 'stop' || cmd == 'unfollow') {
    botOutput(username, 'Stop Following')
    botStopFollow()
    return
  }

  if (cmd == 'fight') {
    let target = null
    if (!arg[1]) {
      if (username == console) { botOutput(username, 'Can\'t fight with Console'); return }
      target = bot.players[username].entity
    } else {
      target = bot.players[arg[1]].entity
    }

    if (!target) { botOutput(username, 'Can\'t see' + target?.username); return }
    botOutput(username, 'Start PVP with ' + player.username)
    botFollow(target)
    bot.pvp.attack(target)
    return
  }

  if (cmd == 'surrender' || cmd == 'sur') {
    botOutput(username, 'Stop PVP')
    botStopFollow()
    bot.pvp.stop()
    return
  }

  if (cmd == 'select') {
    let player = bot.players[username].entity
    if (username == console) { botOutput(username, 'Can\'t select block with Console'); return }
    if (!player) { botOutput(username, 'Can\'t see ' + player?.username); return }
    botOutput(username, 'Please Click a block for select')
    selectBlock()
    return
  }

  if (cmd == 'open') {
    botOutput(username, 'Developing')
    return
  }

  if (cmd == 'debug') {
    if (debug) {
      bot.removeListener('spawn', DebugOutput)
      botOutput(username, 'Debug Mode Disabled')
      debug = false
      return
    } else {
      bot.once('spawn', DebugOutput)
      botOutput(username, 'Debug Mode Enabled')
      debug = true
      return
    }
  }

}

/* bot.on('physicTick', async () => {
  if(!target) { return }
  try {
    await bot.pathfinder.goto(new goals.GoalNear(target.position.x,target.position.y,target.position.z,2) ,(err) => {
      console.log(err)
    })
  } catch (e) {
    console.warn(e)
  }
}) */

function botCome(player) {
  if (player == bot.player) { return }
  console.log('Moving to Entity: ' + player.username)
  bot.pathfinder.setGoal(new GoalNear(player.position.x, player.position.y, player.position.z, 1))
}

// 봇 이동
function botFollow(player) {
  if (player == bot.player) { return }
  console.log('Following Entity: ' + player.username)
  bot.pathfinder.setGoal(new GoalFollow(player, 2), true)
}

function botStopFollow() {
  bot.pathfinder.setGoal(null)
}

// 블록 선택 (테스트 필요)
function selectBlock() {
  bot.once('diggingAborted', (target) => {
    block = target.clone()
    botOutput(username, 'Target Block set to ' + block.name)
  })
}

// 봇 출력 (콘솔 포함)
function botOutput(username, message) {
  if (username == console) {
    console.log(message)
  } else {
    bot.whisper(username, message)
  }
}

// 갑옷 벗기
async function botUnequip() {
  await bot.unequip("head")
  await bot.unequip("torso")
  await bot.unequip("legs")
  await bot.unequip("feet")
  await bot.unequip("off-hand")
}

// 엔티티 바라보기
bot.once('spawn', function () {
  setInterval(() => {
    const entity = bot.nearestEntity()
    if (entity !== null && !bot.pathfinder.isMoving()) {
      if (entity.type === 'player') {
        bot.lookAt(entity.position.offset(0, 1.6, 0))
      } else if (entity.type === 'mob') {
        bot.lookAt(entity.position.offset(0, entity.height - 0.5, 0))
      } else if (entity.type === 'object') {
        bot.lookAt(entity.position)
      }
    }
  }, 50)
})

// 칼 차기
bot.on('playerCollect', (collector) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
  }, 150)
})

// 메시지 콘솔에 전달
bot.on('message', (message, position) => {
  if (position == 'system') {
    console.log(message.toAnsi())
  }
})

bot.on('kicked', (reason, loggedIn) => {
  console.log("kicked: " + JSON.parse(reason).text)
}
)

bot.on('error', console.log)
bot.on('end', (reason) => {
  console.log('disconnected: ' + JSON.parse(reason).text)
  console.log("Disconnected from Server")
  closeBot()
})

// 봇 닫기
function closeBot() {
  bot.webInventory.stop()
  bot.end()
  process.exit()
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// 웹 브라우저 열기
const { platform } = require('os')
const { exec } = require('child_process')

const WINDOWS_PLATFORM = 'win32'
const MAC_PLATFORM = 'darwin'

const osPlatform = platform()

function openWeb(url) {
  let command

  console.log(`Open web url as Chrome: ${url}`)

  if (osPlatform === WINDOWS_PLATFORM) {
    command = `start chrome ${url}`
  } else if (osPlatform === MAC_PLATFORM) {
    command = `open -a "Google Chrome" ${url}`
  } else {
    command = `google-chrome ${url}`
  }

  exec(command)
}
