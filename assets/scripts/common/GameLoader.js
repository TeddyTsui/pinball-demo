/**
 * 设计为游戏关卡及玩家信息载入模块
 * 考虑包括网络通讯部分
 */

let levels = require('level_design')
let store = require('GameStore')

module.exports = {
    loadLevel(level) {
        store.setter('playground', levels[level])
    }
}