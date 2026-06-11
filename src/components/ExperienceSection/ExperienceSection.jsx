import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExperienceSection.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    type: 'industry',
    badge: 'Industry',
    date: 'Sept 2023 – Apr 2024',
    role: 'Data Science Intern',
    org: 'Indtek International',
    location: 'Hyderabad, India',
    icon: '💼',
    color: '#3b82f6',
    stats: [
      { value: '15%', label: 'Supply chain inefficiency identified' },
      { value: '22%', label: 'Lead-time prediction accuracy boost' },
      { value: '30%', label: 'Manual oversight reduced' },
    ],
    bullets: [
      'Built automated Power BI dashboards using SQL and Python to identify a 15% inefficiency in regulatory supply chain workflows.',
      'Developed NLP and statistical models to categorize Drug Master Files (DMF), increasing lead-time prediction accuracy by 22%.',
      'Deployed an end-to-end predictive maintenance pipeline via Scikit-learn and Flask, reducing manual oversight by 30%.',
      'Architected scalable ETL workflows ensuring 100% alignment with US FDA and EU GMP standards.',
    ],
  },
  {
    type: 'academic',
    badge: 'Academic',
    date: 'Dec 2024 – May 2026',
    role: 'Graduate Teaching Assistant',
    org: 'University of Oklahoma',
    location: 'Norman, OK',
    icon: '🎓',
    color: '#8b5cf6',
    bullets: [
      'Assisted instruction in algorithm design, complexity analysis, and scalable computing methods.',
      'Evaluated programming assignments and analytical projects focusing on computational efficiency.',
      'Guided students in applying algorithmic approaches to large-scale data processing problems.',
    ],
  },
  {
    type: 'research',
    badge: 'Publication',
    date: '2024',
    role: 'Detection Framework for Manipulated Media',
    org: 'IJRAR, Vol. 11, Issue 3',
    location: 'Peer-Reviewed Research',
    icon: '📄',
    color: '#10b981',
    stats: [
      { value: '98%', label: 'Model accuracy (MobileNet)' },
      { value: '99%', label: 'Accuracy (VGG architecture)' },
      { value: '2024', label: 'Published' },
    ],
    bullets: [
      'Proposed a CNN-based deepfake detection framework using MobileNet and VGG architectures.',
      'Achieved 98–99% accuracy on manipulated media classification tasks.',
    ],
    link: { href: 'https://ijrar.org/papers/IJRAR24C1087.pdf', label: 'View Full Paper' },
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical timeline line
      const lineEl = lineRef.current;
      if (lineEl) {
        gsap.fromTo(lineEl,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
            }
          }
        );
      }

      // Animate each card
      gsap.utils.toArray('.exp-card').forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(card,
          { x: isLeft ? -60 : 60, opacity: 0, scale: 0.95 },
          {
            x: 0, opacity: 1, scale: 1,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Animate dot
        const dot = card.closest('.exp-row')?.querySelector('.exp-dot');
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1,
              duration: 0.4, ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        // Stagger bullets
        const bullets = card.querySelectorAll('.exp-bullet');
        gsap.fromTo(bullets,
          { x: 20, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.08,
            duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Animate stat numbers counting up
        const stats = card.querySelectorAll('.exp-stat-value');
        stats.forEach(stat => {
          gsap.fromTo(stat,
            { opacity: 0, y: 15 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section experience-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>

        <div className="exp-timeline">
          {/* The animated vertical line */}
          <div className="exp-line-track">
            <div className="exp-line" ref={lineRef} />
          </div>

          {experiences.map((exp, i) => (
            <div key={i} className={`exp-row exp-row--${i % 2 === 0 ? 'left' : 'right'}`}>
              {/* Dot */}
              <div className="exp-dot-wrap">
                <div className="exp-dot" style={{ '--dot-color': exp.color }}>
                  <span className="exp-dot-icon">{exp.icon}</span>
                </div>
              </div>

              {/* Card */}
              <div className="exp-card" style={{ '--exp-accent': exp.color }}>
                <div className="exp-card-top">
                  <div className="exp-meta">
                    <span className={`exp-badge exp-badge--${exp.type}`}>{exp.badge}</span>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-org">
                    <span className="exp-org-name">{exp.org}</span>
                    <span className="exp-location">· {exp.location}</span>
                  </div>
                </div>

                {/* Impact stats */}
                {exp.stats && exp.stats.length > 0 && (
                  <div className="exp-stats">
                    {exp.stats.map((s, si) => (
                      <div key={si} className="exp-stat">
                        <span className="exp-stat-value">{s.value}</span>
                        <span className="exp-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullets */}
                <ul className="exp-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="exp-bullet">
                      <span className="exp-bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Link if any */}
                {exp.link && (
                  <a href={exp.link.href} target="_blank" rel="noreferrer" className="exp-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {exp.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
