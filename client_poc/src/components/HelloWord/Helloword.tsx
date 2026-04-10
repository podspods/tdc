// HelloWorld component - Displays the classic "Hello World" message
export function HelloWorld() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>Tommies Ducati crew👋</h2>
      <p style={{ color: "#4b5563" }}>Welcome to Tommies Ducati crew.</p>
    </div>
  );
}
