// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let store = require('GameStore')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        statusViewNode: cc.Node,
        playground: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.leftForce = 0
        this.rightForce = 0
        this.maxPower = 2000000

        this.emitLeft = false
        this.emitRight = false

        this.ball = store.getter('ball')
        this.boss = store.getter('boss')

        // cc.log(store)

        // 板子受力刚体
        this._leftBoard = this.leftBoard.getComponent('SimpleBoard').getForceNode()
        this._rightBoard = this.rightBoard.getComponent('SimpleBoard').getForceNode()

        this.statusCtrl = this.statusViewNode.getComponent('StatusView')

        this.node.on('touchstart', (e) => {
            if(e.getLocationX() < 375) {
                this.emitLeft = true
            }else {
                this.emitRight = true
            }
        }, this)

        this.node.on('touchend', (e) => {
            if(e.getLocationX() < 375) {
                this.emitLeft = false
            }else {
                this.emitRight = false
            }
        },this)
    },

    start () {
        cc.log('start')
        this.schedule(() => {
            // 每秒消耗能量
            this.ball.energy -= this.ball.cost
        }, 1)
    },
  
    update (dt) {
        this.gameLogic(dt)
        this.updateView()
    },

    /**
     * 初始化场景布局，传入控制模块
     */
    initPlayground() {
        let layout = store.getPlaygroundLayout()
        layout.map((item) => {
            let prefabName = item.prefab
            if(item.slotId !== undefined){
                // get user setting
                // replace prefab
            }
            cc.loader.loadRes('prefab/' + prefabName, (err, prefab) => {
                let newItem = cc.instantiate(prefab)
                this.playground.addChild(newItem)
                newItem.x = item.x
                newItem.y = item.y
            })
        })
    },

    initPlayItem() {
        // TODO
        cc.loader.loadRes('prefab/' + this.config.ball, (err, prefab) => {
            let ball = cc.instantiate(prefab)
            this.addChild(newItem)
            newItem.x = item.x
            newItem.y = item.y
        })

        cc.loader.loadRes('prefab/' + this.config.leftBoard, (err, prefab) => {
            let leftBoard = cc.instantiate(prefab)
            this.playground.addChild(newItem)
            newItem.x = item.x
            newItem.y = item.y
        })

        cc.loader.loadRes('prefab/' + this.config.rightBoard, (err, prefab) => {
            let rightBoard = cc.instantiate(prefab)
            this.playground.addChild(newItem)
            rightBoard.x = item.x
            rightBoard.y = item.y
        })
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
    endTheGame(isWin){
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
        this.statusCtrl.updateBall(this.ball.energy/ this.ball.maxEnergy)

        this.statusCtrl.updateBoss(this.boss.hp/ this.boss.maxHp)
    },

    /**
     * 游戏逻辑
     * @param {*} dt 
     */
    gameLogic(dt){
        // TODO 使用力还是节点旋转？ 如何实现击打力度
        if(this.emitLeft){
            if(this.leftForce < this.maxPower){
                this.leftForce += dt * 1000000 
            }else{
                this.leftForce = this.maxPower
            }
        }else{
            this.leftForce = 0
        }

        if(this.emitRight){
            if(this.rightForce < this.maxPower){
                this.rightForce += dt * 1000000
            }else{
             this.rightForce = this.maxPower   
            }
        }else{
            this.rightForce = 0
        }

        // 对板子施加力
        this._leftBoard.applyForceToCenter(cc.v2(0, this.leftForce))
        this._rightBoard.applyForceToCenter(cc.v2(0, this.rightForce))
        
        // 球出界
        if(this.ballNode.y < 0){
            this.endTheGame(false)
        }

        // 能量耗尽
        if(this.ball.energy < 0){
            this.endTheGame(false)
        }

        // 击败Boss
        if(this.boss.hp <0){
            this.endTheGame(true)
        }
    },

});
