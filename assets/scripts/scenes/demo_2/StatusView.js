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
 * 视图管理
 */

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
        ball_p: cc.ProgressBar,
        ball_t: cc.Label,
        boss_p: cc.ProgressBar,
        boss_t: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    updateBall(current, max) {
        this.ball_p.progress = current/max
        this.ball_t.string = current + '/' + max
    },

    updateBoss(current, max) {
        this.boss_p.progress = current/max
        this.boss_t.string = current + '/' + max
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
