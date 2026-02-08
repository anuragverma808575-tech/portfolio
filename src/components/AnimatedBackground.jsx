import React, { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const [circles, setCircles] = useState([]);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const circlePositions = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    // Initialize circles with crystal and gray colors - different lag for smooth trail
    const initialCircles = [
      { size: 120, lag: 0.08, opacity: 0.15, color: 'rgba(255, 255, 255, 0.95)', glow: true },
      { size: 95, lag: 0.12, opacity: 0.22, color: 'rgba(200, 200, 200, 0.9)', glow: true },
      { size: 75, lag: 0.16, opacity: 0.3, color: 'rgba(255, 255, 255, 0.85)', glow: false },
      { size: 55, lag: 0.22, opacity: 0.4, color: 'rgba(180, 180, 180, 0.8)', glow: false },
      { size: 38, lag: 0.28, opacity: 0.55, color: 'rgba(255, 255, 255, 0.9)', glow: true },
      { size: 24, lag: 0.36, opacity: 0.75, color: 'rgba(160, 160, 160, 0.85)', glow: false },
      { size: 14, lag: 0.5, opacity: 0.95, color: 'rgba(255, 255, 255, 1)', glow: true }
    ];

    setCircles(initialCircles);

    // Initialize all circles at mouse position
    circlePositions.current = initialCircles.map(() => ({
      x: mousePos.current.x,
      y: mousePos.current.y
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (circles.length === 0) return;

    const animate = () => {
      circles.forEach((circle, index) => {
        const pos = circlePositions.current[index];
        
        let targetX = mousePos.current.x;
        let targetY = mousePos.current.y;

        // Smooth repulsion from other circles to prevent overlap
        circles.forEach((otherCircle, otherIndex) => {
          if (index === otherIndex) return;
          
          const otherPos = circlePositions.current[otherIndex];
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const minDistance = (circle.size + otherCircle.size) / 2 + 12;

          if (distance < minDistance && distance > 0) {
            const repulsionStrength = (minDistance - distance) / minDistance;
            const repulsionForce = repulsionStrength * 25;
            
            targetX += (dx / distance) * repulsionForce;
            targetY += (dy / distance) * repulsionForce;
          }
        });

        // Smooth continuous movement toward target
        pos.x += (targetX - pos.x) * circle.lag;
        pos.y += (targetY - pos.y) * circle.lag;
      });

      // Trigger re-render
      setCircles([...circles]);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [circles.length]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden cursor-none touch-none">
      {/* Render circles */}
      {circles.map((circle, index) => {
        const pos = circlePositions.current[index] || mousePos.current;
        
        return (
          <div
            key={index}
            className="fixed rounded-full pointer-events-none"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
              background: circle.glow 
                ? `radial-gradient(circle, ${circle.color} 0%, ${circle.color.replace(/[\d.]+\)$/g, '0.5)')} 100%)`
                : circle.color,
              opacity: circle.opacity,
              boxShadow: circle.glow
                ? `0 0 ${circle.size * 0.5}px ${circle.color.replace(/[\d.]+\)$/g, '0.5)')},
                   0 0 ${circle.size}px ${circle.color.replace(/[\d.]+\)$/g, '0.3)')},
                   inset 0 0 ${circle.size * 0.4}px rgba(255, 255, 255, 0.4)`
                : `0 0 ${circle.size * 0.3}px ${circle.color.replace(/[\d.]+\)$/g, '0.25)')},
                   inset 0 0 ${circle.size * 0.25}px rgba(255, 255, 255, 0.25)`,
              backdropFilter: 'blur(2px)',
              border: circle.glow ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(200, 200, 200, 0.2)',
              transition: 'none'
            }}
          />
        );
      })}

      {/* Mouse glow effect - hidden on touch devices */}
      <div 
        className="fixed pointer-events-none transition-none hidden md:block"
        style={{
          width: '500px',
          height: '500px',
          left: `${mousePos.current.x}px`,
          top: `${mousePos.current.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'
        }}
      />

      {/* Cursor dot - hidden on touch devices */}
      <div 
        className="fixed pointer-events-none rounded-full transition-none hidden md:block"
        style={{
          width: '10px',
          height: '10px',
          left: `${mousePos.current.x}px`,
          top: `${mousePos.current.y}px`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.4)',
          zIndex: 100
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
