// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/**
 * 游戏操作逻辑管理
 */

let store = require('GameStore')

cc.Class({
    extends: cc.Component,

    properties: {
        statusViewNode: cc.Node,
        playground: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 环境设定 考虑加入关卡设计
        this.leftForce = 0
        this.rightForce = 0
        this.maxPower = 2000000

        this.emitLeft = false
        this.emitRight = false

        this.layout = store.getter('playground')
        this.ball = store.getter('ball')
        this.boss = store.getter('boss')
        this.config = store.getter('playerConfig')

        this.statusCtrl = this.statusViewNode.getComponent('StatusView')

        this.isLoading = true // 等待资源加载完毕
        this.resLen = this.layout.length
        this.loadedLen = 0
        this.initPlayground()
        this.loadBall()

        this.node.on('touchstart', (e) => {
            if (this.launched) {
                if (e.getLocationX() < 375) {
                    this.emitLeft = true
                } else {
                    this.emitRight = true
                }
            }
        }, this)

        this.node.on('touchend', (e) => {
            if (!this.launched) {
                this.launchBall()
            } else {
                if (e.getLocationX() < 375) {
                    this.emitLeft = false
                } else {
                    this.emitRight = false
                }
            }
        }, this)
    },

    start() {
        cc.log('start')
        this.schedule(() => {
            // 每秒消耗能量
            this.ball.energy -= this.ball.cost
        }, 1)
    },

    update(dt) {
        if (this.isLoading) {
            this.isLoading = this.resLen == this.loadedLen
        } else {
            this.gameLogic(dt)
            this.updateView()
        }
    },

    /**
     * 初始化场景布局，传入控制模块
     */
    initPlayground() {
        this.layout.map((item) => {
            let prefabName = item.prefab
            if (item.slotId !== undefined && this.config[item.slotId] !== undefined) {
                // get user setting
                // replace prefab
                prefabName = this.config[item.slotId]
            }
            cc.loader.loadRes('prefab/' + prefabName, (err, prefab) => {
                let newItem = cc.instantiate(prefab)
                newItem.x = item.x
                newItem.y = item.y

                // 板子受力刚体
                if (item.slotId !== undefined && item.slotId.indexOf('_board') > 0) {
                    this[item.slotId] = newItem.getComponent('SimpleBoard').getForceNode()
                }

                this.playground.addChild(newItem)
                this.loadedLen++
            })
        })
    },

    /**
     * 加载球
     */
    loadBall() {
        cc.loader.loadRes('prefab/' + this.config.ball, (err, prefab) => {
            this.ballNode = cc.instantiate(prefab)

            this.node.addChild(this.ballNode)
            this.ballNode.x = 160
            this.ballNode.y = 680
            this.ballNode.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
            this.launched = false
        })
    },

    /**
     * 发射球
     */
    launchBall() { // simple luanch
        cc.log('launched')
        this.launched = true
        this.scheduleOnce(() => {
            this.ballNode.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic
        })
    },

    /**
    * 游戏逻辑
    * @param {*} dt 
    */
    gameLogic(dt) {
        // TODO 使用力还是节点旋转？ 如何实现击打力度
        if (this.launched && this.emitLeft) {
            if (this.leftForce < this.maxPower) {
                this.leftForce += dt * 1000000
            } else {
                this.leftForce = this.maxPower
            }
        } else {
            this.leftForce = 0
        }

        if (this.launched && this.emitRight) {
            if (this.rightForce < this.maxPower) {
                this.rightForce += dt * 1000000
            } else {
                this.rightForce = this.maxPower
            }
        } else {
            this.rightForce = 0
        }

        // 对板子施加力
        this.left_board.applyForceToCenter(cc.v2(0, this.leftForce))
        this.right_board.applyForceToCenter(cc.v2(0, this.rightForce))

        // 球出界
        if (this.ballNode.y < 0) {
            this.endTheGame(false)
        }

        // 能量耗尽
        if (this.ball.energy < 0) {
            this.endTheGame(false)
        }

        // 击败Boss
        if (this.boss.hp < 0) {
            this.endTheGame(true)
        }
    },

    /**
     * 游戏暂停
     */
    pauseTheGame() {
        // TODO
    },

    /**
     * 游戏结束
     * @param {*} isWin 
     */
    endTheGame(isWin) {
        // TODO
        this.ballNode.x = 100
        this.ballNode.y = 1200
        this.ball.energy = this.ball.maxEnergy
        this.boss.hp = this.boss.maxHp
    },

    /**
     * 更新视图
     */
    updateView() {
        this.statusCtrl.updateBall(this.ball.energy, this.ball.maxEnergy)

        this.statusCtrl.updateBoss(this.boss.hp, this.boss.maxHp)
    },

    /**
     * 返回菜单
     */
    backToLobby() {
        cc.director.loadScene('lobby')
    },

});
