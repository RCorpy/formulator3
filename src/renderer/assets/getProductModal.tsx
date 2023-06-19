import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import { Form, Table, InputGroup } from 'react-bootstrap';

export default function GetProductModal({show, onHide, fullData, setProduct}) {

  const [currentSeachTerm, setCurrentSearchTerm] = useState("")

  let formulasArray = Object.keys(fullData.formulas)
  let rawMatsArray = Object.keys(fullData.rawMats)

  useEffect(()=>{
    formulasArray = Object.keys(fullData.formulas)
    rawMatsArray = Object.keys(fullData.rawMats)
  },[fullData])

  const settingResult = (element) =>{
    console.log(element)
    //setProduct(element)
  }

  const makeTableBodyFormulas = () => {

    let foundFormulas = formulasArray.filter(element => element.includes(currentSeachTerm.trim()))


    return (<>
            {foundFormulas.map(element=>(
            <tr key={element}>
              <th>
                {element}
              </th>
              <th>
                <Button onClick={()=>settingResult(fullData.formulas[element])}>Ver</Button>
              </th>
            </tr>))}          
    </>)
  }

  const makeTableBodyRaws = () => {

    let foundRawMaterials = rawMatsArray.filter(element => element.includes(currentSeachTerm.trim()))

    return (<>
      {foundRawMaterials.map(element=>(
      <tr key={element}>
              <th>
                {element}
              </th>
              <th>
                <Button onClick={()=>settingResult(fullData.rawMats[element])}>Ver</Button>
              </th>
      </tr>))}          
</>)
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
        <div>    
          <InputGroup className="mb-3" >
            <InputGroup.Text>busqueda</InputGroup.Text>
            <Form.Control value={currentSeachTerm} onChange={(event)=>{setCurrentSearchTerm(event.target.value)}}/>
          </InputGroup>
        </div>
        <Table striped bordered hover responsive="md">
        <tbody>
        {currentSeachTerm.length > 2 ? makeTableBodyRaws() : ""}
        {currentSeachTerm.length > 2 ? makeTableBodyFormulas() : ""}
        </tbody>
      </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" >Guardar</Button>
        <Button variant="danger" onClick={()=>onHide()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}