"use client"

import { useState } from "react"
import "./App.css"

function App() {
  // Estados da Garagem
  const [portaSocial, setPortaSocial] = useState("Fechada")
  const [portaBasculante, setPortaBasculante] = useState("Fechada")
  const [luzGaragem, setLuzGaragem] = useState("Desligada")

  // Estados da Sala de Estar
  const [luzSala, setLuzSala] = useState("Desligada")
  const [arCondicionado, setArCondicionado] = useState("Desligado")
  const [umidificador, setUmidificador] = useState("Desligado")

  // Estados do Quarto
  const [luzQuarto, setLuzQuarto] = useState("Desligada")
  const [tomadaInteligente, setTomadaInteligente] = useState("Desligada")
  const [cortina, setCortina] = useState("Fechada")

  // Funções de controle da Garagem
  const togglePortaSocial = () => {
    setPortaSocial(portaSocial === "Fechada" ? "Aberta" : "Fechada")
  }

  const togglePortaBasculante = () => {
    setPortaBasculante(portaBasculante === "Fechada" ? "Aberta" : "Fechada")
  }

  const toggleLuzGaragem = () => {
    setLuzGaragem(luzGaragem === "Desligada" ? "Ligada" : "Desligada")
  }

  // Funções de controle da Sala de Estar
  const toggleLuzSala = () => {
    setLuzSala(luzSala === "Desligada" ? "Ligada" : "Desligada")
  }

  const toggleArCondicionado = () => {
    setArCondicionado(arCondicionado === "Desligado" ? "Ligado" : "Desligado")
  }

  const toggleUmidificador = () => {
    setUmidificador(umidificador === "Desligado" ? "Ligado" : "Desligado")
  }

  // Funções de controle do Quarto
  const toggleLuzQuarto = () => {
    setLuzQuarto(luzQuarto === "Desligada" ? "Ligada" : "Desligada")
  }

  const toggleTomadaInteligente = () => {
    setTomadaInteligente(tomadaInteligente === "Desligada" ? "Ligada" : "Desligada")
  }

  const abrirCortina = () => {
    setCortina("Em movimento")
    setTimeout(() => setCortina("Aberta"), 1500)
  }

  const fecharCortina = () => {
    setCortina("Em movimento")
    setTimeout(() => setCortina("Fechada"), 1500)
  }

  const pararCortina = () => {
    setCortina("Parada")
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏠 Sistema de Automação Residencial</h1>
        <p>Controle todos os dispositivos da sua casa</p>
      </header>

      <main className="main-content">
        {/* GARAGEM */}
        <section className="room-section">
          <h2>🚗 Garagem</h2>
          <div className="controls-grid">
            {/* Porta Social */}
            <div className="control-card">
              <h3>🚪 Porta Social</h3>
              <div className="status-indicator">
                <span className={`status ${portaSocial === "Aberta" ? "active" : ""}`}>{portaSocial}</span>
              </div>
              <div className="button-group">
                <button
                  className={`control-btn ${portaSocial === "Aberta" ? "active" : ""}`}
                  onClick={togglePortaSocial}
                >
                  {portaSocial === "Fechada" ? "Abrir" : "Fechar"}
                </button>
              </div>
            </div>

            {/* Porta Basculante */}
            <div className="control-card">
              <h3>🚪 Porta Basculante</h3>
              <div className="status-indicator">
                <span className={`status ${portaBasculante === "Aberta" ? "active" : ""}`}>{portaBasculante}</span>
              </div>
              <div className="button-group">
                <button
                  className={`control-btn ${portaBasculante === "Aberta" ? "active" : ""}`}
                  onClick={togglePortaBasculante}
                >
                  {portaBasculante === "Fechada" ? "Abrir" : "Fechar"}
                </button>
              </div>
            </div>

            {/* Luz da Garagem */}
            <div className="control-card">
              <h3>💡 Luz da Garagem</h3>
              <div className="status-indicator">
                <span className={`status ${luzGaragem === "Ligada" ? "active" : ""}`}>{luzGaragem}</span>
              </div>
              <div className="button-group">
                <button className={`control-btn ${luzGaragem === "Ligada" ? "active" : ""}`} onClick={toggleLuzGaragem}>
                  {luzGaragem === "Desligada" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SALA DE ESTAR */}
        <section className="room-section">
          <h2>🛋️ Sala de Estar</h2>
          <div className="controls-grid">
            {/* Luz da Sala */}
            <div className="control-card">
              <h3>💡 Luz da Sala</h3>
              <div className="status-indicator">
                <span className={`status ${luzSala === "Ligada" ? "active" : ""}`}>{luzSala}</span>
              </div>
              <div className="button-group">
                <button className={`control-btn ${luzSala === "Ligada" ? "active" : ""}`} onClick={toggleLuzSala}>
                  {luzSala === "Desligada" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>

            {/* Ar-condicionado */}
            <div className="control-card">
              <h3>❄️ Ar-condicionado</h3>
              <div className="status-indicator">
                <span className={`status ${arCondicionado === "Ligado" ? "active" : ""}`}>{arCondicionado}</span>
              </div>
              <div className="button-group">
                <button
                  className={`control-btn ${arCondicionado === "Ligado" ? "active" : ""}`}
                  onClick={toggleArCondicionado}
                >
                  {arCondicionado === "Desligado" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>

            {/* Umidificador */}
            <div className="control-card">
              <h3>💨 Umidificador</h3>
              <div className="status-indicator">
                <span className={`status ${umidificador === "Ligado" ? "active" : ""}`}>{umidificador}</span>
              </div>
              <div className="button-group">
                <button
                  className={`control-btn ${umidificador === "Ligado" ? "active" : ""}`}
                  onClick={toggleUmidificador}
                >
                  {umidificador === "Desligado" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* QUARTO */}
        <section className="room-section">
          <h2>🛏️ Quarto</h2>
          <div className="controls-grid">
            {/* Luz do Quarto */}
            <div className="control-card">
              <h3>💡 Luz do Quarto</h3>
              <div className="status-indicator">
                <span className={`status ${luzQuarto === "Ligada" ? "active" : ""}`}>{luzQuarto}</span>
              </div>
              <div className="button-group">
                <button className={`control-btn ${luzQuarto === "Ligada" ? "active" : ""}`} onClick={toggleLuzQuarto}>
                  {luzQuarto === "Desligada" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>

            {/* Tomada Inteligente */}
            <div className="control-card">
              <h3>🔌 Tomada Inteligente</h3>
              <div className="status-indicator">
                <span className={`status ${tomadaInteligente === "Ligada" ? "active" : ""}`}>{tomadaInteligente}</span>
              </div>
              <div className="button-group">
                <button
                  className={`control-btn ${tomadaInteligente === "Ligada" ? "active" : ""}`}
                  onClick={toggleTomadaInteligente}
                >
                  {tomadaInteligente === "Desligada" ? "Ligar" : "Desligar"}
                </button>
              </div>
            </div>

            {/* Cortina */}
            <div className="control-card">
              <h3>🪟 Cortina</h3>
              <div className="status-indicator">
                <span
                  className={`status ${cortina === "Aberta" || cortina === "Em movimento" ? "active" : ""} ${cortina === "Em movimento" ? "moving" : ""}`}
                >
                  {cortina}
                </span>
              </div>
              <div className="button-group">
                <button className="control-btn" onClick={abrirCortina} disabled={cortina === "Em movimento"}>
                  Abrir
                </button>
                <button className="control-btn" onClick={fecharCortina} disabled={cortina === "Em movimento"}>
                  Fechar
                </button>
                <button className="control-btn stop-btn" onClick={pararCortina} disabled={cortina !== "Em movimento"}>
                  Parar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
