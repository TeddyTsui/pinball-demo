let levels = require('level_design')
let store = require('GameStore')

module.exports = {
    loadLevel(level) {
        store.setter('playground', levels[level])
    }
}