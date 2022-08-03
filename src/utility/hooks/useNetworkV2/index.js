import Routes from "@Routes";
import { clearData } from '@store/actions/data';
import { setNetwork } from '@store/actions/tempData';
import { getUserData } from '@utils';
import axios from 'axios';
import { InfoToast } from 'components/InfoToast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import db from '../../api/cacheDB';
import Emit from './Emit';
import Listener from './Listener';
export const socket = io(Routes.Socket.check)
const backOnline = async () => {
    const requests = await db
        .table('request')
        .filter((x) => x.synced === false)
        .toArray();
    await requests?.reduce(async (promise, req) => {
        await promise; //await for the prev requests to be finished
        const { id, request, url, synced } = req;
        if (synced) return
        const data = JSON.parse(request);
        const response = await axios.post(url, data);
        if (response.status == 200) {
            await db.table('request').update(id, {
                synced: true,
                response: JSON.stringify(response.data),
            });
        } else {
            await db.table('request').update(id, {
                synced: true,
                response: JSON.stringify(response),
            });

        }
    }, Promise.resolve());
}
const NetworkProvider = () => {
    const { network } = useSelector(state => state.tempData)
    const dispatch = useDispatch()
    const clearDataOffline = () => {
        // setTimeout(() => {
        dispatch(clearData("Offline"))
        // }, 1000);
    }
    const isOffline = () => {
        dispatch(setNetwork(false))
    }
    const isOnline = () => {
        clearDataOffline()
        backOnline()
        dispatch(setNetwork(true))
        Emit.join({ App: "POS", Series: getUserData()?.id })
    }
    const getMessage = (msg) => {
        switch (msg.type) {
            case "info":
                toast.info(<InfoToast msg={msg.Message} />, { hideProgressBar: true });
                break;
            default: break;
        }
    }
    const checkInitState = () => {
        socket.connected ? isOnline() : isOffline()
    }
    useEffect(() => {
        checkInitState()
        Listener.disconnect(isOffline)
        Listener.connect(isOnline)
        Listener.newMessage(getMessage)
    }, [])
    return [network]
}

export default NetworkProvider