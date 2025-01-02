import { useEffect } from "react"
import { useSocket } from "../hooks/useSocket"



export const Receiver = () => {

            
    const socket = useSocket()


    useEffect(() => {

        if (!socket) {
            return;
        }

        socket.onmessage = async (event : any) => {

            const message = JSON.parse(event.data);
            
            if (message.type === "createOffer") {
                // set received sdp remotely
                const pc = new RTCPeerConnection();
                await pc.setRemoteDescription(message.sdp);
                // create answer and set locally and send to the sender
                const answer = await pc.createAnswer()
                await pc.setLocalDescription(answer)
                socket.send(JSON.stringify({ type : "createAnswer", sdp : pc.localDescription }))
            }
        }
    }, [])
    return <div>
        Receiver
    </div>
}