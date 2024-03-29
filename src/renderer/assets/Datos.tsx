import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DangerModalDatos from './DangerModalDatos';

export default function Datos({ fullData, setFullData }) {
  const [showDangerModal, setShowDangerModal] = useState(false);

  const loadSavedData = () => {
    setShowDangerModal(true);
    console.log('load saved data');
  };

  const saveFullData = () => {
    window.electron.ipcRenderer.sendMessage('newSaveData', fullData);
  };

  return (
    <div>
      <h1>Datos</h1>
      <Button onClick={saveFullData}>Guardar</Button>
      <Button onClick={loadSavedData}>Importar</Button>
      <DangerModalDatos
        show={showDangerModal}
        onHide={() => setShowDangerModal(false)}
        dangerFunction={() => {
          console.log('dangerFunction');
        }}
        extraCheck={() => {
          console.log('extraCheckFunction');
        }}
      />
    </div>
  );
}
