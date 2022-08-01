import { socket } from './index'

export default {
    "join": (value) => {
        console.log("hacker_it","join to data socket") 
        socket?.emit('join', value)
    }
}

