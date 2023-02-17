import React from 'react'
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';


export default function ProductSelector() {

    //le puede entrar un dato desde App.tsx que se convierte en el id

    let { id } = useParams();

    const onSelect = (string: string) => {
        console.log("SELECTED", string)
    }

  return (
    <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={()=>onSelect("hello")}>asdasdasd</th>
            <th>{id}</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
  )
}
