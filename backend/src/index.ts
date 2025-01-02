import { WebSocket, WebSocketServer } from "ws";
import { CREATE_ANSWER, CREATE_OFFER, IDENTIFY_AS_RECEIVER, IDENTIFY_AS_SENDER } from "./types";


const wss = new WebSocketServer({port : 8080});

let senderSocket : null | WebSocket = null;
let receiverSocket : null | WebSocket = null;

wss.on("connection", function connection(ws) {
    setInterval(() => {
        ws.send('hello john')
    }, 1000);
})