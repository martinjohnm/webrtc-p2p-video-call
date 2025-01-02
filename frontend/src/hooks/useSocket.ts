import { useEffect, useState } from "react"
import { WebSocket } from "ws"



export const useSocket = () => {
    
    const [socket, setSocket ] = useState<WebSocket | null>(null)
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            setSocket(ws)
        }

        ws.onclose = () => {
            setSocket(null)
        }

        return () => {
            ws.close()
        }
    }, [])

    return socket
}