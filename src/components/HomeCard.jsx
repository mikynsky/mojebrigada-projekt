import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Image from "../img/home_img.jpg"
import MessageCard from './MessageCard';
import axios from "axios";

function MessageList({ messages, users }) {
  return (
      <div>
          {messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                   .map(message => {
                      const user = users[message.createdBy];
                      const authorName = user ? `${user.name} ${user.surname}` : "Unknown User";

                      return <MessageCard 
                          key={message._id}
                          title={message.headline} 
                          author={authorName}
                          cardText={message.content}  
                          createdAt={message.createdAt}
                      />
                   })}
      </div>
  );
}


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
      axios.get("http://localhost:3001/api/Messages", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setMessages(response.data);
            return response.data;
        })
        .then(messages => {
            messages.forEach(message => {
                if (message.createdBy && !users[message.createdBy]) {
                    axios.get(`http://localhost:3001/api/Users/${message.createdBy}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(userResponse => {
                        setUsers(prevUsers => ({
                            ...prevUsers,
                            [message.createdBy]: userResponse.data
                        }));
                    })
                    .catch(err => console.log(err));
                }
            });
        })
        .catch(err => console.log(err));
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
        
      <MessageList messages={messages} users={users}></MessageList>

      </Card>

    </div>
  );
}

export default HomeCard;