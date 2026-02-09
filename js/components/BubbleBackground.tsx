import React, { useEffect, useRef } from 'react';

const BubbleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        let mouse = {
            x: -1000,
            y: -1000
        };

        const bubbles: {
            x: number;
            y: number;
            radius: number;
            dx: number;
            dy: number;
            opacity: number
        }[] = [];

        const numBubbles = 150; // Increased count for smaller bubbles

        for (let i = 0; i < numBubbles; i++) {
            bubbles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 6 + 2, // Small bubbles (2-8px)
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                opacity: Math.random() * 0.4 + 0.1
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Gradient Background (Dark Theme)
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#020617'); // Slate-950
            gradient.addColorStop(1, '#0f172a'); // Slate-900
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            bubbles.forEach(bubble => {
                // Base movement
                bubble.x += bubble.dx;
                bubble.y += bubble.dy;

                // Mouse interaction (Repulsion)
                const dx = mouse.x - bubble.x;
                const dy = mouse.y - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;

                    // Push away
                    const strength = 3;
                    bubble.x -= forceDirectionX * force * strength;
                    bubble.y -= forceDirectionY * force * strength;
                }

                // Bounce off walls
                if (bubble.x + bubble.radius > width || bubble.x - bubble.radius < 0) bubble.dx = -bubble.dx;
                if (bubble.y + bubble.radius > height || bubble.y - bubble.radius < 0) bubble.dy = -bubble.dy;

                // Draw Bubble
                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${bubble.opacity})`; // Cyan-500
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[0] pointer-events-none"
        />
    );
};

export default BubbleBackground;
