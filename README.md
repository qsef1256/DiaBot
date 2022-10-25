# DiaBot

![Minecraft](https://img.shields.io/badge/Minecraft-1.12~1.19-{brightgreen}.svg)
| <sub>EN</sub> [en-US](/README.md) | <sub>KO</sub> [ko-KR](README.ko-KR.md) |
|---------------------|-----------------------|

A [mineflayer](https://github.com/PrismarineJS/mineflayer) Bot for Plugin/Skript Testing

## Feature

* Chat
* Basic Inventory Management
* Show Bot Inventory on Web
* Move and Follow
* PvP
* Please post if you need other features

## Dependency

Node.js and Minecraft 1.12 - 1.19

Not tested on 1.8 - 1.12.

| Dependency Node packages |
|:------------|
| mineflayer |
| mineflayer-web-inventory |
| mineflayer-pvp |
| mineflayer-pathfinder |
| mineflayer-armor-manager |
| portscanner |

For manual install Node packages, Type `npm install (package)` in cmd.exe.

## Install

### Automatic

1. Install Node.js
2. Download diabot.js and install.bat
3. Open install.bat
4. Start start.bat when install is completed

### Manual

1. Install Node.js and require Node packages
2. Download diabot.js
3. Open cmd.exe and Type `cd (path of diabot.js)`
4. Type `node diabot.js (nickname) [password] [version] [(host) (port)]` (password is for online mode, Do not enter when used in offline mode.)

### Start.bat

`start.bat`, which comes as a silent install, provides a fast start mode.

The default start settings for fast start mode are:

| Settings | Value |
|------|------------|
| host | localhost |
| port | 25565 |
| version | Latest Release |

## Command

Type without / in a whisper or console.
| Command | Usage | Description | Alias |
|---------|-------|-------------|:-----:|
| exit | exit | Make the bot leave the server. | quit |
| info | info | Print the bot's information. | - |
| help | help | Show this page's link. | - |
| chat | chat [chat] | The bot sends a chat. | - |
| close | close | Close the bot's inventory. <br />(It is not automatically updated on the web) | - |
| click | click [slot] | The bot clicks on the bot's inventory. | - |
| inv | inv [slot1] [slot2] | The bot exchanges items between the two slots. | swap |
| webinv | webinv | Open web inventory as Chrome. | showinv |
| hand | hand [slot] | The bot switches the quickbar. | hotbar |
| unequip | unequip | The bot will unequip all equipment. | - |
| come | come | The bot will move to your location. | - |
| follow [user] | follow | The bot will follow user. | - |
| stop | stop | The bot will stop moving. | unfollow |
| fight | fight [user] | Start PvP with the user. | - |
| surrender | surrender | Bot will stop fighting. | sur |

## Known Issue

* Closing the inventory is not reflected immediately. Please refresh in your browser.

## Todo

* Block selection and Chest open

## Disclaimer

This bot is unstable. This bot is for developing plugins/scripts that require additional players in the development environment.

Do not use this bot for general purpose.

This bot does not collect any personal information such as username or password.
