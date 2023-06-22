import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Fabricacion({ fullData }) {
  return (
    <div>
      <h1>Fabricacion</h1>

      <Link to="/fabricacion/nuevo">
        <Button>Nuevo</Button>
      </Link>
      <Link to="/fabricacion/historial">
        <Button onClick={() => console.log('this is fullData', fullData)}>
          Historial
        </Button>
      </Link>
    </div>
  );
}
