import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ModalConfirm(props) {
  const {userName, email, onHide } = props;


  const handleDelete = async (event, userEmail) => {
    event.preventDefault();
    const userData = {
      email: userEmail
    }
    try {
      const response = await axios.delete("http://localhost:3001/api/Users", userData)
      console.log('Data deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    window.location.reload();
  };

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Opravdu si přejete vymazat uživatele {userName}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" type="submit" onClick={onHide}>Ne, nemazat</Button>
          <Button variant="primary" type="submit" onClick={(event) => { handleDelete(event, email); onHide(); }}>Ano, smazat</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;