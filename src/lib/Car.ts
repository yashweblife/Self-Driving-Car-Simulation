export class Car{
    constructor(public x:number,public y:number,public w:number,public h:number){}
    public draw(c:CanvasRenderingContext2D){
        c.beginPath();
        c.rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        c.fill();
        c.closePath();
    }
}