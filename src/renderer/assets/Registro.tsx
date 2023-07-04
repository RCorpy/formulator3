import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function Registro() {
  let { id } = useParams();

  const navigate = useNavigate();

  const [kkeys, setKkeys] = useState([5645]);
  const [registro, setRegistro] = useState({
    'test product2': {
      cantidad: 1,
      components: {},
    },
    test131: {
      cantidad: '4',
      components: {},
    },
  });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-this-registro', id);
    window.electron.ipcRenderer.once('got-this-registro', (recievedData) => {
      // eslint-disable-next-line no-console
      setRegistro(recievedData);
    });
    window.electron.ipcRenderer.once('got-refs', (recievedData) => {
      // eslint-disable-next-line no-console
      setKkeys(recievedData);
    });
  }, []);

  const eliminarRegistro = () => {
    window.electron.ipcRenderer.sendMessage('delete-this-registro', id);
    navigate('/fabricacion');
  };

  const getFecha = () => {
    let today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  };

  //IMPRIMIR FUNCTION

  const printElem = () => {
    window.print();
  };

  const getTableRows = (producto, idx) => {
    const thisProductComponents = Object.keys(registro[producto].components);

    console.log("kkeys", kkeys);
    console.warn(idx, kkeys[idx])
    //map con index para las referencias
    return thisProductComponents.map((component) => {
      return (
        <>
          <div className="printtablerow">
            <div className="printref">{(kkeys[idx] && kkeys[idx].components && kkeys[idx].components[component].kkey) || 0}</div>
            <div className="printnombre">{component}</div>
            <div className="printheadercantidad">
              {registro[producto].components[component] *
                registro[producto].cantidad}
            </div>
          </div>
        </>
      );
    });
  };

  const imprimirRegistroCuerpo = () => {
    let productos = Object.keys(registro);

    return (
      <>
        {productos.map((producto, idx) => (
          <div className='unahoja'>
            <div className="printheader">
              <div className="printregistro">Registro: {id}</div>
              <div className="printfecha">{getFecha()}</div>
            </div>
            <div className="printheaderdos">
              <div className="printproduct">{producto}</div>
              <div className="printcantidad">
                {registro[producto].cantidad} Kgs
              </div>
            </div>
            <div className="printtable">
              <div className="printtableheader">
                <div className="printref">Ref</div>
                <div className="printnombre">Nombre</div>
                <div className="printheadercantidad">Cantidad</div>
              </div>
              {getTableRows(producto, idx)}
            </div>
          </div>
        ))}
      </>
    );
  };

  // END OF IMRPIMIR

  const showRegistroCuerpo = () => {
    let productos = Object.keys(registro);

    return (
      <>
        {productos.map((producto) => (
          <>
            <div className="registroproductheader">
              <div>{producto}</div>
              <div>{registro[producto].cantidad}</div>
            </div>
            <Table>
              {Object.keys(registro[producto].components).map((component) => (
                <tr>
                  <th className="productline">{component}</th>
                  <th className="productline">
                    {registro[producto].components[component] *
                      registro[producto].cantidad}
                  </th>
                </tr>
              ))}
            </Table>
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="registromenu">
        <div>Registro: {id} </div>
        <Button onClick={() => printElem()}>Imprimir</Button>
      </div>
      <div className="registrocuerpo">{showRegistroCuerpo()}</div>
      <div className="registropie">
        <Button onClick={() => eliminarRegistro()} variant="danger">
          Eliminar Registro
        </Button>
      </div>
      <Button onClick={() => navigate('/print')}>PRINT SCREEN</Button>
      <div className="printablediv showprintable">
        {imprimirRegistroCuerpo()}
      </div>
    </>
  );
}
