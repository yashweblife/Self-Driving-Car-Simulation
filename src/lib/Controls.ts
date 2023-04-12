export class Controls {
  public forward: boolean = false;
  public left: boolean = false;
  public back: boolean = false;
  public right: boolean = false;
  constructor(type:string) {
    switch(type){
      case "MASTER":
        this.addKeyBindings();
        break;
      case "DUMMY":
        this.forward=true;    
        break;
    }
  }
  private addKeyBindings() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowDown":
          this.back = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowDown":
          this.back = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    });
  }
}
