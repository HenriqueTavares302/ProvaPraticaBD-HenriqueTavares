import { useState, useEffect } from "react";
import {
  loginWithEmail,
  registerWithEmail,
  logout,
  observeAuthState,
} from "../auth";

export default function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  // 🔥 Detecta usuário automaticamente
  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  // 🔑 Login / Cadastro
  const handleSubmit = async () => {
    try {
      setErro("");

      if (!email || !senha) {
        setErro("Preencha todos os campos.");
        return;
      }

      if (modoCadastro) {
        await registerWithEmail(email, senha);
        alert("Cadastro realizado com sucesso!");
      } else {
        await loginWithEmail(email, senha);
        alert("Login realizado com sucesso!");
      }

    } catch (e) {
      setErro(e.message);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        {!usuario ? (
          <>
            <h2>{modoCadastro ? "Cadastro" : "Login"}</h2>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={styles.input}
            />

            <button onClick={handleSubmit} style={styles.button}>
              {modoCadastro ? "Cadastrar" : "Entrar"}
            </button>

            <p style={styles.toggle} onClick={() => setModoCadastro(!modoCadastro)}>
              {modoCadastro
                ? "Já tem conta? Fazer login"
                : "Não tem conta? Cadastre-se"}
            </p>
          </>
        ) : (
          <>
            <h2>Bem-vindo!</h2>
            <p>{usuario.email}</p>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>

            <button onClick={onClose} style={styles.close}>
              Fechar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// 🎨 estilos simples
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "10px",
    cursor: "pointer",
    color: "blue",
  },
  close: {
    marginTop: "10px",
    padding: "5px",
    background: "gray",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};