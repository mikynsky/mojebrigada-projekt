import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Image from "../img/home_img.jpg"
import MessageCard from './MessageCard';
import axios from "axios";

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

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    
    useEffect(()=> {
      axios.get("http://localhost:3001/api/Messages")
      .then(messages => setMessages(messages.data))
      .catch(err => console.log(err))
    }, []);

    useEffect(()=> {
      axios.get("http://localhost:3001/api/Users")
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
    }, []);


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
        
        {
          messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(message => {
            return <MessageCard 
              title={message.headline} 
              author={`${message.userName} ${message.userSurname}`} 
              cardText={message.content}  
              createdAt={message.createdAt}
            />
          })
        }
      </Card>

    </div>
  );
}

export default HomeCard;