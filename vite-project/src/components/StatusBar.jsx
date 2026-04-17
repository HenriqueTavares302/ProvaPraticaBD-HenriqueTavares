export default function StatusBar({ mensagem, totalAlunos }) {
  return (
    <header className="statusbar">
      <div className="statusbar-inner">
        <div className="statusbar-left">
          <div className="logo-dot" />
          <span className="statusbar-title">{mensagem}</span>
        </div>
        <div className="statusbar-right">
          <span className="statusbar-info">
            <span className="dot-green" />
            {totalAlunos} aluno{totalAlunos !== 1 ? "s" : ""} cadastrado{totalAlunos !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </header>
  );
}