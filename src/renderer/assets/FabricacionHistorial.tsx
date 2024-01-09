import React, { useState, useEffect } from 'react';
import { Form, Table, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function FabricacionHistorial() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [currentRegistro, setCurrentRegistro] =useState(0)
  const [fullRegistro, setFullRegistro] = useState({
    '0': {
      'test product2': {
        cantidad: 1,
        components: {},
      },
      test131: {
        cantidad: '4',
        components: {},
      },
    },
    lastnumber: 0,
  });

  useEffect(() => getFullRegistro(), []);
  //useEffect(() => getVisibleRows(), [fullRegistro]);

  const getFullRegistro = () => {
    window.electron.ipcRenderer.sendMessage(
      'get-full-registro',
      'get-full-registro'
    );
    window.electron.ipcRenderer.once('got-full-registro', (recievedData) => {
      // eslint-disable-next-line no-console
      setFullRegistro(recievedData);
      setCurrentRegistro(recievedData.lastnumber)
    });
  };

  const getVisibleRows = () => {

    let amountPerPage = 15;
    let recordsToShowArray = [];
    let currentPos = currentRegistro

    do {
      if (fullRegistro[currentPos]) {
        recordsToShowArray.unshift({
          ...fullRegistro[currentPos],
          registro: currentPos,
        });
      }
      currentPos = currentPos - 1;
    } while (currentPos >= 0 && recordsToShowArray.length < amountPerPage);

    console.warn(recordsToShowArray);

    return recordsToShowArray.reverse().map((record) => {
      let duplicateRecord = { ...record };
      //remove whatever isnt products
      delete duplicateRecord.registro;

      //get keys of products
      let productsArray = Object.keys(duplicateRecord);

      return (
        <>
          {productsArray.map((product) => (
            <>
              <tr
                onClick={() => navigate(`/gestion/registro/${record.registro}`)}
              >
                <th>{record[product].date}</th>
                <th>{record.registro}</th>
                <th>{product}</th>
                <th>{record[product].cantidad}</th>
              </tr>
            </>
          ))}
        </>
      );
    });
  };

  const anterior = () => {
    setCurrentRegistro(currentRegistro-15)
  }
  const siguiente = () => {
    setCurrentRegistro(currentRegistro+15)
  }
 const currentRegistroChange = (e) =>{
  setCurrentRegistro(e.target.value)
 }

  return (
    <>
      <div>FabricacionHistorial</div>
      
      <Button onClick={anterior}>Anterior</Button><input type="number" value={currentRegistro} onChange={(e)=>currentRegistroChange(e)}/><Button onClick={siguiente}>Siguiente</Button>
      <Table striped bordered hover responsive="md">
        <tbody>
          <tr>
            <th>Fecha</th>
            <th>Registro</th>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
          {getVisibleRows()}
        </tbody>
      </Table>
    </>
  );
}
