import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';

import VariableProximity from './components/VariableProximity/VariableProximity';
import RotatingText from './components/RotatingText/RotatingText';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';
import FloatingTags from './components/FloatingTags/FloatingTags';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import EducationSection from './components/EducationSection/EducationSection';

const projects = [
  {
    tag: 'Power BI • Analytics',
    title: 'Data Professional Survey Breakdown',
    desc: 'An interactive BI dashboard mapping compensation, job satisfaction, and tool preferences across 630+ global data professionals to reveal key industry trends and insights.',
    tech: ['Power BI', 'Power Query', 'DAX'],
    image: '/images/power-bi-dashboard.png',
    github: 'https://github.com/abhinayadp/Power-BI-Data-Professional-Survey-Breakdown'
  },
  {
    tag: 'Healthcare ML',
    title: 'Cardiovascular Disease Prediction',
    desc: 'Real-world healthcare risk stratification benchmarking Logistic Regression, Random Forest, and SVM models for early cardiovascular disease detection and patient metrics.',
    tech: ['Python', 'Scikit-Learn', 'Seaborn', 'Pandas'],
    image: '/images/cvd-ml-viz.png',
    github: 'https://github.com/Pratham0919/Cardiovascular-disease-Prediction-Using-Healthcare-Data-Mining-Techniques'
  },
  {
    tag: 'NLP • SemEval 2025',
    title: 'Multilingual Event Detection',
    desc: 'Advanced NLP pipeline using transformer models (mBERT, mT5, XLM-R) for polarization and event detection across multiple languages for the SemEval 2025 shared task.',
    tech: ['PyTorch', 'Transformers', 'mBERT', 'XLM-R'],
    image: '/images/nlp-multilingual-viz.png',
    github: 'https://github.com/aishwarya0525/SharedTask3'
  },
  {
    tag: 'Computer Vision',
    title: 'Deepfake Detection',
    desc: 'Deep CNN-based classifier built in TensorFlow and OpenCV to identify AI-manipulated images and video content, achieving a 97% validation accuracy.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'OpenCV'],
    image: '/images/deepfake-viz.png',
    github: 'https://github.com/abhinayadp/Deepfake-Detection'
  },
  {
    tag: 'Energy Analytics',
    title: 'Electricity Load Forecasting',
    desc: 'Short-term hourly load forecasting model utilizing historical time-series datasets to support smart grid distribution and utility operations planning decisions.',
    tech: ['Python', 'ARIMA', 'Time Series', 'Statistics'],
    image: '/images/electricity-forecast-viz.png',
    github: 'https://github.com/abhinayadp/Short-Term-Hourly-Electricity-Load-Forecasting-for-the-CE-Load-Area'
  },
  {
    tag: 'BI & Analytics',
    title: 'Tableau Visualizations',
    desc: 'A collection of executive BI dashboards and interactive data stories focused on clear trend communication, drill-down metrics, and stakeholder reporting.',
    tech: ['Tableau', 'SQL', 'BI', 'Storytelling'],
    image: '/images/tableau-dashboard.png',
    github: 'https://github.com/abhinayadp/TABLEAU'
  },
  {
    tag: 'Generative AI',
    title: 'JAI – Job Application Intelligence',
    desc: 'AI-powered application automation SaaS tailors resumes to target job descriptions using the Gemini API and dynamically generates ATS-optimized LaTeX PDFs.',
    tech: ['TypeScript', 'Gemini AI', 'LaTeX', 'Node.js'],
    image: '/images/jai-project-v2.png',
    github: 'https://github.com/RohanMukka/JAI'
  },
  {
    tag: 'End-to-End ML',
    title: 'SaaS Analytics Intelligence Platform',
    desc: 'An end-to-end customer analytics platform leveraging Scikit-Learn and XGBoost classification models to predict churn risk, featuring an interactive Streamlit dashboard.',
    tech: ['Python', 'Scikit-Learn', 'Streamlit', 'Pandas'],
    image: '/images/saas-analytics.png',
    github: 'https://github.com/abhinayadp/saas-analytics-intelligence-platform',
    demo: 'https://saas-analytics-platform.streamlit.app/'
  }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [views, setViews] = useState(128);
  const heroRef = useRef(null);

  // Theme Toggling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Dispatch global event for vanilla scripts compatibility (like LiquidEther)
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    window.dispatchEvent(event);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Expose lenis instance globally for navbar scrolling helper links
    window.globalLenis = lenis;

    return () => {
      lenis.destroy();
      window.globalLenis = null;
    };
  }, []);

  // LiquidEther Background Flow Activation
  useEffect(() => {
    const bgContainer = document.getElementById('liquid-ether-bg');
    if (bgContainer && window.LiquidEther) {
      const colors = theme === 'dark'
        ? ['#56a872', '#e8b93b', '#132c1e']
        : ['#c4d7cb', '#e8dbca', '#fafaf7'];

      try {
        const instance = new window.LiquidEther(bgContainer, {
          colors: colors,
          mouseForce: 15,
          cursorSize: 90,
          isViscous: true,
          viscous: 30,
          iterationsViscous: 32,
          iterationsPoisson: 32,
          resolution: 0.5,
          isBounce: false,
          autoDemo: true,
          autoSpeed: 0.004,
          autoIntensity: 0.25,
          takeoverDuration: 0,
          autoResumeDelay: 2000,
          dissipation: 0.93
        });
        return () => {
          instance.dispose();
        };
      } catch (e) {
        console.warn('LiquidEther failed:', e);
      }
    }
  }, [theme, loading]);

  // Card Mouse spotlight handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.glass-card, .timeline-card, .research-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [loading]);

  // View Counter Fetcher
  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/abhinayadeepikapertifolio/visits')
      .then(res => res.json())
      .then(data => {
        if (data && data.value) setViews(data.value);
      })
      .catch(() => {
        const localCount = parseInt(localStorage.getItem('page_views') || '128', 10);
        localStorage.setItem('page_views', (localCount + 1).toString());
        setViews(localCount + 1);
      });
  }, []);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    // Target elements to animate
    const elements = document.querySelectorAll('.fade-in-up, .glass-card, .section-title, .project-row, .timeline-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [loading]);

  // Smooth scroll links trigger helper
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (window.globalLenis) {
      window.globalLenis.scrollTo(id, {
        offset: -100,
        lerp: 0.08
      });
    } else {
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="loader-wrapper"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="loader-btn">
              <div className="loader-flower-wrapper">
                <div className="loader-text">Loading</div>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={num} className={`loader-flower loader-flower${num}`}>
                    <div className="loader-petal one"></div>
                    <div className="loader-petal two"></div>
                    <div className="loader-petal three"></div>
                    <div className="loader-petal four"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="liquid-ether-bg" className="liquid-ether-container"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo-group">
            <a href="#hero" className="logo" onClick={(e) => handleScrollTo(e, '#hero')}>ADP.</a>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>About</a></li>
              <li><a href="#skills" onClick={(e) => handleScrollTo(e, '#skills')}>Skills</a></li>
              <li><a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')}>Projects</a></li>
              <li><a href="#experience" onClick={(e) => handleScrollTo(e, '#experience')}>Experience</a></li>
              <li><a href="#education" onClick={(e) => handleScrollTo(e, '#education')}>Education</a></li>
              <li><a href="#contact" className="btn-contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contact</a></li>
            </ul>
            {/* Theme Switch */}
            <label className="theme-switch">
              <input
                type="checkbox"
                className="theme-switch__checkbox"
                id="theme-toggle"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="theme-switch__container">
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
                      fill="currentColor"></path>
                  </svg>
                </div>
                <div class="theme-switch__circle-container">
                  <div class="theme-switch__sun-moon-container">
                    <div class="theme-switch__moon">
                      <div class="theme-switch__spot"></div>
                      <div class="theme-switch__spot"></div>
                      <div class="theme-switch__spot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section" ref={heroRef}>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          


          {/* Interactive Floating Tags (Space Filler Option 1) */}
          <FloatingTags />

          <div className="container hero-container">
            <div className="hero-content">
              {/* Subtitle with RotatingText */}
              <div className="subtitle-container fade-in-up delay-1">
                <span>I am a </span>
                <RotatingText
                  texts={['Data Analyst', 'Data Scientist', 'ML Engineer']}
                  mainClassName="hero-rotating-text"
                  staggerDuration={0.02}
                  staggerFrom="first"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  rotationInterval={2500}
                />
              </div>

              {/* VariableProximity Name */}
              <h1 className="fade-in-up">
                <VariableProximity
                  label="Abhinaya Deepika Peri"
                  fromFontVariationSettings="'wght' 300, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 144"
                  containerRef={heroRef}
                  radius={160}
                  falloff="linear"
                />
              </h1>

              <p className="intro-text fade-in-up delay-2">
                Transforming complex data into actionable insights with Machine Learning and Data Science.
              </p>
              
              <div className="cta-group fade-in-up delay-3">
                <a href="#projects" className="btn btn-primary" onClick={(e) => handleScrollTo(e, '#projects')}>
                  View Work
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a href="#contact" className="btn btn-secondary" onClick={(e) => handleScrollTo(e, '#contact')}>Get in Touch</a>
              </div>
            </div>
          </div>
          <div className="hero-background"></div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content-full fade-in-up">
                <ScrollReveal
                  baseOpacity={0.08}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={5}
                  wordAnimationEnd="bottom 75%"
                  rotationEnd="bottom 80%"
                >
                  {"I'm an aspiring Data Scientist with a strong analytical foundation and hands-on experience in machine learning, statistical analysis, and business intelligence. I specialize in transforming complex datasets into meaningful insights and building predictive models that support data-driven decision-making."}
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.08}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={5}
                  wordAnimationEnd="bottom 75%"
                  rotationEnd="bottom 80%"
                >
                  {"My work spans the full data science workflow including data cleaning, exploratory data analysis, feature engineering, hypothesis testing, and model development using modern ML frameworks such as Scikit-learn and TensorFlow/PyTorch. I apply statistical validation techniques, cross-validation, and performance metrics to ensure model reliability and robustness."}
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.08}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={5}
                  wordAnimationEnd="bottom 75%"
                  rotationEnd="bottom 80%"
                >
                  {"Beyond modeling, I focus on translating technical findings into actionable insights through SQL-driven analysis, dashboards, and structured reporting. I'm particularly interested in predictive analytics and experimentation, aiming to build solutions that combine analytical rigor with measurable business impact."}
                </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <div className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-wrapper">
              <div className="skill-category">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Programming
                </h3>
                <div className="skill-tags">
                  <span>Python</span><span>R</span><span>SQL</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                    <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
                  </svg>
                  Machine Learning / AI
                </h3>
                <div className="skill-tags">
                  <span>Scikit-learn</span><span>TensorFlow</span><span>Keras</span><span>PyTorch</span><span>XGBoost</span><span>NLP</span><span>Deep Learning</span><span>Generative AI</span><span>LLM Fine-tuning</span><span>Feature Engineering</span><span>Model Deployment</span><span>MLOps</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Data Science
                </h3>
                <div className="skill-tags">
                  <span>Pandas</span><span>NumPy</span><span>Matplotlib</span><span>BigQuery</span><span>Predictive Modeling</span><span>EDA</span><span>Statistical Modeling</span><span>Hypothesis Testing</span><span>Time Series Analysis</span><span>Data Cleaning & Wrangling</span><span>Feature Selection</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  Tools & Cloud
                </h3>
                <div className="skill-tags">
                  <span>SQL</span><span>MySQL</span><span>MongoDB</span><span>Snowflake</span><span>AWS</span><span>Azure</span><span>GCP</span><span>Git</span><span>CI/CD</span><span>Airflow</span><span>REST APIs</span><span>Streamlit</span><span>FastAPI</span><span>Tableau</span><span>Power BI</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>Data / Business Analyst</h3>
                <div className="skill-tags">
                  <span>SQL Optimization</span><span>Dashboard Development</span><span>KPI Design</span><span>Stakeholder Reporting</span><span>Business Intelligence</span><span>Data Storytelling</span><span>Root Cause Analysis</span><span>Cohort Analysis</span><span>Revenue Analytics</span><span>Customer Segmentation</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>Product Analytics & Experimentation</h3>
                <div className="skill-tags">
                  <span>A/B Testing</span><span>C1/C2 Testing</span><span>Experiment Design</span><span>Statistical Power Analysis</span><span>Feature Impact Analysis</span><span>User Behavior Analytics</span><span>Growth Analytics</span><span>SaaS Metrics (MRR, CAC, LTV, Churn)</span>
                </div>
              </div>

              <div className="skill-category">
                <h3>Data Engineering</h3>
                <div className="skill-tags">
                  <span>ETL / ELT Pipelines</span><span>Data Warehousing</span><span>Data Modeling</span><span>Big Data</span><span>Spark</span><span>Batch & Streaming Systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection projects={projects} />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Education Section */}
        <EducationSection />

        {/* Contact Section */}
        <section id="contact" className="section footer-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-content">
              <p>Interested in collaboration or hiring? Feel free to reach out.</p>
              <div className="contact-links">
                <a href="mailto:abhinaya.deepika.peri-1@ou.edu" className="contact-icon-link" title="Email Me">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <a href="tel:+14054174638" className="contact-icon-link" title="Call Me">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>
                <a href="https://github.com/abhinayadp" target="_blank" rel="noreferrer" className="contact-icon-link" title="GitHub Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/abhinaya-deepika-peri" target="_blank" rel="noreferrer" className="contact-icon-link" title="LinkedIn Profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <footer>
              <p>&copy; 2026 Abhinaya Deepika Peri. All rights reserved.</p>
              <p className="page-views-text">Page Views: <span id="view-count">{views}</span></p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
