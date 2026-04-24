import { useState } from "react";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);

  async function cadastrar() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      const resultado = await createUserWithEmailAndPassword(auth, email, senha);
      await sendEmailVerification(resultado.user);
      alert("Cadastro realizado! Verifique seu e-mail antes de continuar.");
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
        await auth.signOut(); // bloqueia o acesso
        return;
      }

      setErro("");
    } catch (e) {
      setErro(traduzirErro(e.code));
    }
  }

  function traduzirErro(code) {
    switch (code) {
      case "auth/invalid-email": return "E-mail inválido!";
      case "auth/wrong-password": return "Senha inválida!";
      case "auth/weak-password": return "Senha deve ter ao menos 6 caracteres!";
      case "auth/email-already-in-use": return "E-mail já está em uso!";
      case "auth/user-not-found": return "Usuário não encontrado!";
      default: return "Erro de autenticação.";
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{modoCadastro ? "Cadastro" : "Login"}</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      /><br /><br />

      {modoCadastro ? (
        <button onClick={cadastrar}>Cadastrar</button>
      ) : (
        <button onClick={login}>Entrar</button>
      )}

      <p
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
        onClick={() => { setModoCadastro(!modoCadastro); setErro(""); }}
      >
        {modoCadastro ? "Já tem conta? Fazer login" : "Não tem conta? Cadastre-se"}
      </p>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Auth;