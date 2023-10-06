import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function GestionBuscar({ fullData, setSearched, searched }) {
  const [currentSeachTerm, setCurrentSearchTerm] = useState('');

  const navigate = useNavigate();

  let formulasArray = Object.keys(fullData.formulas);
  let rawMatsArray = Object.keys(fullData.rawMats);

  useEffect(() => {
    formulasArray = Object.keys(fullData.formulas);
    rawMatsArray = Object.keys(fullData.rawMats);
  }, [fullData]);

  const handleSearchChange = (event: any) => {
    setCurrentSearchTerm(event.target.value.toUpperCase());
  };
  const handleVer = (element) => {
    setSearched(element);
    navigate('/gestion/selector');
  };

  const handleRawMatVer = (element) => {
    setSearched(element);
    navigate('/gestion/rawselector');
  };

  const makeTableBodyRaws = () => {
    let foundRawMaterials = rawMatsArray.filter((element) =>
      element.includes(currentSeachTerm.trim())
    );

    return (
      <>
        {foundRawMaterials.map((element) => (
          <tr key={element}>
            <th>{element}</th>
            <th>
              <Button onClick={() => handleRawMatVer(element)}>Ver</Button>
            </th>
          </tr>
        ))}
      </>
    );
  };

  const makeTableBodyFormulas = () => {
    let foundFormulas = formulasArray.filter((element) =>
      element.includes(currentSeachTerm.trim())
    );

    return (
      <>
        {foundFormulas.map((element) => (
          <tr key={element}>
            <th>{element}</th>
            <th>
              <Button onClick={() => handleVer(element)}>Ver</Button>
            </th>
          </tr>
        ))}
      </>
    );
  };

  return (
    <>
      <div>GestionBuscar</div>
      <InputGroup className="mb-3">
        <InputGroup.Text>busqueda</InputGroup.Text>
        <Form.Control
        onChange={() => handleSearchChange(event)} 
        value={currentSeachTerm}
        />
      </InputGroup>

      <Table striped bordered hover responsive="md">
        <tbody>
          {currentSeachTerm.length > 2 ? makeTableBodyRaws() : ''}
          {currentSeachTerm.length > 2 ? makeTableBodyFormulas() : ''}
        </tbody>
      </Table>
    </>
  );
}
