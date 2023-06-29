import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Registro() {
  let { id } = useParams();

  const [registro, setRegistro] = useState({
    'test product2': {
      cantidad: 1,
      components: {},
    },
    test131: {
      cantidad: '4',
      components: {},
    },
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-this-registro', id);
    window.electron.ipcRenderer.once('got-this-registro', (recievedData) => {
      // eslint-disable-next-line no-console
      setRegistro(recievedData);
    });
  }, []);

  const showRegistroCuerpo = () => {
    let productos = Object.keys(registro);

    return (
      <>
        {productos.map((producto) => (
          <>
            <div className="registroproductheader">
              <div>{producto}</div>
              <div>{registro[producto].cantidad}</div>
            </div>
            <Table>
              {Object.keys(registro[producto].components).map((component) => (
                <>
                  {component}: {registro[producto].components[component]}
                </>
              ))}
            </Table>
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="registromenu">
        <div>Registro: {id} </div>
        <Button>Imprimir</Button>
      </div>
      <div className="registrocuerpo">{showRegistroCuerpo()}</div>
      <div className="registropie">
        <Button variant="danger">Eliminar</Button>
      </div>
    </>
  );
}
