"use strict";

//State battlefield background.
const stateBG = Object.freeze({
    EMPTY: "empty",
    SHIP: "ship",
    STRICKEN_SHIP: "stricken_ship",
    BOMB: "bomb",
    USED_BOMB: "used_bomb"
});

//State fog of war.
const stateFW = Object.freeze({
    FOG_SHOWN: "show",
    FOG_HIDDEN: "hide"
})

const defaultBattleFieldBackground = [
    [stateBG.EMPTY, stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.BOMB,  stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.SHIP,  stateBG.SHIP,  stateBG.SHIP,  stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP],
    [stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.BOMB, stateBG.EMPTY,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY],
    [stateBG.BOMB,  stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.EMPTY, stateBG.SHIP]
];

const defaultBattleFieldFogOfWar = [
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN],
    [stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN, stateFW.FOG_SHOWN,  stateFW.FOG_SHOWN]
];