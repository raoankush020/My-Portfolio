import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, BrainCircuit, CheckCircle2, Github, Linkedin, Mail, Menu, Sparkles } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getRagStatus, predictSentiment, type SentimentResult } from "./api";

const projects = [
  {
    number: "01",
    title: "RAG Hallucination Detector",
    type: "Retrieval-augmented generation · NLP",
    description: "A system designed to compare generated claims with retrieved evidence and surface unsupported statements.",
    tags: ["RAG", "Embeddings", "Vector Search"],
    status: "Integration pending",
  },
  {
    number: "02",
    title: "NLP Sentiment Analyzer",
    type: "Supervised machine learning",
    description: "An interactive text classifier using TF-IDF features and Logistic Regression through a Python API.",
    tags: ["scikit-learn", "TF-IDF", "FastAPI"],
    status: "Working demo",
  },
  {
    number: "03",
    title: "Model Evaluation Lab",
    type: "Model evaluation · Data visualization",
    description: "Planned comparison of classification models using precision, recall, F1-score and confusion matrices.",
    tags: ["Evaluation", "Metrics", "Recharts"],
    status: "Planned",
  },
];

function App() {
  const [text, setText] = useState("I really enjoyed building this useful project");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ragMessage, setRagMessage] = useState("Checking RAG integration…");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getRagStatus()
      .then((status) => setRagMessage(status.configured ? "Connected" : "Integration pending"))
      .catch(() => setRagMessage("API offline"));
  }, []);

  async function runPrediction() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const prediction = await predictSentiment(text);
      setResult(prediction);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Could not reach the API. Start the backend and try again.");
    } finally {
      setLoading(false);
    }
  }

  const chartData = result
    ? Object.entries(result.probabilities).map(([label, probability]) => ({ label, probability: Math.round(probability * 100) }))
    : [];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Portfolio home"><span className="brand-mark">A</span><span>ANKUSH RAO<span className="brand-sub">AI / ML PORTFOLIO</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={20} /></button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#playground" onClick={() => setMenuOpen(false)}>ML Playground</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="button button-dark top-cta" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> OPEN TO AI/ML INTERNSHIPS</div>
            <h1>Building useful things with <span>data & intelligence.</span></h1>
            <p className="hero-description">I'm Ankush Rao, a Computer Science student focused on machine learning, NLP, and full-stack AI applications. I turn concepts into projects people can explore.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">Explore projects <ArrowDownRight size={17} /></a>
              <a className="button button-light" href="#contact">Contact me <Mail size={16} /></a>
            </div>
            <div className="hero-meta"><span><span className="tiny-dot" /> Based in India</span><span>Python · ML · React</span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-top"><span>LEARNING / BUILDING / ITERATING</span><Sparkles size={17} /></div>
            <div className="visual-center"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="core"><BrainCircuit size={46} strokeWidth={1.35} /></div><span className="orbit-label label-one">NLP</span><span className="orbit-label label-two">ML</span><span className="orbit-label label-three">RAG</span></div>
            <div className="visual-bottom"><span>Curiosity → Experiments → Impact</span><span className="visual-index">01 / 03</span></div>
          </div>
        </section>

        <section className="ticker"><div>PYTHON <span>✳</span> MACHINE LEARNING <span>✳</span> NLP <span>✳</span> FASTAPI <span>✳</span> REACT <span>✳</span> DATA VISUALIZATION <span>✳</span> PYTHON <span>✳</span> MACHINE LEARNING</div></section>

        <section className="section-wrap about-section" id="about">
          <div className="section-heading"><span className="section-kicker">01 / ABOUT</span><h2>Curious by nature.<br /><span>Engineer by practice.</span></h2></div>
          <div className="about-content"><p className="large-copy">I enjoy understanding how intelligent systems work—and building clear, practical interfaces around them.</p><p>My current focus is strengthening my foundations in machine learning, NLP, model evaluation, and backend APIs while building projects that demonstrate the full journey from data to user experience.</p><div className="skill-list"><span>Python</span><span>scikit-learn</span><span>NLP</span><span>React</span><span>TypeScript</span><span>FastAPI</span><span>Git & GitHub</span></div></div>
        </section>

        <section className="projects-section" id="projects"><div className="section-wrap"><div className="section-heading heading-row"><div><span className="section-kicker">02 / SELECTED WORK</span><h2>Projects with a <span>purpose.</span></h2></div><span className="muted-note">A work in progress — built in public.</span></div>
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><div className="project-card-top"><span>{project.number} / PROJECT</span><ArrowUpRight size={18} /></div><div className="project-art"><div className="art-grid"></div>{project.number === "01" ? <div className="rag-art"><span className="art-pill">SOURCE</span><span className="art-line"></span><span className="art-pill accent-pill">CLAIM CHECK</span><span className="art-line short-line"></span><span className="art-pill">EVIDENCE</span></div> : project.number === "02" ? <div className="sentiment-art"><div className="sentiment-bar bar-one"></div><div className="sentiment-bar bar-two"></div><div className="sentiment-bar bar-three"></div><div className="sentiment-labels"><span>NEG</span><span>NEU</span><span>POS</span></div></div> : <div className="metric-art"><span>F1 SCORE</span><strong>—</strong><div className="metric-line"></div><span>PRECISION / RECALL</span></div>}</div><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-status"><span className={project.status === "Working demo" ? "status-dot" : "status-dot status-muted"} />{project.status}</div></article>)}</div>
        </div></section>

        <section className="section-wrap playground-section" id="playground"><div className="section-heading"><span className="section-kicker">03 / INTERACTIVE DEMO</span><h2>Try the <span>ML Playground.</span></h2><p className="section-intro">Enter a short sentence and send it to the Python API. This starter model is trained on a tiny sample dataset, so treat predictions as a technical demo—not a reliable sentiment assessment.</p></div>
          <div className="playground-card"><div className="playground-main"><div className="playground-header"><div><span className="live-label"><span className="status-dot" /> LIVE API DEMO</span><h3>Sentiment analyzer</h3></div><span className="model-label">TF-IDF + Logistic Regression</span></div><label htmlFor="sentiment-text">YOUR TEXT</label><textarea id="sentiment-text" value={text} onChange={(event) => setText(event.target.value)} maxLength={2000} placeholder="Type a sentence to classify…" /><div className="playground-footer"><span>{text.length}/2000 characters</span><button className="button button-dark" onClick={runPrediction} disabled={loading || text.trim().length < 2}>{loading ? "Analyzing…" : "Analyze text"} <ArrowUpRight size={16} /></button></div>{error && <p className="error-message">{error}</p>}</div>
            <div className="playground-result"><span className="result-kicker">MODEL OUTPUT</span>{result ? <><div className="result-label">{result.label}</div><div className="confidence-line"><span>Confidence</span><strong>{Math.round(result.confidence * 100)}%</strong></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={150}><BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 4 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8e8e5" /><XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#777" }} unit="%" /><YAxis type="category" dataKey="label" width={58} tick={{ fontSize: 11, fill: "#555" }} /><Tooltip formatter={(value) => [`${value}%`, "Probability"]} /><Bar dataKey="probability" fill="#435b49" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div><p className="model-note">{result.model_note}</p></> : <div className="empty-result"><div className="empty-icon"><BrainCircuit size={28} /></div><p>Your prediction and class probabilities will appear here.</p><span>Run an analysis to get started.</span></div>}</div>
          </div>
        </section>

        <section className="section-wrap approach-section"><div className="section-heading"><span className="section-kicker">04 / HOW I WORK</span><h2>From concept to <span>working system.</span></h2></div><div className="approach-grid"><div><span className="approach-num">01</span><h3>Understand</h3><p>Define the problem, inspect the data, and choose a measurable baseline.</p></div><div><span className="approach-num">02</span><h3>Experiment</h3><p>Train, compare, and evaluate models with appropriate metrics and test data.</p></div><div><span className="approach-num">03</span><h3>Deliver</h3><p>Expose a useful API, build a clear interface, and document limitations honestly.</p></div></div></section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div><span className="section-kicker">05 / CONTACT</span><h2>Have a problem<br />worth <span>solving?</span></h2><p>I'm looking for opportunities to learn, contribute, and build practical AI products.</p></div><div className="contact-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={19} /> GitHub <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn <ArrowUpRight size={16} /></a><a href="mailto:your.email@example.com"><Mail size={19} /> Email me <ArrowUpRight size={16} /></a><span className="contact-hint">Replace these links with your real profiles and email.</span></div></div></section>
      </main>
      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">A</span><span>ANKUSH RAO<span className="brand-sub">AI / ML PORTFOLIO</span></span></a><span>Designed to learn. Built to improve. © {new Date().getFullYear()}</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}

export default App;
