import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ModalConfirmUser(props) {
  const {userName, email, id, onHide } = props;

  // Funkce pro manipulaci s mazáním uživatele
  const handleDelete = async (event) => {
    event.preventDefault(); // Zamezí obvyklému chování formuláře při submitu
    try {
      const response = await axios.delete(`http://localhost:3001/api/Users/${id}`)
      console.log('Data deleted successfully:');
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
          <Button variant="primary" type="submit" onClick={(event) => { handleDelete(event); onHide(); }}>Ano, smazat</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmUser;