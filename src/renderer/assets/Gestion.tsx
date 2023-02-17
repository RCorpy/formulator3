import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



export default function Gestion() {

    const myTestObject = {
        "hello": "world"
    }

    const getJSONData = () => {
    {
        window.electron.ipcRenderer.sendMessage('ipc-example', myTestObject);
    }

        

    }

  return (
    <div>
        <h1>Gestion</h1>
        <Link to="/gestion/nuevo">
            <Button onClick={()=>getJSONData()}>Nuevo</Button>
        </Link>
        <Link to="/gestion/buscar">
            <Button onClick={()=>getJSONData()}>Historial</Button>
        </Link>
        
    </div>
  )
}
