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
  const [aguardandoVerificacao, setAguardandoVerificacao] = useState(false);

  async function cadastrar() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      const resultado = await createUserWithEmailAndPassword(auth, email, senha);
      try {
        await sendEmailVerification(resultado.user, {
          url: "https://provapratica-bd.web.app"
        });
      } catch (emailErro) {
        console.log("Erro ao enviar email:", emailErro.code);
        // continua mesmo se o envio falhar
      }
      await auth.signOut();
      setAguardandoVerificacao(true);
      setErro("");
    } catch (e) {
      console.log("ERRO:", e.code);
      setErro(traduzirErro(e.code));
    }
  }

  async function login() {
    if (!email || !senha) return setErro("Preencha todos os campos.");
    try {
      const resultado = await signInWithEmailAndPassword(auth, email, senha);
      if (!resultado.user.emailVerified) {
        setErro("E-mail não verificado. Verifique sua caixa de entrada.");
        await auth.signOut();
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

  if (aguardandoVerificacao) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>📧 Confirme seu e-mail</h2>
        <p>Enviamos um link de verificação para:</p>
        <strong>{email}</strong>
        <p>Acesse sua caixa de entrada e clique no link para confirmar que é você.</p>
        <p style={{ color: "gray", fontSize: "14px" }}>Após confirmar, volte aqui e faça login.</p>
        <button onClick={() => { setAguardandoVerificacao(false); setModoCadastro(false); }}>
          Já confirmei, fazer login
        </button>
      </div>
    );
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