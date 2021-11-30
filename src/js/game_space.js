// define space class
class Space {
    constructor(config) {
        this.bg = config.bg;
        this.width = config.width;
        this.height = config.height;
        this.speed = config.speed;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = config.width;
        this.y2 = 0;
        this.lastTime = new Date().getTime();
    }

    judge(){
        let currentTime = new Date().getTime();
        if (currentTime - this.lastTime > this.speed){
            this.x1--;
            this.x2--;
            this.lastTime = currentTime;
        }
        if (this.x2 === 0){
            this.x1 = 0;
            this.x2 = this.width;
    }
    }
    paint(context) {
        context.drawImage(this.bg,this.x1,this.y1,this.width,this.height);
        context.drawImage(this.bg,this.x2,this.y2,this.width,this.height);
        }
    }