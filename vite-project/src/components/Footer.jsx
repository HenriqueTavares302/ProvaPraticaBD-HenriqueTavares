export default function Footer({ nomeAluno, ano }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text">
          Desenvolvido por <strong>{nomeAluno}</strong> &copy; {ano}
        </span>
        <span className="footer-tag">Projeto React</span>
      </div>
    </footer>
  );
}