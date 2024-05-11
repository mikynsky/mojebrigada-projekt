import { useState } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ModalConfirmShift from './ModalConfirmShift';



function OffcanvasShiftInfo({assignedTo, startTime, endTime, capacity, date, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modalShow, setModalShow] = React.useState(false);

  
    return (
      <>
      <div className='shift-block m-2' onClick={handleShow}>
        <p>{startTime}</p>
        <p>Směna</p>
        <p>{endTime}</p>
        </div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Informace o směně</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="text" value={date} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Od</Form.Label>
              <Form.Control type="email" value={startTime} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Do</Form.Label>
              <Form.Control type="email" value={endTime} readOnly/>
            </Form.Group>
            <Form.Label>Kapacita směny: 0/{capacity}</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Lidé zapsání na směnu: {assignedTo}</Form.Label></Form.Group>
            <hr></hr>
            <Button variant="secondary" >Zapsat se na směnu</Button>
          </Form>
          </Offcanvas.Body>
        </Offcanvas>

        <ModalConfirmShift
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      </>   
)}

function ShiftBlock({assignedTo, startTime, endTime, capacity, date}) {
    return (
      <>
          <OffcanvasShiftInfo assignedTo={assignedTo} startTime={startTime} endTime={endTime} capacity={capacity} date={date}/>
      </>
    );
  }
  

export default ShiftBlock;