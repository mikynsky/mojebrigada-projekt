import React from 'react';
import Table from 'react-bootstrap/Table';
import AddShift from './AddShift';

function TableSmeny() {
  return ( <div className='d-flex justify-content-center'>
    <Table  responsive className='m-5' style={{width:"100vh"}}>
      <thead>
        <tr>
          <th></th>
            <th>Směna</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Po</td>
            <AddShift/>
        </tr>
        <tr>
          <td>Út</td>
            <AddShift/>
        </tr>
        <tr>
          <td>St</td>
            <AddShift/>
        </tr>
        <tr>
          <td>Čt</td>
            <AddShift/>
        </tr>
        <tr>
          <td>Pá</td>
            <AddShift/>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default TableSmeny;