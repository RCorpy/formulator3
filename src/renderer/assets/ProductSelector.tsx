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

  const calcularPrecio = (formula) => {
    let thisFormula = fullData.formulas[formula]
    let returnTotal = 0
    Object.keys(thisFormula.components).forEach(component => {
      if(fullData.rawMats[component]) returnTotal= returnTotal + (Number(thisFormula.components[component])*fullData.rawMats[component].price)
      else {
        console.log("else", calcularPrecio(component))
        returnTotal = returnTotal + calcularPrecio(component) * Number(thisFormula.components[component])
      }
    })
     return returnTotal
  }

  const makeTableRows = () => {
    let total = 0
    const localFunctionObject = product.components

    const returnValue = Object.keys(localFunctionObject).map(element=>{
      
      if(fullData.rawMats[element]){
        //console.log("raw", element)
        let precioLocal = fullData.rawMats[element].price 
        
        total = total + precioLocal * Number(localFunctionObject[element])

        console.log(precioLocal, "->", total)
        return (
        <tr key={element}>
              <th style={colSpans.n}>{fullData.rawMats[element].kkey}</th>
              <th style={colSpans.nombre}>{element}</th>
              <th style={colSpans.cantidad}>{Number(localFunctionObject[element]) * cantidad}</th>
              <th style={colSpans.precio}>{precioLocal}</th>
        </tr>
      )
    }
    else if(fullData.formulas[element]){
      //console.log("formula", element)
      let precioLocal = calcularPrecio(element) 
      
      total = total + precioLocal * Number(localFunctionObject[element])

      console.log(precioLocal, "->", total)
      return (
        <tr key={element}>
              <th style={colSpans.n}>{fullData.formulas[element].kkey}</th>
              <th style={colSpans.nombre}>{element}</th>
              <th style={colSpans.cantidad}>{Number(localFunctionObject[element]) * cantidad}</th>
              <th style={colSpans.precio}>{precioLocal}</th>
        </tr>
      )
    }
    else {
      return (
        <tr key={element}>
              <th style={colSpans.n}>{"error"}</th>
              <th style={colSpans.nombre}>{"material not found"}</th>
              <th style={colSpans.cantidad}>{"error"}</th>
              <th style={colSpans.precio}>{"error"}</th>
        </tr>
      )
    }
    
  
  }
  )
    const filaTotales = (
      <tr key={"totales"}>
          <th style={colSpans.n}></th>
          <th style={colSpans.nombre}>Precios</th>
          <th style={colSpans.cantidad}>{total+"€/unidad"}</th>
          <th style={colSpans.precio}>{"TOTAL "+total * cantidad +"€"}</th>
      </tr>)
    return <>{returnValue}{filaTotales}</>
  

  }

  return (
    <div>
      <h1>{selectedProduct}</h1>
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
