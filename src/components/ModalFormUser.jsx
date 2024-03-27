import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalFormUser(props) {

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Přidat uživatele
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="nameInput">
        <Form.Label>Křestní jméno</Form.Label>
        <Form.Control type="name" placeholder="Jan" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="surnameInput">
        <Form.Label>Příjmení</Form.Label>
        <Form.Control type="surname" placeholder="Novák" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailInput">
        <Form.Label>Emailová adresa</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailInput">
        <Form.Label>Výchozí heslo</Form.Label>
        <Form.Control type="password" placeholder="Zadejte výchozí heslo" />
      </Form.Group>

      <Form.Label>Typ uživatele</Form.Label>
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">Brigádník</option>
            <option value="2">Admin</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit">Uložit uživatele</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalFormUser;