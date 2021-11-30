

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
