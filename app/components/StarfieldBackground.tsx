'use client';

import { useEffect } from 'react';

export default function StarfieldBackground() {
    useEffect(() => {
        // AnimatedStarfield class
        class AnimatedStarfield {
            canvas: HTMLCanvasElement | null = null;
            ctx: CanvasRenderingContext2D | null = null;
            stars: any[] = [];
            mouse = { x: 0, y: 0 };
            time = 0;
            baseZoom = 1;
            animationId: number | null = null;
            options: any;

            constructor(options: any = {}) {
                this.options = {
                    starCount: options.starCount || 200,
                    twinkleSpeed: options.twinkleSpeed || 0.02,
                    driftSpeed: options.driftSpeed || 0.3,
                    parallaxIntensity: options.parallaxIntensity || 0.02,
                    zoomSpeed: options.zoomSpeed || 0.0005,
                    zoomRange: options.zoomRange || 0.05,
                    ...options
                };

                this.init();
            }

            init() {
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
          pointer-events: none;
        `;
                document.body.insertBefore(this.canvas, document.body.firstChild);

                this.ctx = this.canvas.getContext('2d', { alpha: false });

                this.resize();
                this.generateStars();

                window.addEventListener('resize', () => this.resize());
                window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

                this.animate();
            }

            resize() {
                if (!this.canvas || !this.ctx) return;
                const dpr = window.devicePixelRatio || 1;
                this.canvas.width = window.innerWidth * dpr;
                this.canvas.height = window.innerHeight * dpr;
                this.ctx.scale(dpr, dpr);

                if (this.stars.length > 0) {
                    this.generateStars();
                }
            }

            generateStars() {
                this.stars = [];
                const width = window.innerWidth;
                const height = window.innerHeight;

                for (let i = 0; i < this.options.starCount; i++) {
                    // Increased base size for clearer, more visible stars
                    const baseSize = Math.random() * 3 + 1.5; // Larger stars (1.5-4.5 instead of 0.5-2.5)
                    this.stars.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: baseSize,
                        baseSize: baseSize,
                        brightness: 0.7 + Math.random() * 0.3, // Higher minimum brightness (0.7-1.0)
                        twinkleOffset: Math.random() * Math.PI * 2,
                        twinkleSpeed: 0.5 + Math.random() * 1.5,
                        driftX: (Math.random() - 0.5) * this.options.driftSpeed,
                        driftY: (Math.random() - 0.5) * this.options.driftSpeed,
                        depth: Math.random() * 0.5 + 0.5,
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

            handleMouseMove(e: MouseEvent) {
                this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
            }

            update() {
                this.time += 0.016;
                this.baseZoom = 1 + Math.sin(this.time * this.options.zoomSpeed) * this.options.zoomRange;

                const width = window.innerWidth;
                const height = window.innerHeight;

                this.stars.forEach(star => {
                    star.x += star.driftX;
                    star.y += star.driftY;

                    if (star.x < -10) star.x = width + 10;
                    if (star.x > width + 10) star.x = -10;
                    if (star.y < -10) star.y = height + 10;
                    if (star.y > height + 10) star.y = -10;

                    // Enhanced twinkling with higher minimum brightness
                    const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinkleOffset);
                    star.brightness = 0.6 + (twinkle + 1) * 0.2; // Range: 0.6-1.0 (brighter overall)
                    star.size = star.baseSize * (0.9 + star.brightness * 0.2); // Less size variation
                });
            }

            draw() {
                if (!this.ctx) return;

                const width = window.innerWidth;
                const height = window.innerHeight;

                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(0, 0, width, height);

                const parallaxX = this.mouse.x * this.options.parallaxIntensity * 50;
                const parallaxY = this.mouse.y * this.options.parallaxIntensity * 50;

                this.stars.forEach(star => {
                    const px = star.x + parallaxX * star.depth;
                    const py = star.y + parallaxY * star.depth;

                    const centerX = width / 2;
                    const centerY = height / 2;
                    const dx = px - centerX;
                    const dy = py - centerY;
                    const zoomedX = centerX + dx * this.baseZoom;
                    const zoomedY = centerY + dy * this.baseZoom;

                    // Reduced glow radius for sharper stars
                    const glowRadius = star.size * 2; // Reduced from 3x to 2x
                    const gradient = this.ctx!.createRadialGradient(
                        zoomedX, zoomedY, 0,
                        zoomedX, zoomedY, glowRadius
                    );

                    gradient.addColorStop(0, star.color + star.brightness + ')');
                    gradient.addColorStop(0.4, star.color + (star.brightness * 0.5) + ')'); // Sharper falloff
                    gradient.addColorStop(1, star.color + '0)');

                    this.ctx!.fillStyle = gradient;
                    this.ctx!.beginPath();
                    this.ctx!.arc(zoomedX, zoomedY, glowRadius, 0, Math.PI * 2);
                    this.ctx!.fill();

                    // Brighter, larger core for clearer visibility
                    this.ctx!.fillStyle = star.color + '1)'; // Full brightness core
                    this.ctx!.beginPath();
                    this.ctx!.arc(zoomedX, zoomedY, star.size * 0.8, 0, Math.PI * 2);
                    this.ctx!.fill();
                });

                this.drawNebula();
            }

            drawNebula() {
                if (!this.ctx) return;

                const width = window.innerWidth;
                const height = window.innerHeight;

                // Reduced nebula opacity for clearer background
                const nebulaGradient = this.ctx.createRadialGradient(
                    width * 0.3 + Math.sin(this.time * 0.1) * 100,
                    height * 0.4 + Math.cos(this.time * 0.15) * 100,
                    0,
                    width * 0.3,
                    height * 0.4,
                    Math.max(width, height) * 0.6
                );

                nebulaGradient.addColorStop(0, 'rgba(20, 10, 40, 0.05)'); // Reduced from 0.1
                nebulaGradient.addColorStop(0.5, 'rgba(10, 5, 30, 0.02)'); // Reduced from 0.05
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

        // Initialize starfield with enhanced clarity settings
        const starfield = new AnimatedStarfield({
            starCount: 200,
            twinkleSpeed: 0.02,
            driftSpeed: 0.3,
            parallaxIntensity: 0.02,
            zoomSpeed: 0.0005,
            zoomRange: 0.05
        });

        // Cleanup on unmount
        return () => {
            starfield.destroy();
        };
    }, []);

    return null;
}
