import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import ModalFormMessage from './ModalFormMessage';


function AddButtonMessage(props) {
  const {content} = props;
  const [modalShow, setModalShow] = React.useState(false);
  const ButtonStyle = {
    borderRadius: "9999px",
    width: "4rem", 
    height: "4rem", 
    fontSize: "2rem"
  }
  
  return (
    <>
      <Button variant="primary"  style={ButtonStyle} onClick={() => setModalShow(true)}>
      {content}
      </Button>
      
      <ModalFormMessage
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AddButtonMessage;