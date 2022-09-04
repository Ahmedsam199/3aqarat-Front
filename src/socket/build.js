import React from 'react'
import Routes from '@Routes'
import { io } from 'socket.io-client'

const SocketBuild = () => {
    const [socket, setSocket] = React.useState()
    const startSocket = React.useCallback(() => { setSocket(io(Routes.SocketChannel)) }, [socket])
    // const stopSocket = React.useCallback(() => {
    //     console.log("hacker_it", socket)
    //     socket?.close()
    // }, [socket])
    const stopSocket = (tempSocket) => {
        console.log("hacker_it tempSocket", tempSocket);
        tempSocket?.close()
    }
    // it's faked component so return null
    return [socket, startSocket, stopSocket]
}

export default SocketBuild
