// src/components/AlphabetHoverNav.jsx
import React, { useState, useEffect } from 'react';

const AlphabetLink = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  
  // Animation settings
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const animationSpeed = 30; // milliseconds per letter change
  const characterDelay = 100; // delay between starting animation for each character
  
  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }
    
    const timers = [];
    
    // Animate each character
    for (let i = 0; i < text.length; i++) {
      // Skip spaces
      if (text[i] === ' ') continue;
      
      // Delay start for each character
      const delay = i * characterDelay;
      
      const timer1 = setTimeout(() => {
        let letterIndex = 0;
        
        const timer2 = setInterval(() => {
          setDisplayText(prevText => {
            const chars = prevText.split('');
            chars[i] = alphabet[letterIndex];
            return chars.join('');
          });
          
          letterIndex++;
          
          if (letterIndex >= alphabet.length) {
            clearInterval(timer2);
            setDisplayText(prevText => {
              const chars = prevText.split('');
              chars[i] = text[i];
              return chars.join('');
            });
          }
        }, animationSpeed);
        
        timers.push(timer2);
      }, delay);
      
      timers.push(timer1);
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isHovering, text]);
  
  return (
    <a 
      href="#" 
      style={{
        display: 'inline-block',
        padding: '0.5rem 1rem',
        color: 'white',
        transition: 'color 0.3s',
        textDecoration: 'none'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </a>
  );
};

const AlphabetHoverNav = () => {
  const [expansionLevel, setExpansionLevel] = useState(0);
  const [bgColor, setBgColor] = useState('rgb(0, 0, 0)'); // Black
  const [aiSuggestion, setAiSuggestion] = useState(null);
  
  // Update background color based on expansion level
  useEffect(() => {
    // Calculate shade of gray based on expansion level
    const grayValue = Math.min(50 * expansionLevel, 200);
    setBgColor(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
    
    // Simulated AI suggestion
    fetchAiSuggestion(expansionLevel);
  }, [expansionLevel]);
  
  // Simulated AI integration
  const fetchAiSuggestion = async (level) => {
    // Simulate a backend call
    setTimeout(() => {
      const suggestions = [
        "Try exploring the About section to learn more.",
        "Check out my latest Projects for examples of my work.",
        "Need to get in touch? Head to the Contact page.",
        "My Blog has thoughts on the latest tech trends."
      ];
      
      if (level > 0) {
        setAiSuggestion(suggestions[level - 1]);
      } else {
        setAiSuggestion(null);
      }
    }, 800);
  };
  
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 1000ms'
      }}
    >
      <button 
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: 'white',
          backgroundColor: 'rgb(59, 130, 246)',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => {
          setExpansionLevel((prev) => (prev < 4 ? prev + 1 : 0));
        }}
      >
        Expand Navigation
      </button>
      
      {/* Center navigation - Always visible */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
      }}>
        <AlphabetLink text="Home" />
      </div>
      
      {/* Top navigation - Level 1+ */}
      {expansionLevel >= 1 && (
        <div style={{
          position: 'absolute',
          top: '2rem',
          textAlign: 'center',
          zIndex: 5
        }}>
          <AlphabetLink text="About" />
        </div>
      )}
      
      {/* Right navigation - Level 2+ */}
      {expansionLevel >= 2 && (
        <div style={{
          position: 'absolute',
          right: '2rem',
          textAlign: 'center',
          zIndex: 5
        }}>
          <AlphabetLink text="Projects" />
        </div>
      )}
      
      {/* Bottom navigation - Level 3+ */}
      {expansionLevel >= 3 && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          textAlign: 'center',
          zIndex: 5
        }}>
          <AlphabetLink text="Contact" />
        </div>
      )}
      
      {/* Left navigation - Level 4+ */}
      {expansionLevel >= 4 && (
        <div style={{
          position: 'absolute',
          left: '2rem',
          textAlign: 'center',
          zIndex: 5
        }}>
          <AlphabetLink text="Blog" />
        </div>
      )}
      
      {/* AI Suggestion */}
      {aiSuggestion && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          color: 'white',
          padding: '1rem',
          borderRadius: '0.25rem',
          maxWidth: '20rem',
          zIndex: 20
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>AI Suggestion</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AlphabetHoverNav;