import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import ModalConfirmUser from './ModalConfirmUser';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';



function OffcanvasUser({name, surname, email, phone, type, birthDate, id}) {


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

  const [patchName, setName] = useState(name);
  const [patchSurname, setSurname] = useState(surname);
  const [patchEmail, setEmail] = useState(email);
  const [patchPhone, setPhone] = useState(phone);

  const [selectedType, setSelectedType] = useState(type);

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  }

  const handlePatch = async (event) => {
    const patchData = {
      name: patchName,
      surname: patchSurname,
      email: patchEmail,
      phone: patchPhone,
      privilegeLevel: selectedType,
    };

    try {
      const response = await axios.patch(`http://localhost:3001/api/Users/${id}`, patchData, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
      console.log('Data patching successfully:', response.data); 
      window.location.reload();
    } catch (error) {
      console.error('Error patching data:', error);
    }
   
  };



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
              <Form.Control type="text" defaultValue={patchName} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Příjmení</Form.Label>
              <Form.Control type="text" defaultValue={patchSurname} onChange={(e) => setSurname(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={patchEmail} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Label>Telefoní číslo</Form.Label>
            <InputGroup>
              <InputGroup.Text>+420</InputGroup.Text>
              <Form.Control type="phone" defaultValue={patchPhone} onChange={(e) => setPhone(e.target.value)}/>
            </InputGroup>

            
            <Form.Group className="mb-3" controlId="formBasicType">
              <Form.Label>Typ uživatele</Form.Label>
              
              <Form.Select defaultValue={selectedType} onChange={handleSelectType}>
                <option value="User">Brigádník</option>
                <option value="Admin">Administrátor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>Datum narození</Form.Label>
              <Form.Control type="text" placeholder={birthDateFormated} readOnly />
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={handlePatch}>
              Uložit změny
            </Button>
          </Form>
          <hr></hr>
          <Button variant="primary"onClick={() => setModalShow(true)} >Vymazat uživatele</Button>
        </Offcanvas.Body>
      </Offcanvas>
      
      <ModalConfirmUser
        show={modalShow}
        onHide={() => setModalShow(false)}
        userName={name + " " + surname}
        email={email}
        id={id}
      />

    </div>
  );
}

export default OffcanvasUser;