import { Controls } from "./Controls";
import { Sensor } from "./Sensor";

export class Car{
    public controls:Controls=new Controls();
    public ax:number=2;
    public ay:number=2;
    public vy:number=0;
    public vx:number=0;
    public angle:number=0;
    public friction:number=0.05;
    public maxSpeed:number=3;
    public sensor:Sensor = new Sensor(this);
    constructor(public x:number,public y:number,public w:number,public h:number){}
    public draw(c:CanvasRenderingContext2D){
        this.sensor.draw(c);
        c.save();
        c.translate(this.x, this.y);
        c.rotate(-this.angle);
        c.beginPath();
        c.rect( -this.w/2, -this.h/2, this.w, this.h);
        c.fill();
        c.closePath();
        c.restore();
    }
    public update = ()=>{
        if(this.controls.forward){
            this.vy+=this.ay;
        }
        if(this.controls.back){
            this.vy-=this.ay;
        }

        if(this.vy!=0){
            const flip=this.vy>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03 * flip;
            }
            if(this.controls.right){
                this.angle-=0.03 * flip;
            }
        }
        //Speed Limiter
        if(this.vy>this.maxSpeed){
            this.vy=this.maxSpeed;
        }
        if(this.vy<-this.maxSpeed){
            this.vy= -this.maxSpeed
        }
        //Dampner
        if(this.vy>0){
            this.vy-=this.friction
        }
        if(this.vy<0){
            this.vy+=this.friction
        }
        //Error Correction
        this.x-=Math.sin(this.angle)*this.vy;
        this.y-=Math.cos(this.angle)*this.vy;
    }
}