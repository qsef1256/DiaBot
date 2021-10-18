# DiaBot
![Minecraft](https://img.shields.io/badge/Minecraft-1.17.1-{brightgreen}.svg)
| <sub>EN</sub> [en-US](/README.md) | <sub>KO</sub> [ko-KR](README.ko-KR.md) |
|---------------------|-----------------------|

플러그인 또는 Skript 테스트를 위한 간단한 [mineflayer](https://github.com/PrismarineJS/mineflayer) 마인크래프트 봇

## 기능
* 채팅
* 인벤토리 조작 가능
* 브라우저에서 인벤토리 확인
* 이동/따라오게 만들기
* 싸움 붙이기
* 그 외에 개발에 필요한 기능이 추가될 예정입니다.

## 필요한 것
Node.js와 마인크래프트 1.17.1.

| 필요한 Node.js 패키지 |
|:------------|
| mineflayer |
| mineflayer-web-inventory |
| mineflayer-pvp |
| mineflayer-pathfinder |
| mineflayer-armor-manager |

Node.js를 깐 후 cmd.exe에서 각각 패키지마다 `npm install [package]`를 입력하는 것으로 설치할 수 있습니다.

## 설치 방법
1. Node.js를 깔고 필요한 패키지를 설치합니다.
2. diabot.js를 원하는 위치에 다운로드 합니다.
3. cmd.exe를 열고 `cd [diabot.js가 있는 경로]`를 입력합니다.
4. cmd창에 `node diabot.js [nickname]`을 입력합니다.

## 명령어
귓속말(/w 또는 /tell 또는 /msg) 이나 터미널(cmd 창)에 / "없이" 입력하세요.

| 명령어 | 사용법 | 설명 | 다른 명령어 |
|---------|-------|-------------|:-----:|
| exit | exit | 봇을 서버에서 나가게 합니다. | quit |
| info | info | 봇의 정보를 출력합니다. | - |
| chat | chat [chat] | 봇이 입력된 채팅을 보내게 합니다. | - |
| close | close | 봇의 인벤토리를 닫습니다. <br />(GUI인 경우 브라우저에 반영되지 않을 수 있습니다. 새로고침 하세요.) | - |
| click | click [slot] | 인벤토리 슬롯을 클릭합니다. | - |
| inv | inv [slot1] [slot2] | 봇의 인벤토리에 있는 두 슬롯의 아이템을 바꿉니다. | swap |
| hand | hand [slot] | 봇의 퀵바(현재 들고 있는 아이템)를 변경합니다. | hotbar |
| unequip | unequip | 모든 갑옷과 장비를 해제합니다. | - |
| come | come | 당신의 위치로 봇이 이동합니다. | - |
| follow | follow [user] | 특정 유저를 봇이 따라가게 합니다. | - |
| stop | stop | 봇의 이동을 멈춥니다. | unfollow |
| fight | fight [user] | 입력한 유저와 싸움을 시작합니다. | - |
| surrender | surrender | 봇이 싸움을 중단합니다. | sur |

## 알고 있는 문제
* 인벤토리를 닫을 때 브라우저에 보이는 인벤토리에게 반영 되지 않습니다.
* 이동 기능이 리스폰 되기 전 까지 작동하지 않는 문제가 있습니다. 1.17.1 공통의 문제로 보이고 mineflayer 레포지토리에 리포트 되었습니다. 

## 면책 조항
이 봇은 불안정 하며, 개발 환경에서 추가적인 플레이어가 필요할 때 쓰기 위해 만든 봇입니다.

일반적인 목적으로 이 봇을 사용하지 않는 것을 권장드립니다.
