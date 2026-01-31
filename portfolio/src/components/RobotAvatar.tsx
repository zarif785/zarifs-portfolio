import { useState, useEffect, useRef } from 'react';
import './RobotAvatar.css';

const RobotAvatar = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const shownMessagesRef = useRef<Set<string>>(new Set());
  const fadeTimerRef = useRef<number | null>(null);

  const allMessages = [
    "Hey there! 👋 I'm your friendly AI assistant!",
    "Fun fact: I never sleep... perks of being a robot! 😴",
    "Beep boop! 🤖 I run on coffee... wait, no, electricity!",
    "This human codes better than some AIs I know! 🧠",
    "Warning: Skill levels may cause jealousy! 📊",
    "I wish I could learn this fast! 🚀",
    "Now THIS is where the magic happens! ✨",
    "10/10 would deploy again! 🚀",
    "These projects are fire! 🔥 (Don't worry, I have a fire extinguisher)",
    "Psst... they're really nice, promise! 💌",
    "Slide into those DMs! 📧",
    "I'll put in a good word for you! 🤝",
    "Did you know? This portfolio was built with React! ⚛️",
    "My eyes follow your cursor... creepy or cool? 👀",
    "I'm basically a digital pet. Feed me clicks! 🐾",
    "Plot twist: I'm actually sentient! Just kidding... or am I? 🤔",
    "These particles are my friends! Say hi! ✨",
    "I've been watching you scroll... in a non-creepy way! 📜",
    "Click me again! I have more wisdom to share! 🧙‍♂️",
    "My favorite color is #667eea. What's yours? 🎨"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const robotX = window.innerWidth - 120;
      const robotY = window.innerHeight - 120;

      const dx = e.clientX - robotX;
      const dy = e.clientY - robotY;

      const maxDistance = 8;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const limitedDistance = Math.min(distance / 50, maxDistance);

      const angle = Math.atan2(dy, dx);
      const eyeX = Math.cos(angle) * limitedDistance;
      const eyeY = Math.sin(angle) * limitedDistance;

      setEyePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getRandomMessage = () => {
    // If all messages have been shown, reset the set
    if (shownMessagesRef.current.size >= allMessages.length) {
      shownMessagesRef.current.clear();
    }

    // Get messages that haven't been shown yet
    const availableMessages = allMessages.filter(
      msg => !shownMessagesRef.current.has(msg)
    );

    // Pick a random message from available ones
    const randomMessage = availableMessages[
      Math.floor(Math.random() * availableMessages.length)
    ];

    // Mark this message as shown
    shownMessagesRef.current.add(randomMessage);

    return randomMessage;
  };

  const handleRobotClick = () => {
    // Hide prompt after first click
    if (showPrompt) {
      setShowPrompt(false);
    }

    // Clear any existing fade timer
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
    }

    // Get and show a new random message
    const newMessage = getRandomMessage();
    setMessage(newMessage);
    setShowBubble(true);

    // Set timer to fade out after 5 seconds
    fadeTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 5000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="robot-avatar">
      {showPrompt && !showBubble && (
        <div className="click-prompt">
          Click me! 👆
        </div>
      )}

      {showBubble && (
        <div className="speech-bubble">
          {message}
        </div>
      )}
      
      <div 
        className="robot-container"
        onClick={handleRobotClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Robot Head */}
        <div className="robot-head">
          {/* Antenna */}
          <div className="robot-antenna">
            <div className="antenna-ball"></div>
          </div>

          {/* Eyes */}
          <div className="robot-eyes">
            <div className="robot-eye left-eye">
              <div 
                className="robot-pupil"
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                }}
              ></div>
            </div>
            <div className="robot-eye right-eye">
              <div 
                className="robot-pupil"
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                }}
              ></div>
            </div>
          </div>

          {/* Mouth/Display */}
          <div className="robot-mouth">
            <div className="mouth-line"></div>
            <div className="mouth-line"></div>
            <div className="mouth-line"></div>
          </div>
        </div>

        {/* Robot Body */}
        <div className="robot-body">
          <div className="robot-screen">
            <span className="screen-text">AI</span>
          </div>
          <div className="robot-lights">
            <div className="light light-1"></div>
            <div className="light light-2"></div>
            <div className="light light-3"></div>
          </div>
        </div>

        {/* Robot Base */}
        <div className="robot-base"></div>
      </div>
    </div>
  );
};

export default RobotAvatar;
