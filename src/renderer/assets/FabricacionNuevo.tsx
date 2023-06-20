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
    components: {},
  });


  const handleAceptar = () => {
    if(product.name !== ''){
      escribirRegistro(product, cantidad, registro);
      navigate('/fabricacion/historial');
    }
  };

  const escribirRegistro = (product, cantidad, registro) => {
    window.electron.ipcRenderer.sendMessage('registrar', {"product": product, "registro":registro, "cantidad":cantidad})
  };

  window.electron.ipcRenderer.once('existe-registro', () => {
    // eslint-disable-next-line no-console
    console.log("existe-registro");
  });

  window.electron.ipcRenderer.once('registro-completo', () => {
    // eslint-disable-next-line no-console
    console.log("registro-completo");
  });

  const handleRegistro = (event) => {
    setRegistro(event.target.value)
  };

  const handleCantidad = (event) => {
    setCantidad(event.target.value)
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
