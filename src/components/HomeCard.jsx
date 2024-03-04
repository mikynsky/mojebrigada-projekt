import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from "../img/home_img.jpg"

function HomeCard() {

    let date = new Date()
    let hodiny = date.getHours().toString();
    let minuty = date.getMinutes();


  return ( <div className='d-flex justify-content-center text-center'>
    <Card className='m-5 d-flex ' style={{ width: '100%' }}>
      <Card.Img variant="top" src={Image} height="200" />
      <Card.Body>
        <Card.Title>mojeBrigáda</Card.Title>
        <Card.Title>{hodiny}:{minuty}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export default HomeCard;