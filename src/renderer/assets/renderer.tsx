import { IpcRenderer } from 'electron'
import {FETCH_DATA_FROM_STORAGE, HANDLE_FETCH_DATA, HANDLE_SAVE_DATA, SAVE_DATA_IN_STORAGE} from './Constants'

export function loadSavedData() {
    console.log("LOADSAVEDDATA", FETCH_DATA_FROM_STORAGE, HANDLE_FETCH_DATA, HANDLE_SAVE_DATA, SAVE_DATA_IN_STORAGE)
    IpcRenderer.send('FETCH_DATA_FROM_STORAGE', "items")
}

export function saveDataInStorage(item){
    console.log("sending SAVE DATA IN STORAGE")
    //ipcRenderer.send(SAVE_DATA_IN_STORAGE, item)
}