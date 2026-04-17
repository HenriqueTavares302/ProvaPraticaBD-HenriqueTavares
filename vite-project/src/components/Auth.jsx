import { useState } from "react";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function cadastrar() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setErro("");
    } catch (e) {
      setErro("Erro ao cadastrar: " + e.message);
    }
  }

  async function login() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      setErro("");
    } catch (e) {
      setErro("Email ou senha inválidos.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login / Cadastro</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} /><br /><br />
      <button onClick={cadastrar}>Cadastrar</button>
      <button onClick={login} style={{ marginLeft: "8px" }}>Entrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Auth;