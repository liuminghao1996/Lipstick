import Phaser from 'phaser';
import Map from './gameConfig.js';
//全局变量的引入 生命、当前关数、（速度、时间、这些也可以引进去）
//要设置口红的物体大小
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('mainScene');
    }
    create(){
        this.init();
        // this.physics.Components.debug()
        this.add.image(window.config.centerX,window.config.centerY,'bg');
        //添加右上角倒计时
        this.DownCount = this.add.bitmapText(window.config.w-30,10,'flappyFont',window.config.count,50,).setOrigin(1,0);
        //添加生命值
        this.boold = this.add.group({
            key: 'blood',
            repeat: 2,
            frame:0,
            setXY: { x: 30, y: 10+25, stepX: 73 }
        });
        const _boold = this.boold.getChildren();
        for(let i= window.config.boold;i<3;i++){
            _boold[i].setFrame(1)
        }
        //添加口红个数
        this._clips = this.add.group({
            key:'clip',
            repeat:5,
            frame:0,
            setXY: { x: window.config.w-75, y: 512, stepY: 34 }
        });
        const _clips = this._clips.getChildren();
        //添加发射口红
        this.player = this.physics.add.image(window.config.centerX,650,'player');//636
        // this.player.setSize(28,53);
        console.log(this.player.angle,'发射口号的角度');
        //添加目标
        this.target = this.add.image(window.config.centerX,150,'target',this.stop).setDepth(1);//265 + 14
        this._targetLeft = this.add.sprite(window.config.centerX - 55, 150, 'target_left', this.stop).setVisible(false);
        this._targetRight = this.add.sprite(window.config.centerX + 55, 150, 'target_right', this.stop).setVisible(false);
        // 创建player池
        this._players = this.physics.add.group();
        this.target.angle = 0;

        let isMeet = true;
        this.physics.add.collider(this.player, this._players,()=>{
            // console.log('碰撞了')
            isMeet = false;
        });
        // this.input.enableDebug(this._players);
        this.input.on('pointerdown',()=>{
            if(!this.mark){
                return '动画还未结束'
            }
            this.tweens.add({
                targets:this.player,
                y:279,
                duration:150,
                onStart:()=>{
                    this.mark = false
                },
                onComplete:()=>{
                    if(isMeet){
                        //插入成功
                        let temp = this.add.sprite(this.player.x, this.player.y, 'player');
                        console.log(this.player.x, this.player.y);
                        temp._angle = this.target.angle;
                        this._players.add(temp);
                        this.player.setY(650);
                        let index = this._players.getLength()-1;
                        _clips[index] && _clips[index].setFrame(1);
                        this.mark = true;
                        if(this._players.getLength()>=this._clips.getLength()){
                            console.log('成功，播放通关动画');
                            this.target.setVisible(false);
                            this._targetLeft.setVisible(true);
                            this._targetRight.setVisible(true);
                            let attr = [this._targetLeft,this._targetRight,...this._players.getChildren()];
                            console.log(attr);
                            this.tweens.add({
                                targets:attr,
                                y:850,
                                ease: 'Back.easeIn',
                                duration: Phaser.Math.Between(800, 1000),
                                onComplete:()=>{
                                    if(window.config.stop >=3){
                                        this.scene.pause('mainScene');
                                        this.scene.start('gameOver');
                                    }
                                    window.config.stop++;
                                    this.scene.pause('mainScene');
                                    this.scene.start('mainScene');
                                }
                            })
                        }

                    }else{
                        this.tweens.add({
                            targets:this.player,
                            y:800,
                            angle:360,
                            duration:500,
                            onComplete:()=>{
                                console.log('碰撞结束');
                                --window.config.boold;
                                this.boold.getChildren()[window.config.boold].setFrame(1);
                                this.scene.pause('mainScene');
                                if(window.config.boold<=0){
                                    this.scene.start('gameOver');
                                }else{
                                    this.scene.start('mainScene');
                                }
                            }
                        })
                    }

                }
            })
        })
    }
    update() {
        //倒计时
        if(new Date().getTime()-window.config.time.getTime() >=1000){
            window.config.time = new Date();
            this.DownCount.setText(--window.config.count);
        }

        this.target.angle += this.speedConfig.speed;
        if(!(this._players.getLength()>=this._clips.getLength())){
            this._players.getChildren().forEach((item,index) => {
                item.angle += this.speedConfig.speed;
                let rad = Phaser.Math.DegToRad(item.angle + 90);
                item.x = this.target.x + (this.target.width / 2) * Math.cos(rad);
                item.y = this.target.y + (this.target.width / 2) * Math.sin(rad);
            });
        }

        // let speedConfig = {speed:1,maxSpeed:10,stop:0.02,handleRnd: () => Phaser.Math.FloatBetween(0.01, 0.05)}

        this.speedConfig.speed += this.speedConfig.stop * this.speedConfig.guangqia;
        if(this.speedConfig.speed >= this.speedConfig.maxSpeed){
            console.log(this.speedConfig.speed,this.speedConfig.maxSpeed,this.speedConfig.stop,11111)
            this.speedConfig.stop = -this.speedConfig.handleRnd();
        }else if(this.speedConfig.speed <= -this.speedConfig.maxSpeed){
            console.log(this.speedConfig.speed,this.speedConfig.maxSpeed,this.speedConfig.stop,2222)
            this.speedConfig.stop = this.speedConfig.handleRnd();
        }
    }
    init(){
        window.config.count = 30;
        this.speedConfig = {speed:1,maxSpeed:6,stop:0.02,handleRnd: () => Phaser.Math.FloatBetween(0.01, 0.05),guangqia: window.config.stop}
        this.stop = window.config.stop-1;
        this.mark = true
    }

}
