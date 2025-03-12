import React, { useState } from "react";
import socket from "./socket";

function App() {
    const [sala, setSala] = useState("");
    const [jogador, setJogador] = useState("");
    const [senha, setSenha] = useState("");
    const [tentativa, setTentativa] = useState("");
    const [mensagens, setMensagens] = useState([]);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMensagens((prev) => [...prev, data.mensagem || data.resultado]);
    };

    const entrarNaSala = () => {
        socket.send(JSON.stringify({
            tipo: "entrar_sala",
            sala,
            jogador,
            senha
        }));
    };

    const enviarTentativa = () => {
        socket.send(JSON.stringify({
            tipo: "tentativa",
            tentativa
        }));
    };

    return (
        <div>
            <h1>Jogo de Senhas</h1>
            <input type="text" placeholder="Nome da Sala" value={sala} onChange={(e) => setSala(e.target.value)} />
            <input type="text" placeholder="Seu Nome" value={jogador} onChange={(e) => setJogador(e.target.value)} />
            <input type="text" placeholder="Senha (4 dígitos)" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={entrarNaSala}>Entrar na Sala</button>

            <h2>Jogo</h2>
            <input type="text" placeholder="Tentativa" value={tentativa} onChange={(e) => setTentativa(e.target.value)} />
            <button onClick={enviarTentativa}>Enviar Tentativa</button>

            <h2>Mensagens</h2>
            <ul>
                {mensagens.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
