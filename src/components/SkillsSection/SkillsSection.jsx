import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Programming',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    skills: ['Python', 'R', 'SQL'],
    color: '#8b5cf6'
  },
  {
    title: 'Machine Learning / AI',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
        <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
      </svg>
    ),
    skills: ['Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'XGBoost', 'NLP', 'Deep Learning', 'Generative AI', 'LLM Fine-tuning', 'Feature Engineering', 'Model Deployment', 'MLOps'],
    color: '#3b82f6'
  },
  {
    title: 'Data Science',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'BigQuery', 'Predictive Modeling', 'EDA', 'Statistical Modeling', 'Hypothesis Testing', 'Time Series Analysis', 'Data Cleaning & Wrangling', 'Feature Selection'],
    color: '#10b981'
  },
  {
    title: 'Tools & Cloud',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    skills: ['SQL', 'MySQL', 'MongoDB', 'Snowflake', 'AWS', 'Azure', 'GCP', 'Git', 'CI/CD', 'Airflow', 'REST APIs', 'Streamlit', 'FastAPI', 'Tableau', 'Power BI'],
    color: '#f59e0b'
  },
  {
    title: 'Data / Business Analyst',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    skills: ['SQL Optimization', 'Dashboard Development', 'KPI Design', 'Stakeholder Reporting', 'Business Intelligence', 'Data Storytelling', 'Root Cause Analysis', 'Cohort Analysis', 'Revenue Analytics', 'Customer Segmentation'],
    color: '#ec4899'
  },
  {
    title: 'Product Analytics & Experimentation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12"></path>
        <path d="M9 3v13a3 3 0 0 0 6 0V3"></path>
        <path d="M9 11h6"></path>
      </svg>
    ),
    skills: ['A/B Testing', 'C1/C2 Testing', 'Experiment Design', 'Statistical Power Analysis', 'Feature Impact Analysis', 'User Behavior Analytics', 'Growth Analytics', 'SaaS Metrics (MRR, CAC, LTV, Churn)'],
    color: '#14b8a6'
  },
  {
    title: 'Data Engineering',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    ),
    skills: ['ETL / ELT Pipelines', 'Data Warehousing', 'Data Modeling', 'Big Data', 'Spark', 'Batch & Streaming Systems'],
    color: '#f97316'
  }
];

const SkillsSection = () => {
  const containerRef = useRef(null);
  const tracksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tracksRef.current.forEach((track, idx) => {
        if (!track) return;
        
        // Slower alternating shift values: moves gently back and forth to keep tags in center viewport
        const isLeft = idx % 2 === 0;
        const speed = isLeft ? -40 : 40;

        gsap.fromTo(track,
          { x: isLeft ? 30 : -30 },
          {
            x: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: track.closest('.skills-row'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section skills-ticker-section" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-rows-list">
          {skillCategories.map((cat, i) => (
            <div key={i} className="skills-row" style={{ '--lane-color': cat.color }}>
              
              {/* Row Header (Title + Icon) */}
              <div className="skills-row-header">
                <span className="skills-row-icon">{cat.icon}</span>
                <h3 className="skills-row-title">{cat.title}</h3>
              </div>

              {/* Row Track Wrapper (Scrollable) */}
              <div className="skills-row-track-wrapper">
                <div 
                  className="skills-row-track" 
                  ref={el => tracksRef.current[i] = el}
                >
                  {cat.skills.map((skill, idx) => (
                    <span key={idx} className="skills-pill">
                      {skill}
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

export default SkillsSection;
