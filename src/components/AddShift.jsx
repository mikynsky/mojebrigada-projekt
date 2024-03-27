import { useState } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function OffcanvasShift({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        /* $('.date').datepicker({
            multidate: true,
              format: 'dd-mm-yyyy'
          });

          <div class="container">
                    <h3>Bootstrap Multi Select Date Picker</h3>
                    <input type="text" class="form-control date" placeholder="Pick the multiple dates"/>
            </div>	


          */

    return (
      <>
      <div className='add-shift m-2' onClick={handleShow}>+</div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Přidat směnu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Datum</Form.Label>


              <Form.Control type="text" value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Od</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Do</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>
            
            <Button variant="secondary" type="submit">
              Zveřejnit směnu
            </Button>
          </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </>   
)}

function AddShift() {
    return (
      <>
          <OffcanvasShift placement="end" />
      </>
    );
  }
  

export default AddShift;