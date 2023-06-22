import React, { useState, useEffect } from 'react';
import { Form, Table, InputGroup } from 'react-bootstrap';

export default function FabricacionHistorial() {
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
    });
  };


  const getVisibleRows = (page) => {
    let lastRegistro = fullRegistro.lastnumber;

    let amountPerPage = 20;
    let counter = 0;
    let currentRegistro = Number(fullRegistro.lastnumber);
    let recordsToShowArray = [];

    do {
      if (fullRegistro[currentRegistro]) {
        
        recordsToShowArray.unshift({
          ...fullRegistro[currentRegistro],
          registro: currentRegistro}
        );
      }
      currentRegistro = currentRegistro - 1;
      
    } 
    while (currentRegistro >= 0 && recordsToShowArray.length<amountPerPage);

    console.warn(recordsToShowArray);

    return recordsToShowArray.map((record)=>{
      let duplicateRecord = {...record}
      //remove whatever isnt products
      delete duplicateRecord.registro

      //get keys of products
      let productsArray = Object.keys(duplicateRecord)
      return (
        <>
          {productsArray.map((product=>(
          <>
            <tr onClick={()=>console.log(record.registro)}>
              <th>{record.registro}</th>
              <th>
                {record[product].cantidad}
              </th>
              <th>
                {product}
              </th>
            </tr>
          </>
            )))}
          
        </>)})
  };

  return (
    <>
      <div>FabricacionHistorial</div>
      <Table striped bordered hover responsive="md">
        <tbody>{getVisibleRows(0)}</tbody>
      </Table>
    </>
  );
}
