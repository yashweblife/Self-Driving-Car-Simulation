import { Controls } from "./Controls";

export class Car{
    public controls:Controls=new Controls();
    constructor(public x:number,public y:number,public w:number,public h:number){}
    public draw(c:CanvasRenderingContext2D){
        c.beginPath();
        c.rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        c.fill();
        c.closePath();
    }
    public update = ()=>{
        if(this.controls.forward){
            this.y-=2;
        }
        if(this.controls.back){
            this.y+=2;
        }
        if(this.controls.left){
            this.x-=2;
        }
        if(this.controls.right){
            this.x+=2;
        }
    }
}