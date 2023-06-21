import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import { Form, Table, InputGroup } from 'react-bootstrap';

export default function AddOrCancelModal({show, onHide, onAccept}) {

  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Body>
        <div>
            El registro ya existe, ¿añadir al existente como un unico pedido?
        </div>
        <div>    
          <Button variant={'success'} onClick={()=>onAccept()}>Añadir</Button>
          <Button variant={"danger"} onClick={()=>onHide()}>Cancelar</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
}