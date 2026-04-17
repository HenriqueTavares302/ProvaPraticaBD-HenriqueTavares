import { useState } from "react";

const cursosDisponiveis = [
  "Ciência da Computação",
  "Engenharia de Software",
  "Sistemas de Informação",
  "Análise e Desenvolvimento de Sistemas",
  "Redes de Computadores",
  "Inteligência Artificial",
];

export default function AlunoForm({ onAdicionar }) {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = () => {
    if (!nome.trim() || !curso) {
      setErro("Preencha todos os campos.");
      return;
    }
    onAdicionar({ nome: nome.trim(), curso });
    setNome("");
    setCurso("");
    setErro("");
  };

  return (
    <div className="form-card">
      <h3 className="form-titulo">Novo Aluno</h3>

      {erro && <p className="form-erro">{erro}</p>}

      <div className="form-grupo">
        <label className="form-label">Nome completo</label>
        <input
          type="text"
          className="form-input"
          placeholder="Ex: Maria Souza"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="form-grupo">
        <label className="form-label">Curso</label>
        <select
          className="form-input"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        >
          <option value="">Selecione um curso...</option>
          {cursosDisponiveis.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button className="btn-primary" onClick={handleSubmit}>
        Salvar Aluno
      </button>
    </div>
  );
}