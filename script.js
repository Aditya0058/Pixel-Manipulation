window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight

    const image1 = document.getElementById('image1');

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
        }
        init(){
            for(let i = 0; i<10; i++){
                this.particleArray.push(new Particle(this));
            }
            
        }
        draw(context){
            this.particleArray.forEach(particle => particle.draw(context))
        }
    }

    const effect  = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.draw(ctx);
    function animate(){

    }
    
});