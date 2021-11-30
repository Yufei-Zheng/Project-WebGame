//define hero class
class Hero {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.x = config.x;
        this.y = config.y;
        this.frame = config.frame;
        this.frameLiveIndex = 0;
        this.frameDeathIndex = 0;
        this.image = null;
        this.live = true;
        this.speed = config.speed;
        this.lastTime = new Date().getTime();
        this.lastShootTime = new Date().getTime();
        this.shootInterval = 200;
        this.bulletList = [];
        this.destroy = false;
    }
    judge(){
        const currentTime = new Date().getTime();
        if (currentTime - this.lastTime > this.speed ){
            if(this.live){
            this.img = this.frame.live[this.frameLiveIndex++ % this.frame.live.length];
            }
            else{
                this.img = this.frame.death[this.frameDeathIndex++]
                if(this.frameDeathIndex === this.frame.death.length){
                    this.destroy = true;
                }
            }
            this.lastTime = currentTime;
        }

    }
    paint(){
        context.drawImage(this.img,this.x,this.y);
    }

    shoot() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastShootTime > this.shootInterval){
            // initialize a bullet before hero
            let bullet_x = this.x + this.width;
            let bullet_y = this.y + (this.height-BULLET.height)/2;
            let bullet = new Bullet(BULLET,bullet_x,bullet_y);
            // push the bullet into bulletList
            this.bulletList.push(bullet);
            bullet.paint(context);
            this.lastShootTime = currentTime;
        }
    }
    collide(){
        this.live = false;
    }
}