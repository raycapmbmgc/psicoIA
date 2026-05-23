import "../styles/Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-left">
        <div className="register-overlay" />

        <div className="register-brand">
          <div className="register-logo">
            🧠
          </div>

          <span>PsicoIA</span>
        </div>

        <div className="register-content">
          <span className="register-badge">
            ✨ Plataforma inteligente para psicólogos
          </span>

          <h1>
            Transforme sua rotina clínica com IA.
          </h1>

          <p>
            Organize pacientes, sessões, prontuários e gere
            evoluções clínicas no modelo SOAP com mais
            rapidez, segurança e produtividade.
          </p>

          <div className="register-benefits">

            <div className="register-benefit">
              <div className="benefit-check">
                ✓
              </div>

              <div>
                <h4>Evoluções com IA</h4>

                <p>
                  Gere evoluções clínicas em segundos.
                </p>
              </div>
            </div>

            <div className="register-benefit">
              <div className="benefit-check">
                ✓
              </div>

              <div>
                <h4>Agenda integrada</h4>

                <p>
                  Organize consultas e horários facilmente.
                </p>
              </div>
            </div>

            <div className="register-benefit">
              <div className="benefit-check">
                ✓
              </div>

              <div>
                <h4>Segurança avançada</h4>

                <p>
                  Dados protegidos e acesso seguro.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="register-right">

        <div className="register-card">

          <div className="register-header">
            <h2>
              Criar conta
            </h2>

            <p>
              Comece gratuitamente no PsicoIA
            </p>
          </div>

          <form className="register-form">

            <div className="input-group">
              <label>
                Nome completo
              </label>

              <input
                type="text"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="input-group">
              <label>
                E-mail profissional
              </label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="input-group">
              <label>
                CRP
              </label>

              <input
                type="text"
                placeholder="Digite seu CRP"
              />
            </div>

            <div className="input-row">

              <div className="input-group">
                <label>
                  Senha
                </label>

                <input
                  type="password"
                  placeholder="********"
                />
              </div>

              <div className="input-group">
                <label>
                  Confirmar senha
                </label>

                <input
                  type="password"
                  placeholder="********"
                />
              </div>

            </div>

            <div className="checkbox-group">
              <input type="checkbox" />

              <p>
                Concordo com os termos de uso e política
                de privacidade.
              </p>
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Criar conta gratuita
            </button>

          </form>

          <div className="register-divider">
            <span>ou</span>
          </div>

          <button className="google-btn">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />

            Continuar com Google
          </button>

          <div className="register-footer">
            <p>
              Já possui uma conta?
            </p>

            <Link to="/login">
              Entrar
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}