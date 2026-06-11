import { useEffect, useState, useRef } from 'react';
import './FloatingTags.css';

const tagsList = [
  { name: 'Python', size: 'large', speed: 18, delay: 0 },
  { name: 'PyTorch', size: 'medium', speed: 22, delay: 2 },
  { name: 'SQL', size: 'large', speed: 20, delay: 1 },
  { name: 'TensorFlow', size: 'medium', speed: 25, delay: 3 },
  { name: 'BigQuery', size: 'small', speed: 17, delay: 4 },
  { name: 'Scikit-learn', size: 'large', speed: 23, delay: 0.5 },
  { name: 'Tableau', size: 'medium', speed: 19, delay: 1.5 },
  { name: 'LLM Tuning', size: 'small', speed: 26, delay: 2.5 },
  { name: 'Pandas', size: 'medium', speed: 21, delay: 3.5 },
  { name: 'MLOps', size: 'small', speed: 24, delay: 1.2 }
];

const FloatingTags = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="floating-tags-container">
      {tagsList.map((tag, idx) => {
        const factor = ((idx % 3) + 1) * 18; // 18px, 36px, 54px max displacement
        const tx = mouse.x * factor;
        const ty = mouse.y * factor;

        return (
          <div
            key={idx}
            className={`floating-tag tag-${idx} tag-${tag.size}`}
            style={{
              transform: `translate3d(${tx}px, ${ty}px, 0)`,
              animationDuration: `${tag.speed}s`,
              animationDelay: `${tag.delay}s`
            }}
          >
            {tag.name}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingTags;
