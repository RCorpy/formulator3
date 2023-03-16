import React, {useState} from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function RawMatSelector({setFullData, fullData, searched}) {

    const [showProductNameChange, setShowProductNameChange ] = useState(false)
    const [productName, setProductName] = useState(searched)
    const [price, setPrice] = useState(fullData.rawMats[searched].price)
    const [product, setProduct] = useState(fullData.rawMats[searched])
    const [providers, setProviders] = useState(fullData.rawMats[searched].providers)

    const navigate = useNavigate();

    const handleChangeNombre = (event:any)=>{
        setProductName(event.target.value)
    }

    const hangleChangePrice = (event:any) =>{
        setPrice(event.target.value)
    }

    const hangleChangeProviders = (event:any) =>{
        setProviders(event.target.value)
    }

    const handleConfirmar = () =>{
        //comprobar que no existe
    if((!(fullData.formulas[productName]) && !(fullData.rawMats[productName])) || searched===productName ){
        //dejar de comprobar
        const newFullData = JSON.parse(JSON.stringify(fullData));
    
        // cambiar el nombre en todas las formulas existentes, mejorable en rendimiento
        Object.keys(newFullData.formulas).forEach(formula => {
          Object.keys(newFullData.formulas[formula].components).forEach(key=>{
            if(key===searched){
              const newValue = JSON.parse(JSON.stringify(newFullData.formulas[formula].components[searched]));
              newFullData.formulas[formula].components[productName] = newValue
              if(!(searched===productName)){
                delete newFullData.formulas[formula].components[searched]
            }
            }
          })
        })  
        // dejar de cambiar nombre en formulas
    
        newFullData.rawMats[productName] = product
        newFullData.rawMats[productName].price = price
        newFullData.rawMats[productName].providers = providers
    
        navigate("/gestion/buscar")
        if(!(searched===productName)){
            delete newFullData.rawMats[searched]
        }
        
        setFullData(newFullData)
        }
        else{
          setProductName(`${productName} YA EXISTE`)
        }
    }



  return (
    <>
        <h1>{searched}<Button onClick={()=>setShowProductNameChange(!showProductNameChange)}>Cambiar Nombre</Button></h1>
      {showProductNameChange ? 
      <InputGroup className="mb-3">
        <InputGroup.Text>Nuevo Nombre</InputGroup.Text>
        <Form.Control onChange={handleChangeNombre} value={productName}/>
      </InputGroup> : <></>}
        <h3>Precio </h3>
        <InputGroup className="mb-3">
            <Form.Control type='number' onChange={hangleChangePrice} value={price}/>
        </InputGroup>
        <h5>Anterior: {fullData.rawMats[searched].price}€</h5>
        <h3>Proveedores </h3>
        <InputGroup className="mb-3">
            <Form.Control onChange={hangleChangeProviders} value={providers}/>
        </InputGroup>
        <h5>Anteriores: {fullData.rawMats[searched].providers}</h5>
        <Button onClick={()=>{handleConfirmar()}}>Confirmar</Button>
    </>
  )
}
