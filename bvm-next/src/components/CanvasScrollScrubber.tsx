"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CanvasScrollScrubber = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        // Resize canvas to match screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(progress);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // GSAP ScrollTrigger for Scrubbing
        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: '+=3000', // Scroll for 3000px
            pin: true,
            scrub: 1, // Smooth scrubbing
            onUpdate: (self) => {
                setProgress(self.progress);
                drawFrame(self.progress);
            }
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            st.kill();
        };
    }, []);

    // Procedural Drawing Logic (Abstract Form-Fill-Seal)
    const drawFrame = (p: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;

        // Clear background
        ctx.clearRect(0, 0, w, h);

        // Center coordinates
        const cx = w / 2;
        const cy = h / 2;

        // BVM Colors
        const colorNavy = '#091122';
        const colorBlue = '#00A9E2';
        const colorWhite = '#FFFFFF';

        ctx.save();

        // Background Gradient based on progress
        const bgGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        bgGrd.addColorStop(0, `rgba(0, 169, 226, ${0.05 + p * 0.1})`);
        bgGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = bgGrd;
        ctx.fillRect(0, 0, w, h);

        // Common styling
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Phase 1: FORM (0.0 - 0.33)
        // Abstract polymer extrusion
        const formProgress = Math.min(Math.max(p / 0.33, 0), 1);

        // Phase 2: FILL (0.33 - 0.66)
        // Abstract liquid filling
        const fillProgress = Math.min(Math.max((p - 0.33) / 0.33, 0), 1);

        // Phase 3: SEAL (0.66 - 1.0)
        // Abstract sealing matrix
        const sealProgress = Math.min(Math.max((p - 0.66) / 0.34, 0), 1);

        // Draw the "Bottle/Ampoule" wireframe
        const boxW = Math.min(w * 0.2, 200);
        const boxH = Math.min(h * 0.5, 400);
        const boxX = cx - boxW / 2;
        const boxY = cy - boxH / 2;

        // Extrusion effect (Forming)
        if (formProgress > 0) {
            const curHeight = boxH * formProgress;
            const curY = boxY + boxH - curHeight;

            ctx.beginPath();
            ctx.rect(boxX, curY, boxW, curHeight);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + formProgress * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Glowing extrusion ring
            const ringY = curY;
            ctx.beginPath();
            ctx.ellipse(cx, ringY, boxW / 2 + 20, 10, 0, 0, Math.PI * 2);
            ctx.strokeStyle = colorBlue;
            ctx.shadowColor = colorBlue;
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Liquid effect (Filling)
        if (fillProgress > 0) {
            const liquidH = (boxH - 20) * fillProgress;
            const liquidY = boxY + boxH - liquidH;

            ctx.beginPath();
            ctx.rect(boxX + 10, liquidY, boxW - 20, liquidH);

            const liqGrd = ctx.createLinearGradient(0, liquidY, 0, boxY + boxH);
            liqGrd.addColorStop(0, 'rgba(0, 169, 226, 0.8)');
            liqGrd.addColorStop(1, 'rgba(0, 169, 226, 0.2)');
            ctx.fillStyle = liqGrd;
            ctx.fill();

            // Droplet
            if (fillProgress < 0.95) {
                const dropY = Math.max(boxY - 100 + (fillProgress * 200) % 150, boxY - 100);
                ctx.beginPath();
                ctx.arc(cx, dropY, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = colorBlue;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Sealing effect (Sealing)
        if (sealProgress > 0) {
            const clampDist = (boxW * 1.5) * (1 - sealProgress);

            // Left Clamp
            ctx.beginPath();
            ctx.rect(cx - clampDist - 60, boxY - 20, 50, 40);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + sealProgress * 0.5})`;
            ctx.fill();

            // Right Clamp
            ctx.beginPath();
            ctx.rect(cx + clampDist + 10, boxY - 20, 50, 40);
            ctx.fill();

            if (sealProgress > 0.8) {
                // Spark / Weld flash
                ctx.beginPath();
                ctx.arc(cx, boxY, 15 + Math.random() * 10, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = colorBlue;
                ctx.shadowBlur = 30;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Typography Overlay on Canvas
        ctx.textAlign = 'center';

        if (p < 0.33) {
            ctx.font = 'bold 48px Inter, sans-serif';
            ctx.fillStyle = colorWhite;
            ctx.globalAlpha = Math.sin(p * Math.PI / 0.33); // Fade in/out
            ctx.fillText('FORM.', cx, cy - boxH / 2 - 100);
            ctx.font = '18px Inter, sans-serif';
            ctx.fillStyle = colorBlue;
            ctx.fillText('Polymer Extrusion & Molding', cx, cy - boxH / 2 - 60);
        } else if (p < 0.66) {
            ctx.font = 'bold 48px Inter, sans-serif';
            ctx.fillStyle = colorWhite;
            ctx.globalAlpha = Math.sin((p - 0.33) * Math.PI / 0.33);
            ctx.fillText('FILL.', cx, cy - boxH / 2 - 100);
            ctx.font = '18px Inter, sans-serif';
            ctx.fillStyle = colorBlue;
            ctx.fillText('Precision Aseptic Dosing', cx, cy - boxH / 2 - 60);
        } else {
            ctx.font = 'bold 48px Inter, sans-serif';
            ctx.fillStyle = colorWhite;
            ctx.globalAlpha = Math.sin((p - 0.66) * Math.PI / 0.34);
            ctx.fillText('SEAL.', cx, cy - boxH / 2 - 100);
            ctx.font = '18px Inter, sans-serif';
            ctx.fillStyle = colorBlue;
            ctx.fillText('Hermetic Thermal Closure', cx, cy - boxH / 2 - 60);
        }

        ctx.globalAlpha = 1;

        // Draw UI HUD elements
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.textAlign = 'left';
        ctx.fillText(`SEQ_PROG: ${(p * 100).toFixed(1)}%`, 40, 40);
        ctx.fillText(`SYS_TEMP: ${(20 + formProgress * 180 - sealProgress * 150).toFixed(1)} C`, 40, 60);
        ctx.fillText(`VOL_DOS: ${(fillProgress * 500).toFixed(1)} ML`, 40, 80);

        ctx.restore();
    };

    // Initial draw
    useEffect(() => {
        drawFrame(progress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-bvm-navy border-y border-white/5 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            {/* Subtle foreground UI to invite scrolling */}
            {progress < 0.05 && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-bvm-gray text-sm tracking-widest uppercase animate-pulse flex flex-col items-center">
                    <span>Scroll to Analyze Sequence</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-bvm-blue to-transparent mt-2" />
                </div>
            )}
        </div>
    );
};

export default CanvasScrollScrubber;
