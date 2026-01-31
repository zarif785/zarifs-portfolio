import { useState, useRef, type MouseEvent } from 'react';
import './SkillCard.css';

interface SkillCardProps {
  name: string;
  level: number;
  icon: string;
  category: string;
}

const SkillCard = ({ name, level, icon, category }: SkillCardProps) => {
  const [transform, setTransform] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div 
      ref={cardRef}
      className="skill-card glass"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-icon">{icon}</div>
      <h3 className="skill-name">{name}</h3>
      <p className="skill-category">{category}</p>
      <div className="skill-progress">
        <div 
          className="skill-progress-bar"
          style={{ width: `${level}%` }}
        >
          <span className="skill-level">{level}%</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
