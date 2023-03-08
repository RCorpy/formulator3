import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState,useEffect } from 'react';

export default function addToFormulaModal({show, onHide, product, setProduct}) {

    const [cantidad, setCantidad] = useState(0)


    const handleSuccess = () =>{
        const newProduct = JSON.parse(JSON.stringify(product));
        //newProduct.components[element] = cantidad
        //setProduct(newProduct)

        onHide()
    }

    const handleDanger = () => {
        
        const newProduct = JSON.parse(JSON.stringify(product));
        //delete newProduct.components[element]
        //setProduct(newProduct)

        onHide()
        
    }  
    const handleChangeCantidad = (e:any) => {
        setCantidad(e.target.value)
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
          Añadir fila
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div></div>
        <div>Nuevo <Form.Control type='number' onChange={handleChangeCantidad} value={cantidad}/> </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={()=>handleSuccess()}>Guardar</Button>
        <Button variant="danger" onClick={()=>handleDanger()}>Borrar Componente</Button>
      </Modal.Footer>
    </Modal>
  );
}