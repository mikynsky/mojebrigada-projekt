import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalFormUser(props) {
  const {onHide} = props;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSelectDay = (event) => {
    setSelectedDay(event.target.value);
  }

  const handleSelectMonth = (event) => {
    setSelectedMonth(event.target.value);
  }

  const handleSelectYear = (event) => {
    setSelectedYear(event.target.value);
  }

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
  }


  const handleSubmit = async (event) => {
    // event.preventDefault();
    const createdUser = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      birthDate: `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`,
      privilegeLevel: selectedType,
    };
    try {
      const response = await axios.post("http://localhost:3001/api/Users", createdUser)
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleClick = () => {
    handleSubmit();
    onHide();
    window.location.reload(); 
  };

  const years = [];
  for (let year = 1970; year <= 2030; year++) {
    years.push(<option key={year} value={year}>{year}</option>);
  }
  const days = [];
  for (let day = 1; day <= 31; day++) {
    days.push(<option key={day} value={day}>{day}</option>);
  }
  

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
        <FloatingLabel controlId="floatingInputGrid" label="Křestní jméno">
          <Form.Control defaultValue={name} type="name" placeholder="Jméno" onChange={(e) => setName(e.target.value)} />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="surnameInput">
      <FloatingLabel controlId="floatingInputGrid" label="Příjmení">
          <Form.Control defaultValue={surname} type="surname" placeholder="Příjmení" onChange={(e) => setSurname(e.target.value)}  />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailInput">
      <FloatingLabel controlId="floatingInputGrid" label="Emailová adresa">
          <Form.Control name="email" defaultValue={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordInput">
      <FloatingLabel controlId="floatingInputGrid" label="Výchozí heslo">
          <Form.Control name="password" defaultValue={password} type="password" placeholder="Heslo" onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
      </Form.Group>

      <Form.Label>Typ uživatele</Form.Label>
        <Form.Select  defaultValue={selectedType} onChange={handleSelectType} aria-label="userType">
            <option>Vyberte z možností</option>
            <option value="User">Brigádník</option>
            <option value="Admin">Admin</option>
        </Form.Select>


        <Form.Group className="mb-3" controlId="emailInput">
        <Form.Label>Datum narození</Form.Label>
        <Row>
          <Col md>
            <Form.Select defaultValue={selectedDay} onChange={handleSelectDay} aria-label="Day">
                <option>DD</option>
                {days}
            </Form.Select>
          </Col>
          <Col md>
            <Form.Select defaultValue={selectedMonth} onChange={handleSelectMonth} aria-label="Month">
                <option>MM</option>
                <option key="01" value="1">Leden</option>
                <option key="02" value="2">Únor</option>
                <option key="03" value="3">Březen</option>
                <option key="04" value="4">Duben</option>
                <option key="05" value="5">Květen</option>
                <option key="06" value="6">Červen</option>
                <option key="07" value="7">Červenec</option>
                <option key="08" value="8">Srpen</option>
                <option key="09" value="9">Zaří</option>
                <option key="10" value="10">Říjen</option>
                <option key="11" value="11">Listopad</option>
                <option key="12" value="12">Prosinec</option>
            </Form.Select>
          </Col>
          <Col md>
            <Form.Select defaultValue={selectedYear} onChange={handleSelectYear} aria-label="Year">
                <option>Rok</option>
                {years}
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleClick}>Uložit uživatele</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ModalFormUser;