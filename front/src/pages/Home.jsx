import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <header className="hero">
        <nav className="navbar">
          <div className="logo">
            <div className="logo-icon">🧠</div>
            <span>PsicoIA</span>
          </div>

          <div className="nav-links">
            <a href="#benefits">Benefícios</a>
            <a href="#features">Recursos</a>
            <a href="#plans">Planos</a>

            <Link to="/login">
              <button className="nav-btn">
                Entrar
              </button>
            </Link>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">
              ✨ Inteligência Artificial para Psicólogos
            </span>

            <h1>
              Evoluções clínicas inteligentes no modelo SOAP.
            </h1>

            <p>
              Organize pacientes, sessões, prontuários e gere
              evoluções psicológicas com IA em segundos.
            </p>

            <div className="hero-buttons">
              <Link to="/register">
                <button className="primary-btn">
                  Começar agora
                </button>
              </Link>

              <Link to="/register">
                <button className="secondary-btn">
                  Ver demonstração
                </button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-box">
                <h3>98%</h3>
                <p>economia de tempo</p>
              </div>

              <div className="stat-box">
                <h3>24h</h3>
                <p>acesso seguro</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="dashboard-preview">
              <div className="preview-top">
                <div className="preview-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="preview-body">
                <div className="preview-sidebar">
                  <div className="sidebar-item active">
                    🏠 Dashboard
                  </div>

                  <div className="sidebar-item">
                    👥 Pacientes
                  </div>

                  <div className="sidebar-item">
                    📋 Sessões
                  </div>

                  <div className="sidebar-item">
                    📅 Agenda
                  </div>
                </div>

                <div className="preview-main">
                  <div className="mini-cards">
                    <div className="mini-card">
                      <span>Pacientes</span>
                      <h2>24</h2>
                    </div>

                    <div className="mini-card">
                      <span>Sessões</span>
                      <h2>12</h2>
                    </div>
                  </div>

                  <div className="preview-chart" />

                  <div className="preview-patient">
                    <div className="patient-avatar">
                      AS
                    </div>

                    <div>
                      <h4>Ana Souza</h4>
                      <p>Evolução gerada com IA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="benefits" id="benefits">
        <div className="section-title">
          <span>BENEFÍCIOS</span>

          <h2>
            Mais produtividade para sua clínica
          </h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              ⚡
            </div>

            <h3>Evoluções instantâneas</h3>

            <p>
              Gere relatórios clínicos completos
              em segundos.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              🔒
            </div>

            <h3>Segurança total</h3>

            <p>
              Dados protegidos e armazenados
              com segurança.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              📅
            </div>

            <h3>Agenda integrada</h3>

            <p>
              Controle sessões, horários e
              pacientes facilmente.
            </p>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-title">
          <span>RECURSOS</span>

          <h2>
            Tudo que você precisa em um só lugar
          </h2>
        </div>

        <div className="features-list">
          <div className="feature-row">
            <div>
              <h3>🧠 IA para evolução SOAP</h3>

              <p>
                Transforme anotações em
                evoluções clínicas profissionais.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <div>
              <h3>👥 Gestão de pacientes</h3>

              <p>
                Histórico, sessões, observações
                e informações organizadas.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <div>
              <h3>📊 Relatórios inteligentes</h3>

              <p>
                Visualize métricas e acompanhe
                evoluções clínicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="plans" id="plans">
        <div className="section-title">
          <span>PLANOS</span>

          <h2>
            Escolha o melhor plano para você
          </h2>
        </div>

        <div className="plans-grid">

          {/* FREE */}

          <div className="plan-card-home">
            <h3>Free</h3>

            <h1>R$ 0</h1>

            <p>/mês</p>

            <ul>
              <li>✓ Até 3 pacientes</li>
              <li>✓ Agenda integrada</li>
              <li>✓ Sessões ilimitadas</li>
              <li>✓ Suporte por e-mail</li>
            </ul>

            <Link to="/register">
              <button>
                Começar grátis
              </button>
            </Link>
          </div>

          {/* PLUS */}

          <div className="plan-card-home featured">
            <span className="featured-badge">
              Mais popular
            </span>

            <h3>Plus</h3>

            <h1>R$ 59</h1>

            <p>/mês</p>

            <ul>
              <li>✓ Evolução com IA</li>
              <li>✓ Até 15 pacientes</li>
              <li>✓ Relatórios PDF</li>
              <li>✓ Agenda inteligente</li>
              <li>✓ Suporte prioritário</li>
            </ul>

            <Link to="/register">
              <button>
                Assinar Plus
              </button>
            </Link>
          </div>

          {/* PRO */}

          <div className="plan-card-home">
            <h3>Pro</h3>

            <h1>R$ 129</h1>

            <p>/mês</p>

            <ul>
              <li>✓ Pacientes ilimitados</li>
              <li>✓ IA ilimitada</li>
              <li>✓ Multi profissionais</li>
              <li>✓ Backup automático</li>
              <li>✓ Suporte prioritário</li>
            </ul>

            <Link to="/register">
              <button>
                Assinar Pro
              </button>
            </Link>
          </div>

        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">
          <div className="logo-icon">
            🧠
          </div>

          <span>PsicoIA</span>
        </div>

        <p>
          Plataforma inteligente para psicólogos modernos.
        </p>

        <div className="footer-links">
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Cadastro
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
}