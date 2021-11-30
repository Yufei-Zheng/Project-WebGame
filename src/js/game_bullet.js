//define bullet class
class Bullet {
    constructor(config,x,y){
        this.img = config.img;
        this.width = config.width;
        this.height = config.height;
        this.x = x;
        this.y = y;
        this.destroy = false;
    }
    move() {
        this.x = this.x + 2;

    }
    paint(context) {
        context.drawImage(this.img,this.x,this.y)
    }

    outOfBounds() {
        return this.x > SPACE.width + BULLET.width
    }

    collide(){
        this.destroy = true;
    }
}