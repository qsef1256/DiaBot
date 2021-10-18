// Dia Minecraft Bot For Plugin/Skript Testing
// Author: qsef1256

const mineflayer = require('mineflayer')
const readline = require('readline');
const inventoryViewer = require('mineflayer-web-inventory')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow, GoalBreakBlock } = require('mineflayer-pathfinder').goals
const armorManager = require('mineflayer-armor-manager')
const pvp = require('mineflayer-pvp').plugin

const options = {
  host: 'localhost',
  port: 25565,
  username: process.argv[2],
  version: "1.17.1"
}

const bot = mineflayer.createBot(options)
const owner = 'qsef1256'
const version = '0.45'
const mcData = require('minecraft-data')(1.17)
const defaultMove = new Movements(bot, mcData)

const rl = readline.createInterface({ // 터미널 입력
  input: process.stdin,
  output: process.stdout,
});

let viewer = {
  port: getRandomInt(3000,4001)
}

bot.loadPlugin(pathfinder)
bot.loadPlugin(armorManager);
bot.loadPlugin(pvp)
inventoryViewer(bot, viewer) // 인벤토리 뷰어


rl.on('line', (input) => {
  botCommand(console,input)
});

// 에센셜 채팅 귓말
bot.once('spawn', () => {

  bot.chatAddPattern(
    /^\[(.+) -> .+\] (.+)$/,
    'whisper'
  )

  bot.on('whisper', botCommand)
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
  
})
/* bot.on('windowOpen', (window) => {
  console.log("Inventory title: " + window.title)
}) */

// 인게임 명령어
function botCommand (username, message) {

  if (!(username == owner || username == console)) return
  if (username === bot.username) return

  console.log(username + ' whispered: ' + message)

  let arg = message.split(' ') // command 분리
  let cmd = arg[0]

  if (cmd =='quit' || cmd == "exit") {
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
    if(slotCount < arg[1] || arg[1] < 0) { botOutput(username, 'Can\'t click input slot'); return }
    bot.simpleClick.leftMouse(arg[1])
    return
  }

  if (cmd == 'inv') {
    const slotCount = bot.inventory.slots.length - 1
    if(!arg[2]) { botOutput(username, 'Move Item must be need slot and destination'); return }
    if(slotCount < arg[1] || slotCount < arg[2] || arg[1] < 0 || arg[2] < 0 ) {
      botOutput(username, 'Can\'t move input slot')
      return
    }
    botOutput(username, 'Item Swapped ' + arg[1] + " and " + arg[2])
    bot.moveSlotItem(arg[1], arg[2])
    return
  }

  if (cmd == 'hand' || cmd =='hotbar') {
    if(!arg[1]) { botOutput(username, 'Change Quickbar Slot must be need a slot'); return }
    if(arg[1] < 0 || arg[1] > 8) { botOutput(username, 'Invaild slot'); return }
    botOutput(username, 'Change hands to slot ' + arg[1])
    bot.setQuickBarSlot(arg[1])
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
    if(!arg[1]) {
      if (username == console) { botOutput(username, 'Can\'t Follow Console'); return }
      target = bot.players[username].entity
    } else {
      target = bot.players[arg[1]].entity
    }

    if(!target) { botOutput(username, 'Can\'t see ' + target?.username); return }
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
    let target = null;
    if(!arg[1]) {
      if (username == console) { botOutput(username, 'Can\'t fight with Console'); return }
      target = bot.players[username].entity
    } else {
      target = bot.players[arg[1]].entity
    }

    if(!target) { botOutput(username, 'Can\'t see' + target?.username); return }
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
      bot.lookAt(entity.position.offset(0, entity.height -0.5 ,0))
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

bot.on('kicked', console.warn)
bot.on('error', console.log)
bot.on('end', () => {
  console.log('Disconnected from Server')
  closeBot()
})

// 봇 닫기
function closeBot() {
  bot.webInventory.stop()
  bot.end()
  process.exit()
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}