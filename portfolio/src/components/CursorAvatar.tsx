import { useState, useEffect, useRef } from 'react';
import './CursorAvatar.css';

const CursorAvatar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth follow animation
    const animate = () => {
      const dx = targetPosition.current.x - currentPosition.current.x;
      const dy = targetPosition.current.y - currentPosition.current.y;

      // Ease-out effect
      currentPosition.current.x += dx * 0.1;
      currentPosition.current.y += dy * 0.1;

      setPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Calculate rotation based on movement direction
  const getRotation = () => {
    const dx = targetPosition.current.x - currentPosition.current.x;
    return dx * 0.05; // Subtle tilt based on horizontal movement
  };

  return (
    <div
      ref={avatarRef}
      className={`cursor-avatar ${isVisible ? 'visible' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${getRotation()}deg)`,
      }}
    >
      <div className="avatar-container">
        {/* Outer glow ring */}
        <div className="avatar-ring"></div>
        
        {/* Main avatar circle */}
        <div className="avatar-face">
          {/* Eyes that follow cursor */}
          <div className="avatar-eyes">
            <div className="eye left-eye">
              <div className="pupil"></div>
            </div>
            <div className="eye right-eye">
              <div className="pupil"></div>
            </div>
          </div>
          
          {/* Smile */}
          <div className="avatar-mouth"></div>
        </div>

        {/* Floating particles around avatar */}
        <div className="avatar-particle particle-1"></div>
        <div className="avatar-particle particle-2"></div>
        <div className="avatar-particle particle-3"></div>
      </div>
    </div>
  );
};

export default CursorAvatar;
