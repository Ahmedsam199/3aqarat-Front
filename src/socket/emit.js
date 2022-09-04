import { socket } from './index'

export default {
    "join": (value) => {
        console.log('Socket Va;lue',value)
        console.log("hacker_it join to data socket", value); 
        socket?.emit('join',value)
    }
}

