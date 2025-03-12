const socket = new WebSocket("https://jogo-de-senhas-backend.onrender.com");

socket.onopen = () => {
    console.log("✅ Conectado ao servidor WebSocket!");
};

socket.onmessage = (event) => {
    console.log("📩 Mensagem recebida:", event.data);
};

socket.onclose = () => {
    console.log("⚠️ Conexão WebSocket fechada.");
};

export default socket;
