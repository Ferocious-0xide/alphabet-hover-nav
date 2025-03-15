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
        textDecoration: 'none',
        fontFamily: 'monospace',
        fontSize: '1.5rem'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </a>
  );
};

const AlphabetHoverNav = () => {
  const navItems = ['Home', 'About', 'Projects', 'Contact', 'Blog'];
  
  return (
    <div style={{
      minHeight: '100vh', 
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <nav>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {navItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <AlphabetLink text={item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AlphabetHoverNav;