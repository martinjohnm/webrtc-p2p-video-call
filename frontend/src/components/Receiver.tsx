import { useEffect, useState } from "react"


export const Receiver = () => {

            
    
    const [socket, setSocket] = useState<WebSocket | null>(null)
    

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080")

        socket.onopen = () => {
            socket.send(JSON.stringify({ type : "receiver"}))
        }

        setSocket(socket)
    }, [])

    useEffect(() => {

        if (!socket) {
            return;
        }

        socket.onmessage = async (event : any) => {
            const message = JSON.parse(event.data);
            if (message.type === "createOffer") {
                // create an answer

                console.log(message);
                

                const pc = new RTCPeerConnection()
                await pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer()
                await pc.setLocalDescription(answer)
                socket.send(JSON.stringify({ type : "createAnswer", sdp : pc.localDescription }))
            }
        }
    }, [socket])
    return  <div className="max-w-5xl container mx-auto">
            <div className="flex justify-center items-center h-screen">
        Receiver
    </div>
    </div>
}