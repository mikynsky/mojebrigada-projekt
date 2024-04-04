import { useState } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function OffcanvasShiftInfo({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
      <>
      <div className='shift-block m-2' onClick={handleShow}>Směna</div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Informace o směně</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Datum</Form.Label>


              <Form.Control type="text" value={name} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Od</Form.Label>
              <Form.Control type="email" placeholder="" readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Do</Form.Label>
              <Form.Control type="email" placeholder="" readOnly/>
            </Form.Group>
            <Form.Label>Lidé přihlášeni na směnu:</Form.Label>


          </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </>   
)}

function ShiftBlock() {
    return (
      <>
          <OffcanvasShiftInfo/>
      </>
    );
  }
  

export default ShiftBlock;