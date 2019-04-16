const _store = {
    playerConfig: {// 玩家配置
        // left_board: 'Left Board',
        // right_board: 'Right Board',
        ball: 'Simple Ball',
    },

    playground: [// 场景布局
        { prefab: 'Simple Boss', x: 375, y: 1000 },
        { prefab: 'Left Base', x: 0, y: 0 },
        { prefab: 'Right Base', x: 750, y: 0 },
        { prefab: 'Recover Block', x: 720, y: 550, slotId: '1' },
        { prefab: 'Left Board', x: 230, y: 95, slotId: 'left_board'},
        { prefab: 'Right Board', x: 500, y: 95, slotId: 'right_board'},
    ],

    ball: {// 球属性
        energy: 100,
        maxEnergy: 100,
        cost: 1,
        atk: 10,
    },

    boss: {// boss属性
        hp: 100,
        maxHp: 100,
    },
}

module.exports = {
    setter(name, arg) {
        if(arg instanceof Array){
            _store[name] = [].concat(arg)
        }else{
            Object.keys(arg).map((val, key) => {
                _store[name][key] = val
            })
        }
    },

    getter(name) {
        return _store[name]
    },

    affectOnBoss(boss, positive) {
        _store.boss.hp += (positive ? 1 : -1) * boss.hp
    },

    affectOnBall(ball, positive) {
        if (positive) {
            let temp = _store.ball.energy + ball.energy
            if (temp > _store.ball.maxEnergy) {
                _store.ball.energy = _store.ball.maxEnergy
            } else {
                _store.ball.energy = temp
            }
        }
    },
}