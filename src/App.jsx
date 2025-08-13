import { useState } from "react";
import "./index.css";

function App() {
  const [temp, setTemp] = useState("--");
  const [umid, setUmid] = useState("--");

  const enviarComando = (ambiente) => {
    console.log(`Botão ${ambiente} clicado!`);
    // Aqui você colocaria a lógica de envio via MQTT
  };

  return (
    <div className="container">
      <div className="dados">
        <h1>Monitor DHT22</h1>
        <p>
          <strong>Temperatura:</strong> <span>{temp}</span>
        </p>
        <p>
          <strong>Umidade:</strong> <span>{umid}</span>
        </p>
      </div>

      <div className="controle">
        <h2>Controle de Ambientes</h2>
        <div className="botoes-ambientes">
          <button onClick={() => enviarComando("garagem")}>Garagem</button>
          <button onClick={() => enviarComando("sala de estar")}>Sala de Estar</button>
          <button onClick={() => enviarComando("quarto")}>Quarto</button>
        </div>
      </div>
    </div>
  );
}

export default App;
export default App;
