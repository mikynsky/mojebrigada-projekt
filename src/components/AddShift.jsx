import { useState } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

function OffcanvasShift({ date, startTime, endTime, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedStart, setSelectedStart] = useState('');
    const [selectedEnd, setSelectedEnd] = useState('');



        /* $('.date').datepicker({
            multidate: true,
              format: 'dd-mm-yyyy'
          });

          <div class="container">
                    <h3>Bootstrap Multi Select Date Picker</h3>
                    <input type="text" class="form-control date" placeholder="Pick the multiple dates"/>
            </div>	


          */
    const handleSelectDay = (event) => {
      setSelectedDay(event.target.value);
    }

    const handleSelectMonth = (event) => {
      setSelectedMonth(event.target.value);
    }

    const handleSelectStart = (event) => {
      setSelectedStart(event.target.value);
    }

    const handleSelectEnd = (event) => {
      setSelectedEnd(event.target.value);
    }


    const days = [];
      for (let day = 1; day <= 31; day++) {
        days.push(<option key={day} value={day}>{day}</option>);
      }

      const time = [];
      for (let hour = 0; hour < 24; hour++) {
        let formatedHour = hour.toString().padStart(2, '0');
        let hours = formatedHour + ":00";
        time.push(<option key={formatedHour} value={formatedHour}>{hours}</option>);
      }

    return (
      <>
      <div className='add-shift m-2' onClick={handleShow}>+</div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Přidat směnu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Datum</Form.Label>
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
        </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Od</Form.Label>
              <Form.Select defaultValue={selectedDay} onChange={handleSelectStart} aria-label="Day">
                <option>Od</option>
                {time}
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Do</Form.Label>
              <Form.Select defaultValue={selectedDay} onChange={handleSelectEnd} aria-label="Day">
                <option>Od</option>
                {time}
              </Form.Select>       
            </Form.Group>
            
            <Button variant="secondary" type="submit">
              Zveřejnit směnu
            </Button>
          </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </>   
)}

function AddShift() {
    return (
      <>
          <OffcanvasShift placement="end" />
      </>
    );
  }
  

export default AddShift;