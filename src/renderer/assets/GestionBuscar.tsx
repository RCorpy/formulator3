import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

export default function GestionBuscar({fullData, setSearched, searched}) {

  const [currentSeachTerm, setCurrentSearchTerm] = useState("")

  const navigate = useNavigate();

  const formulasArray = Object.keys(fullData.formulas)
  const rawMatsArray = Object.keys(fullData.rawMats)

  const handleSearchChange = (event:any) => {
    setCurrentSearchTerm(event.target.value)
  }
  const handleVer = (element)=>{
    setSearched(element)
    navigate("/gestion/selector")
  }

  const makeTableBodyRaws = () => {

    let foundRawMaterials = rawMatsArray.filter(element => element.includes(currentSeachTerm.trim()))

    return (<>
      {foundRawMaterials.map(element=>(
      <tr>
        <th>
          {element}
        </th>
      </tr>))}          
</>)
  }

  const makeTableBodyFormulas = () => {

    let foundFormulas = formulasArray.filter(element => element.includes(currentSeachTerm.trim()))


    return (<>
            {foundFormulas.map(element=>(
            <tr>
              <th>
                {element}
              </th>
              <th>
                <Button onClick={()=>handleVer(element)}>Ver</Button>
              </th>
            </tr>))}          
    </>)
  }

  return (<>
    <div>GestionBuscar</div>
    <Button>{searched}</Button>
    <Button>{currentSeachTerm}</Button>

    <InputGroup className="mb-3">
        <InputGroup.Text>busqueda</InputGroup.Text>
        <Form.Control onChange={handleSearchChange}/>
      </InputGroup>

      <Table striped bordered hover responsive="md">
        <tbody>
        {currentSeachTerm.length > 2 ? makeTableBodyRaws() : ""}
        {currentSeachTerm.length > 2 ? makeTableBodyFormulas() : ""}
        </tbody>
      </Table>

    <Button onClick={()=>navigate("/gestion/selector")}>Go to ProductSelector</Button>
    
    </>
  )
}
