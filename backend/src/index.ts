import { WebSocket, WebSocketServer } from "ws";
import { CREATE_ANSWER, CREATE_OFFER, RECEIVER, SENDER } from "./types";


const wss = new WebSocketServer({port : 8080});

let senderSocket : null | WebSocket = null;
let receiverSocket : null | WebSocket = null;

wss.on("connection", function connection(ws) {

    ws.on("message", function message(data : any) {
        
        const message = JSON.parse(data)

        console.log(message.type);
        

        if (message.type === SENDER) {
            senderSocket = ws
 
        } else if (message.type === RECEIVER) {
            receiverSocket = ws
     
        } else if (message.type === CREATE_OFFER) {
            if (ws !== senderSocket) {
                return
            }
            console.log(message);
            
            receiverSocket?.send(JSON.stringify({ type : CREATE_OFFER, sdp : message.sdp}))
        } else if (message.type === CREATE_ANSWER) {
            if (ws !== receiverSocket) {
                return
            }
            senderSocket?.send(JSON.stringify({ type : CREATE_ANSWER, sdp : message.sdp}))
        }
        
    })
})