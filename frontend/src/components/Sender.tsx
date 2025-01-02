

import { useSocket } from "../hooks/useSocket"



export const Sender = () => {

    const socket = useSocket()

    

    async function startSendingVideo () {

        if (!socket) return;

        // create offer
        const pc = new RTCPeerConnection()
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        socket?.send(JSON.stringify( { type : "createOffer", sdp : pc.localDescription}))

        socket.onmessage = (event : any) => {
            const data = JSON.parse(event.data)

            if (data.type === "createAnswer") {
                pc.setRemoteDescription(data.sdp)
            }
        }
    }
    return <div>
        Sender
        <button onClick={startSendingVideo}>Send video</button>
    </div>
}