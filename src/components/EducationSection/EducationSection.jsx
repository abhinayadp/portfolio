import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EducationSection.css';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "Master's Degree",
    program: "M.S. in Data Science & Analytics",
    institution: "University of Oklahoma",
    gpa: "4.0 / 4.0",
    period: "2024 – 2026",
    accentColor: "#d4af37", // Premium Gold
    glowColor: "rgba(212, 175, 55, 0.12)",
    logo: "🎓",
    coursework: [
      "Algorithm Analysis",
      "Data Mining",
      "Intelligent Data Analytics",
      "NLP",
      "Database Management Systems",
      "Statistics",
      "Energy Analytics"
    ]
  },
  {
    degree: "Bachelor's Degree",
    program: "B.Tech in Computer Science - AI & ML",
    institution: "CMR Engineering College",
    gpa: "7.91 / 10",
    period: "2020 – 2024",
    accentColor: "#3b82f6", // Electric Blue
    glowColor: "rgba(59, 130, 246, 0.12)",
    logo: "💻",
    coursework: [
      "Artificial Intelligence",
      "Machine Learning",
      "Neural Networks & Deep Learning",
      "Computational Intelligence",
      "Big Data Analytics",
      "Soft Computing"
    ]
  }
];

const EducationSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate card entries
      gsap.utils.toArray('.edu-card').forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(card,
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.96,
            rotate: isLeft ? -1.5 : 1.5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Stagger coursework tags inside each card
        const tags = card.querySelectorAll('.edu-tag');
        gsap.fromTo(tags,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="section education-section" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">Academic Journey</h2>

        <div className="edu-grid">
          {educationData.map((edu, i) => (
            <div key={i} className="edu-card" style={{ '--edu-accent': edu.accentColor, '--edu-glow': edu.glowColor }}>
              {/* Background radial glow */}
              <div className="edu-card-glow" />

              <div className="edu-card-header">
                <div className="edu-badge-row">
                  <span className="edu-badge-degree">{edu.degree}</span>
                  <span className="edu-badge-period">{edu.period}</span>
                </div>
                <div className="edu-title-row">
                  <span className="edu-logo">{edu.logo}</span>
                  <div className="edu-title-texts">
                    <h3 className="edu-institution">{edu.institution}</h3>
                    <h4 className="edu-program">{edu.program}</h4>
                  </div>
                </div>
              </div>

              {/* GPA display */}
              <div className="edu-gpa-container">
                <div className="edu-gpa-circle">
                  <span className="edu-gpa-val">{edu.gpa.split(' / ')[0]}</span>
                  <span className="edu-gpa-label">GPA</span>
                </div>
                <div className="edu-gpa-text">
                  <p>Maintained a competitive academic record of <strong>{edu.gpa}</strong> during the tenure.</p>
                </div>
              </div>

              {/* Coursework */}
              <div className="edu-coursework-section">
                <h5 className="edu-coursework-title">Key Coursework</h5>
                <div className="edu-tags-grid">
                  {edu.coursework.map((course, ci) => (
                    <span key={ci} className="edu-tag">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
