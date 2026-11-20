// 37:06  - https://youtu.be/vAJEHf92tV0?si=33Fva7qMgvXuOS1C

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    
    // custom image
    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("image2");
    imageInput.addEventListener("change", function(event){
        const file = event.target.files[0];
        if(!file) return;
    
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            preview.src = dataUrl;
            console.log(dataUrl);
            preview.onload = () => {
            effect.init(ctx);   // rebuild particles from the new image
            };
        };
    
        reader.readAsDataURL(file);
    })
    

    class Particle{
        constructor(effect, x, y, color){
            this.effect = effect;
            this.size = 3;
            this.x = Math.random() * (this.effect.width);
            this.y = Math.random() * (this.effect.height);
            // this.x = Math.random() * this.effect.width;
            // this.y = Math.random() * this.effect.height;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.05;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0; 
            this.force = 0; 
            this.friction = 0.95;
            this.angle = 0;
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = (this.dx * this.dx)+(this.dy * this.dy);
            this.force = -this.effect.mouse.radius / this.distance;

            if(this.distance<this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle); 
                this.vy += this.force * Math.sin(this.angle); 
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        warp(){
            this.x = Math.random() * (this.effect.width);
            this.y = Math.random() * (this.effect.height);
        }
    }
    class Effect{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particleArray = [];
            this.image = document.getElementById('image2');
            this.centerX = this.width/2;
            this.centerY = this.height/2;
            this.gap = 4; 
            this.mouse = {
                radius: 3000,
                x: undefined, 
                y: undefined
            }
            window.addEventListener("mousemove", event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
        }
        init(context) {
        this.particleArray = [];
        if (!this.image.naturalWidth) return;

        // true aspect ratio from the decoded file
        const imageWidth  = 400;
        const imageHeight = this.image.naturalHeight * (imageWidth / this.image.naturalWidth);

        // top-left corner that makes the image centered on the canvas
        const drawX = this.centerX - imageWidth  / 2;
        const drawY = this.centerY - imageHeight / 2;

        context.clearRect(0, 0, this.width, this.height);
        context.drawImage(this.image, drawX, drawY, imageWidth, imageHeight);

        // read from (0,0) so the loop coordinates match the canvas exactly
        const pixels = context.getImageData(0, 0, this.width, this.height).data;

        for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
            const index = (y * this.width + x) * 4;
            const red   = pixels[index];
            const green = pixels[index + 1];
            const blue  = pixels[index + 2];
            const alpha = pixels[index + 3];

            if (alpha > 0) {
                this.particleArray.push(
                new Particle(this, x, y, `rgb(${red},${green},${blue})`)
                );
            }
            }
        }
        }
        draw(context){
            this.particleArray.forEach(particle => particle.draw(context));
        }
        update(){
            
            this.particleArray.forEach(particle => particle.update());
        }
        warp(){
            this.particleArray.forEach(particle => particle.warp());
        }
    }

    const effect  = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    console.log(effect);
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();

    // warp btn
    const warpBtn = document.getElementById('warp-btn');
    warpBtn.addEventListener("click", function(){
        effect.warp();
    })

});