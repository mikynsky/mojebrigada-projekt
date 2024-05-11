import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function SettingsUser() {

    const Background = {
        background: "#F5F1F1"
      }
    
    
  return (
    <>
      <ListGroup className='m-5'> 
        <ListGroup.Item style={Background} className='d-flex justify-content-between'>
          Změnit heslo
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="password" placeholder='Nové heslo'/>
              <Form.Control type="password" placeholder='Potvrdit nové heslo'/>
            </Form.Group>
        </ListGroup.Item>             
      </ListGroup>
    </>
  );
}

export default SettingsUser;