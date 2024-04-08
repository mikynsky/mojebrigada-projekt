import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import ModalFormUser from './ModalFormUser';


function AddButtonUser(props) {
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
      <Button variant="primary" title="Přidat uživatele" style={ButtonStyle} onClick={() => setModalShow(true)}>
      {content}
      </Button>
      
      <ModalFormUser
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AddButtonUser;