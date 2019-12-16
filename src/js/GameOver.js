import Phaser from 'phaser';
export default class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver')
    }
    create(){
        window.config.count = 30;
        window.config.stop = 1;
        window.config.boold = 3;

        this.add.image(window.config.centerX,window.config.centerY,'bg');
        this.add.image(window.config.centerX,window.config.centerY,'gameOver');
        const btn = this.add.sprite(window.config.centerX,window.config.centerY+100,'btn',1).setInteractive();

        btn.on('pointerdown',()=>{
            this.scene.start('mainScene')
        })

    }
}
