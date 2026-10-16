import { useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, Database, Braces, Layers3, Terminal, ExternalLink, Send,
  MapPin, GraduationCap, CheckCircle2, Sparkles
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const skills = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'C / C++'], icon: Braces },
  { title: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'Responsive UI'], icon: Code2 },
  { title: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'], icon: Layers3 },
  { title: 'Database & Tools', items: ['MySQL', 'MongoDB', 'Git', 'GitHub', 'Postman'], icon: Database },
]

const projects = [
  {
    number: '01',
    title: 'Vehicle Rental System',
    description: 'A web-based application concept for managing vehicle listings, customer bookings, rental records, and availability.',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    accent: 'mint',
    code: 'VR'
  },
  {
    number: '02',
    title: 'Courier Management System',
    description: 'A management system to organize shipment details, track parcel status, and simplify courier operations.',
    tags: ['Java', 'REST API', 'MySQL'],
    accent: 'purple',
    code: 'CM'
  },
  {
    number: '03',
    title: 'AI-Driven Criminal Face Recognition',
    description: 'An image-upload workflow that compares detected faces with an authorized dataset and can send an email alert on a match.',
    tags: ['Python', 'Machine Learning', 'OpenCV'],
    accent: 'orange',
    code: 'AI'
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const goTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function submitContact(e) {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', message: '' })
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Could not send your message. Please try again.')
      setStatus({ type: 'success', message: 'Message sent successfully. Thanks for reaching out!' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: `${error.message} Make sure the Java backend is running.` })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => goTo('home')} aria-label="Go to home">
            <span className="brand-mark">A<span>.</span></span><span>AKASH HEGADI</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button key={item} onClick={() => goTo(item.toLowerCase())}>{item}</button>
            ))}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <div className="availability"><span className="pulse" /> OPEN TO OPPORTUNITIES</div>
            <p className="eyebrow">HELLO, I'M</p>
            <h1>Akash<br /><span>Mallappa Hegadi.</span></h1>
            <h2>Software Developer <span className="dot">/</span> Full-Stack Enthusiast</h2>
            <p className="hero-description">
              I build practical, reliable applications with clean code and thoughtful user experiences.
              Currently strengthening my skills in Java backend development and modern React interfaces.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => goTo('projects')}>Explore my work <ArrowDownRight size={17} /></button>
              <button className="button button-quiet" onClick={() => goTo('contact')}>Get in touch <ArrowUpRight size={16} /></button>
            </div>
            <div className="social-row">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="mailto:your.email@example.com" aria-label="Email"><Mail size={18} /></a>
              <span className="social-divider" /><span className="social-note">Tumkur, Karnataka, India</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-grid" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="profile-card">
              <div className="profile-card-top"><span className="window-dots"><i /><i /><i /></span><span>developer.js</span><span className="live-label">LIVE</span></div>
              <div className="code-content">
                <p><span className="code-muted">01</span> <span className="code-purple">const</span> developer = {'{'}</p>
                <p><span className="code-muted">02</span> &nbsp; name: <span className="code-green">'Akash Hegadi'</span>,</p>
                <p><span className="code-muted">03</span> &nbsp; role: <span className="code-green">'Software Developer'</span>,</p>
                <p><span className="code-muted">04</span> &nbsp; stack: [</p>
                <p><span className="code-muted">05</span> &nbsp;&nbsp; <span className="code-blue">'Java'</span>, <span className="code-blue">'React'</span>,</p>
                <p><span className="code-muted">06</span> &nbsp;&nbsp; <span className="code-blue">'Spring Boot'</span></p>
                <p><span className="code-muted">07</span> &nbsp; ],</p>
                <p><span className="code-muted">08</span> &nbsp; learning: <span className="code-green">true</span></p>
                <p><span className="code-muted">09</span> {'}'}</p>
                <p className="code-cursor"><span className="code-muted">10</span> <span className="cursor" /></p>
              </div>
              <div className="profile-card-bottom"><span><span className="status-dot" /> Ready to build</span><span>UTF-8</span></div>
            </div>
            <div className="float-chip chip-java"><span className="chip-icon">☕</span><span><b>Java</b><small>Backend</small></span></div>
            <div className="float-chip chip-react"><span className="react-symbol">⚛</span><span><b>React</b><small>Frontend</small></span></div>
            <div className="hero-stamp"><Sparkles size={15} /> BUILD · LEARN · REPEAT</div>
          </div>
          <button className="scroll-cue" onClick={() => goTo('about')}><span /> SCROLL TO EXPLORE <ArrowDownRight size={14} /></button>
        </section>

        <section id="about" className="section-shell section-block">
          <div className="section-heading"><p className="eyebrow">01 / ABOUT ME</p><h2>Curious by nature.<br /><span>Developer by choice.</span></h2></div>
          <div className="about-grid">
            <div className="about-lead"><p className="large-copy">I’m an Information Science and Engineering graduate focused on turning ideas into useful software.</p><p>I enjoy solving problems, learning how systems work, and building applications from the interface to the backend. I value readable code, continuous improvement, and collaboration.</p><p>My current focus is Java, Spring Boot, REST APIs, React, and database-driven applications.</p></div>
            <div className="about-facts">
              <div className="fact-card"><GraduationCap size={20} /><div><span>EDUCATION</span><b>B.E. Information Science & Engineering</b><small>Shridevi Institute of Engineering and Technology</small></div></div>
              <div className="fact-card"><MapPin size={20} /><div><span>BASED IN</span><b>Tumkur, Karnataka</b><small>India</small></div></div>
              <div className="fact-card"><Terminal size={20} /><div><span>INTERESTS</span><b>Software Development</b><small>Backend systems · Web applications · Problem solving</small></div></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell section-block">
          <div className="section-heading heading-row"><div><p className="eyebrow">02 / TOOLKIT</p><h2>Tools I use to<br /><span>make things work.</span></h2></div><p className="heading-aside">A growing toolkit for building maintainable, full-stack applications.</p></div>
          <div className="skills-grid">
            {skills.map(({ title, items, icon: Icon }, index) => <article className="skill-card" key={title}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={20} /></span><span className="card-index">0{index + 1}</span></div>
              <h3>{title}</h3><div className="tag-list">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>)}
          </div>
        </section>

        <section id="projects" className="section-shell section-block">
          <div className="section-heading heading-row"><div><p className="eyebrow">03 / SELECTED WORK</p><h2>Projects with a<br /><span>purpose.</span></h2></div><p className="heading-aside">A selection of academic and personal projects. Add repository and demo links when ready.</p></div>
          <div className="projects-list">
            {projects.map((project) => <article className={`project-card ${project.accent}`} key={project.number}>
              <div className="project-number">{project.number}</div>
              <div className="project-art"><div className="art-ring" /><span>{project.code}</span><div className="art-cross">+</div></div>
              <div className="project-info"><p className="eyebrow">FEATURED PROJECT</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
              <a className="project-link" href="https://github.com/" target="_blank" rel="noreferrer" aria-label={`GitHub for ${project.title}`}><ArrowUpRight size={20} /></a>
            </article>)}
          </div>
        </section>

        <section className="statement-band"><div className="section-shell statement-inner"><span className="statement-mark">“</span><p>Good software is built with <span>curiosity, consistency,</span> and care.</p><span className="statement-sign">— MY APPROACH</span></div></section>

        <section id="contact" className="section-shell section-block contact-section">
          <div className="contact-copy"><p className="eyebrow">04 / CONTACT</p><h2>Have a project<br />in <span>mind?</span></h2><p>I’m open to junior software development opportunities, collaboration, and conversations about building useful products.</p><a className="email-link" href="mailto:your.email@example.com"><Mail size={18} /> your.email@example.com <ArrowUpRight size={15} /></a><div className="contact-note"><span className="pulse" /> Usually happy to connect</div></div>
          <form className="contact-form" onSubmit={submitContact}>
            <div className="form-heading"><span>DROP A MESSAGE</span><Send size={17} /></div>
            <label>Your name<input name="name" value={form.name} onChange={update} placeholder="What should I call you?" required minLength={2} maxLength={100} /></label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required maxLength={150} /></label>
            <label>Subject <span className="optional">(optional)</span><input name="subject" value={form.subject} onChange={update} placeholder="What's this about?" maxLength={150} /></label>
            <label>Your message<textarea name="message" value={form.message} onChange={update} placeholder="Tell me a little about it..." required minLength={5} maxLength={3000} rows={4} /></label>
            {status.message && <p className={`form-status ${status.type}`} role="status">{status.type === 'success' ? <CheckCircle2 size={17} /> : null}{status.message}</p>}
            <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <ArrowUpRight size={17} /></button>
          </form>
        </section>
      </main>

      <footer className="footer"><div className="section-shell footer-inner"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>AKASH HEGADI</span></a><span>Designed with purpose · Built with React & Java</span><button onClick={() => goTo('home')}>BACK TO TOP ↑</button></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Akash Hegadi</span><span>Keep learning. Keep building.</span></div></footer>
    </>
  )
}

export default App
