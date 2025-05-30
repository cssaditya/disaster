import React from 'react';

const TOTAL = 300;
const ORB_SIZE = 100; // px
const PARTICLE_SIZE = 2; // px
const TIME = 14; // seconds
const BASE_HUE = 180; // blue/cyan

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const particlesData = Array.from({ length: TOTAL }).map((_, i) => {
  const z = randomBetween(0, 360);
  const y = randomBetween(0, 360);
  const hue = ((40 / TOTAL) * i + BASE_HUE) % 360;
  const color = `hsla(${hue}, 100%, 50%, 1)`;
  return {
    z,
    y,
    color,
  };
});

const OrbBackground: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      background: 'black',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <div
        className="wrap"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          perspective: 1000,
          animation: `rotate ${TIME}s infinite linear`,
        }}
      >
        {particlesData.map((p, i) => (
          <div
            key={i}
            className="c"
            style={{
              position: 'absolute',
              width: PARTICLE_SIZE,
              height: PARTICLE_SIZE,
              borderRadius: '50%',
              opacity: 0.8,
              backgroundColor: p.color,
              transform: `rotateZ(-${p.z}deg) rotateY(${p.y}deg) translateX(${ORB_SIZE}px) rotateZ(${p.z}deg)`,
              transition: 'opacity 0.5s',
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes rotate {
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrbBackground; 