import React, { useState } from 'react';
import { Button, InputGroup, Form, Table } from 'react-bootstrap';
import GetProductModal from './getProductModal';
import { useNavigate } from 'react-router-dom';
import persistFunc from './persistFunction';

export default function FabricacionNuevo({ fullData, setFullData }) {
  const navigate = useNavigate();

  const getRecord = () => {
    return 0
  }

  const [showAlert, setShowAlert] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [registro, setRegistro] = useState(getRecord());
  const [product, setProduct] = useState({
    name: '',
    components: { test2: 4, 'test product': 4 },
    price: 0,
    providers: '',
  });


  const handleAceptar = () => {
    if(product.name !== ''){
      escribirRegistro(product, cantidad, registro);
      navigate('/fabricacion/historial');
    }
  };

  const escribirRegistro = (product, cantidad, registro) => {
    console.log('registering:', product.name, cantidad, registro);
  };

  const handleRegistro = (event) => {
    setRegistro(event.value)
  };

  const handleCantidad = (event) => {
    setCantidad(event.value)
  };

  const handleSeleccionarProducto = () => {
    return;
  };

  return (
    <>
      <div>Fabricacion Nuevo</div>
      <div>
        <Button onClick={()=> setShowAlert(true)}>Producto:</Button>
        {product.name}
      </div>
      <InputGroup>
      <InputGroup.Text>Registro:</InputGroup.Text>
       <Form.Control
              onChange={() => handleRegistro(event)}
              value={registro}
            />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text>Cantidad:</InputGroup.Text>
       <Form.Control
              onChange={() => handleCantidad(event)}
              value={cantidad}
            />
      </InputGroup>

      <Button onClick={() => handleAceptar()}>Aceptar</Button>
      ShowingAlert {showAlert ? "yes" : "no"}
      <GetProductModal
      show={showAlert}
      onHide={()=>setShowAlert(false)}
      fullData={fullData}
      setProduct={setProduct}
      />
    </>
  );
}
