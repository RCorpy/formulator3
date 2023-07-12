import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import MyModal from './Modal';
import AddToFormulaModal from './AddToFormulaModal';
import { Button } from 'react-bootstrap';
import DangerModal from './DangerModal';
import { useNavigate } from 'react-router-dom';
import persistFunc from './persistFunction';

//NECESITO BOTONES PARA GUARDAR Y ELIMINAR EL PRODUCT MODIFICADO (y añadir)

export default function ProductSelector({ setFullData, fullData, searched }) {
  const [modalShow, setModalShow] = useState(false);
  const [addToFormulaModalShow, setAddToFormulaModalShow] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [modalChangeData, setModalChangeData] = useState('');
  const [productName, setProductName] = useState(searched);
  const [showProductNameChange, setShowProductNameChange] = useState(false);
  const [product, setProduct] = useState(fullData.formulas[searched]);
  const [cantidad, setCantidad] = useState(1);

  const navigate = useNavigate();

  const colSpans = {
    n: { width: '10%' },
    nombre: { width: '30%' },
    cantidad: { width: '30%' },
    porcentaje: { width: '10%' },
    precio: { width: '20%' },
  };

  const save = () => {
    setFullData((prevFullData) => {
      let newData = { ...prevFullData };
      newData.formulas[productName] = product;
      persistFunc(newData);
      return newData;
    });
    navigate('/gestion/buscar');
  };

  const handleChangeCantidad = (e: any) => {
    setCantidad(e.target.value);
  };

  const handleChangeNombre = (e: any) => {
    setProductName(e.target.value);
  };

  const handleConfirmarProductName = () => {
    //comprobar que no existe
    if (!fullData.formulas[productName] && !fullData.rawMats[productName]) {
      //dejar de comprobar
      const newFullData = JSON.parse(JSON.stringify(fullData));

      // cambiar el nombre en todas las formulas existentes, mejorable en rendimiento
      Object.keys(newFullData.formulas).forEach((formula) => {
        Object.keys(newFullData.formulas[formula].components).forEach((key) => {
          if (key === searched) {
            const newValue = JSON.parse(
              JSON.stringify(newFullData.formulas[formula].components[searched])
            );
            newFullData.formulas[formula].components[productName] = newValue;
            delete newFullData.formulas[formula].components[searched];
          }
        });
      });
      // dejar de cambiar nombre en formulas

      newFullData.formulas[productName] = product;

      navigate('/gestion/buscar');
      delete newFullData.formulas[searched];
      persistFunc(newFullData);
      setFullData(newFullData);
    } else {
      setProductName(`${productName} YA EXISTE`);
    }
  };

  //DANGER MODAL TO REMOVE FORMULA
  const dangerFunction = () => {
    console.warn('DANGER DANGER', searched);
    //need to check if the formula to remove is in use in another
    const newFullData = JSON.parse(JSON.stringify(fullData));
    navigate('/gestion/buscar');
    delete newFullData.formulas[searched];
    setFullData(newFullData);
    persistFunc(newFullData);
  };
  const extraCheck = () => {
    //is the formula in use in another formula
    const whereToSearchObject = JSON.parse(JSON.stringify(fullData.formulas));
    const eachElementToSearch = Object.keys(whereToSearchObject);

    return eachElementToSearch
      .map((element) => {
        const doesItHaveTheFormula = Object.keys(
          whereToSearchObject[element].components
        ).filter((component) => component === searched);
        if (doesItHaveTheFormula.length > 0) {
          return [element];
        } else {
          return;
        }
      })
      .filter((ele) => ele);

    //return Object.keys(fullData.formulas).filter(element=>(Object.keys(fullData.formulas[element].components).filter(each=>each==searched)))
  };
  // * END OF DANGER MODAL

  const calcularPrecio = (formula) => {
    let thisFormula = fullData.formulas[formula];
    let returnTotal = 0;
    Object.keys(thisFormula.components).forEach((component) => {
      if (fullData.rawMats[component])
        returnTotal =
          returnTotal +
          Number(thisFormula.components[component]) *
            fullData.rawMats[component].price;
      else {
        //console.log("else", calcularPrecio(component))
        returnTotal =
          returnTotal +
          calcularPrecio(component) * Number(thisFormula.components[component]);
      }
    });
    return returnTotal;
  };

  const showModal = (element) => {
    setModalChangeData(element);
    setModalShow(true);
  };

  const makeTableRows = () => {
    let total = 0;
    const localFunctionObject: any = product.components;

    const returnValue = Object.keys(localFunctionObject).map((element) => {
      if (fullData.rawMats[element]) {
        //console.log("raw", element)
        let precioLocal = fullData.rawMats[element].price;

        total = total + precioLocal * Number(localFunctionObject[element]);

        //console.log(precioLocal, "->", total, "searched ->", searched)
        return (
          <tr key={element} onClick={() => showModal(element)}>
            <th style={colSpans.n}>{fullData.rawMats[element].kkey}</th>
            <th style={colSpans.nombre}>{element}</th>
            <th style={colSpans.cantidad}>
              {(Number(localFunctionObject[element]) * cantidad).toFixed(3)}
            </th>
            <th style={colSpans.precio}>{precioLocal}</th>
          </tr>
        );
      } else if (fullData.formulas[element]) {
        //console.log("formula", element)
        let precioLocal = calcularPrecio(element);

        total = (
          Number(total) +
          precioLocal * Number(localFunctionObject[element])
        ).toFixed(3);

        //console.log(precioLocal, "->", total)
        return (
          <tr key={element} onClick={() => showModal(element)}>
            <th style={colSpans.n}>{fullData.formulas[element].kkey}</th>
            <th style={colSpans.nombre}>{element}</th>
            <th style={colSpans.cantidad}>
              {(Number(localFunctionObject[element]) * cantidad).toFixed(3)}
            </th>
            <th style={colSpans.precio}>{precioLocal}</th>
          </tr>
        );
      } else {
        return (
          <tr key={element}>
            <th style={colSpans.n}>{'error'}</th>
            <th style={colSpans.nombre}>{'material not found'}</th>
            <th style={colSpans.cantidad}>{'error'}</th>
            <th style={colSpans.precio}>{'error'}</th>
          </tr>
        );
      }
    });
    const filaTotales = (
      <tr key={'totales'}>
        <th style={colSpans.n}></th>
        <th style={colSpans.nombre}>Precios</th>
        <th style={colSpans.cantidad}>{total + '€/unidad'}</th>
        <th style={colSpans.precio}>
          {'TOTAL ' + (total * cantidad).toFixed(3) + '€'}
        </th>
      </tr>
    );
    return (
      <>
        {returnValue}
        {filaTotales}
      </>
    );
  };
  if (fullData.formulas[searched]) {
    return (
      <div>
        <h1>
          {searched}
          <Button
            onClick={() => setShowProductNameChange(!showProductNameChange)}
          >
            Cambiar Nombre
          </Button>
        </h1>
        {showProductNameChange ? (
          <InputGroup className="mb-3">
            <InputGroup.Text>Nuevo Nombre</InputGroup.Text>
            <Form.Control onChange={handleChangeNombre} value={productName} />
            <Button
              onClick={() => {
                handleConfirmarProductName();
              }}
            >
              Confirmar
            </Button>
          </InputGroup>
        ) : (
          <></>
        )}
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th style={colSpans.n}>Nº</th>
              <th style={colSpans.nombre}>Nombre</th>
              <th style={colSpans.cantidad}>Cantidad</th>
              <th style={colSpans.precio}>Precio</th>
            </tr>
          </thead>
          <tbody>{makeTableRows()}</tbody>
        </Table>
        <InputGroup className="mb-3">
          <InputGroup.Text>Cantidad</InputGroup.Text>
          <Form.Control type="number" onChange={handleChangeCantidad} />
        </InputGroup>
        <Button variant="success" onClick={() => save()}>
          Guardar
        </Button>
        <Button onClick={() => setAddToFormulaModalShow(true)}>
          Añadir fila
        </Button>
        <Button variant="danger" onClick={() => setShowDangerModal(true)}>
          Borrar formula
        </Button>
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          product={...product}
          element={modalChangeData}
          setProduct={setProduct}
        />
        <AddToFormulaModal
          show={addToFormulaModalShow}
          onHide={() => setAddToFormulaModalShow(false)}
          product={...product}
          setProduct={setProduct}
          fullData={fullData}
          searched={searched}
        />
        <DangerModal
          show={showDangerModal}
          onHide={() => setShowDangerModal(false)}
          dangerFunction={dangerFunction}
          extraCheck={extraCheck}
        />
      </div>
    );
  } else {
    return <></>;
  }
}
