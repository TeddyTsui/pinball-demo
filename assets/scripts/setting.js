/**
 * 游戏启动 引擎设置
 */
cc.game.on(cc.game.EVENT_ENGINE_INITED, () => {
    // 开启物理特性和调试绘制
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getPhysicsManager().debugDrawFlags =
        cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;
    cc.director.getPhysicsManager().gravity = cc.v2(0, -1334);
})