const _store = {
    playerConfig: {// 玩家配置
        layout: {},
        ball: 'Simple Ball',
        left_board: 'Left Board',
        right_board: 'Right Board',
    },

    playground: {// 场景布局
    },
    
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
    setter(name, obj) {
        Object.keys(obj).map((val, key) => {
            _store[name][key] = val
        })
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