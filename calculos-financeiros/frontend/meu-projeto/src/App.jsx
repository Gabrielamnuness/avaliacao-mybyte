import { useState } from "react";

function App() {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  const [valorFuturo, setValorFuturo] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = async (rota, dados) => {
    try {
      const response = await fetch(`/${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error("Erro na requisição");

      const dadosResultado = await response.json();
      setResultado(dadosResultado);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calculadora Financeira</h1>

      <input
        type="number"
        placeholder="Capital"
        value={capital}
        onChange={(e) => setCapital(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taxa (%)"
        value={taxa}
        onChange={(e) => setTaxa(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tempo"
        value={tempo}
        onChange={(e) => setTempo(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() =>
            calcular("juros-simples", {
              capital: capital,
              taxa: taxa,
              tempo: tempo,
            })
          }
        >
          Juros Simples
        </button>

        <button
          onClick={() =>
            calcular("juros-compostos", {
              capital: capital,
              taxa: taxa,
              tempo: tempo,
            })
          }
        >
          Juros Compostos
        </button>

        <button
          onClick={() =>
            calcular("valor-presente", {
              valorFuturo: valorFuturo,
              taxa: taxa,
              tempo: tempo,
            })
          }
        >
          Valor Presente
        </button>
      </div>

      {resultado && (
        <div style={{ marginTop: "20px" }}>
          <h2>Resultado</h2>
          {resultado.juros !== undefined && <p>Juros: {resultado.juros}</p>}
          {resultado.montante !== undefined && <p>Montante: {resultado.montante}</p>}
          {resultado.valorFuturo !== undefined && <p>Valor Futuro: {resultado.valorFuturo}</p>}
          {resultado.valorPresente !== undefined && <p>Valor Presente: {resultado.valorPresente}</p>}
        </div>
      )}
    </div>
  );
}

export default App;