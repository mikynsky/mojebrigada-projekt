import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalFormMessage(props) {

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Přidat zprávu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="titleInput">
        <Form.Label>Nadpis zprávy</Form.Label>
        <Form.Control type="title" placeholder="Zadejte nadpis zprávy" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="textInput">
        <Form.Label>Obsah zprávy</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Zde napište obsah zprávy" />
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit">Odeslat zprávu</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalFormMessage;