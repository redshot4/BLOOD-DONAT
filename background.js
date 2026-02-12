document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-bg'; // Matches CSS ID
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 70; // Slightly increased count for a fuller look
    const connectionDistance = 160; 
    const mouseDistance = 220; 

    // 2. Resize Handling
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 3. Mouse Tracking
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // 4. Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.2; // Slightly faster for more energy
            this.vy = (Math.random() - 0.5) * 1.2;
            this.size = Math.random() * 2.5 + 1.5; // Slightly larger dots
            
            // UPDATED: Much brighter transparency (0.3 to 0.7 instead of 0.1 to 0.4)
            this.color = `rgba(230, 57, 70, ${Math.random() * 0.4 + 0.3})`; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse repulsion effect
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    // Push particles away gently
                    this.x -= forceDirectionX * force * 1.5; 
                    this.y -= forceDirectionY * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // 5. Animation Loop
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections between close particles
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // UPDATED: Brightness logic for lines
                    // Opacity is now much higher (multiplied by 0.4 instead of 0.15)
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(230, 57, 70, ${opacity * 0.4})`;
                    ctx.lineWidth = 1.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
});