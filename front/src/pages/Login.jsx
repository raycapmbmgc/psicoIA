import "../styles/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-page">

     <div className="login-left">

        <div className="login-overlay" />

        <div className="login-brand">
          <div className="login-logo">
            🧠
          </div>

          <span>PsicoIA</span>
        </div>

        <div className="login-content">

          <span className="login-badge">
            ✨ Inteligência Artificial para Psicólogos
          </span>

          <h1>
            Bem-vindo de volta ao PsicoIA.
          </h1>

          <p>
            Acesse sua plataforma e organize pacientes,
            sessões, agenda e evoluções clínicas com
            mais produtividade e praticidade.
          </p>

          <div className="login-stats">

            <div className="login-stat-card">
              <h2>+5x</h2>
              <p>
                mais produtividade clínica
              </p>
            </div>

            <div className="login-stat-card">
              <h2>98%</h2>
              <p>
                menos tempo escrevendo evoluções
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-header">

            <h2>
              Entrar
            </h2>

            <p>
              Faça login para acessar sua conta
            </p>

          </div>

          <form className="login-form">

            <div className="input-group">

              <label>
                E-mail
              </label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
              />

            </div>

            <div className="input-group">

              <label>
                Senha
              </label>

              <input
                type="password"
                placeholder="********"
              />

            </div>

            <div className="login-options">

              <label className="remember-me">
                <input type="checkbox" />
                Lembrar de mim
              </label>

              <Link to="/forgot-password">
                Esqueceu a senha?
              </Link>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Entrar na plataforma
            </button>

          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <button className="google-btn">

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />

            Continuar com Google

          </button>

          <div className="login-footer">

            <p>
              Ainda não possui conta?
            </p>

            <Link to="/register">
              Criar conta
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}