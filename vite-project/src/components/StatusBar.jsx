function StatusBar({ mensagem }) {
    return (
      <div style={{ background: "#2c3e50", color: "white", padding: "10px", textAlign: "center" }}>
        <strong>{mensagem}</strong>
      </div>
    );
  }
  
  export default StatusBar;
