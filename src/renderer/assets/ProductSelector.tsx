import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';



export default function ProductSelector({fullData}) {

  const colSpans = {
      n:{width:"10%"},
      nombre: {width:'30%'},
      cantidad: {width:'30%'},
      porcentaje: {width:'10%'},
      precio: {width:'20%'}
    }

  const [product, setProduct] = useState({
    kkey: "",
    components:{}
  })

  useEffect(()=>{
    setProduct(fullData.formulas[selectedProduct])
  },[])

  const [cantidad, setCantidad] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState("test formula")

  const handleChangeCantidad = (e:any) => {
    setCantidad(e.target.value)
  }

  const calcularPrecio = () => {
    return "Precio"
  }

  const makeTableRows = () => {
    
    const localFunctionObject = product.components

    const returnValue = Object.keys(localFunctionObject).map(element=>{
      return (
      <tr key={element}>
            <th style={colSpans.n}>{fullData.rawMats[element].kkey}</th>
            <th style={colSpans.nombre}>{element}</th>
            <th style={colSpans.cantidad}>{Number(localFunctionObject[element]) * cantidad}</th>
            <th style={colSpans.precio}>{calcularPrecio()}</th>
      </tr>
    )})
    
    return returnValue
  

  }

  return (
    <div>
      <h1>{"product.name"}</h1>
    <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th style={colSpans.n}>Nº</th>
            <th style={colSpans.nombre}>Nombre</th>
            <th style={colSpans.cantidad}>Cantidad</th>
            <th style={colSpans.precio}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {makeTableRows()}
        </tbody>
      </Table>
      <InputGroup className="mb-3">
        <InputGroup.Text>Cantidad</InputGroup.Text>
        <Form.Control type='number' onChange={handleChangeCantidad}/>
      </InputGroup>
      </div>
  )
}
