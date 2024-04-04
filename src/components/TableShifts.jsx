import React from 'react';
import Table from 'react-bootstrap/Table';
import AddShift from './AddShift';
import ShiftBlock from './ShiftBlock';

function TableShifts() {

  const date = ["1.4.", "2.4.", "3.4.","4.4.","5.4.","6.4.","7.4."]


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
          <td>Po {date[0]}</td>
          <div className='shift-container'>
            <ShiftBlock/>
            <ShiftBlock/>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>Út {date[1]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>St {date[2]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>Čt {date[3]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>Pá {date[4]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>So {date[5]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>
        <tr>
          <td>Ne {date[6]}</td>
          <div className='shift-container'>
            <AddShift/>
          </div>
        </tr>

      </tbody>
    </Table>
    </div>
  );
}

export default TableShifts;