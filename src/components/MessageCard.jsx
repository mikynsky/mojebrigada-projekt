import Card from 'react-bootstrap/Card';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


function MessageCard({author, title, cardText, createdAt}) {


    let time = createdAt[11]+createdAt[12] + ":" + createdAt[14]+createdAt[15];
    let date = createdAt[8]+createdAt[9] + "." + createdAt[5]+createdAt[6] + "." + createdAt[0]+createdAt[1]+createdAt[2]+createdAt[3];
  

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
      <div className='d-flex justify-content-between'>
      <p className='m-0'>{time}</p>
      <Card.Title style={{marginLeft: "28px"}}>{title}</Card.Title>
      <p className='m-0'>{date}</p>
      </div>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>
          {cardText}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MessageCard;