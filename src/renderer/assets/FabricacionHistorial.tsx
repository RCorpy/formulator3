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
  useEffect(() => getVisibleRows(), [fullRegistro]);

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
      currentRegistro = currentRegistro - 1;
      if (fullRegistro[currentRegistro]) {
        console.log('found', fullRegistro[currentRegistro]);
        recordsToShowArray.unshift([
          currentRegistro,
          fullRegistro[currentRegistro],
        ]);
      }
      console.log(`currentRegistro: ${currentRegistro}`);
    } while (currentRegistro > 0);

    console.warn(recordsToShowArray);
    /*while (currentRegistro >= 0) {
      currentRegistro = currentRegistro - 1;
      if (fullRegistro[currentRegistro]) {
        recordsToShowArray = recordsToShowArray.unshift(
          fullRegistro[currentRegistro]
        );
      }
    }*/
  };

  return (
    <>
      <div>FabricacionHistorial</div>
      <Table striped bordered hover responsive="md">
        <tbody></tbody>
      </Table>
    </>
  );
}
