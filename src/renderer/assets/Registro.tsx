import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function Registro() {
  let { id } = useParams();

  const navigate = useNavigate()

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

  const eliminarRegistro = () => {
    
    window.electron.ipcRenderer.sendMessage('delete-this-registro', id)
    navigate('/fabricacion')
  }

  //IMPRIMIR FUNCTION

  function printElem(){
    window.print()
  
}
  // END OF IMRPIMIR

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
                <tr>
                  <th className='productline'>{component}</th>
                  <th className='productline'>{registro[producto].components[component]*registro[producto].cantidad}</th>
                </tr>
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
        <Button onClick={()=>printElem()}>Imprimir</Button>
      </div>
      <div className="registrocuerpo">{showRegistroCuerpo()}</div>
      <div className="registropie">
        <Button onClick={()=>eliminarRegistro()} variant="danger">Eliminar Registro</Button>
      </div>
      <Button onClick={()=>navigate('/print')}>PRINT SCREEN</Button>
      <div  className='printablediv'>
        THIS WILL PRINT
      </div>
    </>
  );
}
