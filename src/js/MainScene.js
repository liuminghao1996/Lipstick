import Phaser from 'phaser';
import Map from './gameConfig.js';
const map = new Map();
//全局变量的引入 生命、当前关数、（速度、时间、这些也可以引进去）
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('mainScene');
    }
    create(){
        this.add.image(map.centerX,map.centerY,'bg');
        //添加右上角倒计时
        this.DownCount = this.add.bitmapText(map.w-30,10,'flappyFont',map.count,50,).setOrigin(1,0);
        //添加生命值
        this.boold = this.add.group({
            key: 'blood',
            repeat: 2,
            frame:0,
            setXY: { x: 30, y: 10+25, stepX: 73 }
        });
        //添加口红个数
        this._clips = this.add.group({
            key:'clip',
            repeat:5,
            frame:0,
            setXY: { x: map.w-75, y: 512, stepY: 34 }
        });
        const _clips = this._clips.getChildren();
        //添加发射口红
        this.player = this.physics.add.image(map.centerX,650,'player');//636
        console.log(this.player.angle,'发射口号的角度')
        //添加目标
        this.target = this.add.image(map.centerX,150,'target').setDepth(1);//265 + 14
        // 创建player池
        this._players = this.physics.add.group();
        this.target.angle = 0;
        this.speed = 1;
        let isMeet = true;
        this.physics.add.collider(this.player, this._players,()=>{
            // console.log('碰撞了')
            isMeet = false;
        });
        this.input.on('pointerdown',()=>{
            this.tweens.add({
                targets:this.player,
                y:279,
                duration:150,
                onComplete:()=>{

                    if(isMeet){
                        //插入成功
                        let temp = this.add.sprite(this.player.x, this.player.y, 'player');
                        console.log(this.player.x, this.player.y);
                        temp._angle = this.target.angle;
                        this._players.add(temp);
                        this.player.setY(650);
                        let index = this._players.getLength()-1
                        _clips[index] && _clips[index].setFrame(1)
                    }else{
                        this.tweens.add({
                            targets:this.player,
                            y:800,
                            angle:360,
                            duration:500,
                            onComplete:()=>{
                                console.log('碰撞结束');
                                this.scene.start('mainScene')
                            }
                        })
                    }

                }
            })
        })
    }
    update() {
        //倒计时
        if(new Date().getTime()-map.time.getTime() >=1000){
            map.time = new Date();
            this.DownCount.setText(--map.count);
        }

        switch (true) {
            case this.target.angle>=360:
                this.speed = -1;
                break;
            case this.target.angle<=0:
                this.speed = 1;
                break;
        }
        this.target.angle += this.speed;
        this._players.getChildren().forEach((item,index) => {
            item.angle += this.speed;
            let rad = Phaser.Math.DegToRad(item.angle + 90);
            item.x = this.target.x + (this.target.width / 2) * Math.cos(rad);
            item.y = this.target.y + (this.target.width / 2) * Math.sin(rad);
        });


        if(this._players.getLength()>=this._clips.getLength()){
            this.scene.pause('mainScene');
            this.scene.start('gameOver')
        }



    }
}
