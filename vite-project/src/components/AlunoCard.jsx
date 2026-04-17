const cursoCores = {
  "Ciência da Computação": "#3B82F6",
  "Engenharia de Software": "#8B5CF6",
  "Sistemas de Informação": "#10B981",
  "Análise e Desenvolvimento de Sistemas": "#F59E0B",
  "Redes de Computadores": "#EF4444",
  "Inteligência Artificial": "#EC4899",
};

function getIniciais(nome) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getCor(curso) {
  return cursoCores[curso] || "#6366F1";
}

export default function AlunoCard({ aluno, onRemover }) {
  const cor = getCor(aluno.curso);
  const iniciais = getIniciais(aluno.nome);

  return (
    <div className="card-aluno">
      <div className="card-avatar" style={{ background: cor + "20", color: cor }}>
        {iniciais}
      </div>
      <div className="card-info">
        <h3 className="card-nome">{aluno.nome}</h3>
        <span className="card-curso" style={{ background: cor + "15", color: cor }}>
          {aluno.curso}
        </span>
      </div>
      <button
        className="btn-remover"
        onClick={() => onRemover(aluno.id)}
        title="Remover aluno"
      >
        ✕
      </button>
    </div>
  );
}