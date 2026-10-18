import React, { useState, useEffect, useRef } from "react";
import {
  Mail, Terminal, MapPin, ArrowUpRight,
} from "lucide-react";
import "./Portfolio.css";

const Github = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const Linkedin = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  </svg>
);


const PROFILE = {
  name: "Marley Cox",
  role: "Aspiring Software Developer",
  location: "Norwich, England",
  tagline: "Specialising in backend development, I build full-stack applications ranging from SaaS platforms to robust back end systems. With experience across both frontend and backend technologies, I focus on creating efficient software with a strong emphasis on backend.",
  bio: "I'm a 19 year old software developer who loves solving complex problems and turning them into usable products. I am capable of frontend and backend development. When I'm not coding, I'm probably training or playing Final Fantasy 7.",
  email: "marleycox.07@gmail.com",
  github: "https://github.com/marleylikesgit?tab=projects",
  linkedin: "https://www.linkedin.com/in/marley-cox-58b798415/",
};

const SKILLS = [
  { name: "JavaScript", color: "#f1c40f" },
  { name: "Python", color: "#38E1D0" },
  { name: "SQL", color: "#B98CE0" },
  { name: "HTML & CSS", color: "#FF0000" },
  { name: "React", color: "#008cffd1" },
  { name: "FastAPI", color: "#26ff00" },
];

const PROJECTS = [
  {
    name: "ff7-ai-generation-engine",
    description: "AI-powered team builder for Final Fantasy VII using a RAG pipeline with FastAPI, PostgreSQL and pgvector similarity search. Generates optimised weapon, armour and materia loadouts for a chosen party, filtered by story progression.",
    stack: ["FastAPI", "React", "Python", "pgvector", "OpenAI"],
    link: "https://github.com/marleylikesgit/ff7-ai-generation-engine",
    stars: 128,
  },
  {
    name: "banking-api",
    description: "Secure banking API built with REST APIs, PostgreSQL, JWT authentication, ACID-compliant transactions, concurrency control, account management, payment processing, audit logging and role-based access control.",
    stack: ["FastAPI, Python, SQL"],
    link: "https://github.com/yourhandle/routewise",
    stars: 128  ,
  },
  {
    name: "saas-project-management-app",
    description: "Full-stack SaaS project management platform with REST APIs, a PostgreSQL database, JWT authentication and role-based access control for teams and organisations.",
    stack: ["SQL", "React", "Python"],
    link: "https://github.com/yourhandle/pulse-dashboard",
    stars: 128,
  },
  {
    name: "unfinished",
    description: "empty",
    stack: ["empty"],
    link: "https://github.com/yourhandle/gridlock",
    stars: 23,
  },
];

/* ============================================================ */

function useTypewriter(text, speed = 32, startDelay = 300) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return out;
}

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "translateY(0)" : "translateY(18px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="prompt-glyph">&gt;</span> {children}
    </div>
  );
}

export default function Portfolio() {
  const typed = useTypewriter(PROFILE.tagline, 28, 500);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="portfolio-root">
      <div className="glow" />
      <div className="bg-grid" />

      <div className="wrap">
        <nav className="nav">
          <div className="nav-brand">
            <span className="brand-accent">my</span>Portfolio
          </div>
          <div className="nav-links">
            <a className="icon-link" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={19} />
            </a>
            <a className="icon-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a className="icon-link" href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Mail size={19} />
            </a>
          </div>
        </nav>

        <header className="hero">
          <div className="eyebrow">
            <span className="dot-live" />
            available for opportunities
          </div>
          <h1>
            {PROFILE.name.split(" ")[0]} <span className="last">{PROFILE.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <div className="hero-role">
            <Terminal size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 8 }} />
            {PROFILE.role}
            <span className="sep">/</span>
            <MapPin size={14} style={{ display: "inline", verticalAlign: -2, marginRight: 6 }} />
            {PROFILE.location}
          </div>
          <div className="typewriter-line">
            {typed}
            <span className="caret" />
          </div>

          <div className="hero-actions">
            <a className="btn btn-primary" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github size={16} /> View my work
            </a>
            <button className="btn btn-ghost" onClick={copyEmail}>
              <Mail size={16} /> {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </header>

        <hr className="divider" />

        <section id="about">
          <Reveal>
            <SectionLabel>about me</SectionLabel>
            <p className="bio-text">{PROFILE.bio}</p>
            <div className="contact-row">
              <a className="chip" href={`mailto:${PROFILE.email}`}>
                <Mail size={14} /> {PROFILE.email}
              </a>
              <a className="chip" href={PROFILE.github} target="_blank" rel="noreferrer">
                <Github size={14} /> GitHub
              </a>
              <a className="chip" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={14} /> LinkedIn
              </a>
              <span className="chip" style={{ cursor: "default" }}>
                <MapPin size={14} /> {PROFILE.location}
              </span>
            </div>
          </Reveal>
        </section>

        <hr className="divider" />

        <section id="skills">
          <Reveal>
            <SectionLabel>my skills</SectionLabel>
            <div className="skills-card">
              {SKILLS.map((skill) => (
                <span className="skill-pill" key={skill.name}>
                  <span className="skill-dot" style={{ background: skill.color }} />
                  <span className="skill-name">{skill.name}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <hr className="divider" />

        <section id="projects">
          <Reveal>
            <SectionLabel>projects/</SectionLabel>
            <div className="project-grid">
              {PROJECTS.map((p, i) => (
                <Reveal delay={i * 60} key={p.name}>
                  <a
                    className="project-card-link"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="project-card">
                      <div className="project-head">
                        <div className="project-name">
                          <span className="slash">/</span>{p.name}
                        </div>
                        <ArrowUpRight size={17} className="project-arrow" />
                      </div>
                      <div className="project-desc">{p.description}</div>
                      <div className="project-foot">
                        <div className="stack-tags">
                          {p.stack.map((s) => (
                            <span className="stack-tag" key={s}>{s}</span>
                          ))}
                        </div>
                        <span className="stars">★ {p.stars}</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        <footer>
          <div className="footer-text">
            © {new Date().getFullYear()} {PROFILE.name}
          </div>
        </footer>
      </div>

      {copied && <div className="copied-toast">Email copied to clipboard</div>}
    </div>
  );
}
