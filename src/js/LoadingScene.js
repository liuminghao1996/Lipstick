import Phaser from "phaser";

export default class LoadingScene extends Phaser.Scene{
    constructor() {
        super('loadScene');
    }
    preload(){
        window.config = {
            w:1280,
            h:716,
            centerX:1280/2,
            centerY:716/2,
            count:30,
            stop:1,
            boold:3,
            speed:1,
            stopSpeed:0.02,
            handleRnd: () => Phaser.Math.FloatBetween(0.01, 0.05),
            maxSpeed:10,
            time:new Date()
        };
        this.load.image('bg',require('@/images/bg.png'));
        this.load.image('gameOver',require('@/images/gameover.png'));
        this.load.image('gamePass',require('@/images/gamepass.png'));
        this.load.image('gameReady',require('@/images/gameready.png'));
        this.load.image('player',require('@/images/player.png'));

        this.load.spritesheet('blood',require('@/images/blood.png'),{
            frameWidth:53,frameHeight:49
        });
        this.load.spritesheet('clip',require('@/images/clip.png'),{
            frameWidth:89,frameHeight:24
        });
        this.load.spritesheet('btn',require('@/images/btn.png'),{
            frameWidth:546/2,frameHeight:83
        });
        this.load.spritesheet('target',require('@/images/target.png'),{
            frameWidth:690/3,frameHeight:230
        });
        this.load.spritesheet('target_left',require('@/images/target-left.png'),{
            frameWidth:450/3,frameHeight:230
        });
        this.load.spritesheet('target_right',require('@/images/target-right.png'),{
            frameWidth:450/3,frameHeight:230
        });

        this.load.bitmapFont('flappyFont', require('@/fonts/flappy.png'), require('@/fonts/flappy.fnt'));

        this.load.audio('broken',require('@/aduio/broken.mp3'));
        this.load.audio('collide',require('@/aduio/collide.mp3'));
        this.load.audio('throw',require('@/aduio/throw.mp3'));

        const loading = this.add.text(window.config.centerX,window.config.centerY,['0%','正在加载'],{ font: '40px arial', align: 'center' }).setOrigin(.5);
        this.load.on('progress',(number)=>{
            // stop.setText(number)
            loading.setText([`${number*100}%`,'正在加载'])
        });
        this.load.on('complete',()=>{
            this.add.image(window.config.centerX,window.config.centerY,'bg');
            this.add.image(window.config.centerX,window.config.centerY,'gameReady');
            this.scene.start('mainScene');
            console.log(config,'全局变量')
            const startBtn = this.add.sprite(window.config.centerX,window.config.centerY+100,'btn',0).setInteractive();//调用setInteractive方法使该物体拥有input事件
            startBtn.on('pointerdown',()=>{

                this.scene.start('mainScene')
            })
        })

    }
}
