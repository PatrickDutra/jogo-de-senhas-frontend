import { io } from "socket.io-client";

const socket = new WebSocket("wss://jogo-de-senhas-backend.onrender.com/ws");


export default socket;
