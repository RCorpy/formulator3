import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


export default function DangerModal({show, onHide, dangerFunction, extraCheck}) {

    const [showExtraCheckMessage, setShowExtraCheckMessage] = useState(false)

    const handleAceptar = () =>{
        if(extraCheck().length < 1){
          dangerFunction()
          onHide()
        }
        else{
          setShowExtraCheckMessage(true)
        }
    }


  return (
    <Modal
        show={show}
        onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          ¡ALERTA!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estas seguro?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>onHide()}>Cancelar</Button>
        <Button variant="danger" onClick={()=>handleAceptar()}>Borrar</Button>
      </Modal.Footer>
      <Modal.Footer style={{ color: 'red'}}>
      {showExtraCheckMessage ? "Esta formula forma parte de otras "+ extraCheck() : ""}
      </Modal.Footer>
    </Modal>
  );
}