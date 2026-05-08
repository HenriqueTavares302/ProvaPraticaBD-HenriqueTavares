import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Personagens from "./Personagens.jsx";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  // Monitora login em tempo real
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const logado = user?.emailVerified ? user : null;
      setUsuario(logado);
      setCarregando(false);
      // Fecha modal automaticamente ao logar
      if (logado) setModalAberto(false);
    });
    return () => unsub();
  }, []);

  async function cadastrar() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      const resultado = await createUserWithEmailAndPassword(auth, email, senha);
      await sendEmailVerification(resultado.user);
      await signOut(auth);
      alert("Cadastro realizado! Verifique seu e-mail antes de continuar.");
      setModoCadastro(false);
      setErro("");
    } catch (e) {
      setErro(traduzirErro(e.code));
    }
  }

  async function login() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      const resultado = await signInWithEmailAndPassword(auth, email, senha);
      if (!resultado.user.emailVerified) {
        setErro("E-mail não verificado. Verifique sua caixa de entrada.");
        await signOut(auth);
        return;
      }
      setEmail("");
      setSenha("");
      setErro("");
      // onAuthStateChanged já fecha o modal automaticamente
    } catch (e) {
      setErro(traduzirErro(e.code));
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setUsuario(null);
  }

  function traduzirErro(code) {
    switch (code) {
      case "auth/invalid-email":        return "E-mail inválido!";
      case "auth/wrong-password":       return "Senha incorreta!";
      case "auth/invalid-credential":   return "E-mail ou senha incorretos!";
      case "auth/weak-password":        return "Senha deve ter ao menos 6 caracteres!";
      case "auth/email-already-in-use": return "E-mail já está em uso!";
      case "auth/user-not-found":       return "Usuário não encontrado!";
      default:                          return "Erro de autenticação.";
    }
  }

  if (carregando) return <p style={styles.carregando}>Carregando...</p>;

  return (
    <div>
      {/* ── Topbar ── */}
      <div style={styles.topbar}>
        <span style={styles.titulo}>🦸 Marvel App</span>

        {usuario ? (
          <div style={styles.topRight}>
            <span style={styles.emailLabel}>👤 {usuario.email}</span>
            <button style={styles.btnLogout} onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <button style={styles.btnLogin} onClick={() => setModalAberto(true)}>
            🔐 Login
          </button>
        )}
      </div>

      {/* ── Conteúdo principal ── */}
      <div style={styles.conteudo}>
        {usuario ? (
          <Personagens />
        ) : (
          <div style={styles.bloqueio}>
            <p>🔒 Faça login para cadastrar personagens.</p>
            <button style={styles.btnLogin} onClick={() => setModalAberto(true)}>
              Fazer Login
            </button>
          </div>
        )}
      </div>

      {/* ── Modal de Login/Cadastro ── */}
      {modalAberto && (
        <div style={styles.overlay} onClick={() => setModalAberto(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.btnFechar} onClick={() => setModalAberto(false)}>✕</button>

            <h2 style={styles.modalTitulo}>
              {modoCadastro ? "📝 Cadastro" : "🔐 Login"}
            </h2>

            <input
              style={styles.input}
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

            <button
              style={styles.btnSubmit}
              onClick={modoCadastro ? cadastrar : login}
            >
              {modoCadastro ? "Cadastrar" : "Entrar"}
            </button>

            <p
              style={styles.toggle}
              onClick={() => { setModoCadastro(!modoCadastro); setErro(""); }}
            >
              {modoCadastro
                ? "Já tem conta? Fazer login"
                : "Não tem conta? Cadastre-se"}
            </p>

            {erro && <p style={styles.erro}>{erro}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  carregando: {
    textAlign: "center", marginTop: 80, color: "#aaa", fontFamily: "sans-serif",
  },
  topbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 24px", background: "#1e1e2e", borderBottom: "1px solid #333",
  },
  titulo: { color: "#fff", fontWeight: "bold", fontSize: 18, fontFamily: "sans-serif" },
  topRight: { display: "flex", alignItems: "center", gap: 12 },
  emailLabel: { color: "#aaa", fontSize: 13, fontFamily: "sans-serif" },
  btnLogout: {
    padding: "6px 14px", background: "#ef4444", color: "#fff",
    border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13,
  },
  btnLogin: {
    padding: "8px 18px", background: "#6c63ff", color: "#fff",
    border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14,
  },
  conteudo: { fontFamily: "sans-serif" },
  bloqueio: {
    textAlign: "center", marginTop: 80, color: "#aaa",
    fontFamily: "sans-serif", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 16,
  },
  // Modal
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999,
  },
  modal: {
    background: "#1e1e2e", borderRadius: 12, padding: 32, width: 340,
    display: "flex", flexDirection: "column", gap: 12,
    position: "relative", fontFamily: "sans-serif",
  },
  btnFechar: {
    position: "absolute", top: 12, right: 14, background: "transparent",
    border: "none", color: "#aaa", fontSize: 18, cursor: "pointer",
  },
  modalTitulo: { color: "#fff", textAlign: "center", marginBottom: 4 },
  input: {
    padding: "10px 12px", borderRadius: 6, border: "1px solid #444",
    background: "#2a2a3d", color: "#fff", fontSize: 14,
  },
  btnSubmit: {
    padding: "11px 0", background: "#6c63ff", color: "#fff",
    border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer", marginTop: 4,
  },
  toggle: {
    textAlign: "center", color: "#a78bfa", cursor: "pointer", fontSize: 13,
  },
  erro: { color: "#f87171", textAlign: "center", fontSize: 13 },
};