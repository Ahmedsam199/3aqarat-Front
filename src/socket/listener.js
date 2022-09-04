import { socket } from './index'
import { insertItemLocal, deleteItemLocal, updateItemLocal } from '@store/actions/data'
export default {
    "Add":
        (dispatch) => {
            socket?.on("Add", (res) => {
                console.log("hacker_it_Add Socket", res)
                dispatch(insertItemLocal(res?.doctype, res?.data))
            })
        },
    "Update":
        (dispatch) => {
            socket?.on("Update", (res) => {
                console.log("hacker_it_Socket Update", res);
                dispatch(updateItemLocal(res?.doctype, res?.data))
            })
        },
    "Delete":
        (dispatch) => {
            socket?.on("Delete", (res) => {
                console.log("hacker_it Socket_Delete", res);
                dispatch(deleteItemLocal(res?.doctype, res?.data?.series))
            })
        },
    "connect": () => {
        socket?.on("connect", () => {
            console.log('hacker_it_Socket connect')
        })
    },
    "disconnect": () => {
        socket?.on("disconnect", (res) => {
            console.log("hacker_it_disconnect Socket", res);
        })
    },
}