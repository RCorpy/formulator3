import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DangerModal from './DangerModal';

export default function Datos({ fullData, setFullData }) {
  const [showDangerModal, setShowDangerModal] = useState(false);

  const loadSavedData = () => {
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
      <Button onClick={() => setShowDangerModal(true)}>showmodal</Button>
      <DangerModal
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
