import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import OffcanvasUser from './OffcanvasUser';

function ListZamestnanci() {

    const Background = {
        background: "#F5F1F1"
      }
    
    const users = ["Lukáš", "Alfons", "Klára", "Lucie", "Petr"]
    
  return (
    <ListGroup className='m-5'>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>{users[0]}<OffcanvasUser placement="end" name={users[0]} /></ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>{users[1]}<OffcanvasUser placement="end" name={users[1]} /></ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>{users[2]}<OffcanvasUser placement="end" name={users[2]} /></ListGroup.Item>      
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>{users[3]}<OffcanvasUser placement="end" name={users[3]} /></ListGroup.Item>    
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>{users[4]}<OffcanvasUser placement="end" name={users[4]} /></ListGroup.Item>  
    </ListGroup>
  );
}

export default ListZamestnanci;