import React from 'react'
import { Button } from 'react-bootstrap'

export default function Datos() {

  const loadSavedData = ()=>{
    console.log("load saved data")
  }
  return (
    <div>
        <h1>Datos</h1>
        <Button onClick={loadSavedData}>Guardar</Button>
        <Button onClick={loadSavedData}>Importar</Button>
    </div>
  )
}
