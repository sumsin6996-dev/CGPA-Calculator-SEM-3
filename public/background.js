/**
 * Animated Starfield Background
 * Professional space-themed background with smooth animations
 * Optimized for 60fps performance using Canvas API
 */

class AnimatedStarfield {
    constructor(options = {}) {
        this.options = {
            starCount: options.starCount || 200,
            twinkleSpeed: options.twinkleSpeed || 0.02,
            driftSpeed: options.driftSpeed || 0.3,
            parallaxIntensity: options.parallaxIntensity || 0.02,
            zoomSpeed: options.zoomSpeed || 0.0005,
            zoomRange: options.zoomRange || 0.05,
            ...options
        };

        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        this.baseZoom = 1;
        this.animationId = null;

        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'starfield-canvas';
        this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background: linear-gradient(to bottom, #000000, #0a0a1a, #000000);
    `;
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.ctx = this.canvas.getContext('2d', { alpha: false });

        // Set canvas size
        this.resize();

        // Generate stars
        this.generateStars();

        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Start animation
        this.animate();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);

        // Regenerate stars on resize
        if (this.stars.length > 0) {
            this.generateStars();
        }
    }

    generateStars() {
        this.stars = [];
        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < this.options.starCount; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                baseSize: Math.random() * 2 + 0.5,
                brightness: Math.random(),
                twinkleOffset: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.5 + Math.random() * 1.5,
                driftX: (Math.random() - 0.5) * this.options.driftSpeed,
                driftY: (Math.random() - 0.5) * this.options.driftSpeed,
                depth: Math.random() * 0.5 + 0.5, // For parallax effect
                color: this.getStarColor()
            });
        }
    }

    getStarColor() {
        const colors = [
            'rgba(255, 255, 255, ',
            'rgba(200, 220, 255, ',
            'rgba(255, 240, 220, ',
            'rgba(220, 230, 255, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    handleMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    update() {
        this.time += 0.016; // Approximate 60fps time increment

        // Update zoom effect
        this.baseZoom = 1 + Math.sin(this.time * this.options.zoomSpeed) * this.options.zoomRange;

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.stars.forEach(star => {
            // Drift motion
            star.x += star.driftX;
            star.y += star.driftY;

            // Wrap around screen edges
            if (star.x < -10) star.x = width + 10;
            if (star.x > width + 10) star.x = -10;
            if (star.y < -10) star.y = height + 10;
            if (star.y > height + 10) star.y = -10;

            // Twinkling effect
            const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset);
            star.brightness = 0.3 + (twinkle + 1) * 0.35;

            // Size variation with twinkle
            star.size = star.baseSize * (0.8 + star.brightness * 0.4);
        });
    }

    draw() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Clear canvas with background gradient
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, width, height);

        // Calculate parallax offset
        const parallaxX = this.mouse.x * this.options.parallaxIntensity * 50;
        const parallaxY = this.mouse.y * this.options.parallaxIntensity * 50;

        // Draw stars
        this.stars.forEach(star => {
            // Apply parallax based on depth
            const px = star.x + parallaxX * star.depth;
            const py = star.y + parallaxY * star.depth;

            // Apply zoom from center
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = px - centerX;
            const dy = py - centerY;
            const zoomedX = centerX + dx * this.baseZoom;
            const zoomedY = centerY + dy * this.baseZoom;

            // Draw star with glow effect
            const gradient = this.ctx.createRadialGradient(
                zoomedX, zoomedY, 0,
                zoomedX, zoomedY, star.size * 3
            );

            gradient.addColorStop(0, star.color + star.brightness + ')');
            gradient.addColorStop(0.5, star.color + (star.brightness * 0.3) + ')');
            gradient.addColorStop(1, star.color + '0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(zoomedX, zoomedY, star.size * 3, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw bright core
            this.ctx.fillStyle = star.color + star.brightness + ')';
            this.ctx.beginPath();
            this.ctx.arc(zoomedX, zoomedY, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Add subtle nebula effect
        this.drawNebula();
    }

    drawNebula() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Create subtle moving nebula clouds
        const nebulaGradient = this.ctx.createRadialGradient(
            width * 0.3 + Math.sin(this.time * 0.1) * 100,
            height * 0.4 + Math.cos(this.time * 0.15) * 100,
            0,
            width * 0.3,
            height * 0.4,
            Math.max(width, height) * 0.6
        );

        nebulaGradient.addColorStop(0, 'rgba(20, 10, 40, 0.1)');
        nebulaGradient.addColorStop(0.5, 'rgba(10, 5, 30, 0.05)');
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = nebulaGradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    animate() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', () => this.resize());
        window.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.starfield = new AnimatedStarfield();
    });
} else {
    window.starfield = new AnimatedStarfield();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimatedStarfield;
}
