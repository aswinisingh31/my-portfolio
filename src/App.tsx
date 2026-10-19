import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Terminal,
  Send,
  MessageSquare,
  User,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  X,
  Star,
  ArrowUp,
  Trophy,
  Compass,
  Lightbulb,
  Heart,
  Check,
  Copy,
  Sparkles,
  Maximize2,
  ChevronDown,
  Layers,
  BarChart3,
  Bot
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Github = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const Linkedin = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function App() {
  const [activePanel, setActivePanel] = useState<'chat' | 'message'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [isPortraitColor, setIsPortraitColor] = useState(false);

  // Interactive AI Assistant State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hi there! I'm Aswini's portfolio AI assistant. Ask me about his data analytics work, full-stack projects, TEDx leadership, or educational background!"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Interactive Direct Message State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ['about', 'experience', 'projects', 'certifications', 'hackathons', 'events'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver: trigger page-turn reveal animations
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      '.section-reveal, .card-reveal, .cert-reveal'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Keep visible once shown (don't reverse on scroll up)
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track cursor movement for dynamic spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll chat to bottom on new message
  useEffect(() => {
    const chatMessagesElement = chatMessagesRef.current;
    if (chatMessagesElement) {
      chatMessagesElement.scrollTo({
        top: chatMessagesElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages, isAiTyping]);

  // Handle escape key for lightbox & sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openDrawer = (panel: 'chat' | 'message') => {
    setActivePanel(panel);
    setIsSidebarOpen(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('singhaswini19@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // AI Assistant responses based on portfolio knowledge
  const handleAiAsk = (query: string) => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    const q = query.toLowerCase();
    let reply = "Aswini Kumar Singh is a Computer Science Engineering student ('28) with a 8.77 CGPA, focusing on Data Analytics and Full-Stack Development.";

    if (q.includes('project') || q.includes('ecommerce') || q.includes('power bi')) {
      reply = "Aswini's flagship projects include:\n\n1. 📊 E-Commerce Data Analysis Dashboard: An interactive Power BI & Excel dashboard analyzing sales, profits, and customer segmentation.\n2. 📄 Resumind: An ATS Resume Analyzer built with React, TypeScript, Vite & Node.js.\n3. 🛠️ Tool Sarrthi: A peer-to-peer equipment sharing marketplace with React & Supabase.";
    } else if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech')) {
      reply = "Aswini's core technical toolkit includes:\n\n• Languages: Python, SQL, C, C++, Java, JavaScript, TypeScript\n• Frameworks & Web: React, Django, Node.js, Vite, HTML5/CSS3\n• Data Analytics: Power BI, Excel, EDA, Data Cleaning\n• Tools: Git, Supabase, VS Code, Linux";
    } else if (q.includes('intern') || q.includes('experience') || q.includes('3skill')) {
      reply = "Aswini's internship experience includes two roles:\n\n1. TrinexGlobal — Management Information System Analyst (Remote, Sep–Oct 2026; completed). Worked on MIS reporting, data organization, and system analysis to support business decisions and operational efficiency.\n\n2. 3 Skill Internship — Data Analyst Virtual Internship (Jul–Aug 2026; two months). Analyzed and cleaned datasets, performed exploratory data analysis (EDA), used Excel, SQL, Python, and visualization tools, and created reports and interactive dashboards. Certificate ID: ID-INTERN262614.";
    } else if (q.includes('tedx') || q.includes('anantam') || q.includes('lead') || q.includes('event') || q.includes('volunteer')) {
      reply = "Aswini has notable leadership experience:\n\n• TEDxPCU 2026: Logistics Lead managing resource allocation, team schedules, and on-ground operations.\n• Anantam Cultural Fest 2026: Lead organizer for the Off-Stage Treasure Hunt, earning an Appreciation Certificate and Trophy for standout coordination!";
    } else if (q.includes('hackathon') || q.includes('heartwell')) {
      reply = "At the Innovators Hackathon 2026 (NMIET Campus & AIC T-Hub), Aswini developed Family HeartWell, a healthtech concept designed to connect remote parents and children through shared medication schedules and vital tracking.";
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
      reply = "You can contact Aswini directly via email at singhaswini19@gmail.com, call +91 8116677579, or message him through LinkedIn (linkedin.com/in/aswini-kumar-singh-422b78312)!";
    }

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply
        }
      ]);
      setIsAiTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
      setIsSidebarOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground relative bg-grid-pattern">

      {/* Scroll Progress Bar at very top */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-primary via-accent to-pink-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.04), rgba(99, 102, 241, 0.02) 40%, transparent 70%)`
        }}
      />

      {/* Ambient background glowing orbs */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px] animate-pulse-slow"></div>
      <div className="pointer-events-none fixed top-1/2 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-[140px] animate-pulse-slow"></div>

      {/* Floating Action Button for AI Assistant */}
      <button
        onClick={() => openDrawer('chat')}
        className={cn(
          "fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-primary via-sky-400 to-accent text-primary-foreground shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer group",
          isSidebarOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
        aria-label="Open AI Assistant"
      >
        <Bot size={19} className="group-hover:rotate-12 transition-transform" />
        <span className="font-bold text-xs tracking-wider uppercase hidden sm:inline">Ask AI</span>
      </button>

      {/* FLOATING ISLAND GLASS NAVBAR */}
      <header className="sticky top-4 z-30 w-full px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-nav rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex flex-wrap sm:flex-nowrap justify-between items-center gap-y-2 shadow-2xl">
          {/* Logo / Brand */}
          <a href="#about" className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-primary transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-foreground">ASWINI<span className="text-primary">.DEV</span></span>
          </a>

          {/* Navigation Links */}
          <nav className="order-3 sm:order-none w-full sm:w-auto min-w-0 max-w-full flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 whitespace-normal sm:whitespace-nowrap">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certs' },
              { id: 'hackathons', label: 'Hackathons' },
              { id: 'events', label: 'Events' }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "shrink-0 text-xs font-mono px-2.5 py-1 rounded-full transition-all duration-200",
                  activeSection === item.id
                    ? "bg-primary/15 text-primary font-medium border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => openDrawer('message')}
              className="ml-1 sm:ml-2 shrink-0 text-xs font-mono px-3 py-1 bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground font-semibold rounded-full hover:opacity-95 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14 space-y-16 sm:space-y-24 relative z-10">

        {/* ============================================================ */}
        {/* SECTION 1: HERO & ABOUT                                     */}
        {/* ============================================================ */}
        <section id="about" className="scroll-mt-28 space-y-8 section-reveal is-visible">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>Open to Fall 2026 Internships & Software Roles</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            {/* Interactive Avatar with Multi-layer Glow */}
            <div className="relative group shrink-0 self-center md:self-start">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-md opacity-40 group-hover:opacity-80 transition duration-500 group-hover:duration-200"></div>

              <button
                type="button"
                onClick={() => setIsPortraitColor((isColor) => !isColor)}
                aria-label={isPortraitColor ? "Show portrait in black and white" : "Show portrait in color"}
                aria-pressed={isPortraitColor}
                className="block w-36 h-36 md:w-44 md:h-44 relative rounded-2xl overflow-hidden border border-white/20 bg-card shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-500 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <img
                  src="/attachment-1.png"
                  alt="Aswini Kumar Singh"
                  className={cn(
                    "w-full h-full object-cover object-top transition-all duration-700",
                    isPortraitColor
                      ? "grayscale-0 scale-100"
                      : "grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
                  )}
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-300",
                  isPortraitColor ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}></div>
              </button>
            </div>

            {/* Profile Intro & Title */}
            <div className="flex-1 space-y-4">
              <div className="inline-block font-mono text-xs uppercase tracking-widest text-primary font-semibold border border-primary/20 bg-primary/5 px-2.5 py-1 rounded">
                Aspiring Data Analyst • Full-Stack Developer
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-slate-100 to-muted-foreground leading-tight">
                Aswini Kumar Singh
              </h1>

              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed border-l-2 border-primary/80 pl-4 py-0.5">
                Computer Science Engineering student and aspiring Data Analyst & Full-Stack Developer, leveraging <span className="text-primary font-medium">Python</span>, <span className="text-primary font-medium">SQL</span>, <span className="text-primary font-medium">Power BI</span>, <span className="text-primary font-medium">React</span>, and <span className="text-primary font-medium">Django</span> to build impactful, data-driven, and real-world solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  className="text-xs font-mono font-semibold px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-sky-400 hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Explore Projects <ChevronDown size={14} />
                </a>
                <button
                  onClick={() => openDrawer('chat')}
                  className="text-xs font-mono font-medium px-4 py-2.5 rounded-lg border border-border bg-card/80 hover:bg-secondary text-foreground hover:border-primary/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Bot size={14} className="text-primary" /> Ask AI About Me
                </button>
                <button
                  onClick={copyEmailToClipboard}
                  className="text-xs font-mono px-3.5 py-2.5 rounded-lg border border-border bg-card/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Impact Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            {[
              { value: '8.77', label: 'CGPA Score', sub: "B.Tech CSE '28" },
              { value: '3+', label: 'Featured Projects', sub: 'Data & Full-Stack' },
              { value: '6+', label: 'Certifications', sub: 'IIT Bombay & More' },
              { value: '2x', label: 'Leadership Roles', sub: 'TEDx & Anantam' }
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl border border-border/80 bg-card/50 hover:border-primary/40 hover:bg-secondary/40 transition-all">
                <div className="text-2xl font-bold font-mono text-primary">{stat.value}</div>
                <div className="text-xs font-semibold text-foreground mt-0.5">{stat.label}</div>
                <div className="text-[10px] font-mono text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Contact Details & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/80 pt-6">
            <div className="space-y-3">
              <a href="mailto:singhaswini19@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group">
                <Mail size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>singhaswini19@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group cursor-default">
                <Phone size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>+91 8116677579</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group cursor-default">
                <MapPin size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>Pune, Maharashtra 410401</span>
              </div>
            </div>

            <div className="space-y-3">
              <a href="https://www.linkedin.com/in/aswini-kumar-singh-422b78312" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group">
                <Linkedin size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>linkedin.com/singhaswini19</span>
              </a>
              <a href="https://github.com/aswinisingh31" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group">
                <Github size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>github.com/aswinisingh31</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1.5 group cursor-default">
                <Terminal size={16} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>PCU • Computer Science Engineering</span>
              </div>
            </div>
          </div>

          {/* Core Competencies by Group */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-mono flex items-center gap-2">
              <Layers size={13} className="text-primary" /> Technical Arsenal
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Python', tag: 'Core' },
                { name: 'SQL', tag: 'Data' },
                { name: 'Power BI', tag: 'Analytics' },
                { name: 'React', tag: 'Frontend' },
                { name: 'Django', tag: 'Backend' },
                { name: 'TypeScript', tag: 'Frontend' },
                { name: 'Node.js', tag: 'Backend' },
                { name: 'Excel & EDA', tag: 'Data' },
                { name: 'C / C++', tag: 'Core' },
                { name: 'Supabase', tag: 'Database' },
                { name: 'Git & GitHub', tag: 'Tools' },
                { name: 'UI/UX Design', tag: 'Design' }
              ].map(skill => (
                <span key={skill.name} className="text-xs px-3 py-1.5 border border-border/80 bg-card/60 font-mono text-slate-300 hover:text-foreground hover:border-primary/50 transition-all rounded-lg flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: EXPERIENCE                                        */}
        {/* ============================================================ */}
        <section id="experience" className="scroll-mt-28 space-y-6 section-reveal">
          <div className="flex items-center gap-3 mb-6 border-b border-border/80 pb-4">
            <Briefcase size={22} className="text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
          </div>

          <div className="space-y-8">

            {/* TrinexGlobal - Current Internship */}
            <div className="relative pl-6 border-l-2 border-primary/60 ml-1">
              <div className="absolute w-3.5 h-3.5 bg-emerald-500 rounded-full -left-[8px] top-1.5 ring-4 ring-background animate-pulse"></div>

              <div className="flex justify-between items-start mb-1 flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Management Information System Analyst</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/25 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sep 2026 — Oct 2026
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <p className="text-sm font-medium text-slate-400">TrinexGlobal</p>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">Remote · Internship</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Completed Internship</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <ul className="space-y-2 text-sm text-muted-foreground list-none flex-1">
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Analyzing and managing information systems data to support business decisions and operational efficiency.</li>
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Working remotely on MIS reporting, data organization, and system analysis tasks.</li>
                </ul>

                {/* Compact Offer Letter Attachment */}
                <a
                  href="/trinexglobal-offer-letter.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 group/offer flex items-center gap-2 px-3 py-2 border border-border/80 bg-card/60 rounded-xl hover:border-primary/50 hover:bg-secondary/60 transition-all shadow-sm text-left cursor-pointer"
                  title="View TrinexGlobal Offer Letter"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline></svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-foreground group-hover/offer:text-primary transition-colors">Offer Letter</p>
                    <p className="text-[9px] font-mono text-muted-foreground">TrinexGlobal · PDF</p>
                  </div>
                  <ExternalLink size={11} className="text-muted-foreground group-hover/offer:text-primary transition-colors ml-1" />
                </a>
              </div>
            </div>

            {/* 3Skill - Past Internship */}
            <div className="relative pl-6 border-l-2 border-border ml-1">
              <div className="absolute w-3.5 h-3.5 bg-primary rounded-full -left-[8px] top-1.5 ring-4 ring-background"></div>

              <div className="flex justify-between items-start mb-1 flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">Data Analyst Virtual Internship</h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/25">Jul - Aug 2026</span>
              </div>
              <p className="text-sm font-medium text-slate-400 mb-3">3 Skill Internship</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-between items-start mt-2">
                <ul className="space-y-2.5 text-sm text-muted-foreground list-none flex-1">
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Analyzed and cleaned datasets to ensure accuracy and consistency.</li>
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Performed Exploratory Data Analysis (EDA) to identify trends and patterns.</li>
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Used Excel, SQL, Python, and data visualization tools for data analysis.</li>
                  <li className="flex gap-2.5"><span className="text-primary font-bold">›</span> Created meaningful reports and interactive dashboards.</li>
                </ul>

                {/* Compact Certificate Preview Thumbnail with Lightbox */}
                <button
                  onClick={() => setLightboxImage({ src: '/3skill-certificate.png', title: '3Skill Data Analytics Internship Certificate' })}
                  className="shrink-0 group/cert block p-1.5 border border-border/80 bg-card rounded-xl hover:border-primary/60 transition-all shadow-md hover:shadow-xl max-w-[155px] cursor-pointer text-left"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-background">
                    <img
                      src="/3skill-certificate.png"
                      alt="3Skill Data Analytics Internship Certificate - Aswini Kumar Singh"
                      className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-mono bg-background/90 text-foreground px-2 py-0.5 rounded shadow flex items-center gap-1">
                        <Maximize2 size={10} /> View
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-muted-foreground px-0.5">
                    <span>Certificate</span>
                    <span className="text-[9px] text-primary">ID-INTERN</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: PROJECTS                                          */}
        {/* ============================================================ */}
        <section id="projects" className="scroll-mt-28 space-y-6 section-reveal">
          <div className="flex items-center gap-3 mb-6 border-b border-border/80 pb-4">
            <Code size={22} className="text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">

            {/* Project 1: E-Commerce Data Analysis */}
            <div className="card-reveal group relative border border-border/80 rounded-2xl hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 overflow-hidden bg-card/60">

              {/* Dashboard Preview Image with Lightbox Trigger */}
              <div
                onClick={() => setLightboxImage({ src: '/ecommerce-dashboard.png', title: 'E-Commerce Sales Dashboard (Power BI)' })}
                className="block relative overflow-hidden border-b border-border/80 group/img cursor-pointer"
              >
                <div className="relative aspect-[16/9] w-full max-h-[350px] overflow-hidden bg-black/40">
                  <img
                    src="/ecommerce-dashboard.png"
                    alt="E-Commerce Sales Dashboard (Power BI)"
                    className="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity"></div>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="text-xs font-mono bg-background/85 backdrop-blur-md text-foreground border border-border px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <BarChart3 size={12} className="text-primary" /> Power BI Dashboard
                    </span>
                    <span className="text-xs font-mono bg-primary text-primary-foreground font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                      <Maximize2 size={11} /> Expand
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 relative z-10 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                      E-Commerce Data Analysis Dashboard
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">Power BI • Excel • Data Modeling & Visualization</p>
                  </div>
                  <a
                    href="https://github.com/aswinisingh31/E-Commerce-Data-Analysis"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono px-3.5 py-1.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>View Repository</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground list-none">
                  <li className="flex gap-2"><span className="text-primary font-bold">›</span> Built an interactive Power BI dashboard to analyze sales, profit, quantity, and AOV using KPI cards and dynamic visualizations.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">›</span> Analyzed state-wise sales, monthly profit, customer performance, and product category trends.</li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {['Sales KPIs', 'Profit Trends', 'State-wise Analysis', 'Customer Insights', 'Interactive Slicers'].map(tag => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-slate-300 border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2: Resume Analyzer */}
            <div className="card-reveal group relative border border-border/80 rounded-2xl hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 overflow-hidden bg-card/60 p-6 space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                    Resume Analyzer "Resumind"
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">Node.js • React • TypeScript • Vite • NLP Parsing</p>
                </div>
                <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded">Full Stack Webapp</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground list-none">
                <li className="flex gap-2"><span className="text-primary font-bold">›</span> Built a web application that analyzes uploaded resumes and provides ATS score evaluations, keyword requirements, and missing skills.</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {['ATS Scoring', 'Resume Parsing', 'Keyword Matching', 'TypeScript'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-slate-300 border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 3: Tool Sarrthi */}
            <div className="card-reveal group relative border border-border/80 rounded-2xl hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 overflow-hidden bg-card/60 p-6 space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                    Tool Sarrthi
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">HTML • Tailwind CSS • React • Supabase</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">Marketplace</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground list-none">
                <li className="flex gap-2"><span className="text-primary font-bold">›</span> Developed a P2P Market Webapp focused on exchanging tools between users in communities.</li>
                <li className="flex gap-2"><span className="text-primary font-bold">›</span> Managed side for Borrower & Lender; both can list and exchange equipment with real-time database management.</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {['P2P Economy', 'Supabase Auth', 'Tool Listing', 'Tailwind CSS'].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-slate-300 border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: CERTIFICATIONS                                    */}
        {/* ============================================================ */}
        <section id="certifications" className="scroll-mt-28 space-y-6 section-reveal">
          <div className="flex items-center gap-3 mb-6 border-b border-border/80 pb-4">
            <Award size={22} className="text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Certifications & Honors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Introduction to Front-End Development",
              "Programming with C++",
              "Communicating Your Best Self",
              "Write Smarter with Overleaf and La-TeX",
              "Spoken Tutorial Project, IIT Bombay",
              "Foundations of Cyber security"
            ].map((cert, i) => (
              <div key={cert} className="cert-reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="group flex items-start justify-between gap-3 p-4 border border-border/80 bg-card/60 hover:border-primary/50 transition-colors rounded-xl shadow-sm h-full">
                  <div className="flex items-start gap-3">
                    <Award size={17} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-slate-200">{cert}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: HACKATHONS                                        */}
        {/* ============================================================ */}
        <section id="hackathons" className="scroll-mt-28 space-y-6 section-reveal">
          <div className="flex items-center gap-3 mb-6 border-b border-border/80 pb-4">
            <Lightbulb size={22} className="text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Hackathons</h2>
          </div>

          {/* Hackathon Project Card: Family HeartWell */}
          <div className="border border-border/80 bg-card/60 rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden group hover:border-rose-500/50 transition-all space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded flex items-center gap-1.5">
                    <Heart size={11} className="text-rose-400 fill-rose-400/30" />
                    HealthTech Innovation
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2.5 py-0.5 rounded">
                    Innovators Hackathon 2026
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-rose-400 transition-colors">
                  Family HeartWell
                </h3>
                <p className="text-sm font-medium text-rose-400 mt-1">
                  Connecting Families Through Smart Health & Medication Tracking
                </p>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded border border-border">
                Concept & Prototype
              </span>
            </div>

            <div className="border-l-2 border-rose-500/60 pl-4 py-1">
              <p className="text-sm font-medium text-slate-200 italic">
                "Being away from our parents should not mean being away from their well-being. ❤️"
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Worked on <span className="text-foreground font-semibold">Family HeartWell</span> during a hackathon—a concept focused on strengthening the connection between parents and their children when living apart.
              </p>
              <p>
                The platform empowers children to monitor their parents' medication schedules and critical health vitals remotely, while providing parents with an intuitive, simplified interface to manage daily healthcare needs with confidence and peace of mind.
              </p>
              <p>
                Working on this idea provided an opportunity to think beyond technology alone—focusing on empathetic engineering, real-life family challenges, and transforming concepts into practical, human-centered solutions.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/60">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Key Innovations & Learnings</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">›</span>
                  <span><strong>Remote Health Tracking:</strong> Designed unified scheduling and automated reminders for elderly medication compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">›</span>
                  <span><strong>Family Connectivity:</strong> Bridged the distance gap through transparent, shared health dashboards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">›</span>
                  <span><strong>Rapid Hackathon Prototyping:</strong> Collaborated within a cross-functional team under tight deadlines to formulate architecture, user flows, and problem-solving strategy.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Domains & Focus Areas</h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'HealthTech',
                  'Healthcare Technology',
                  'Technology for Good',
                  'Innovation',
                  'Problem Solving',
                  'Teamwork',
                  'Student Innovation'
                ].map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2.5 py-1 border border-border bg-background text-muted-foreground hover:text-foreground transition-colors rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Innovators Hackathon 2026 Certificate - Compact Horizontal with Lightbox */}
            <div className="pt-4 border-t border-border/60">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-rose-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Participation & Achievement Certificate
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">
                  Innovators Hackathon 2026 • NMIET Pune
                </span>
              </div>

              <button
                onClick={() => setLightboxImage({ src: '/innovators-hackathon-cert.png', title: 'Certificate of Achievement — Innovators Hackathon 2026' })}
                className="group/cert block w-full max-w-[360px] sm:max-w-[400px] overflow-hidden rounded-xl border border-border bg-background/50 hover:border-rose-500/50 transition-all duration-300 shadow-md hover:shadow-xl p-1.5 cursor-pointer text-left"
                title="Click to view full certificate"
              >
                <div className="relative aspect-[1024/723] overflow-hidden rounded-lg bg-black/40">
                  <img
                    src="/innovators-hackathon-cert.png"
                    alt="Certificate of Achievement - Innovators Hackathon 2026"
                    className="w-full h-full object-cover group-hover/cert:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono bg-background/90 text-foreground px-2.5 py-1 rounded shadow flex items-center gap-1.5">
                      <Maximize2 size={12} /> View Certificate
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-muted-foreground px-1">
                  <span>NMIET Campus, Pune • AIC T-Hub</span>
                  <span className="text-rose-400 flex items-center gap-1">Expand</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: EXTRACURRICULAR & EVENTS                          */}
        {/* ============================================================ */}
        <section id="events" className="scroll-mt-28 space-y-10 section-reveal">
          <div className="flex items-center gap-3 mb-6 border-b border-border/80 pb-4">
            <Star size={22} className="text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Extracurricular & Leadership</h2>
          </div>

          {/* EVENT 1: TEDxPCU 2026 Featured Event Card */}
          <div className="border border-border/80 bg-card/60 rounded-2xl shadow-xl overflow-hidden group hover:border-red-500/50 transition-all">
            {/* Top Banner Image with Lightbox */}
            <div
              onClick={() => setLightboxImage({ src: '/tedx-banner.png', title: 'TEDxPCU 2026 Official Event Banner' })}
              className="w-full h-44 sm:h-64 overflow-hidden relative bg-black/40 border-b border-border cursor-pointer group/img"
            >
              <img
                src="/tedx-banner.png"
                alt="TEDxPCU Event Banner"
                className="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
              <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white bg-red-600/80 backdrop-blur-md px-2.5 py-1 rounded">
                  TEDx Event 2026
                </span>
                <span className="text-[10px] font-mono bg-background/80 backdrop-blur-md text-foreground border border-border px-2 py-0.5 rounded opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1">
                  <Maximize2 size={10} /> View Banner
                </span>
              </div>
            </div>

            {/* Content Body with Details and ID Badge */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">

              {/* Left Column: Role Details & Skills */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                      Volunteering & Leadership
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-red-400 transition-colors">
                    TEDxPCU 2026
                  </h3>
                  <p className="text-base font-semibold text-red-500 mt-1">Logistics Lead</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Proud to contribute to <span className="text-foreground font-semibold">TEDxPCU 2026</span> as a Logistics Lead, supporting event logistics, team coordination, resource management, and on-ground execution. This role has given me an opportunity to strengthen my leadership, communication, coordination, and problem-solving skills.
                </p>

                <div className="space-y-3 pt-2 border-t border-border/60">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Key Responsibilities</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">›</span>
                      <span>Event logistics planning and resource allocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">›</span>
                      <span>Cross-functional team coordination and schedule management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">›</span>
                      <span>On-ground execution and real-time operational troubleshooting</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Skills Demonstrated</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Event Logistics', 'Team Coordination', 'Resource Management', 'Leadership', 'Problem Solving', 'Public Relations'].map(tag => (
                      <span key={tag} className="text-[11px] font-mono px-2.5 py-1 border border-border bg-background text-muted-foreground rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Official Badge Card with Lightbox */}
              <div className="w-full sm:w-64 shrink-0 flex flex-col items-center mx-auto md:mx-0">
                <button
                  onClick={() => setLightboxImage({ src: '/tedx-badge.png', title: 'Ashwani Singh — TEDxPCU Logistics Lead Badge' })}
                  className="relative group/badge overflow-hidden rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-500/15 hover:shadow-red-500/30 transition-all duration-500 bg-background max-w-[240px] cursor-pointer"
                >
                  <img
                    src="/tedx-badge.png"
                    alt="Ashwani Singh - TEDxPCU Logistics Badge"
                    className="w-full h-auto object-cover group-hover/badge:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/badge:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono bg-background/90 text-foreground px-2 py-1 rounded shadow flex items-center gap-1">
                      <Maximize2 size={11} /> View Badge
                    </span>
                  </div>
                </button>
                <span className="text-[11px] font-mono text-muted-foreground mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Official Logistics Lead Badge
                </span>
              </div>

            </div>
          </div>

          {/* EVENT 2: Anantam — Off-Stage Treasure Hunt */}
          <div className="border border-border/80 bg-card/60 rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Details Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Trophy size={12} className="text-amber-400" />
                      Event Management & Leadership
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2.5 py-0.5 rounded">
                      College Festival
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2.5 py-0.5 rounded">
                      2026
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-amber-400 transition-colors">
                    Anantam
                  </h3>
                  <p className="text-base font-semibold text-amber-400 mt-1 flex items-center gap-1.5">
                    <Compass size={16} />
                    Off-Stage Treasure Hunt Event Lead
                  </p>
                </div>

                <div className="border-l-2 border-amber-500/60 pl-4 py-1">
                  <p className="text-sm font-medium text-slate-200 italic">
                    "From First Experience to a Memorable Responsibility! ✨"
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Being part of <span className="text-foreground font-semibold">Anantam</span> and managing the Off-Stage Treasure Hunt event was a completely new experience for me—and honestly, an amazing one! 🏆 Managing the event, coordinating everything behind the scenes, and making sure it ran smoothly taught me a lot about teamwork, leadership, coordination, and handling responsibilities under pressure.
                </p>

                <p className="text-sm text-slate-300 leading-relaxed">
                  What makes this experience even more special is that it was my first time managing an event, and seeing everything come together successfully was truly rewarding. 🚀 This is just the beginning. I look forward to being a part of Anantam in the future with even more dedication, greater responsibility, and a mindset to work harder and contribute better.
                </p>

                <div className="space-y-3 pt-2 border-t border-border/60">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Key Responsibilities & Takeaways</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>Spearheaded end-to-end management for the Off-Stage Treasure Hunt competition.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>Coordinated behind-the-scenes event logistics and maintained smooth participant flow.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">›</span>
                      <span>Navigated fast-paced situations under pressure, developing leadership and teamwork agility.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Skills & Domains</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Event Management',
                      'Leadership',
                      'Teamwork',
                      'Coordination',
                      'Pressure Handling',
                      'Problem Solving',
                      'Strategic Planning'
                    ].map(tag => (
                      <span key={tag} className="text-[11px] font-mono px-2.5 py-1 border border-border bg-background text-muted-foreground hover:text-foreground transition-colors rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Media Gallery Column (5 cols) with Lightbox */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* Photo 1: Certificate & Trophy */}
                <button
                  onClick={() => setLightboxImage({ src: '/anantam-cert.jpg', title: 'Anantam Cultural Fest 2026 — Certificate of Appreciation & Trophy' })}
                  className="group/photo relative overflow-hidden rounded-xl border border-border/80 bg-background/50 hover:border-amber-500/50 transition-all duration-500 shadow-xl cursor-pointer text-left"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src="/anantam-cert.jpg"
                      alt="Ashwani holding Certificate of Appreciation & Trophy"
                      className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 group-hover/photo:opacity-75 transition-opacity"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 bg-background/90 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        Appreciation
                      </span>
                      <p className="text-xs text-foreground font-medium mt-1 truncate">
                        Certificate & Trophy
                      </p>
                    </div>
                  </div>
                </button>

                {/* Photo 2: Outdoor Trophy Pose */}
                <button
                  onClick={() => setLightboxImage({ src: '/anantam-trophy.jpg', title: 'Anantam Cultural Fest 2026 — Trophy Celebration' })}
                  className="group/photo relative overflow-hidden rounded-xl border border-border/80 bg-background/50 hover:border-amber-500/50 transition-all duration-500 shadow-xl cursor-pointer text-left"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src="/anantam-trophy.jpg"
                      alt="Ashwani holding the Anantam 2026 Trophy"
                      className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 group-hover/photo:opacity-75 transition-opacity"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 bg-background/90 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        Celebration
                      </span>
                      <p className="text-xs text-foreground font-medium mt-1 truncate">
                        Anantam 2026 Triumph
                      </p>
                    </div>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border/80 pt-8 pb-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Aswini Kumar Singh. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/aswinisingh31" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/aswini-kumar-singh-422b78312" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </footer>

      </main>

      {/* ============================================================ */}
      {/* FULLSCREEN IMAGE LIGHTBOX MODAL                              */}
      {/* ============================================================ */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-card border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
              <span className="text-sm font-semibold text-foreground truncate pr-4">{lightboxImage.title}</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* RIGHT: AI ASSISTANT & MESSAGING DRAWER                      */}
      {/* ============================================================ */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-[100dvh] w-full sm:w-[460px] flex flex-col bg-card border-l border-border/80 shrink-0 z-50 transition-transform duration-500 ease-in-out shadow-2xl",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 z-50 p-2 bg-background border border-border rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>

        {/* Panel Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActivePanel('chat')}
            className={cn(
              "flex-1 p-4 text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer",
              activePanel === 'chat' ? "bg-background border-b-2 border-primary text-primary" : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Bot size={16} />
            AI Assistant
          </button>
          <button
            onClick={() => setActivePanel('message')}
            className={cn(
              "flex-1 p-4 text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer",
              activePanel === 'message' ? "bg-background border-b-2 border-primary text-primary" : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <MessageSquare size={16} />
            Direct Message
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-hidden relative">

          {/* Chatbot View */}
          <div className={cn(
            "absolute inset-0 flex flex-col transition-opacity duration-300",
            activePanel === 'chat' ? "opacity-100 z-10" : "opacity-0 pointer-events-none -z-10"
          )}>

            {/* Quick Suggestion Chips */}
            <div className="p-3 border-b border-border/60 bg-secondary/30 flex gap-1.5 overflow-x-auto text-[11px] font-mono">
              {[
                "Skills & Tech",
                "Featured Projects",
                "TEDx & Anantam",
                "Internship"
              ].map(chip => (
                <button
                  key={chip}
                  onClick={() => handleAiAsk(`Tell me about your ${chip}`)}
                  className="px-2.5 py-1 rounded-full bg-card border border-border hover:border-primary text-slate-300 hover:text-foreground whitespace-nowrap cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div ref={chatMessagesRef} className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs",
                    msg.sender === 'user' ? "bg-accent text-white" : "bg-primary text-primary-foreground font-bold"
                  )}>
                    {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  <div className={cn(
                    "p-3.5 text-xs sm:text-sm rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed",
                    msg.sender === 'user'
                      ? "bg-accent/20 border border-accent/40 text-foreground rounded-tr-none"
                      : "bg-secondary/70 border border-border text-slate-200 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex gap-3 items-center text-xs font-mono text-muted-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot size={13} />
                  </div>
                  <div className="flex gap-1 items-center bg-secondary/70 border border-border px-3 py-2 rounded-2xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-background">
              <form
                className="relative flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiAsk(chatInput);
                }}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about projects, skills, education..."
                  className="w-full bg-secondary/60 border border-border p-3 pr-12 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-xl font-mono placeholder:text-muted-foreground/60 text-foreground"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="absolute right-2.5 p-1.5 text-muted-foreground hover:text-primary disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>

          {/* Direct Message View */}
          <div className={cn(
            "absolute inset-0 flex flex-col transition-opacity duration-300 overflow-y-auto bg-background",
            activePanel === 'message' ? "opacity-100 z-10" : "opacity-0 pointer-events-none -z-10"
          )}>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-1 text-foreground">Get in Touch</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Send a direct message or inquiry to Aswini. He will receive your note and get back to you shortly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <Check size={32} className="text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-foreground">Message Sent Successfully!</h4>
                  <p className="text-xs text-muted-foreground">Thank you for reaching out. Aswini will reply to your email soon.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Name</label>
                    <input
                      id="name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-secondary/50 border border-border p-3 text-xs sm:text-sm focus:outline-none focus:border-primary rounded-lg transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full bg-secondary/50 border border-border p-3 text-xs sm:text-sm focus:outline-none focus:border-primary rounded-lg transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Subject</label>
                    <input
                      id="subject"
                      required
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project inquiry / Opportunity"
                      className="w-full bg-secondary/50 border border-border p-3 text-xs sm:text-sm focus:outline-none focus:border-primary rounded-lg transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, team, or opportunity..."
                      className="w-full bg-secondary/50 border border-border p-3 text-xs sm:text-sm focus:outline-none focus:border-primary rounded-lg transition-all resize-none text-foreground"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold p-3.5 text-xs sm:text-sm rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
                  >
                    Send Message
                    <Send size={15} />
                  </button>
                </form>
              )}

              {/* Direct Mailto shortcut */}
              <div className="text-center pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Prefer direct email? </span>
                <a href="mailto:singhaswini19@gmail.com" className="text-xs text-primary hover:underline font-mono">
                  singhaswini19@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* Backdrop for open drawer on mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

    </div>
  );
}
