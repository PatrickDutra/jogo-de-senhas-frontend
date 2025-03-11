import React, { useState } from "react";

function App() {
    const [ws, setWs] = useState(null);
    const [sala, setSala] = useState("");
    const [jogador, setJogador] = useState("");
    const [senha, setSenha] = useState("");
    const [tentativa, setTentativa] = useState("");
    const [mensagens, setMensagens] = useState([]);
    const [jogando, setJogando] = useState(false);

    const conectarWebSocket = () => {
        if (!sala || !jogador || senha.length !== 4) {
            alert("Digite um nome de sala, nome de jogador e escolha uma senha de 4 dígitos!");
            return;
        }

        const ws = new WebSocket("wss://jogo-de-senhas-backend.onrender.com/ws");



        websocket.onopen = () => {
            console.log("✅ Conectado ao WebSocket!");
            websocket.send(JSON.stringify({ tipo: "entrar_sala", sala, jogador, senha }));
            setJogando(true); // Atualiza estado para indicar que o jogo começou
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📩 Mensagem recebida:", data);

            setMensagens((prev) => [...prev, data.mensagem || data.resultado]);
        };

        websocket.onclose = () => {
            console.log("⚠️ Conexão WebSocket fechada.");
            setJogando(false);
            setWs(null);
        };

        setWs(websocket);
    };

    const enviarTentativa = () => {
        if (ws && tentativa.length === 4) {
            ws.send(JSON.stringify({ tipo: "tentativa", tentativa }));
            setTentativa("");
        } else {
            alert("Digite uma tentativa válida (4 dígitos).");
        }
    };

    const sairDaSala = () => {
        if (ws) {
            ws.close(); // Fecha a conexão WebSocket
        }
        setWs(null);
        setJogando(false);
        setSala("");
        setJogador("");
        setSenha("");
        setTentativa("");
        setMensagens([]);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>🔐 Jogo de Senhas</h1>

            {!jogando ? (
                <div>
                    <input
                        type="text"
                        placeholder="Nome da Sala"
                        value={sala}
                        onChange={(e) => setSala(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Seu Nome"
                        value={jogador}
                        onChange={(e) => setJogador(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Escolha sua senha (4 dígitos)"
                        maxLength="4"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value.replace(/\D/, ""))}
                    />
                    <button onClick={conectarWebSocket}>Entrar na Sala</button>
                </div>
            ) : (
                <div>
                    <h2>Sala: {sala}</h2>
                    <h3>Jogador: {jogador}</h3>
                    <h3>🔑 Sua senha: <span style={{ fontWeight: "bold", color: "blue" }}>{senha}</span></h3>

                    <input
                        type="text"
                        placeholder="Digite sua tentativa (4 dígitos)"
                        maxLength="4"
                        value={tentativa}
                        onChange={(e) => setTentativa(e.target.value.replace(/\D/, ""))}
                    />
                    <button onClick={enviarTentativa}>Enviar Tentativa</button>

                    <h3>Mensagens:</h3>
                    <ul>
                        {mensagens.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>

                    <button style={{ backgroundColor: "red", color: "white", marginTop: "10px" }} onClick={sairDaSala}>
                        ❌ Sair da Sala
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
