// game_config.js
import img_background from "../img/background.png"
import img_start from "../img/start.png"
import img_load_00 from "../img/load_00.png"
import img_load_01 from "../img/load_01.png"
import img_load_02 from "../img/load_02.png"
import img_load_03 from "../img/load_03.png"
import img_hero_live_00 from  "../img/hero_live_00.png"
import img_hero_live_01 from  "../img/hero_live_01.png"
import img_hero_death_00 from  "../img/hero_death_00.png"
import img_hero_death_01 from  "../img/hero_death_01.png"
import img_hero_death_02 from  "../img/hero_death_02.png"
import img_hero_death_03 from  "../img/hero_death_03.png"
import img_bullet from "../img/bullet.png"
import img_enemy1 from "../img/enemy1.png"
import img_enemy1_death_0 from "../img/enemy1_death_0.png"
import img_enemy1_death_1 from "../img/enemy1_death_1.png"
import img_enemy1_death_2 from "../img/enemy1_death_2.png"
import img_enemy2 from "../img/enemy2.png"
import img_enemy2_death_0 from "../img/enemy2_death_0.png"
import img_enemy2_death_1 from "../img/enemy2_death_1.png"
import img_enemy2_death_2 from "../img/enemy2_death_2.png"
import img_enemy3 from "../img/enemy3.png"
import img_enemy3_death_0 from "../img/enemy3_death_0.png"
import img_enemy3_death_1 from "../img/enemy3_death_1.png"
import img_enemy3_death_2 from "../img/enemy3_death_2.png"

//background picture 
const bg = new Image();
bg.src = img_background;

// initialize start picture
const startPic = new Image();
startPic.src = img_start

// initialize spacecraft loading picture
const loading_frame = [];
loading_frame[0] = new Image();
loading_frame[0].src = img_load_00;
loading_frame[1] = new Image();
loading_frame[1].src = img_load_01;
loading_frame[2] = new Image();
loading_frame[2].src = img_load_02;
loading_frame[3] = new Image();
loading_frame[3].src = img_load_03;


//initialize hero picture
const hero_frame = {live:[],death:[]}
hero_frame.live[0] = new Image();
hero_frame.live[0].src = img_hero_live_00
hero_frame.live[1] = new Image();
hero_frame.live[1].src = img_hero_live_01
hero_frame.death[0] = new Image();
hero_frame.death[0].src = img_hero_death_00
hero_frame.death[1] = new Image();
hero_frame.death[1].src = img_hero_death_01
hero_frame.death[2] = new Image();
hero_frame.death[2].src = img_hero_death_02
hero_frame.death[3] = new Image();
hero_frame.death[3].src = img_hero_death_03

//initialize bullet picture
const bulletPic = new Image();
bulletPic.src = img_bullet


//initialize enemy picture
const e1_frame = {live:[],death:[]}
e1_frame.live[0] = new Image();
e1_frame.live[0].src = img_enemy1
e1_frame.death[0] = new Image();
e1_frame.death[0].src = img_enemy1_death_0
e1_frame.death[1] = new Image();
e1_frame.death[1].src = img_enemy1_death_1
e1_frame.death[2] = new Image();
e1_frame.death[2].src = img_enemy1_death_2       

const e2_frame = {live:[],death:[]}
e2_frame.live[0] = new Image();
e2_frame.live[0].src = img_enemy2
e2_frame.death[0] = new Image();
e2_frame.death[0].src = img_enemy2_death_0
e2_frame.death[1] = new Image();
e2_frame.death[1].src = img_enemy2_death_1
e2_frame.death[2] = new Image();
e2_frame.death[2].src = img_enemy2_death_2

const e3_frame = {live:[],death:[]}
e3_frame.live[0] = new Image();
e3_frame.live[0].src = img_enemy3
e3_frame.death[0] = new Image();
e3_frame.death[0].src = img_enemy3_death_0
e3_frame.death[1] = new Image();
e3_frame.death[1].src = img_enemy3_death_1
e3_frame.death[2] = new Image();
e3_frame.death[2].src = img_enemy3_death_2

// initialize canvas 
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

//config of space 
const SPACE = {
    bg:bg,
    width:300,
    height:150,
    speed:15,
}


//config of spacecraft loading
const LOADING = {
    frame: loading_frame,
    width:35,
    height:90,
    x: 0,
    y:150- 90,
    speed:300
}

//config of hero
const HERO = {
    frame:hero_frame,
    width:37,
    height:32,
    x:0,
    y: (150-32)/2,
    speed:10,
}

//config of bullet 
const BULLET = {
    img:bulletPic,
    width:10,
    height:5,
}

//config of enemies
const E1 = {
    type:1,
    width:10,
    height:18,
    life:1,
    score:10,
    frame:e1_frame,
    minSpeed:20,
    maxSpeed:10,
}


const E2 = {
    type:2,
    width:70,
    height:42,
    life:20,
    score:200,
    frame:e2_frame,
    minSpeed:75,
    maxSpeed:95,
}

const E3 = {
    type:3,
    width:25,
    height:26,
    life:10,
    score:100,
    frame:e3_frame,
    minSpeed:50,
    maxSpeed:20,
}

// game_space.js
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
        //if(this.bg === undefined) {return}
        //console.log(typeof(this.bg));
        context.drawImage(this.bg,this.x1,this.y1,this.width,this.height);
        context.drawImage(this.bg,this.x2,this.y2,this.width,this.height);
        /*this.bg.onload = function(){
            context.drawImage(this.bg,this.x1,this.y1,this.width,this.height);
            context.drawImage(this.bg,this.x2,this.y2,this.width,this.height);
        }*/
        }
}


// game_hero.js
// define hero class
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
        //if(this.img === undefined) {return}
        //console.log(typeof(this.img));
        context.drawImage(this.img,this.x,this.y);
        /*this.img.onload = function(){
            context.drawImage(this.img,this.x,this.y);
        }*/
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

// game_loading.js
//define spacecraft loading class
class Loading {
    constructor(config){
        this.frame = config.frame;
        this.frameIndex = 0;
        this.width = config.width;
        this.height = config.height;
        this.x = config.x;
        this.y = config.y;
        this.speed = config.speed;
        this.lastTime = new Date().getTime();
    }
    judge(){
        let currentTime = new Date().getTime();
        if (currentTime - this.lastTime > this.speed){
            this.frameIndex++ ;
            if (this.frameIndex === 4){
                state = RUNNING;
            }
            this.lastTime = currentTime;
        }

    }
    paint(context){
        //if(this.frame[this.frameIndex] === undefined) {return}
        //console.log(typeof(this.frame[this.frameIndex]));
        context.drawImage(this.frame[this.frameIndex],this.x,this.y)
        /*this.frame[this.frameIndex].onload = function(){
            context.drawImage(this.frame[this.frameIndex],this.x,this.y)
        }*/
    }
}


// game_bullet.js
// define bullet class
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
        //if(this.frame[this.frameIndex] === undefined) {return}
        //console.log(typeof(this.img))
        context.drawImage(this.img,this.x,this.y)
        /*this.img.onload = function(){
            context.drawImage(this.img,this.x,this.y)
        }*/
    }

    outOfBounds() {
        return this.x > SPACE.width + BULLET.width
    }

    collide(){
        this.destroy = true;
    }
}

// game_enemy.js
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
        //if(this.frame[this.frameIndex] === undefined) {return}
        //console.log(typeof(this.img))
        context.drawImage(this.img,this.x,this.y);
        /*this.img.onload = function(){
            context.drawImage(this.img,this.x,this.y);
        }*/
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

// game_main.js

const START = 0;
const STARTING = 1;
const RUNNING = 2;
const PAUSE = 3;
const END = 4;

//initialize a space instance 
const space = new Space(SPACE)
//initialize a spacecraft loading instance
const loading = new Loading(LOADING)
//initialize a hero
let hero = new Hero(HERO)

//state of the game
let state = START;
let score = 0;
let life = 3;

//manage enemies
const enemies = []
let enemyInterval = 800;
let enemylastTime = new Date().getTime();

function createComponent(){
    const enemyCurretTime = new Date().getTime();
    if (enemyCurretTime - enemylastTime >= enemyInterval){
        //e1:80%,e2:5%,e3:15%;
        let rand = Math.floor(Math.random() * 100)
        if ( rand < 80){
        enemies.push(new Enemy(E1));
        } else if (rand<85){
        enemies.push(new Enemy(E2));
        } else{
        enemies.push(new Enemy(E3))
        }

        enemylastTime = enemyCurretTime
    }

}


//manage collision
function checkHit(){
    for(let i=0; i< enemies.length;i++){

        if (enemies[i].hit(hero) && enemies[i].live) {
            enemies[i].collide(true);
            hero.collide();
        }
        for (let j= 0;j<hero.bulletList.length;j++){
            if(enemies[i].hit(hero.bulletList[j])){
                enemies[i].collide(false);
                hero.bulletList[j].collide();
            }
        }
    }
}

// move bullets/enemies
function judgeComponent(){
    for (let i = 0;i< hero.bulletList.length; i++){
        hero.bulletList[i].move();
    }
    for (let i = 0;i< enemies.length; i++){
        enemies[i].move();
    }
}

// paint hero/enemies/scores
function paintComponent() {
    for (let i = 0;i< hero.bulletList.length; i++){
        hero.bulletList[i].paint(context);
    }
    for (let i = 0;i< enemies.length; i++){
        enemies[i].paint(context);
    }

    context.font = "24px";
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText("score: "+score,10,10);
    context.textAlign = "right";
    context.fillText("life: "+"♥".repeat(life)+"♡".repeat(3-life),290,10);

    //reset context
    context.fillStyle = "black";
    context.textAlign = "left";

}

//delete hero/bullet/enemies
function deleComponent() {
    if(hero.destroy){
        life--;
        hero.destroy = false;
        if (life ===0){
        state = END;
        }else{
            hero = new Hero(HERO);
        }
    }
    for (let i = 0;i< hero.bulletList.length; i++){
        if(hero.bulletList[i].destroy || hero.bulletList[i].outOfBounds()){
            hero.bulletList.splice(i,1);
        }
    }
    for (let i = 0;i< enemies.length; i++){
        if(enemies[i].destroy ||enemies[i].outOfBounds()){
            enemies.splice(i,1);
        }
    }
}


// bind mouse move event with canvas
canvas.addEventListener("mousemove",(e) => {
    console.log(e.offsetX,e.offsetY);
    let x = e.offsetX;
    let y = e.offsetY;

    if (x>SPACE.width - hero.width/2){
        x = SPACE.width- hero.width/2;
    } else if(x< hero.width/2){
        x = hero.width/2;
    }

    if (y>SPACE.height- hero.height/2){
        y = SPACE.height - hero.height/2;
    } else if(y<hero.height/2){
        y = hero.height/2;
    }
    hero.x = x - hero.width/2;
    hero.y = y - hero.height/2;
});



//bind a click event with canvas
canvas.addEventListener("click",()=>{
    if (state === START) {
        state = STARTING;
    }
    if (state === RUNNING){
        state = PAUSE;
    }

    canvas.addEventListener("click",()=>{
    if (state === START) {
        state = STARTING;
    }else if (state === RUNNING){
        state = PAUSE;
    } else if (state === PAUSE) {
        state = RUNNING;
    }

})

})


bg.addEventListener("load",() => {
    setInterval(() =>{
        switch(state) {
            case START:
                console.log("Start");
                space.judge();
                space.paint(context);
                let start_x = (SPACE.width - startPic.naturalWidth)/2
                let start_y = (SPACE.height - startPic.naturalHeight)/2
                context.drawImage(startPic,start_x,start_y)
                break;
            case STARTING:
                console.log("Starting");
                space.judge();
                space.paint(context);
                loading.judge()
                loading.paint(context);
                break
            case RUNNING:
                console.log("Running");
                space.judge();
                space.paint(context);

                hero.judge();
                hero.paint(context);
                hero.shoot();

                createComponent();

                judgeComponent();
                deleComponent();
                paintComponent();


                checkHit();
                break
            case PAUSE:
                console.log("Pause")
                context.font = "48px";
                context.fillStyle = "#C8C8FF09";
                context.textAlign = "center";
                context.textBaseline = "middle"
                context.fillText("Click to Continue",SPACE.width/2,SPACE.height/2);
                break;
            case END:
                console.log("End")
                context.font = "48px";
                context.fillStyle = "#C8C8FF09";
                context.textAlign = "center";
                context.textBaseline = "middle"
                context.fillText("Game Over",SPACE.width/2,SPACE.height/2);
                break;
        }

    },10);
});


