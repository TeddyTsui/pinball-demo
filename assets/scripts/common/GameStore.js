// 场景布局
const _playground = {}

// 球属性
const _ball = {
    energy: 100,
    maxEnergy: 100,
    cost: 1,
    atk: 10,
}

//  boss属性
const _boss = {
    hp: 100,
    maxHp: 100,
}

module.exports = {
    setBall(ball) {
        Object.keys(ball).map((val, key) => {
            _ball[key] = val
        })
    },

    getBall() {
        return _ball
    },

    setBoss(boss) {
        Object.keys(boss).map((val, key) => {
            _boss[key] = val
        })
    },

    getBoss() {
        return _boss
    },

    setPlaygroundLayout(layout) {
        Object.keys(boss).map((val, key) => {
            _boss[key] = val
        })
    },

    getPlaygroundLayout() {
        return _playground
    },

    affectOnBoss(boss, positive) {
        _boss.hp += (positive ? 1 : -1)* boss.hp
    },

    affectOnBall(ball, positive) {
        if(positive){
            let temp = _ball.energy + ball.energy
            if(temp > _ball.maxEnergy){
                _ball.energy = _ball.maxEnergy
            }else{
                _ball.energy = temp
            }
        }
    },
}