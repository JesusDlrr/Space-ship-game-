// var vec3d = function(x, y, z){
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     return this;
// }

var game_end = false;

// var control_flags = 0x0;
var controls = {32:false, 37:false, 38:false, 39:false, 40:false};

var bullets = [];
var asteroids = [];
var time = 60;
var sleep = 16;

var shot_audio = document.getElementById("shot_audio")
// var bullet_mesh = [new vec2d(-75, 50), new vec2d(0, -100), new vec2d(75, 50), new vec2d(0, 20)];

var vec2d = function(x, y){
    this.x = x;
    this.y = y;
    return this;
};

class Ntt{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.speed = 0;
    }
}





// var bullet = function(x, y, angle){
//     this.x = x;
//     this.y = y;
//     this.angle = angle;
// }
//var bullet = new ntt(300, 300);








var canvas = document.getElementById("mcanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var player = new Ship(canvas.width/2, canvas.height/2);

// ctx.imageSmoothingEnabled = true;
// ctx.moveTo(0, 0);
// ctx.lineTo(400, 400);
// ctx.stroke(); 
// Clear();

// WirePointsOf(player.x, player.y, player.vertices);

function Mesh(x, y, vertices, colour){
    ctx.strokeStyle = colour;
    for(var i=0;i<vertices.length;i++){
        ctx.beginPath();
        ctx.moveTo(x+vertices[i].x, y+vertices[i].y);
        ctx.lineTo(x+vertices[(i+1)%vertices.length].x, y+vertices[(i+1)%vertices.length].y);
        // ctx.closePath();
        ctx.stroke();
    }
    // ctx.fillStyle = "green";
    // ctx.beginPath();
    // ctx.rect(x-2, y-2, 4, 4);
    // ctx.fill();
    // context.closePath();
}

// function WirePointsOf(x, y, vertices){
//     ctx.strokeStyle = "red";
//     for(var i=0;i<vertices.length;i++){
//         ctx.beginPath();
//         ctx.moveTo(x+vertices[i].x, y+vertices[i].y);
//         ctx.lineTo(x+vertices[(i+1)%vertices.length].x, y+vertices[(i+1)%vertices.length].y);
//         // ctx.closePath();
//         ctx.stroke();
//     }
//     // ctx.fillStyle = "green";
//     // ctx.beginPath();
//     // ctx.rect(x-2, y-2, 4, 4);
//     // ctx.fill();
//     // context.closePath();
// }

function Clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    // ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(canvas.width/2, canvas.height);
    ctx.lineTo(canvas.width/2, 0)
    ctx.stroke();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
}

document.onkeydown = function(e){
    if(e.keyCode in controls){
        controls[e.keyCode] = true;
    }
}
document.onkeyup = function(e){
    if(e.keyCode in controls){
        controls[e.keyCode] = false;
    }
}

/*function BindControls(){
    // console.log(controls);
    if((control_flags & 0b0010) >> 1){
        player.y += 1;
    }
    if((control_flags & 0b0100) >> 2){
        RotateShip(-0.08);
    }
    if((control_flags & 0b1000) >> 3){
        RotateShip(0.08);
    }
}*/

function BindControls(){

}

function RotateShip(angle_amt){

}


    // new_bullet.angle = player.angle-(Math.PI/2);
    // new_bullet.speed = 12;
    // bullets.push(new_bullet);

    

    //var audio = new Audio('show.mp3');
    // audio.type = 'audio/mp3';
    // audio.play();
// }

function DegToRad(x){
    return x*(Math.PI/180);
}

// function MatrixAdd(a, b){
//     for(var i=0;i<1;this.vertices.length++){
//         this.final[i] = new vec2d(
//             this.vertices[i].x + this.transform[i].x,
//             this.vertices[i].y + this.transform[i].y
//         );
//     }
// }

GameLoop();
function GameLoop(){
    if(!game_end){
        setTimeout(function(){
            Clear();
            // BindControls();
            // WirePointsOf(player.x , player.y, player.transform);

            player.Update();
            player.Draw(ctx);

            for(var i=0;i<bullets.length;i++){
                bullets[i].Update();
                bullets[i].Draw(ctx);
            }
            for(var i=0;i<asteroids.length;i++){
                asteroids[i].Update();
                asteroids[i].Draw(ctx);
            }
            ctx.fillStyle = "white";
            ctx.font = "bold 16px Arial";
            ctx.fillText("SCORE: " + player.score, 10, 25);

            if(time <= 0){
                asteroids.push(new Asteroid(Math.random()*canvas.width, Math.random()*canvas.height, 20));
                time = 60;
            }else{
                time--;
            }

            GameLoop();
        }, sleep);
        
    }
}