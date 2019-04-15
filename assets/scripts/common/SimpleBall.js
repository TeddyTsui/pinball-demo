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
 * 球基类
 */

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

        /**
         * 球基础属性
         */
        maxEnergy: 100,
        energy: 100,
        cost: 1,
        attack: 10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        store.setBall({
            energy: this.energy,
            maxEnergy: this.maxEnergy,
            cost: this.cost,
            atk: this.attack,
        })
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        // cc.log('ball contact')
    },

    start() {

    },

    // update (dt) {},
});