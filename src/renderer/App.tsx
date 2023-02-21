import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProductSelector from './assets/ProductSelector';
import Sidebar from './assets/Sidebar';
import Menu from './assets/Menu'
import Fabricacion from './assets/Fabricacion';
import FabricacionNuevo from './assets/FabricacionNuevo';
import FabricacionHistorial from './assets/FabricacionHistorial';
import Gestion from './assets/Gestion';
import GestionNuevo from './assets/GestionNuevo';
import GestionBuscar from './assets/GestionBuscar';
import Datos from './assets/Datos';
import './App.css'

function Hello() {

  const [fullData, setFullData] = useState({
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
      }
    }
  })

  const getJSONData = () => {
    {
        window.electron.ipcRenderer.sendMessage('getFullSetOfData', []);
    }
  }
  window.electron.ipcRenderer.once('getFullSetOfData', (arg) => {
    // eslint-disable-next-line no-console
    setFullData(arg)
    console.log(fullData);
  });

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
      <ProductSelector fullData={fullData}/>
    </div>
  );
}

function Example() {
  return (
    <>
      {['menu','fabricacion', 'gestion', 'datos'].map((placement, idx) => (
        <Sidebar key={idx} menuOption={placement} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <>
      <Router>
        {Example()}
        <Routes>
          <Route path="/" element={<Hello />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/fabricacion" element={<Fabricacion />} />
          <Route path="/fabricacion/nuevo" element={<FabricacionNuevo />} />
          <Route path="/fabricacion/historial" element={<FabricacionHistorial />} />
          <Route path="/fabricacion/buscar" element={<ProductSelector />} />

          <Route path="/gestion" element={<Gestion />} />
          <Route path="/gestion/nuevo" element={<GestionNuevo />} />
          <Route path="/gestion/buscar" element={<GestionBuscar />} />
          <Route path="/gestion/modificar/:id" element={<ProductSelector />} />
          <Route path="/gestion/eliminar/:id" element={<ProductSelector />} />

          <Route path="/datos" element={<Datos />} />
          
        </Routes>
      </Router>
    </>
  );
}
