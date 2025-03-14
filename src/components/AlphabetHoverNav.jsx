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
  const [userInteractions, setUserInteractions] = useState([]);
  
  // Define navigation items for each level
  const navLevels = [
    ['Home'], // Level 0
    ['Home', 'About'], // Level 1: Top expansion
    ['Home', 'About', 'Projects'], // Level 2: Right expansion
    ['Home', 'About', 'Projects', 'Contact'], // Level 3: Bottom expansion
    ['Blog', 'Home', 'About', 'Projects', 'Contact'] // Level 4: Left expansion
  ];
  
  // Navigation positions
  const navPositions = [
    'center center', // Level 0: Centered
    'center flex-start', // Level 1: Top added
    'flex-end center', // Level 2: Right added
    'center flex-end', // Level 3: Bottom added
    'flex-start center' // Level 4: Left added
  ];
  
  // Update background color based on expansion level
  useEffect(() => {
    // Calculate shade of gray based on expansion level
    const grayValue = Math.min(50 * expansionLevel, 200);
    setBgColor(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
    
    // Simulated AI fetch when navigation expands
    fetchAiSuggestion(expansionLevel);
  }, [expansionLevel]);
  
  // Simulated AI integration
  const fetchAiSuggestion = async (level) => {
    // This would connect to your backend in a real implementation
    // For now we'll simulate a response
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
  
  // Track user interactions (would be used with real AI)
  const trackInteraction = (action) => {
    const newInteraction = {
      action,
      timestamp: new Date().toISOString()
    };
    
    setUserInteractions(prev => [...prev, newInteraction]);
  };
  
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: bgColor,
        display: 'flex',
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
          cursor: 'pointer'
        }}
        onClick={() => {
          setExpansionLevel((prev) => (prev < 4 ? prev + 1 : 0));
          trackInteraction('expanded_navigation');
        }}
      >
        Expand Navigation
      </button>
      
      <nav style={{
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: 'monospace',
        display: 'flex',
        flex: 1,
        justifyContent: navPositions[expansionLevel].split(' ')[0],
        alignItems: navPositions[expansionLevel].split(' ')[1],
        padding: '1rem'
      }}>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {navLevels[expansionLevel].map((item, index) => (
            <li key={index} style={{ marginBottom: '1.5rem' }}>
              <AlphabetLink 
                text={item} 
                onClick={() => trackInteraction(`clicked_${item.toLowerCase()}`)}
              />
            </li>
          ))}
        </ul>
      </nav>
      
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
          maxWidth: '20rem'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>AI Suggestion</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AlphabetHoverNav;