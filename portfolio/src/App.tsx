import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import ParticleBackground from './components/ParticleBackground';
import ScrollReveal from './components/ScrollReveal';
import RobotAvatar from './components/RobotAvatar';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'React', level: 95, icon: '⚛️', category: 'Frontend' },
    { name: 'TypeScript', level: 90, icon: '📘', category: 'Language' },
    { name: 'Node.js', level: 88, icon: '🟢', category: 'Backend' },
    { name: 'Python', level: 85, icon: '🐍', category: 'Language' },
    { name: 'AWS', level: 80, icon: '☁️', category: 'Cloud' },
    { name: 'Docker', level: 82, icon: '🐳', category: 'DevOps' },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with cart, checkout, and payment integration. Built with React, Node.js, and Stripe.',
      image: '/project1.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive charts and data visualization. Features include custom reports and export functionality.',
      image: '/project2.png',
      tags: ['React', 'D3.js', 'TypeScript', 'Firebase'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      title: 'Social Media App',
      description: 'Mobile-first social media application with real-time messaging, posts, and user profiles. Includes authentication and cloud storage.',
      image: '/project3.png',
      tags: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
      demoLink: '#',
      githubLink: '#',
    },
  ];

  return (
    <>
      <ParticleBackground />
      <RobotAvatar />
      <Navigation activeSection={activeSection} />
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">
              <span className="gradient-text">Zarif Arefeen</span>
            </h1>
            <h2 className="hero-title">
              {typedText}
              <span className="cursor">|</span>
            </h2>
            <p className="hero-description">
              I craft beautiful, functional, and user-centric digital experiences.
              Passionate about building innovative solutions that make a difference.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="anime-character-container">
              <img 
                src="/anime-hero.png" 
                alt="Anime Developer Character" 
                className="anime-character"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
          </ScrollReveal>
          <div className="about-content">
            <ScrollReveal delay={200}>
              <div className="about-text">
                <p>
                  I'm a passionate developer with a keen eye for design and a love for creating 
                  seamless user experiences. With years of experience in full-stack development, 
                  I specialize in building modern web applications that are both beautiful and functional.
                </p>
                <p>
                  My journey in tech started with a curiosity about how things work, and has evolved 
                  into a career dedicated to solving complex problems with elegant solutions. I believe 
                  in writing clean, maintainable code and staying up-to-date with the latest technologies.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400} direction="left">
              <div className="about-stats">
                <div className="stat-card glass">
                  <h3 className="stat-number gradient-text">5+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
                <div className="stat-card glass">
                  <h3 className="stat-number gradient-text">50+</h3>
                  <p className="stat-label">Projects Completed</p>
                </div>
                <div className="stat-card glass">
                  <h3 className="stat-number gradient-text">30+</h3>
                  <p className="stat-label">Happy Clients</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="section-subtitle">
              Technologies and tools I work with to bring ideas to life
            </p>
          </ScrollReveal>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <SkillCard {...skill} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">
              A showcase of my recent work and side projects
            </p>
          </ScrollReveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 150} direction="fade">
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle">
              Have a project in mind? Let's work together!
            </p>
          </ScrollReveal>
          <div className="contact-content">
            <ScrollReveal delay={200}>
              <form className="contact-form glass">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your.email@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} placeholder="Your message..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Send Message
                </button>
              </form>
            </ScrollReveal>
            <ScrollReveal delay={400} direction="left">
              <div className="contact-info">
                <div className="contact-card glass">
                  <div className="contact-icon">📧</div>
                  <h3>Email</h3>
                  <p>your.email@example.com</p>
                </div>
                <div className="contact-card glass">
                  <div className="contact-icon">📱</div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-card glass">
                  <div className="contact-icon">📍</div>
                  <h3>Location</h3>
                  <p>San Francisco, CA</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2026 Your Name. All rights reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub">GitHub</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
