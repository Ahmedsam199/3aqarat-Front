import { socket } from './index'
export default {
    "connect": (cb) => {
        socket.on("connect", () => {
            cb()
        })
    },
    "disconnect": (cb) => {
        socket.on("disconnect", (res) => {
            console.log("hacker_it", "disconnect", res)
            cb()
        })
    },
    "newMessage": (cb) => {
        socket.on("newMessage", (message) => {
            console.log("hacker_it", message)
            cb(message)
        })
    }
}