import React,  {useState} from 'react'
import {Button, InputGroup, Form, Table} from 'react-bootstrap'


export default function GestionNuevo({fullData, setFullData}) {

  const [isFormula, setIsFormula] = useState(false)
  const [product, setProduct] = useState({
    name:"",
    components:{"test2":4, "test product": 4}
  })

  const handleNameChange = (event) =>{
    setProduct((prevProduct)=>({...prevProduct, name:event.target.value}))
  }



  const makeTableRows = () => {
    let total = 0
    const localFunctionObject:any = product.components

    const returnValue = Object.keys(localFunctionObject).map(element=>{
      
      if(fullData.rawMats[element]){
        return (
        <tr key={element}>
              <th >{fullData.rawMats[element].kkey}</th>
              <th >{element}</th>
              <th >{Number(localFunctionObject[element])}</th>
        </tr>
      )
    }
    else if(fullData.formulas[element]){
      return (
        <tr key={element}>
              <th >{fullData.formulas[element].kkey}</th>
              <th >{element}</th>
              <th >{Number(localFunctionObject[element])}</th>
        </tr>
      )
    }
    else {
      return (
        <tr key={element}>
              <th >{"error"}</th>
              <th >{"material not found"}</th>
              <th >{"error"}</th> 
        </tr>
      )
    }
    
  
  }
  )

    return <>{returnValue}</>
  }


  return (<>
    <div>GestionNuevo</div>
    <Button variant={isFormula ? "secondary" : "primary"} onClick={()=>setIsFormula(false)}>Materia Prima</Button>
    <Button variant={isFormula ? "primary": "secondary"} onClick={()=>setIsFormula(true)}>Formula</Button>

    {isFormula ? 
    <div className='createFormula'>
      formulaCreator
      <InputGroup className="mb-3">
        <InputGroup.Text>Nombre</InputGroup.Text>
        <Form.Control onChange={handleNameChange} value={product.name}/>
      </InputGroup>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th >Nº</th>
            <th >Nombre</th>
            <th >Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {makeTableRows()}
        </tbody>
      </Table>
    </div>

    :

    <div className='createRawMat'>
      rawMatCreator
    </div>}
    
    </>
  )
}
