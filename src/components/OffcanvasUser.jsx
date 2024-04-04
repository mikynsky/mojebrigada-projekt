import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import ModalConfirm from './ModalConfirm';


function OffcanvasUser({name, surname, email, type, birthDate}) {


  let selected;
  if (type == "User") {
    selected = 1;
  } else {
    selected = 2;
  }


  const birthDateFormated = birthDate[8]+birthDate[9] + "." + birthDate[5]+birthDate[6] + "." + birthDate[0]+birthDate[1]+birthDate[2]+birthDate[3];


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Info
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>


          <Form>
            <h4>Upravit údaje</h4>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Jméno</Form.Label>
              <Form.Control type="text" defaultValue={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Příjmení</Form.Label>
              <Form.Control type="text" defaultValue={surname}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={email} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicType">
              <Form.Label>Typ uživatele</Form.Label>
              
              <Form.Select defaultValue={selected}>
                <option value="1">Brigádník</option>
                <option value="2">Administrátor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>Datum narození</Form.Label>
              <Form.Control type="text" placeholder={birthDateFormated} readOnly />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Uložit změny
            </Button>
          </Form>
          <hr></hr>
          <Button variant="primary"onClick={() => setModalShow(true)} >Vymazat uživatele</Button>
        </Offcanvas.Body>
      </Offcanvas>
      
      <ModalConfirm
        show={modalShow}
        onHide={() => setModalShow(false)}
        userName={name + " " + surname}
        email={email}
      />

    </div>
  );
}

export default OffcanvasUser;