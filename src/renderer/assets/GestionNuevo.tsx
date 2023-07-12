import React, { useState } from 'react';
import { Button, InputGroup, Form, Table } from 'react-bootstrap';
import AddToFormulaModal from './AddToFormulaModal';
import { useNavigate } from 'react-router-dom';
import persistFunc from './persistFunction';

export default function GestionNuevo({ fullData, setFullData }) {
  const navigate = useNavigate();

  const [isFormula, setIsFormula] = useState(false);
  const [addToFormulaModalShow, setAddToFormulaModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    components: {},
    price: 0,
    providers: '',
  });

  const handleNameChange = (event, key) => {
    setProduct((prevProduct) => {
      let newProduct = { ...prevProduct };
      newProduct[key] = event.target.value;
      return newProduct;
    });

    setShowAlert(false);
  };

  const save = () => {
    const productName = product.name;
    if (productName.length > 0) {
      console.log('saving FORMULA');
      setFullData((prevData) => {
        const newData = { ...prevData };
        newData.formulas[productName] = {
          components: product.components,
          kkey: prevData.keyCounter,
        };
        newData.keyCounter = prevData.keyCounter + 1;
        navigate('/gestion/buscar');
        persistFunc(newData);
        return newData;
      });
    } else {
      setShowAlert(true);
    }
  };

  const saveRawMat = () => {
    const productName = product.name;
    if (productName.length > 0) {
      console.log('saving RAW MAT');
      setFullData((prevData) => {
        const newData = { ...prevData };
        newData.rawMats[productName] = {
          kkey: prevData.keyCounter,
          price: product.price,
          providers: product.providers,
        };
        newData.keyCounter = prevData.keyCounter + 1;
        persistFunc(newData);
        return newData;
      });
      navigate('/gestion/buscar');
    } else {
      setShowAlert(true);
    }
  };

  const makeTableRows = () => {
    let total = 0;
    const localFunctionObject: any = product.components;

    const returnValue = Object.keys(localFunctionObject).map((element) => {
      if (fullData.rawMats[element]) {
        return (
          <tr key={element}>
            <th>{fullData.rawMats[element].kkey}</th>
            <th>{element}</th>
            <th>{Number(localFunctionObject[element])}</th>
          </tr>
        );
      } else if (fullData.formulas[element]) {
        return (
          <tr key={element}>
            <th>{fullData.formulas[element].kkey}</th>
            <th>{element}</th>
            <th>{Number(localFunctionObject[element])}</th>
          </tr>
        );
      } else {
        return (
          <tr key={element}>
            <th>{'error'}</th>
            <th>{'material not found'}</th>
            <th>{'error'}</th>
          </tr>
        );
      }
    });

    return <>{returnValue}</>;
  };

  return (
    <>
      <div>GestionNuevo</div>
      <Button
        variant={isFormula ? 'secondary' : 'primary'}
        onClick={() => setIsFormula(false)}
      >
        Materia Prima
      </Button>
      <Button
        variant={isFormula ? 'primary' : 'secondary'}
        onClick={() => setIsFormula(true)}
      >
        Formula
      </Button>

      {isFormula ? (
        <div className="createFormula">
          <InputGroup className="mb-3">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <Form.Control
              onChange={() => handleNameChange(event, 'name')}
              value={product.name}
            />
            {showAlert ? (
              <InputGroup.Text style={{ color: 'red' }}>
                Introduce un nombre
              </InputGroup.Text>
            ) : (
              <></>
            )}
          </InputGroup>
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>{makeTableRows()}</tbody>
          </Table>
          <Button onClick={() => setAddToFormulaModalShow(true)}>
            Añadir fila
          </Button>
          <Button variant="success" onClick={() => save()}>
            Guardar
          </Button>
          <AddToFormulaModal
            show={addToFormulaModalShow}
            onHide={() => setAddToFormulaModalShow(false)}
            product={...product}
            setProduct={setProduct}
            fullData={fullData}
            searched={''}
          />
        </div>
      ) : (
        <div className="createRawMat">
          <InputGroup className="mb-3">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <Form.Control
              onChange={() => handleNameChange(event, 'name')}
              value={product.name}
            />
            {showAlert ? (
              <InputGroup.Text style={{ color: 'red' }}>
                Introduce un nombre
              </InputGroup.Text>
            ) : (
              <></>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Price</InputGroup.Text>
            <Form.Control
              onChange={() => handleNameChange(event, 'price')}
              value={product.price}
            />
            {showAlert ? (
              <InputGroup.Text style={{ color: 'red' }}>
                Introduce un nombre
              </InputGroup.Text>
            ) : (
              <></>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Proveedores</InputGroup.Text>
            <Form.Control
              onChange={() => handleNameChange(event, 'providers')}
              value={product.providers}
            />
            {showAlert ? (
              <InputGroup.Text style={{ color: 'red' }}>
                Introduce un nombre
              </InputGroup.Text>
            ) : (
              <></>
            )}
          </InputGroup>
          <Button variant="success" onClick={() => saveRawMat()}>
            Guardar
          </Button>
        </div>
      )}
    </>
  );
}
