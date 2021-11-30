// define enemy class
class Enemy{
    constructor(config){
        this.type = config.type;
        this.width = config.width;
        this.height = config.height;
        this.y = Math.floor(Math.random() * (SPACE.height - config.height));
        this.x = SPACE.width;
        this.life = config.life;
        this.score = config.score;
        this.frame = config.frame;
        this.img = this.frame.live[0];
        this.live = true;
        this.speed = Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) +config.maxSpeed;
        this.lastTime = new Date().getTime();
        this.deathIndex = 0;
        this.destroy = false;
    }
    move(){
        const currentTime = new Date().getTime();
        if (currentTime - this.lastTime >= this.speed){

            if(this.live) {
            this.img = this.frame.live[0];
            this.x--;
            } else{
                this.img = this.frame.death[this.deathIndex++]
                if(this.deathIndex == this.frame.death.length){
                    this.destroy = true;
                }
            }
            this.lastTime = currentTime;
            
        }

    }

    paint(context){
        context.drawImage(this.img,this.x,this.y);
    }

    outOfBounds(){
        return this.x < - this.width;
    }

    hit(other){
        //left,up,right,down
        let el = this.x;
        let eu = this.y;
        let er = this.x+ this.width;
        let ed = this.y + this.height;
        let ol = other.x;
        let ou = other.y;
        let or = other.x + other.width;
        let od = other.y + other.height;

        if (ol>er || or<el || ou>ed || od < eu){
            return false;
        }else{
            return true;
        }
    }

    collide(isHero) {
        if(isHero){
            this.life = 0;
        }else{
        this.life --;}
        if (this.life === 0) {
            this.live = false;
            //get score
            score += this.score;
        }
    }
}
