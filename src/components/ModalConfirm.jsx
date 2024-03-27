import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalConfirm(props) {
  const {userName} = props;


  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Opravdu si přejete vymazat uživatele {userName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" type="submit">Ne, nemazat</Button>
          <Button variant="primary" type="submit">Ano, smazat</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;