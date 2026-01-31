import { useState, useRef, type MouseEvent } from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
}

const ProjectCard = ({ title, description, image, tags, demoLink, githubLink }: ProjectCardProps) => {
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

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div 
      ref={cardRef}
      className="project-card"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
        <div className="project-overlay">
          <div className="project-links">
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                Live Demo
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
