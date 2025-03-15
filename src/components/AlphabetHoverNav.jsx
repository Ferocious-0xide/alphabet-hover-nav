// src/components/AlphabetHoverNav.jsx
import React, { useState, useEffect, useRef } from 'react';

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
  const containerRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [bgColor, setBgColor] = useState('rgb(0, 0, 0)'); // Black
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized 0-1)
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Detect which quadrant the mouse is in
      const isTop = mouseY < centerY - rect.height / 6;
      const isRight = mouseX > centerX + rect.width / 6;
      const isBottom = mouseY > centerY + rect.height / 6;
      const isLeft = mouseX < centerX - rect.width / 6;
      
      setShowTop(isTop);
      setShowRight(isRight);
      setShowBottom(isBottom);
      setShowLeft(isLeft);
      
      // Count how many directions are active
      const activeCount = [isTop, isRight, isBottom, isLeft].filter(Boolean).length;
      
      // Update background color based on how many menu items are visible
      const grayValue = Math.min(50 * activeCount, 200);
      setBgColor(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      style={{ 
        minHeight: '100vh', 
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 500ms'
      }}
    >
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
      
      {/* Top navigation */}
      <div style={{
        position: 'absolute',
        top: showTop ? '2rem' : '-5rem',
        textAlign: 'center',
        transition: 'top 300ms ease-in-out',
        zIndex: 5
      }}>
        <AlphabetLink text="About" />
      </div>
      
      {/* Right navigation */}
      <div style={{
        position: 'absolute',
        right: showRight ? '2rem' : '-10rem',
        textAlign: 'center',
        transition: 'right 300ms ease-in-out',
        zIndex: 5
      }}>
        <AlphabetLink text="Projects" />
      </div>
      
      {/* Bottom navigation */}
      <div style={{
        position: 'absolute',
        bottom: showBottom ? '2rem' : '-5rem',
        textAlign: 'center',
        transition: 'bottom 300ms ease-in-out',
        zIndex: 5
      }}>
        <AlphabetLink text="Contact" />
      </div>
      
      {/* Left navigation */}
      <div style={{
        position: 'absolute',
        left: showLeft ? '2rem' : '-10rem',
        textAlign: 'center',
        transition: 'left 300ms ease-in-out',
        zIndex: 5
      }}>
        <AlphabetLink text="Blog" />
      </div>
    </div>
  );
};

export default AlphabetHoverNav;