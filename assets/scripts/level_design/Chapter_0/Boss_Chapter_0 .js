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
        coreNode: cc.Node,
        armorPrefab: cc.Prefab,
        stonePrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.core = this.coreNode.getComponent(cc.RigidBody)
    },

    start () {
        this.node.runAction(cc.rotateTo(2, 60))
    },

    // update (dt) {},

    // FUNCTIONS

    /**
     * 石头生成
     */
    spawnStone() {
        let stone = cc.instantiate(this.stonePrefab)
        stone.x = (Math.round((Math.random() * (this.areaRadiu / 2))) + 100) * (Math.random() > 0.5 ? 1 : -1)
        stone.y = (Math.round((Math.random() * (this.areaRadiu / 2))) + 100) * (Math.random() > 0.5 ? 1 : -1)
        let joint = stone.getComponent(cc.DistanceJoint)
        joint.distance = Math.sqrt(stone.x ^2 + stone.y^2)
        joint.connectedBody = this.core
        this.node.addChild(stone)
    },

    /**
     * 护甲生成
     */
    spawnArmors(index) {
        let armor = cc.instantiate(this.armorPrefab)
        armor.rotation = index * 60
        this.node.addChild(armor)
    }
});
