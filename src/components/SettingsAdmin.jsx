import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";

function SettingsAdmin() {

    const Background = {
        background: "#F5F1F1"
      }
    
  
    const [users, setUsers] = useState([])

    useEffect(()=> {
      axios.get("http://localhost:3001/api/Users")
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
    }, []);

    
    
  return (
    <ListGroup className='m-5'> 
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>
        Nastavit výchozí šablonu směn
      </ListGroup.Item>
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>
        Nastavit výchozí heslo nově vytvořených uživatelů
      </ListGroup.Item>    
      <ListGroup.Item style={Background} className='d-flex justify-content-between'>
        Nastavit obrázek na úvodní stránce
      </ListGroup.Item>             
    </ListGroup>
  );
}

export default SettingsAdmin;