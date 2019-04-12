// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        ballNode: cc.Node,
        bossNode: cc.Node,
        leftBoard: cc.Node,
        rightBoard: cc.Node,
        statusViewNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.leftForce = 0
        this.rightForce = 0
        this.maxPower = 2000000

        this.emitLeft = false
        this.emitRight = false

        this.ball = this.ballNode.getComponent('SimpleBall')
        this.boss = this.bossNode.getComponent('SimpleBoss')

        // 板子受力刚体
        this._leftBoard = this.leftBoard.getComponent('Board').getForceNode()
        this._rightBoard = this.rightBoard.getComponent('Board').getForceNode()

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

        this.node.on('attackBoss', (e) => {
            this.boss.Hp -= e.atk
            e.stopPropagation()
        })

        this.node.on('chargeBall', (e) => {
            this.ball.energy += e.energy
            e.stopPropagation()
        })

        this.node.on('affactBoss', (e, arg) => {
            if(arg instanceof Function){
                cc.log('get boss callback')
            }else if(arg instanceof Object){
                cc.log('get boss status')
            }
            e.stopPropagation()
        })

        this.node.on('affactBall', (e, arg) => {
            if(arg instanceof Function){
                cc.log('get ball callback')
            }else if(arg instanceof Object){
                cc.log('get ball status')
            }
            e.stopPropagation()
        })

    },

    start () {
        cc.log('start')
        let scheduler = cc.director.getScheduler()

        scheduler.enableForTarget(this)

        scheduler.schedule(() => {
            cc.log('tick')
            this.ball.energy -= this.ball.cost
        }, this, 1000)
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
        this.boss.Hp = this.boss.maxHp
    },

    /**
     * 更新视图
     */
    updateView() {
        this.statusCtrl.updateBall(this.ball.energy/ this.ball.maxEnergy)

        this.statusCtrl.updateBoss(this.boss.Hp/ this.boss.maxHp)
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
        if(this.boss.Hp <0){
            this.endTheGame(true)
        }
    },
    
    update (dt) {
        this.gameLogic(dt)
        this.updateView()
    },
});
