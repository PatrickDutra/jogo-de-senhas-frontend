import { io } from "socket.io-client";
import { BACKEND_URL } from "./config"; // Importando a URL do backend

const socket = io(BACKEND_URL); // Usando a URL do backend no WebSocket

export default socket;
