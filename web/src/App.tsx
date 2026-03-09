import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface Question { question: string; idealAnswer: string; tips: string; }
interface Interview { company: string; role: string; difficulty: string; questions: Question[]; }

function SimPage() {
  const [company, setCompany] = useState(''); const [role, setRole] = useState(''); const [diff, setDiff] = useState('medium');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<Interview | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const generate = useAction(api.ai.generateInterview);
  const save = useMutation(api.functions.saveInterview);

  const handleGenerate = useCallback(async () => {
    if (!company.trim() || !role.trim()) return; setLoading(true);
    try {
      const r = await generate({ company: company.trim(), role: role.trim(), difficulty: diff }); setResult(r); await save(r);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [company, role, diff, generate, save]);

  const toggle = (i: number) => { const s = new Set(expanded); s.has(i) ? s.delete(i) : s.add(i); setExpanded(s); };

  return (
    <div className="main-content"><div className="sim-page">
      <h1 className="sim-title">Ace Your <span className="accent">Interview</span></h1>
      <p className="sim-subtitle">Enter any company and role — get realistic interview questions with ideal answers.</p>
      <div className="input-row">
        <input className="input-field" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company (e.g. Google)" />
        <input className="input-field" value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g. Senior SWE)" />
      </div>
      <div className="diff-chips">
        {['easy', 'medium', 'hard', 'expert'].map(d => (<button key={d} className={`diff-chip ${diff === d ? 'selected' : ''}`} onClick={() => setDiff(d)}>{d}</button>))}
      </div>
      <button className="btn-generate" disabled={!company.trim() || !role.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Generating...' : '🎯 Generate Questions'}</button>
      {loading && <div className="loading-dots"><span /><span /><span /></div>}
      {result && !loading && result.questions.map((q, i) => (
        <div key={i} className={`q-card ${expanded.has(i) ? 'expanded' : ''}`}>
          <div className="q-num">Question {i + 1}</div>
          <div className="q-text">{q.question}</div>
          <button className="q-toggle" onClick={() => toggle(i)}>{expanded.has(i) ? '▲ Hide Answer' : '▼ Show Answer'}</button>
          <div className="q-details"><div className="q-ideal"><strong>Ideal Answer:</strong><br />{q.idealAnswer}</div><div className="q-tips">💡 {q.tips}</div></div>
        </div>
      ))}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app-container">
    <header className="header"><a href="/" className="header-logo"><span style={{ fontSize: '1.5rem' }}>🎯</span><div><h1>InterviewSim</h1></div></a></header>
    <Routes><Route path="/" element={<SimPage />} /></Routes>
    <footer className="footer">© {new Date().getFullYear()} InterviewSim — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
