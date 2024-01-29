import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HomeCard() {

    let date = new Date()
    let rok = date.getYear();
    let den = date.getDate();
    let hodiny = date.getHours().toString();
    let minuty = date.getMinutes();
    let mesic = date.getMonth();

  return ( <div className='d-flex justify-content-center text-center'>
    <Card className='m-5 d-flex ' style={{ width: '100%' }}>
      <Card.Img variant="top" src="../src/img/home_img.jpg" />
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