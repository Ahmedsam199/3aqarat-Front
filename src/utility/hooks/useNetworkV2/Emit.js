import { socket } from './index'
export default {
    "join": (value) => {
        socket.emit("join", value)
    }
}
