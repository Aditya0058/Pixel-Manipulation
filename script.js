window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight

    const image1 = document.getElementById('image1');

    class Particle{
        constructor(){
            this.x = 100;
            this.y = 100;
            this.size = 100;
        }
        draw(){
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
        }
    }

    const particle1 = new Particle();
    particle1.draw();
    function animate(){

    }
    
});