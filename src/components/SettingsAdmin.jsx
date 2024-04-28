import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function SettingsAdmin() {

    const Background = {
        background: "#F5F1F1"
      }
    
    
  return (
    <>
      <ListGroup className='m-5'> 
        <ListGroup.Item style={Background} className='d-flex justify-content-between'>
            <Form.Label>Nastavit výchozí šablonu směn</Form.Label>
            <Form.Group controlId="formFile" className="mb-3">  
              <Form.Control type="file" />
            </Form.Group>
        </ListGroup.Item>            
      </ListGroup>

      <ListGroup className='m-5'> 
        <ListGroup.Item style={Background} className='d-flex justify-content-between'>
          Nastavit výchozí šablonu směn
          <div style={{width:"200px"}}>
          <Form.Select aria-label="Default select example">
            <option>Vybrat šablonu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          </div>
        </ListGroup.Item>            
      </ListGroup>

      <ListGroup className='m-5'> 
        <ListGroup.Item style={Background} className='d-flex justify-content-between'>
          Nastavit výchozí heslo nově vytvořených uživatelů
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="password" placeholder='Výchozí heslo'/>
            </Form.Group>
        </ListGroup.Item>             
      </ListGroup>
    </>
  );
}

export default SettingsAdmin;