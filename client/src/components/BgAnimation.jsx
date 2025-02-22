import React, { useEffect } from "react";

const BgAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    let w, h;
    const particles = [];
    const properties = {
      bgColor: "rgba(17, 17, 23, 1)",
      particleColor: "rgba(150, 40, 255, 0.8)",
      particleRadius: 3,
      particleCount: 80,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6,
    };

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if (this.x + properties.particleRadius > w || this.x - properties.particleRadius < 0) {
          this.velocityX *= -1;
        }
        if (this.y + properties.particleRadius > h || this.y - properties.particleRadius < 0) {
          this.velocityY *= -1;
        }
        this.life--;
        if (this.life < 0) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.life = Math.random() * properties.particleLife * 60;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      for (let i in particles) {
        for (let j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(150, 40, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }

    function updateParticles() {
      for (let i in particles) {
        particles[i].position();
        particles[i].draw();
      }
    }

    function loop() {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h);
      updateParticles();
      drawLines();
      requestAnimationFrame(loop);
    }

    function init() {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    init();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="bgCanvas" className="fixed top-0 left-0 w-full h-full z-0"></canvas>;
};

export default BgAnimation;
