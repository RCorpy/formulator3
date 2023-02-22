import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



export default function Gestion() {



  return (
    <div>
        <h1>Gestion</h1>
        <Link to="/gestion/nuevo">
            <Button>Nuevo</Button>
        </Link>
        <Link to="/gestion/buscar">
            <Button>Buscar</Button>
        </Link>        
    </div>
  )
}
