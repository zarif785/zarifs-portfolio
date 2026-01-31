import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  scale: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const hueRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 150;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      hue: Math.random() * 360,
      scale: 1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Increment global hue for rainbow effect
      hueRef.current = (hueRef.current + 0.5) % 360;

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction - repel and change color
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 150;
        
        if (distance < interactionRadius) {
          // Repel particles
          const angle = Math.atan2(dy, dx);
          const force = (interactionRadius - distance) / interactionRadius;
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;

          // Change to rainbow colors based on proximity
          const proximityFactor = 1 - (distance / interactionRadius);
          particle.hue = (hueRef.current + proximityFactor * 180) % 360;
          
          // Pop effect - scale up when cursor is near
          particle.scale = 1 + proximityFactor * 2;
          particle.opacity = 0.8 + proximityFactor * 0.2;
        } else {
          // Return to normal
          particle.scale = Math.max(1, particle.scale * 0.95);
          particle.opacity = Math.max(0.3, particle.opacity * 0.98);
          // Slowly return to original hue
          particle.hue = (particle.hue + 0.5) % 360;
        }

        // Dampen velocity
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle with RGB color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.scale, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Add glow effect when scaled
        if (particle.scale > 1.2) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsl(${particle.hue}, 80%, 60%)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.scale, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${particle.opacity * 0.5})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw connections with rainbow colors
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const avgHue = (particle.hue + otherParticle.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${avgHue}, 80%, 60%, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground;
