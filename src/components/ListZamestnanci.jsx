import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function ListZamestnanci() {

    const Background = {
        background: "#F5F1F1"
      }

  return (
    <ListGroup className='m-5'>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>Tomáš<button>Edit</button></ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>Milan<button>Edit</button></ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>Klára<button>Edit</button></ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>Lucie<button>Edit</button></ListGroup.Item>
      <ListGroup.Item style={Background}className='d-flex justify-content-between'>Petr<button>Edit</button></ListGroup.Item>
    </ListGroup>
  );
}

export default ListZamestnanci;