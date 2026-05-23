import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
 
const AVATAR_COLORS = [
  "#6C63FF","#FF6584","#43D9AD","#FFB347","#A78BFA",
  "#38BDF8","#FB7185","#34D399","#FBBF24","#F472B6",
];
 
const MOCK_PATIENTS = [
  {
    id: 1, name: "Ana Souza", age: 32,
    diagnosis: "Ansiedade Generalizada",
    phone: "(11) 99999-1234", email: "ana.souza@email.com",
    sessions: 12, lastSession: "2026-05-20", nextSession: "2026-05-27",
    status: "ativo", avatar: "AS", color: "#6C63FF",
    notes: [
      { date: "2026-05-20", text: "Paciente relata melhora no sono. Técnicas de respiração têm ajudado. Continua com pensamentos ruminativos pela manhã." },
      { date: "2026-05-13", text: "Sessão focada em reestruturação cognitiva. Identificamos padrões de catastrofização." },
      { date: "2026-05-06", text: "Introdução às técnicas de mindfulness. Boa receptividade." },
    ],
    evolution: null, loadingEvo: false,
  },
  {
    id: 2, name: "Carlos Lima", age: 45,
    diagnosis: "Depressão Moderada",
    phone: "(11) 98888-5678", email: "carlos.lima@email.com",
    sessions: 8, lastSession: "2026-05-18", nextSession: "2026-05-25",
    status: "ativo", avatar: "CL", color: "#FF6584",
    notes: [
      { date: "2026-05-18", text: "Melhora no humor geral. Voltou a praticar atividades que antes gostava. Ainda com dificuldade de motivação matinal." },
      { date: "2026-05-11", text: "Trabalhou-se com ativação comportamental. Paciente relata isolamento social." },
    ],
    evolution: null, loadingEvo: false,
  },
  {
    id: 3, name: "Beatriz Moura", age: 27,
    diagnosis: "Transtorno de Pânico",
    phone: "(21) 97777-9012", email: "beatriz.moura@email.com",
    sessions: 5, lastSession: "2026-05-19", nextSession: "2026-05-26",
    status: "ativo", avatar: "BM", color: "#43D9AD",
    notes: [
      { date: "2026-05-19", text: "Primeiro episódio sem ida ao pronto-socorro. Grande avanço. Psicoeducação sobre os sintomas físicos do pânico foi bem assimilada." },
    ],
    evolution: null, loadingEvo: false,
  },
  {
    id: 4, name: "Ricardo Alves", age: 38,
    diagnosis: "Estresse Pós-Traumático",
    phone: "(31) 96666-3456", email: "ricardo.alves@email.com",
    sessions: 20, lastSession: "2026-05-15", nextSession: "2026-06-02",
    status: "ativo", avatar: "RA", color: "#FFB347",
    notes: [
      { date: "2026-05-15", text: "Sessão de EMDR. Paciente conseguiu processar memória do acidente sem dissociar. Resposta emocional mais regulada." },
      { date: "2026-05-08", text: "Avaliação dos progressos. Redução significativa de pesadelos relatada." },
      { date: "2026-05-01", text: "Trabalho com exposição gradual a estímulos relacionados ao trauma." },
    ],
    evolution: null, loadingEvo: false,
  },
  {
    id: 5, name: "Fernanda Costa", age: 22,
    diagnosis: "Fobia Social",
    phone: "(41) 95555-7890", email: "fernanda.costa@email.com",
    sessions: 3, lastSession: "2026-05-21", nextSession: "2026-05-28",
    status: "novo", avatar: "FC", color: "#A78BFA",
    notes: [
      { date: "2026-05-21", text: "Anamnese completa. Histórico de bullying na adolescência. Alta autocrítica. Evitação de situações sociais há 3 anos." },
    ],
    evolution: null, loadingEvo: false,
  },
];
 
const RECENT_SESSIONS = [
  { patient: "Ana Souza",     date: "2026-05-20", duration: "50min", type: "TCC" },
  { patient: "Fernanda Costa", date: "2026-05-21", duration: "60min", type: "Anamnese" },
  { patient: "Beatriz Moura", date: "2026-05-19", duration: "50min", type: "TCC" },
  { patient: "Ricardo Alves", date: "2026-05-15", duration: "60min", type: "EMDR" },
  { patient: "Carlos Lima",   date: "2026-05-18", duration: "50min", type: "TCC" },
];
 
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",       icon: "🏠", section: "main" },
  { id: "patients",  label: "Pacientes",        icon: "👥", section: "main" },
  { id: "sessions",  label: "Sessões",          icon: "📋", section: "main" },
  { id: "agenda",    label: "Agenda",           icon: "📅", section: "main" },
  { id: "reports",   label: "Relatórios",       icon: "📊", section: "extra" },
  { id: "plan",      label: "Meu Plano",        icon: "⭐", section: "extra" },
  { id: "settings",  label: "Configurações",    icon: "⚙️", section: "extra" },
];
 
const PLAN_FEATURES = [
  "Pacientes ilimitados",
  "Evolução com IA ilimitada",
  "Prontuário digital completo",
  "Agenda integrada",
  "Relatórios PDF",
  "Backup automático",
  "Suporte prioritário",
  "Múltiplos psicólogos",
];
 
// ── HELPERS ─────────────────────────────────────────────────────────────────
 
function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
 
// ── TOAST ────────────────────────────────────────────────────────────────────
 
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">✅ {msg}</div>;
}
 
// ── SIDEBAR ──────────────────────────────────────────────────────────────────
 
function Sidebar({ active, setActive, isOpen, onClose }) {
  const mainItems  = NAV_ITEMS.filter(n => n.section === "main");
  const extraItems = NAV_ITEMS.filter(n => n.section === "extra");
 
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">PsicoIA</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Fechar menu">✕</button>
        </div>
 
        <nav className="sidebar-nav">
          <p className="nav-section-label">Principal</p>
          {mainItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "nav-item--active" : ""}`}
              onClick={() => { setActive(item.id); onClose(); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          <p className="nav-section-label">Conta</p>
          {extraItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "nav-item--active" : ""}`}
              onClick={() => { setActive(item.id); onClose(); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
 
        {/* Plan mini card */}
        <div className="sidebar-plan">
          <div className="plan-card">
            <div className="plan-header">
              <span className="plan-name">⭐ Plano Plus</span>
              <span className="plan-badge">ATIVO</span>
            </div>
            <p className="plan-desc">5 de 15 pacientes usados este mês.</p>
            <div className="plan-progress-label">
              <span>Pacientes</span>
              <span>5/15</span>
            </div>
            <div className="plan-progress-bar">
              <div className="plan-progress-fill" style={{ width: "33%" }} />
            </div>
            <button className="plan-upgrade-btn" onClick={() => {}}>Fazer upgrade →</button>
          </div>
        </div>
 
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">MF</div>
            <div className="user-info">
              <p className="user-name">Dra. Mariana Faria</p>
              <p className="user-role">CRP 06/12345</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
 
// ── STAT CARD ────────────────────────────────────────────────────────────────
 
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color + "20", color }}>{icon}</div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}
 
// ── NEW SESSION MODAL ─────────────────────────────────────────────────────────
 
function NewSessionModal({ patients, onClose, onSave }) {
  const [form, setForm] = useState({ patient: "", date: "", time: "", type: "TCC", notes: "" });
  const set = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
 
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📋 Nova Sessão</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Paciente</label>
            <select name="patient" value={form.patient} onChange={set}>
              <option value="">Selecione um paciente...</option>
              {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input type="date" name="date" value={form.date} onChange={set} />
            </div>
            <div className="form-group">
              <label>Horário</label>
              <input type="time" name="time" value={form.time} onChange={set} />
            </div>
          </div>
          <div className="form-group">
            <label>Tipo de sessão</label>
            <select name="type" value={form.type} onChange={set}>
              <option>TCC</option><option>Psicanálise</option>
              <option>EMDR</option><option>Anamnese</option><option>Avaliação</option>
            </select>
          </div>
          <div className="form-group">
            <label>Observações iniciais</label>
            <textarea name="notes" rows={3} value={form.notes} onChange={set} placeholder="Anotações para esta sessão..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary" onClick={() => { onSave(form); onClose(); }}>
            Agendar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ── ADD PATIENT MODAL ─────────────────────────────────────────────────────────
 
function AddPatientModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", age: "", phone: "", email: "",
    diagnosis: "", color: AVATAR_COLORS[0], notes: "",
  });
  const set = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
 
  const handleSave = () => {
    if (!form.name.trim() || !form.diagnosis.trim()) return;
    onSave(form);
    onClose();
  };
 
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 Novo Paciente</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-divider">Dados pessoais</div>
          <div className="form-group">
            <label>Nome completo *</label>
            <input name="name" value={form.name} onChange={set} placeholder="Ex: Maria Silva" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Idade</label>
              <input name="age" type="number" min="1" max="120" value={form.age} onChange={set} placeholder="30" />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input name="phone" value={form.phone} onChange={set} placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input name="email" type="email" value={form.email} onChange={set} placeholder="paciente@email.com" />
          </div>
 
          <div className="form-divider">Informações clínicas</div>
          <div className="form-group">
            <label>Diagnóstico / Queixa principal *</label>
            <input name="diagnosis" value={form.diagnosis} onChange={set} placeholder="Ex: Ansiedade Generalizada" />
          </div>
          <div className="form-group">
            <label>Observações iniciais</label>
            <textarea name="notes" rows={3} value={form.notes} onChange={set} placeholder="Motivo da consulta, histórico relevante..." />
          </div>
 
          <div className="form-divider">Cor do avatar</div>
          <div className="color-picker">
            {AVATAR_COLORS.map(c => (
              <div
                key={c}
                className={`color-dot ${form.color === c ? "color-dot--selected" : ""}`}
                style={{ background: c }}
                onClick={() => setForm(f => ({ ...f, color: c }))}
              />
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button
            className="btn btn--primary"
            onClick={handleSave}
            disabled={!form.name.trim() || !form.diagnosis.trim()}
          >
            Cadastrar Paciente
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ── PATIENT CARD ──────────────────────────────────────────────────────────────
 
function PatientCard({ patient, onClick }) {
  return (
    <div className="patient-card" onClick={() => onClick(patient)}>
      <div className="patient-card-header">
        <div className="patient-avatar" style={{ background: patient.color + "22", color: patient.color }}>
          {patient.avatar}
        </div>
        <div className="patient-info">
          <h3>{patient.name}</h3>
          <p>{patient.diagnosis}</p>
        </div>
        <span className={`badge ${patient.status === "novo" ? "badge--info" : "badge--success"}`}>
          {patient.status === "novo" ? "Novo" : "Ativo"}
        </span>
      </div>
      <div className="patient-card-meta">
        <span>🗓️ {patient.sessions} sessões</span>
        <span>📅 {patient.lastSession}</span>
        <span>⏭️ {patient.nextSession}</span>
      </div>
    </div>
  );
}
 
// ── EVOLUTION BLOCK ───────────────────────────────────────────────────────────
 
function EvoBlock({ evo }) {
  if (!evo) return null;
  return (
    <div className="evo-result">
      <div className="evo-header">
        <span className="evo-badge">✨ Análise gerada por IA</span>
      </div>
      <div className="evo-content">
        {evo.split("\n").filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  );
}
 

 
function PatientDetail({ patient, onBack, onGenerateEvo, onUpdatePatient }) {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState("");
 
  const addNote = () => {
    if (!newNote.trim()) return;
    const today = new Date().toISOString().split("T")[0];
    onUpdatePatient(patient.id, { notes: [{ date: today, text: newNote }, ...patient.notes] });
    setNewNote("");
    setShowNoteForm(false);
  };
 
  return (
    <div className="patient-detail">
      <button className="back-btn" onClick={onBack}>← Voltar para pacientes</button>
 
      <div className="detail-header">
        <div className="detail-avatar" style={{ background: patient.color + "22", color: patient.color }}>
          {patient.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <h2>{patient.name}</h2>
          <p className="detail-diag">{patient.diagnosis} · {patient.age} anos</p>
          <div className="detail-meta">
            {patient.phone && <span>📞 {patient.phone}</span>}
            {patient.email && <span>✉️ {patient.email}</span>}
            <span>📋 {patient.sessions} sessões</span>
            <span>📅 Última: {patient.lastSession}</span>
            <span>⏭️ Próxima: {patient.nextSession}</span>
          </div>
        </div>
        <span className={`badge ${patient.status === "novo" ? "badge--info" : "badge--success"}`}>
          {patient.status === "novo" ? "Novo" : "Ativo"}
        </span>
      </div>
 
      <div className="detail-sections">
        <section className="detail-section">
          <div className="section-title-row">
            <h3>📝 Anotações das Consultas</h3>
            <button className="btn btn--sm btn--primary" onClick={() => setShowNoteForm(v => !v)}>
              {showNoteForm ? "✕ Cancelar" : "+ Nova nota"}
            </button>
          </div>
 
          {showNoteForm && (
            <div className="note-form">
              <textarea
                rows={4}
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Registre as observações desta sessão..."
                autoFocus
              />
              <div className="note-form-actions">
                <button className="btn btn--ghost btn--sm" onClick={() => setShowNoteForm(false)}>Cancelar</button>
                <button className="btn btn--primary btn--sm" onClick={addNote} disabled={!newNote.trim()}>Salvar nota</button>
              </div>
            </div>
          )}
 
          <div className="notes-list">
            {patient.notes.length === 0 && (
              <div className="empty-state" style={{ padding: "30px 0" }}>
                <span>📋</span>
                <p>Nenhuma anotação ainda</p>
              </div>
            )}
            {patient.notes.map((note, i) => (
              <div className="note-item" key={i}>
                <span className="note-date">{note.date}</span>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        </section>
 
        {/* AI Evolution */}
        <section className="detail-section">
          <div className="section-title-row">
            <h3>🤖 Evolução Psicológica com IA</h3>
          </div>
          <p className="evo-desc">
            Gere uma análise automática da evolução do paciente com base nas anotações das consultas.
            A análise cobre quadro clínico atual, avanços, pontos de atenção e sugestões para as próximas sessões.
          </p>
          {patient.notes.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-4)", fontStyle: "italic" }}>
              Adicione ao menos uma anotação de consulta para gerar a evolução.
            </p>
          ) : (
            <button
              className="btn btn--ai"
              onClick={() => onGenerateEvo(patient.id)}
              disabled={patient.loadingEvo}
            >
              {patient.loadingEvo ? (
                <span className="loading-dots">Analisando<span>.</span><span>.</span><span>.</span></span>
              ) : "✨ Gerar Evolução com IA"}
            </button>
          )}
          {patient.evolution && <EvoBlock evo={patient.evolution} />}
        </section>
      </div>
    </div>
  );
}
 

 
function DashboardView({ patients, onNewSession }) {
  const totalSessions = patients.reduce((s, p) => s + p.sessions, 0);
  return (
    <div>
      <div className="view-title-row">
        <h1>Visão Geral</h1>
        <button className="btn btn--primary" onClick={onNewSession}>+ Nova Sessão</button>
      </div>
 
      <div className="stats-grid">
        <StatCard icon="👥" label="Pacientes" value={patients.length} sub="Total cadastrados" color="#6C63FF" />
        <StatCard icon="📋" label="Sessões" value={totalSessions} sub="Realizadas" color="#43D9AD" />
        <StatCard icon="⏭️" label="Esta semana" value={3} sub="Sessões agendadas" color="#FFB347" />
        <StatCard icon="✨" label="Evoluções IA" value={2} sub="Geradas este mês" color="#FF6584" />
      </div>
 
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Sessões Recentes</h2>
          <div className="sessions-list">
            {RECENT_SESSIONS.map((s, i) => (
              <div className="session-row" key={i}>
                <div className="session-dot" />
                <div className="session-info">
                  <p className="session-patient">{s.patient}</p>
                  <p className="session-meta">{s.date} · {s.duration} · {s.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        <div className="dashboard-card">
          <h2>Pacientes</h2>
          {patients.map(p => (
            <div className="patient-status-row" key={p.id}>
              <div className="ps-avatar" style={{ background: p.color + "22", color: p.color }}>{p.avatar}</div>
              <div className="ps-info">
                <p>{p.name}</p>
                <p className="ps-diag">{p.diagnosis}</p>
              </div>
              <span className={`badge ${p.status === "novo" ? "badge--info" : "badge--success"}`}>
                {p.status === "novo" ? "Novo" : "Ativo"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
// ── PATIENTS VIEW ─────────────────────────────────────────────────────────────
 
function PatientsView({ patients, onUpdatePatient, onGenerateEvo, onAddPatient }) {
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
 
  const patient = selected ? patients.find(p => p.id === selected) : null;
 
  if (patient) {
    return (
      <PatientDetail
        patient={patient}
        onBack={() => setSelected(null)}
        onGenerateEvo={onGenerateEvo}
        onUpdatePatient={onUpdatePatient}
      />
    );
  }
 
  return (
    <div>
      <div className="view-title-row">
        <h1>Pacientes</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <span className="count-badge">{patients.length} pacientes</span>
          <button className="btn btn--primary" onClick={() => setShowAdd(true)}>+ Novo Paciente</button>
        </div>
      </div>
 
      {patients.length === 0 ? (
        <div className="empty-state">
          <span>👥</span>
          <p>Nenhum paciente cadastrado</p>
          <small>Clique em "Novo Paciente" para começar</small>
        </div>
      ) : (
        <div className="patients-grid">
          {patients.map(p => (
            <PatientCard key={p.id} patient={p} onClick={pt => setSelected(pt.id)} />
          ))}
        </div>
      )}
 
      {showAdd && (
        <AddPatientModal
          onClose={() => setShowAdd(false)}
          onSave={onAddPatient}
        />
      )}
    </div>
  );
}
 
// ── SESSIONS VIEW ─────────────────────────────────────────────────────────────
 
function SessionsView() {
  return (
    <div>
      <div className="view-title-row"><h1>Sessões</h1></div>
      <div className="dashboard-card">
        {RECENT_SESSIONS.map((s, i) => (
          <div className="session-row" key={i} style={{ padding: "13px 0" }}>
            <div className="session-dot" />
            <div className="session-info" style={{ flex: 1 }}>
              <p className="session-patient">{s.patient}</p>
              <p className="session-meta">{s.date} · {s.duration} · {s.type}</p>
            </div>
            <span className="badge badge--success">Realizada</span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ── PLAN VIEW ─────────────────────────────────────────────────────────────────
 
function PlanView() {
  const plans = [
    {
      name: "Gratuito", price: "R$ 0", period: "/mês",
      features: ["Até 3 pacientes", "10 sessões/mês", "Prontuário básico", "Suporte por e-mail"],
      btn: "Plano atual anterior", variant: "ghost",
    },
    {
      name: "Plus", price: "R$ 59", period: "/mês",
      features: ["Até 15 pacientes", "Sessões ilimitadas", "Evolução com IA (20×/mês)", "Relatórios PDF", "Agenda integrada"],
      btn: "Plano atual", variant: "current", current: true,
    },
    {
      name: "Pro", price: "R$ 129", period: "/mês",
      features: ["Pacientes ilimitados", "Evolução com IA ilimitada", "Múltiplos psicólogos", "Suporte prioritário"],
      btn: "Fazer upgrade", variant: "upgrade", recommended: true,
    },
  ];
 
  return (
    <div className="plan-view">
      <div className="view-title-row">
        <h1>Meu Plano</h1>
        <span className="topbar-plan-pill">⭐ Plus ativo</span>
      </div>
 
      {/* Current plan detail */}
      <div className="plan-current-card">
        <div className="plan-current-top">
          <div className="plan-current-name">
            <span className="plan-star">⭐</span> Plano Plus
          </div>
          <div className="plan-price">
            <span className="plan-price-val">R$ 59</span>
            <span className="plan-price-period">por mês · renova em 15/06/2026</span>
          </div>
        </div>
 
        <div className="plan-features-grid">
          {PLAN_FEATURES.slice(0, 6).map((f, i) => (
            <div className="plan-feature-item" key={i}>
              <span className="plan-feature-check">✓</span>
              {f}
            </div>
          ))}
        </div>
 
        <div className="plan-usage-section">
          <p className="plan-usage-title">Uso este mês</p>
          {[
            { label: "Pacientes ativos", used: 5, limit: 15, color: "#6C63FF" },
            { label: "Evoluções com IA", used: 2, limit: 20, color: "#43D9AD" },
            { label: "Relatórios gerados", used: 1, limit: 10, color: "#FFB347" },
          ].map(u => (
            <div className="plan-usage-item" key={u.label}>
              <div className="plan-usage-row">
                <span className="plan-usage-label">{u.label}</span>
                <span className="plan-usage-count">{u.used} / {u.limit}</span>
              </div>
              <div className="usage-bar">
                <div
                  className="usage-fill"
                  style={{ width: `${Math.round((u.used / u.limit) * 100)}%`, background: u.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Plans comparison */}
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: "var(--text-1)" }}>
        Comparar planos
      </h2>
      <div className="plans-compare">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`plan-tier-card ${plan.recommended ? "plan-tier-card--recommended" : ""} ${plan.current ? "plan-tier-card--current" : ""}`}
          >
            {plan.recommended && <span className="plan-tier-badge plan-tier-badge--rec">⚡ Recomendado</span>}
            {plan.current     && <span className="plan-tier-badge plan-tier-badge--curr">✓ Atual</span>}
            <p className="plan-tier-name">{plan.name}</p>
            <p className="plan-tier-price">{plan.price}</p>
            <p className="plan-tier-period">{plan.period}</p>
            <ul className="plan-tier-features">
              {plan.features.map((f, i) => (
                <li key={i}><span className="feat-icon">✓</span>{f}</li>
              ))}
            </ul>
            <button
              className={`btn ${plan.variant === "upgrade" ? "btn--upgrade" : plan.current ? "btn--ghost" : "btn--ghost"}`}
              style={{ width: "100%" }}
              disabled={plan.current}
            >
              {plan.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ── PLACEHOLDER ───────────────────────────────────────────────────────────────
 
function Placeholder({ title }) {
  return (
    <div>
      <div className="view-title-row"><h1>{title}</h1></div>
      <div className="empty-state">
        <span>🚧</span>
        <p>Em breve</p>
        <small>Esta seção está em desenvolvimento</small>
      </div>
    </div>
  );
}
 
// ── APP ───────────────────────────────────────────────────────────────────────
 
export default function App() {
  const [activeNav,     setActiveNav]    = useState("dashboard");
  const [sidebarOpen,   setSidebarOpen]  = useState(false);
  const [showNewSession, setShowNewSession] = useState(false);
  const [patients,      setPatients]     = useState(MOCK_PATIENTS);
  const [toast,         setToast]        = useState(null);
 
  const showToast = (msg) => setToast(msg);
 
  const updatePatient = (id, patch) =>
    setPatients(ps => ps.map(p => p.id === id ? { ...p, ...patch } : p));
 
  const addPatient = (form) => {
    const initials = getInitials(form.name);
    const newP = {
      id:          Date.now(),
      name:        form.name.trim(),
      age:         parseInt(form.age) || 0,
      phone:       form.phone,
      email:       form.email,
      diagnosis:   form.diagnosis.trim(),
      sessions:    0,
      lastSession: "—",
      nextSession: "—",
      status:      "novo",
      avatar:      initials,
      color:       form.color,
      notes:       form.notes.trim()
        ? [{ date: new Date().toISOString().split("T")[0], text: form.notes.trim() }]
        : [],
      evolution:   null,
      loadingEvo:  false,
    };
    setPatients(ps => [newP, ...ps]);
    showToast(`${form.name} cadastrado com sucesso!`);
  };
 
  const generateEvo = async (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient || patient.notes.length === 0) return;
 
    updatePatient(id, { loadingEvo: true, evolution: null });
 
    const notesText = patient.notes
      .map(n => `[${n.date}]: ${n.text}`)
      .join("\n");
 
    const prompt = `Você é um assistente de apoio clínico para psicólogos. Analise as anotações de sessões do paciente "${patient.name}" (${patient.age} anos, diagnóstico: ${patient.diagnosis}) e gere um relatório de evolução psicológica profissional em português com exatamente 5 parágrafos numerados:
 
1. Resumo do quadro clínico atual
2. Principais avanços e conquistas observados
3. Pontos que ainda necessitam de atenção
4. Tendência geral da evolução (positiva, estável ou em declínio) com justificativa
5. Sugestão de foco terapêutico para as próximas sessões
 
Anotações das sessões:
${notesText}
 
Responda apenas com os 5 parágrafos numerados. Seja claro, empático e profissional. Não use markdown com asteriscos nem traços.`;
 
    try {
      // TODO: substituir pela chamada ao seu backend que chamará a API da Anthropic
      // Endpoint sugerido: POST /api/ai/evolution
      // Body: { patientId: id, notes: patient.notes, diagnosis: patient.diagnosis }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("\n") || "Não foi possível gerar a análise.";
      updatePatient(id, { evolution: text, loadingEvo: false });
      showToast("Evolução gerada com sucesso!");
    } catch {
      updatePatient(id, { evolution: "Erro ao conectar com a IA. Verifique sua conexão e tente novamente.", loadingEvo: false });
    }
  };
 
  const renderView = () => {
    switch (activeNav) {
      case "dashboard": return <DashboardView patients={patients} onNewSession={() => setShowNewSession(true)} />;
      case "patients":  return <PatientsView patients={patients} onUpdatePatient={updatePatient} onGenerateEvo={generateEvo} onAddPatient={addPatient} />;
      case "sessions":  return <SessionsView />;
      case "plan":      return <PlanView />;
      default:          return <Placeholder title={NAV_ITEMS.find(n => n.id === activeNav)?.label || ""} />;
    }
  };
 
  return (
    <div className="app">
      <Sidebar
        active={activeNav}
        setActive={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
 
      <div className="main">
        <header className="topbar">
          <button
            className={`hamburger ${sidebarOpen ? "is-open" : ""}`}
            onClick={() => setSidebarOpen(v => !v)}
            aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span /><span /><span />
          </button>
          <span className="topbar-title">
            {NAV_ITEMS.find(n => n.id === activeNav)?.label}
          </span>
          <div className="topbar-right">
            <span className="topbar-plan-pill">⭐ Plus</span>
            <span className="topbar-date">
              {new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}
            </span>
          </div>
        </header>
 
        <main className="content">{renderView()}</main>
      </div>
 
      {showNewSession && (
        <NewSessionModal
          patients={patients}
          onClose={() => setShowNewSession(false)}
          onSave={(form) => {
            console.log("Nova sessão:", form); // TODO: conectar ao backend
            showToast("Sessão agendada com sucesso!");
          }}
        />
      )}
 
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}