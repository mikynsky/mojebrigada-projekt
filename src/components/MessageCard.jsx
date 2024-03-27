import Card from 'react-bootstrap/Card';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function MessageCard(props) {
    const { author, title, cardText } = props;


  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
      <div className='d-flex justify-content-between'>
      <p className='m-0'>18:23</p>
      <Card.Title style={{marginLeft: "22px"}}>{author}</Card.Title>
      <p className='m-0'>3.3.2024</p>
      </div>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <Card.Text>
          {cardText}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MessageCard;