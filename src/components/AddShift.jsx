import { useState } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import axios from 'axios';

function OffcanvasShift({ day, month, year, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [selectedDayIndex, setSelectedDayIndex] = useState(day -1);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(month +1);
    const [selectedYearIndex, setSelectedYearIndex] = useState(year);
    const [selectedStart, setSelectedStart] = useState('');
    const [selectedEnd, setSelectedEnd] = useState('');
    const [selectedCapacity, setSelectedCapacity] = useState('');

    
    const handleSelectDay = (event) => {
      setSelectedDayIndex(event.target.value);
    }

    const handleSelectMonth = (event) => {
      setSelectedMonthIndex(event.target.value);
    }

    const handleSelectYear = (event) => {
      setSelectedYearIndex(event.target.value);
    }

    const handleSelectStart = (event) => {
      setSelectedStart(event.target.value);
    }

    const handleSelectEnd = (event) => {
      setSelectedEnd(event.target.value);
    }

    const handleSelectCapacity = (event) => {
      setSelectedCapacity(event.target.value);
    }
    

    const days = [];
      for (let day = 1; day <= 31; day++) {
        days.push(<option key={day} value={day}>{day}</option>);
      }

      const time = [];
      for (let hour = selectedStart; hour < 24; hour++) {
        let formatedHour = hour.toString().padStart(2, '0');
        let hours = formatedHour + ":00";
        time.push(<option key={formatedHour} value={formatedHour}>{hours}</option>);
      }

      const years = [];
        for (let year = 1970; year <= 2030; year++) {
          years.push(<option key={year} value={year}>{year}</option>);
        }

        const handleSubmit = async (event) => {
          // event.preventDefault();
          const createdShift = {
            date: year + "-" + month + "-" + day ,
            startTime: selectedStart,
            endTime: selectedEnd,
            capacity: selectedCapacity
          };
          try {
            const response = await axios.post("http://localhost:3001/api/Shifts", createdShift)
            console.log('Data posted successfully:', response.data);
          } catch (error) {
            console.error('Error posting data:', error);
          }
        };
      
        const handleClick = () => {
          handleSubmit();
          window.location.reload(); 
        };

    return (
      <div>
      <div className='add-shift m-2' onClick={handleShow} title="Přidat směnu">+</div>
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
            <Form.Select defaultValue={selectedDayIndex} onChange={handleSelectDay} aria-label="Day">
                <option>DD</option>
                {days}
            </Form.Select>
          </Col>
          <Col md>
            <Form.Select defaultValue={selectedMonthIndex} onChange={handleSelectMonth} aria-label="Month">
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
            <Form.Select defaultValue={selectedYearIndex} onChange={handleSelectYear} aria-label="Year">
                <option>Rok</option>
                {years}
            </Form.Select>
          </Col>
        </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Od</Form.Label>
              <Form.Select defaultValue={selectedStart} onChange={handleSelectStart} aria-label="Day">
                <option>Od</option>
                {time}
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Čas: Do</Form.Label>
              <Form.Select defaultValue={selectedEnd} onChange={handleSelectEnd} aria-label="Day">
                <option>Od</option>
                {time}
              </Form.Select>       
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kapacita směny</Form.Label>
              <Form.Select defaultValue={selectedCapacity} onChange={handleSelectCapacity} aria-label="Day">
                <option key="1" value="1">1</option>
                <option key="2" value="2">2</option>
                <option key="3" value="3">3</option>
                <option key="4" value="4">4</option>
                <option key="5" value="5">5</option>
                <option key="6" value="6">6</option>
                <option key="7" value="7">7</option>
                <option key="8" value="8">8</option>
                <option key="9" value="9">9</option>
                <option key="10" value="10">10</option>
              </Form.Select>       
            </Form.Group>
            
            <Button variant="secondary" type="submit" onClick={handleClick}>
              Zveřejnit směnu
            </Button>
          </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>   
)}

function AddShift(date) {
    const newDate = new Date(date.date);

    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year =  newDate.getFullYear();

    return (
      <> 
          <OffcanvasShift day={day} month={month} year={year} placement="end" />
      </>
    );
  }
  

export default AddShift;