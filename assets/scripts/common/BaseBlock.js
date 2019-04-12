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
 * 方块基类
 */

let BlockType = cc.Enum({
    barrier: 1,
    enemy: 2,
    friend: 3,
})

let BaseBlock = cc.Class({
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
        _type:  BlockType.barrier, 

        type: {
            get() {
                return this._type
            },
            set(type) {
                this._type = type
            },
            type: BlockType
        },
        simpleEffect: 10,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        this.simpleMethod()
    },

    simpleMethod() {
        if(this.type == BlockType.enemy){
            let attack = new cc.Event.EventCustom('attackBoss', true)
            attack.setUserData({atk: simpleEffect})
            this.node.dispatchEvent(attack)
        }else if(this.type == BlockType.friend){
            let charge = new cc.Event.EventCustom('chargeBall', true)
            charge.setUserData({energy: simpleEffect})
            this.node.dispatchEvent(charge)
        }
    }

    // update (dt) {},
});
