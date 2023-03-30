export default function persistFunc(newData){
    console.log("persisting", newData)
    window.electron.ipcRenderer.sendMessage('ipc-example', newData);
}