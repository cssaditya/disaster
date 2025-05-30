import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => (
  <div className="white fixed inset-0 w-full h-full pointer-events-none z-0">
    <div className="squares absolute inset-0 flex justify-around items-end">
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`square`} />
      ))}
    </div>
  </div>
);

export default AnimatedBackground; 