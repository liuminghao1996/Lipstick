import Phaser from 'phaser';
import './css/index.css';
import LoadingScene from './js/LoadingScene.js';
import MainScene from './js/MainScene.js';
import GameOver from './js/GameOver.js';
console.log('main.js')
const game = new Phaser.Game({
    type:Phaser.AUTO,

    physics: {
        default: 'arcade',
    },
    dom: { createContainer: true },
    parent:'game_parent',
    banner:true,
    scale: {//缩放模式
        mode: Phaser.Scale.FIT,
        parent: 'game_parent',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 716
    },
    scene:[LoadingScene,MainScene,GameOver]
});

