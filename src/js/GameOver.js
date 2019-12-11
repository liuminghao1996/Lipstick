import Phaser from 'phaser';
import Map from './gameConfig.js';
const map = new Map();
export default class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver')
    }
    create(){
        this.add.image(map.centerX,map.centerY,'bg');
        this.add.image(map.centerX,map.centerY,'gameOver');

        const btn = this.add.sprite(map.centerX,map.centerY+100,'btn',1).setInteractive();

        btn.on('pointerdown',()=>{
            this.scene.start('mainScene')
        })

    }
}
