"use client"

import { useState, useEffect, useRef } from "react"
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

  const [mqttConnected, setMqttConnected] = useState(false)
  const [messageHistory, setMessageHistory] = useState([])
  const [darkTheme, setDarkTheme] = useState(false)
  const clientRef = useRef(null)

  const addToHistory = (type, topic, message) => {
    const timestamp = new Date().toLocaleTimeString()
    const newMessage = {
      id: Date.now(),
      type, // 'sent' ou 'received'
      topic,
      message,
      timestamp,
    }
    setMessageHistory((prev) => [newMessage, ...prev.slice(0, 49)]) // Manter apenas 50 mensagens
  }

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  useEffect(() => {
    const connectMQTT = async () => {
      try {
        // Usando biblioteca MQTT via CDN
        const script = document.createElement("script")
        script.src = "https://unpkg.com/mqtt@4.3.7/dist/mqtt.min.js"
        script.onload = () => {
          const client = window.mqtt.connect("wss://broker.hivemq.com:8884/mqtt")

          client.on("connect", () => {
            console.log("Conectado ao broker MQTT!")
            setMqttConnected(true)
            addToHistory("system", "sistema", "Conectado ao broker MQTT")

            // Subscrever aos tópicos de status
            client.subscribe("casa/quarto/status/luz")
            client.subscribe("casa/quarto/status/tomada")
          })

          client.on("message", (topic, message) => {
            const msg = message.toString()
            console.log(`Recebido: ${topic} = ${msg}`)
            addToHistory("received", topic, msg)

            // Atualizar estados baseado nas mensagens recebidas
            if (topic === "casa/quarto/status/luz") {
              setLuzQuarto(msg === "ON" ? "Ligada" : "Desligada")
            } else if (topic === "casa/quarto/status/tomada") {
              setTomadaInteligente(msg === "ON" ? "Ligada" : "Desligada")
            }
          })

          client.on("error", (error) => {
            console.error("Erro MQTT:", error)
            setMqttConnected(false)
            addToHistory("system", "sistema", "Erro de conexão MQTT")
          })

          clientRef.current = client
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Erro ao conectar MQTT:", error)
      }
    }

    connectMQTT()

    return () => {
      if (clientRef.current) {
        clientRef.current.end()
      }
    }
  }, [])

  const publishMQTT = (topic, message) => {
    if (clientRef.current && mqttConnected) {
      clientRef.current.publish(topic, message)
      console.log(`Enviado: ${topic} = ${message}`)
      addToHistory("sent", topic, message)
    } else {
      console.warn("MQTT não conectado")
    }
  }

  const togglePortaSocial = () => {
    const newState = portaSocial === "Fechada" ? "Aberta" : "Fechada"
    setPortaSocial(newState)
    publishMQTT("casa/garagem/portao_social", newState === "Aberta" ? "ON" : "OFF")
  }

  const togglePortaBasculante = () => {
    const newState = portaBasculante === "Fechada" ? "Aberta" : "Fechada"
    setPortaBasculante(newState)
    publishMQTT("casa/garagem/portao_basculante", newState === "Aberta" ? "ON" : "OFF")
  }

  const toggleLuzGaragem = () => {
    const newState = luzGaragem === "Desligada" ? "Ligada" : "Desligada"
    setLuzGaragem(newState)
    publishMQTT("casa/garagem/luz", newState === "Ligada" ? "ON" : "OFF")
  }

  const toggleLuzSala = () => {
    const newState = luzSala === "Desligada" ? "Ligada" : "Desligada"
    setLuzSala(newState)
    publishMQTT("casa/sala/luz", newState === "Ligada" ? "ON" : "OFF")
  }

  const toggleArCondicionado = () => {
    const newState = arCondicionado === "Desligado" ? "Ligado" : "Desligado"
    setArCondicionado(newState)
    publishMQTT("casa/sala/ar", newState === "Ligado" ? "ON" : "OFF")
  }

  const toggleUmidificador = () => {
    const newState = umidificador === "Desligado" ? "Ligado" : "Desligado"
    setUmidificador(newState)
    publishMQTT("casa/sala/umidificador", newState === "Ligado" ? "ON" : "OFF")
  }

  const toggleLuzQuarto = () => {
    const newState = luzQuarto === "Desligada" ? "Ligada" : "Desligada"
    setLuzQuarto(newState)
    publishMQTT("casa/quarto/luz", newState === "Ligada" ? "ON" : "OFF")
  }

  const toggleTomadaInteligente = () => {
    const newState = tomadaInteligente === "Desligada" ? "Ligada" : "Desligada"
    setTomadaInteligente(newState)
    publishMQTT("casa/quarto/tomada", newState === "Ligada" ? "ON" : "OFF")
  }

  const abrirCortina = () => {
    setCortina("Em movimento")
    publishMQTT("casa/quarto/cortina", "ABRIR")
    setTimeout(() => setCortina("Aberta"), 5000) // 5 segundos como no código Arduino
  }

  const fecharCortina = () => {
    setCortina("Em movimento")
    publishMQTT("casa/quarto/cortina", "FECHAR")
    setTimeout(() => setCortina("Fechada"), 5000) // 5 segundos como no código Arduino
  }

  const pararCortina = () => {
    setCortina("Parada")
    publishMQTT("casa/quarto/cortina", "PARAR")
  }

  return (
    <div className={`App ${darkTheme ? "dark-theme" : "light-theme"}`}>
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🏠 Sistema de Automação Residencial</h1>
            <p>Controle todos os dispositivos da sua casa</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkTheme ? "☀️" : "🌙"}
          </button>
        </div>
        <div className={`mqtt-status ${mqttConnected ? "connected" : "disconnected"}`}>
          <span className="status-dot"></span>
          {mqttConnected ? "Conectado ao Wokwi" : "Desconectado"}
        </div>
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

        <section className="room-section">
          <h2>📋 Histórico de Mensagens MQTT</h2>
          <div className="message-history">
            {messageHistory.length === 0 ? (
              <p className="no-messages">Nenhuma mensagem ainda...</p>
            ) : (
              messageHistory.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.type}`}>
                  <div className="message-header">
                    <span className="message-type">
                      {msg.type === "sent" ? "📤" : msg.type === "received" ? "📥" : "⚙️"}
                    </span>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                  <div className="message-content">
                    <strong>{msg.topic}</strong>: {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
