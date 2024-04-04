import React from 'react';
import Table from 'react-bootstrap/Table';
import ShiftBlock from './ShiftBlock';

function TableShiftsUser() {
  return ( <div className='d-flex justify-content-center'>
    <Table  responsive className='mx-5 my-1' style={{width:"100vh"}}>
      <thead>
        <tr>
          <th></th>
            <th>Směny</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Po</td>
          <div className='shift-container'>
            <ShiftBlock/>
            <ShiftBlock/>
 
          </div>
        </tr>
        <tr>
          <td>Út</td>
          <div className='shift-container'>
          </div>
        </tr>
        <tr>
          <td>St</td>
          <div className='shift-container'>
          </div>
        </tr>
        <tr>
          <td>Čt</td>
          <div className='shift-container'>
          </div>
        </tr>
        <tr>
          <td>Pá</td>
          <div className='shift-container'>
          </div>
        </tr>
        <tr>
          <td>So</td>
          <div className='shift-container'>
          </div>
        </tr>
        <tr>
          <td>Ne</td>
          <div className='shift-container'>
          </div>
        </tr>

      </tbody>
    </Table>
    </div>
  );
}

export default TableShiftsUser;