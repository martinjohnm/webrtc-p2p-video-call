

import { useEffect, useState } from "react";


export const Sender = () => {

    const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080")

        socket.onopen = () => {
            socket.send(JSON.stringify({ type : "sender"}))
        }

        setSocket(socket)
    }, [])

    async function startSendingVideo () {

        if (!socket) return;

        // create offer
        const pc = new RTCPeerConnection()
        const offer = await pc.createOffer(); // creates and sdp here
        await pc.setLocalDescription(offer)
        socket.send(JSON.stringify({ type : "createOffer", sdp : pc.localDescription }))

        socket.onmessage = (event : any) => {
            const data = JSON.parse(event.data)
         
            if ( data.type === "createAnswer") {
                pc.setRemoteDescription(data.sdp)
            }
        }
    }
    return <div>
        <div className="max-w-5xl container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <button className="bg-green-500 px-5 py-2 rounded-md text-black" onClick={startSendingVideo}>Send video</button>
            </div>
        </div>
    </div>
}