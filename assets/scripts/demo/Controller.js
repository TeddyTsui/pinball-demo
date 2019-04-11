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
        ball: cc.Node,
        launcher: cc.Node,
        launchPath: cc.Node,
        leftBoard: cc.Node,
        rightBoard: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.entered = false
        this.isCharging = false
        this.launcherPower = 0

        this.emitLeft = false
        this.emitRight = false

        this.pathJoint = this.launchPath.getComponent(cc.DistanceJoint)

        this.node.on('touchstart', (event) => {
            if(!this.entered){
                this.isCharging = true
            }else if(event.getLocationX() < 375){
                cc.log('emit left')
                this.emitLeft = true
            }else{
                cc.log('emit right')
                this.emitRight = true
            }
        }, this)

        this.node.on('touchend', (event) => {
            if(!this.entered){
                this.ball.getComponent(cc.RigidBody)
                    .applyLinearImpulse(cc.v2(0, this.launcherPower), cc.v2(725, 100))
                this.isCharging = false
                this.launcherPower = 0
            }else if(event.getLocationX() < 375){
                this.emitLeft = false
            }else{
                this.emitRight = false
            }
        }, this)
    },

    start () {

    },

    update (dt) {
        if(this.isCharging){
            // 蓄力
            if(this.launcherPower <= 1000000){
                this.launcherPower = this.launcherPower + dt * 10000
            }
        }

        if(this.ball.y > 1125 && !this.entered){
            // 进入弧形轨道
            this.pathJoint.enabled = true
            this.pathJoint.connectedBody = this.ball.getComponent(cc.RigidBody)
            this.pathJoint.apply()
        }

        if(this.ball.x < 100 && !this.entered){
            // 穿过弧形轨道，进入战场
            this.pathJoint.enabled = false
            this.entered = true
        }

        if(this.ball.y <= 1125 && !this.entered){
            // 球重新跌入垂直轨道
            this.pathJoint.enabled = false
        }

        if(this.emitLeft){
            this.leftBoard.getComponent(cc.RigidBody)
                .applyForceToCenter(cc.v2(0, 100000))
        }

        if(this.emitRight){
            this.rightBoard.getComponent(cc.RigidBody)
                .applyForceToCenter(cc.v2(0, 100000))
        }
    },
});
