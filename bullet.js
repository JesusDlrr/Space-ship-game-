class Bullet{
    constructor(x, y, angle){
        // super(x, y);
        this.x = x;
        this.y = y;
        this.angle = angle
        this.speed = 19;
        this.index;
    }
    Update = function(){
        this.x += Math.cos(this.angle)*this.speed;
        this.y += Math.sin(this.angle)*this.speed;
    }
    Draw = function(context){
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            this.Destroy();
        }
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(this.x-2, this.y-2, 4, 4);
        ctx.fill();
    }
    Destroy = function(){
        this.index = bullets.indexOf(this);
        bullets.splice(this.index, 1);
    }
};