import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { Form, Table, InputGroup } from 'react-bootstrap';

export default function addToFormulaModal({show, onHide, product, setProduct, fullData, searched}) {

    const [cantidad, setCantidad] = useState(0)
    const [currentSeachTerm, setCurrentSearchTerm] = useState("")
  
    let formulasArray = Object.keys(fullData.formulas)
    let rawMatsArray = Object.keys(fullData.rawMats)
  
    useEffect(()=>{
      formulasArray = Object.keys(fullData.formulas)
      rawMatsArray = Object.keys(fullData.rawMats)
    },[fullData])

    const handleSearchChange = (event:any) => {
      setCurrentSearchTerm(event.target.value)
    }
    const handleSelect = (element)=>{
      //SELECCIONAR ELEMENTO, HABILITAR GUARDAR
      setCurrentSearchTerm(element)
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
            <Button onClick={()=>handleSelect(element)}>Ver</Button>
          </th>
        </tr>))}          
  </>)
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
                  <Button onClick={()=>handleSelect(element)}>Ver</Button>
                </th>
              </tr>))}          
      </>)
    }

    const handleSuccess = () =>{
        const exactMatchRawArray = rawMatsArray.filter(element => element===currentSeachTerm)
        const exactFormulaArray = formulasArray.filter(element => element===currentSeachTerm)

        if(exactMatchRawArray.length + exactFormulaArray.length===1 && (product.components[currentSeachTerm]==undefined) && searched!==currentSeachTerm){
          const newProduct = JSON.parse(JSON.stringify(product));
          newProduct.components[currentSeachTerm]=cantidad
          setProduct(newProduct)
          console.log(product)
        }
        else{
          if(exactMatchRawArray.length + exactFormulaArray.length===1){ console.log(" se han encontrado mas de 1 posibilidad ")}
          if(product.components[currentSeachTerm]==undefined){console.log("ya existe")}
          if(searched!==currentSeachTerm){console.log("no se puede añadir un producto a su propia lista de componentes")}
        }
    }
    const handleDanger = () => {

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
        <div>    
          <InputGroup className="mb-3" >
            <InputGroup.Text>busqueda</InputGroup.Text>
            <Form.Control onChange={handleSearchChange} value={currentSeachTerm}/>
          </InputGroup>

          <Table striped bordered hover responsive="md">
            <tbody>
            {currentSeachTerm.length > 2 ? makeTableBodyRaws() : ""}
            {currentSeachTerm.length > 2 ? makeTableBodyFormulas() : ""}
            </tbody>
          </Table>
        </div>
        <div>Nuevo <Form.Control type='number' onChange={handleChangeCantidad} value={cantidad}/> </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={()=>handleSuccess()}>Guardar</Button>
        <Button variant="danger" onClick={()=>handleDanger()}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}