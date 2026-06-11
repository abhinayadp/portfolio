import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({ projects }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each project card on scroll
      gsap.utils.toArray('.proj-card').forEach((card, i) => {
        const isEven = i % 2 === 0;
        const media = card.querySelector('.proj-media');
        const info  = card.querySelector('.proj-info');
        const tag   = card.querySelector('.proj-tag');
        const title = card.querySelector('.proj-title');
        const desc  = card.querySelector('.proj-desc');
        const pills = card.querySelector('.proj-pills');
        const links = card.querySelector('.proj-links');

        // Image slides in from left/right
        gsap.fromTo(media,
          { x: isEven ? -80 : 80, opacity: 0, scale: 0.94 },
          {
            x: 0, opacity: 1, scale: 1,
            duration: 1.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Text elements stagger in
        gsap.fromTo([tag, title, desc, pills, links],
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Subtle parallax on media background while scrolling
        gsap.to(media, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Counter number roll-up for the index labels
      gsap.utils.toArray('.proj-index').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Selected Projects</h2>
      </div>
      <div className="projects-flow">
        {projects.map((project, idx) => (
          <article key={idx} className={`proj-card ${idx % 2 === 0 ? 'proj-card--ltr' : 'proj-card--rtl'}`}>
            <div className="proj-media">
              <div className="proj-img-wrap">
                <img src={project.image} alt={project.title} />
                <div className="proj-img-overlay" />
              </div>
            </div>
            <div className="proj-info">
              <div className="proj-meta">
                <span className="proj-index">/ {String(idx + 1).padStart(2, '0')}</span>
                <span className="proj-tag">{project.tag}</span>
              </div>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-desc">{project.desc}</p>
              <div className="proj-pills">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="proj-pill">{t}</span>
                ))}
              </div>
              <div className="proj-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="proj-link proj-link--primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  View Code
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="proj-link proj-link--secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
