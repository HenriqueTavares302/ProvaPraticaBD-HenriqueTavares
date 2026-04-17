import { useState, useEffect } from "react";
import StatusBar from "./components/StatusBar";
import Footer from "./components/Footer";
import AlunoForm from "./components/AlunoForm";
import AlunoCard from "./components/AlunoCard";
import educacaoImg from "./assets/educacao.svg";

const alunosIniciais = [
  { id: 1, nome: "Ana Carolina Silva", curso: "Ciência da Computação" },
  { id: 2, nome: "Bruno Henrique Souza", curso: "Engenharia de Software" },
  { id: 3, nome: "Carla Mendes", curso: "Sistemas de Informação" },
];

export default function App() {
  const [alunos, setAlunos] = useState(alunosIniciais);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    console.log("✅ Sistema Acadêmico carregado com sucesso!");
    console.log(`📚 Total de alunos cadastrados: ${alunos.length}`);
  }, []);

  useEffect(() => {
    console.log(`🔄 Lista de alunos atualizada. Total: ${alunos.length}`);
  }, [alunos]);

  const adicionarAluno = (novoAluno) => {
    setAlunos((prev) => [
      ...prev,
      { id: Date.now(), ...novoAluno },
    ]);
    setMostrarForm(false);
  };

  const removerAluno = (id) => {
    setAlunos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="app">
      <StatusBar mensagem="Sistema Acadêmico" totalAlunos={alunos.length} />

      <main className="main">
        <section className="hero">
          <div className="hero-text">
            <h1>Gestão de <span className="accent">Alunos</span></h1>
            <p>Gerencie sua turma com facilidade. Adicione, visualize e organize os alunos cadastrados.</p>
            <button
              className="btn-primary"
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              {mostrarForm ? "✕ Cancelar" : "+ Adicionar Aluno"}
            </button>
          </div>
          <div className="hero-img">
            <img src={educacaoImg} alt="Ilustração de educação" />
          </div>
        </section>

        {mostrarForm && (
          <AlunoForm onAdicionar={adicionarAluno} />
        )}

        <section className="lista-section">
          <div className="lista-header">
            <h2>Alunos Matriculados</h2>
            <span className="badge">{alunos.length}</span>
          </div>

          {alunos.length === 0 ? (
            <div className="vazio">
              <p>Nenhum aluno cadastrado ainda.</p>
            </div>
          ) : (
            <div className="grid-alunos">
              {alunos.map((aluno) => (
                <AlunoCard
                  key={aluno.id}
                  aluno={aluno}
                  onRemover={removerAluno}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer nomeAluno="Henrique Tavares Andrade" ano={2026} />
    </div>
  );
}
