import React from 'react';
import Table from 'react-bootstrap/Table';

function TableSmeny() {
  return ( <div className='d-flex justify-content-center'>
    <Table  responsive className='m-5' style={{width:"100vh"}}>
      <thead>
        <tr>
          <th></th>
          {Array.from({ length: 9 }).map((_, index) => (
            <th key={index}>Směna</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Po</td>
          {Array.from({ length: 9 }).map((_, index) => (
            <td key={index}>Blok směny {index}</td>
          ))}
        </tr>
        <tr>
          <td>Út</td>
          {Array.from({ length: 9 }).map((_, index) => (
            <td key={index}>Blok směny {index}</td>
          ))}
        </tr>
        <tr>
          <td>St</td>
          {Array.from({ length: 9 }).map((_, index) => (
            <td key={index}>Blok směny {index}</td>
          ))}
        </tr>
        <tr>
          <td>Čt</td>
          {Array.from({ length: 9 }).map((_, index) => (
            <td key={index}>Blok směny {index}</td>
          ))}
        </tr>
        <tr>
          <td>Pá</td>
          {Array.from({ length: 9 }).map((_, index) => (
            <td key={index}>Blok směny {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default TableSmeny;