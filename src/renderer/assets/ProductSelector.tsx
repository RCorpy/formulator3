import React, {useState} from 'react'
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';



export default function ProductSelector() {

  const colSpans = {
      n:{width:"10%"},
      nombre: {width:'30%'},
      cantidad: {width:'30%'},
      porcentaje: {width:'10%'},
      precio: {width:'20%'}
    }

  const [cantidad, setCantidad] = useState(1)

  const handleChangeCantidad = (e:any) => {
    setCantidad(e.target.value)
  }

  const [product, setProduct] = useState({
    name: "Prueba Producto",
    rawMat: true,
    price: 10000,
    components:{
      1:{
        name: "componente 1",
        porcentaje: 1/3
      },
      2:{
        name: "componente 2",
        porcentaje: 1/3
      },
      3:{
        name: "componente 3",
        porcentaje: 1/3
      }
    }
  })

  const calcularPrecio = () => {
    return "Precio"
  }


  const makeTableRows = () => {

    const localFunctionObject = product.components

    const returnValue = Object.keys(localFunctionObject).map(element=>(
      <tr key={element}>
            <th style={colSpans.n}>{element}</th>
            <th style={colSpans.nombre}>{localFunctionObject[element].name}</th>
            <th style={colSpans.cantidad}>{localFunctionObject[element].porcentaje * cantidad}</th>
            <th style={colSpans.precio}>{calcularPrecio()}</th>
      </tr>
    ))


    return returnValue
  }

  return (
    <div>
      <h1>{product.name}</h1>
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
