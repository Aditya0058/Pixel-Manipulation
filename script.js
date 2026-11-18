// 37:06  - https://youtu.be/vAJEHf92tV0?si=33Fva7qMgvXuOS1C

let particleNumber = 1000;
let particleSize = 15;

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    

    class Particle{
        constructor(effect){
            this.effect = effect;
            this.size = 10;
            this.x = Math.random() * (this.effect.width - this.size);
            this.y = Math.random() * (this.effect.height - this.size);
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
        }
        draw(context){
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particleArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width/2;
            this.centerY = this.height/2;
            this.x = this.centerX - this.image.width/2;
            this.y = this.centerY - this.image.height/2;
        }
        init(context){
            context.drawImage(this.image, this.x, this.y)
            const pixels = context.getImageData(0, 0, this.width, this.height)
            console.log(pixels)
        }
        draw(context){
            this.particleArray.forEach(particle => particle.draw(context));
        }
        update(){
            
            this.particleArray.forEach(particle => particle.update());
        }
    }

    const effect  = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    // animate();
});