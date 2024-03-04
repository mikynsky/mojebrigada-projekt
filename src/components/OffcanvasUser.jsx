import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

function OffcanvasUser({name}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
              <Form.Control type="text" value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Typ uživatele</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Brigádník</option>
                <option value="2">Administrátor</option>
              </Form.Select>
            </Form.Group>
            <Button variant="secondary" type="submit">
              Uložit změny
            </Button>
          </Form>
          <hr></hr>
          <Button variant="primary">Vymazat uživatele</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasUser;