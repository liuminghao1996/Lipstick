import Phaser from 'phaser';
import './css/index.css';
import LoadingScene from './js/LoadingScene.js';
import MainScene from './js/MainScene.js';
import GameOver from './js/GameOver.js'

const game = new Phaser.Game({
    type:Phaser.AUTO,
    width: 1280,
    height: 716,
    physics: {
        default: 'arcade',
    },
    dom: { createContainer: true },
    // parent:'game_parent',
    banner:true,
    scale: {//缩放模式
        mode: Phaser.Scale.FIT,//自动调整宽度和高度以适合给定的目标区域，同时保持宽高比。根据宽高比，区域内可能有一些未被覆盖的空间。
        autoCenter: Phaser.Scale.CENTER_BOTH//游戏画布在父对象中水平和垂直居中
    },
    scene:[LoadingScene,MainScene,GameOver]
});

