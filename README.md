# DiaBot
![Minecraft](https://img.shields.io/badge/Minecraft-1.17.1-{brightgreen}.svg)
| <sub>EN</sub> [en-US](/README.md) | <sub>KO</sub> [ko-KR](README.ko-KR.md) |
|---------------------|-----------------------|

A [mineflayer](https://github.com/PrismarineJS/mineflayer) Bot for Plugin/Skript Testing

## Feature
* Chat
* Basic Inventory Management
* Show Bot Inventory on Web
* Move and Follow
* PvP

## Dependency
Node.js and Minecraft 1.17.1.

| Dependency Node packages |
|:------------|
| mineflayer |
| mineflayer-web-inventory |
| mineflayer-pvp |
| mineflayer-pathfinder |
| mineflayer-armor-manager |

Type `npm install [package]` in cmd.exe to install Node package

## Install
1. Install Node.js and require Node packages
2. Download diabot.js
3. Open cmd.exe and Type `cd [path of diabot.js]`
4. Type `node diabot.js [nickname]`

## Command
Type without / in a whisper or console.
| Command | Usage | Description | Alias |
|---------|-------|-------------|:-----:|
| exit | exit | Make the bot leave the server. | quit |
| info | info | Print the bot's information. | - |
| chat | chat [chat] | The bot sends a chat. | - |
| close | close | Close the bot's inventory. <br />(It is not automatically updated on the web) | - |
| click | click [slot] | The bot clicks on the bot's inventory. | - |
| inv | inv [slot1] [slot2] | The bot exchanges items between the two slots. | swap |
| hand | hand [slot] | The bot switches the quickbar. | hotbar |
| unequip | unequip | The bot will unequip all equipment. | - |
| come | come | The bot will move to your location. | - |
| follow [user] | follow | The bot will follow user. | - |
| stop | stop | The bot will stop moving. | unfollow |
| fight | fight [user] | Start PvP with the user. | - |
| surrender | surrender | Bot will stop fighting. | sur |

## Known Issue
* Closing the inventory is not reflected immediately. Please refresh in your browser.
* Movement function works normally after respawning. I think it's a mineflayer bug, and it has been reported in the mineflayer repository.

## Disclaimer
This bot is unstable. This bot is for developing plugins/scripts that require additional players in the development environment.

Do not use this bot for general purpose.
