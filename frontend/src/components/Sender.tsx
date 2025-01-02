import { useEffect } from "react"
import { WebSocket } from "ws"



export const Sender = () => {

    useEffect(() => {

        const socket = new WebSocket("ws://localhost:8080")
        socket.onopen = () => {
            socket.send(JSON.stringify({ type : "sender"}))
        }
    }, [])
    return <div>
        Sender
    </div>
}