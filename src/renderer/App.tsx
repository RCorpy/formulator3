import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProductSelector from './assets/ProductSelector';
import Sidebar from './assets/Sidebar';
import Menu from './assets/Menu';
import Fabricacion from './assets/Fabricacion';
import FabricacionNuevo from './assets/FabricacionNuevo';
import FabricacionHistorial from './assets/FabricacionHistorial';
import Gestion from './assets/Gestion';
import GestionNuevo from './assets/GestionNuevo';
import GestionBuscar from './assets/GestionBuscar';
import Datos from './assets/Datos';
import exampleJSON from './assets/exampleJSON';
import RawMatSelector from './assets/RawMatSelector';
import Registro from './assets/Registro';
import './App.css';

function Hello({ getJSONData }) {
  return (
    <div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Seleccione excel del sistema</Form.Label>
        <input
          type="file"
          onChange={(e) => {
            //@ts-ignore
            if (e.target.files[0]) return showFile(e.target.files[0]);
          }}
          multiple
        />
      </Form.Group>
      <Button onClick={getJSONData}>GET JSON DATA</Button>
      <Link to="/modificar/14">
        <Button>{'A Product Selector con variable 14'}</Button>
      </Link>
    </div>
  );
}

function Example() {
  return (
    <>
      {['menu', 'fabricacion', 'gestion', 'datos'].map((placement, idx) => (
        <Sidebar key={idx} menuOption={placement} />
      ))}
    </>
  );
}

export default function App() {
  const [fullData, setFullData] = useState(exampleJSON);
  const [searched, setSearched] = useState('test formula');

  const getJSONData = () => {
    {
      window.electron.ipcRenderer.sendMessage('getFullSetOfData', []);
    }
  };
  window.electron.ipcRenderer.once('getFullSetOfData', (recievedData) => {
    // eslint-disable-next-line no-console
    setFullData(recievedData);
    console.log(fullData);
  });

  useEffect(() => {
    getJSONData();
  }, []);

  return (
    <>
      <Router>
        {Example()}
        <Routes>
          <Route path="/" element={<Hello getJSONData={getJSONData} />} />

          <Route path="/menu" element={<Menu />} />

          <Route
            path="/fabricacion"
            element={<Fabricacion fullData={fullData} />}
          />
          <Route
            path="/fabricacion/nuevo"
            element={
              <FabricacionNuevo fullData={fullData} setFullData={setFullData} />
            }
          />
          <Route
            path="/fabricacion/historial"
            element={<FabricacionHistorial />}
          />
          <Route path="/gestion/registro/:id" element={<Registro />} />
          <Route
            path="/fabricacion/buscar"
            element={
              <ProductSelector
                setFullData={setFullData}
                fullData={fullData}
                searched={searched}
              />
            }
          />

          <Route path="/gestion" element={<Gestion />} />
          <Route
            path="/gestion/nuevo"
            element={
              <GestionNuevo fullData={fullData} setFullData={setFullData} />
            }
          />

          <Route
            path="/gestion/buscar"
            element={
              <GestionBuscar
                fullData={fullData}
                setSearched={setSearched}
                searched={searched}
              />
            }
          />
          <Route
            path="/gestion/selector"
            element={
              <ProductSelector
                setFullData={setFullData}
                fullData={fullData}
                searched={searched}
              />
            }
          />
          <Route
            path="/gestion/rawselector"
            element={
              <RawMatSelector
                setFullData={setFullData}
                fullData={fullData}
                searched={searched}
              />
            }
          />

          <Route
            path="/gestion/modificar/:id"
            element={
              <ProductSelector
                setFullData={setFullData}
                fullData={fullData}
                searched={searched}
              />
            }
          />
          <Route
            path="/gestion/eliminar/:id"
            element={
              <ProductSelector
                setFullData={setFullData}
                fullData={fullData}
                searched={searched}
              />
            }
          />

          <Route
            path="/datos"
            element={<Datos fullData={fullData} setFullData={setFullData} />}
          />
        </Routes>
      </Router>
    </>
  );
}
