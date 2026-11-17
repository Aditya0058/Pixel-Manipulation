window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight

    

    class Particle{
        constructor(effect){
            this.effect = effect;
            this.size = 100;
            this.x = Math.random() * (this.effect.width - this.size);
            this.y = Math.random() * (this.effect.height - this.size);
        }
        draw(context){
            context.fillRect(this.x, this.y, this.size, this.size);
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
        init(){
            for(let i = 0; i<10; i++){
                this.particleArray.push(new Particle(this));
            }
            
        }
        draw(context){
            this.particleArray.forEach(particle => particle.draw(context));
            context.drawImage(this.image, this.x, this.y)
        }
    }

    const effect  = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.draw(ctx);
    function animate(){

    }
    
});