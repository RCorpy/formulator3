import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DangerModalDatos({
  show,
  onHide,
  dangerFunction,
  extraCheck,
}) {
  const [showExtraCheckMessage, setShowExtraCheckMessage] = useState(false);
  const [savedFiles, setSavedFiles] = useState([]);
  const [jsonOption, setJsonOption] = useState('');

  const navigate = useNavigate();

  const handleAceptar = () => {
    onHide();
    window.electron.ipcRenderer.sendMessage('restoreSavedData', jsonOption);
    console.log('aceptando');
  };

  const handleBorrar = () => {
    onHide();
    window.electron.ipcRenderer.sendMessage('eraseSavedData', jsonOption);
    navigate('/');
  };

  window.electron.ipcRenderer.once('sendSavedFiles', (recievedSavedFiles) => {
    // eslint-disable-next-line no-console
    let allJsonFiles = recievedSavedFiles.sort().reverse();
    setSavedFiles(allJsonFiles);
    setJsonOption(allJsonFiles[0]);
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getSavedFiles');
  }, []);

  const elementToDate = (element) => {
    let year = element.slice(0, 4);
    let month = element.slice(4, 6);
    let day = element.slice(6, 8);

    return `${day} / ${month} / ${year}`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">¡ALERTA!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          aria-label="Default select example"
          value={jsonOption}
          onChange={(e) => setJsonOption(e.target.value)}
        >
          {savedFiles.map((element) => (
            <option value={element} key={element}>
              {elementToDate(element)}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleAceptar()}>
          Importar
        </Button>
        <Button onClick={() => onHide()}>Cancelar</Button>
        <Button variant="danger" onClick={() => handleBorrar()}>
          Borrar
        </Button>
      </Modal.Footer>
      <Modal.Footer style={{ color: 'red' }}>
        {showExtraCheckMessage
          ? 'Esta formula forma parte de otras ' + extraCheck()
          : ''}
      </Modal.Footer>
    </Modal>
  );
}
