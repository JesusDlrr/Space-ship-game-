class Asteroid{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.hp = Math.round(this.size/4);
        this.speed = (0.5+Math.random())*size/20;
        this.angle = Math.random()*360;
        this.vertices = [];
        this.index = 0;
        for(var i=0;i<360;i+=(360/this.size)){
            this.vertices.push(new vec2d(
                (Math.cos(DegToRad(i)))*(this.size*(4+Math.random()*4)),
                (Math.sin(DegToRad(i)))*(this.size*(4+Math.random()*4)),
            ));
        }
    }
    Update = function(){
        this.x += Math.cos(DegToRad(this.angle))*this.speed;
        this.y += Math.sin(DegToRad(this.angle))*this.speed;
    }
    Draw = function(context) {
        for(var i=0;i<bullets.length;i++){
            if(Math.sqrt( Math.pow(this.x-bullets[i].x, 2)+Math.pow(this.y-bullets[i].y, 2)) < this.size*6){
                bullets[i].Destroy();
                if(this.hp <= 0){
                    var audioElement = new Audio("destroy.wav");
                    player.score += 10;
                    audioElement.play();
                    this.index = asteroids.indexOf(this);
                    asteroids.splice(this.index, 1);
                    if(this.size > 19){
                        for(i=0;i<2+(Math.random()*4);i++){
                            asteroids.push(new Asteroid(this.x, this.y, this.size/2+(Math.random()*4)));
                        }
                    }
                }else{
                    this.hp--;
                }
                var audioElement = new Audio("hit.wav");
                audioElement.play();
                break;
            }
        }
        Mesh(this.x, this.y, this.vertices, "red");
    }
};