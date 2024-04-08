import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import axios from 'axios';

function ModalFormMessage(props) {
  const {onHide} = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    const createdMessage = {
      headline: title,
      content: content,
    };
    try {
      const response = await axios.post("http://localhost:3001/api/Messages", createdMessage)
      console.log('Data posted successfully:', response.data);
      window.location.reload(); 
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleClick = () => {
    handleSubmit();
    onHide();
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
          Přidat zprávu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="titleInput">
        <Form.Label>Nadpis zprávy</Form.Label>
        <Form.Control type="title" placeholder="Zadejte nadpis zprávy" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="textInput">
        <Form.Label>Obsah zprávy</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Zde napište obsah zprávy" defaultValue={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleClick}>Odeslat zprávu</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalFormMessage;