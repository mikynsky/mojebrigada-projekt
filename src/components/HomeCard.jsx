import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from "../img/home_img.jpg"
import MessageCard from './MessageCard';

function HomeCard() {

    let date = new Date()
    let hodiny = date.getHours().toString();
    let minuty = date.getMinutes();
    let minutes;


    //správné zobrazování minut
    if (minuty < 10) {
      minutes = "0" + minuty;
    } else {
      minutes = minuty;
    }

  return ( 
    <div className='d-flex justify-content-center text-center'>
      <Card className='m-5 d-flex ' style={{ width: '100%' }}>
        <Card.Img variant="top" src={Image} height="200" />
        <Card.Body>
          <Card.Title>mojeBrigáda</Card.Title>
          <Card.Title>{hodiny}:{minutes}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <MessageCard title="Pozdrav" author="Admin" cardText="Zdravím zdravím, dobré dopo" />

      </Card>

    </div>
  );
}

export default HomeCard;