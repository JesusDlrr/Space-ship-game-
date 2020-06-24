class Ship{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.x = x,
        this.y = y,
        this.angle = 0;
        this.momentum_angle = 0;
        this.acc = 0.1;
        this.spd = 0;
        this.vertices = [new vec2d(-10, 10), new vec2d(0, -15), new vec2d(10, 10), new vec2d(0, 5)];
        this.transform = this.vertices;
        this.final = [];
        this.shoot_time = 10;
        this.shoot_reload = 0;
        this.die = false;
        this.score = 0;
    }
    Update = function() {
        if(!this.die){
            if(controls[32]){
                if(this.shoot_reload <= 0){
                    this.Shoot();
                    this.shoot_reload = this.shoot_time;
                }
            }
            if(controls[38]){
                this.spd = this.spd >= 5 ? 5 : this.spd+this.acc;
                this.momentum_angle = this.angle;
            }
            if(controls[40]){
                this.spd = this.spd <= 0 ? 0 : this.spd-this.acc;
            }
            if(controls[37]){
                this.Rotate(-0.08);
            }
            if(controls[39]){
                this.Rotate(0.08);
            }
        }
        this.x = this.x + Math.cos(this.momentum_angle-(Math.PI/2))*this.spd;
        this.y = this.y + Math.sin(this.momentum_angle-(Math.PI/2))*this.spd;
        for(var i=0;i<this.vertices.length;i++){
            this.final[i] = new vec2d(
                this.vertices[i].x + this.transform[i].x,
                this.vertices[i].y + this.transform[i].y
            );
        }
        if(this.shoot_reload > 0){
            this.shoot_reload--;
        }
    }
    Draw = function(context) {
        Mesh(this.x, this.y, this.final, "white");

        if(!this.die){
            for(var i=0;i<asteroids.length;i++){
                if(Math.sqrt(Math.pow(this.x-asteroids[i].x, 2)+Math.pow(this.y-asteroids[i].y, 2)) < 130){
                    var audioElement = new Audio("die.wav");
                    audioElement.play();
                    // game_end = true;
                    this.die = true;
                    this.spd = 3;
                    sleep = 140;
                    console.log("oops")
                }
            }
        }
    }
    Shoot = function() {
        bullets.push(new Bullet(this.x, this.y, this.angle-(Math.PI/2)));
        // shot_audio.play();
        var audioElement = new Audio("shot.wav");
        audioElement.play();
    }
    Rotate(amt){
        // this.angle = 360+((this.angle+amt) % (360*2));
        this.angle = (Math.PI*2)+Math.abs(this.angle+amt) % (Math.PI*2);
        for(var i=0;i<this.vertices.length;i++){
        this.transform[i] =
            new vec2d(
                // this.vertices[i].x * Math.cos(DegToRad(amt)) - this.vertices[i].y * Math.sin(DegToRad(amt)),
                // this.vertices[i].x * Math.sin(DegToRad(amt)) + this.vertices[i].y * Math.cos(DegToRad(amt))
                this.vertices[i].x * Math.cos(amt) - this.vertices[i].y * Math.sin(amt),
                this.vertices[i].x * Math.sin(amt) + this.vertices[i].y * Math.cos(amt)
            );
        }
    }
};