import React, {useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import OffcanvasUser from './OffcanvasUser';
import axios from "axios";

function ListUsers() {

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
      {
        users.map(user => {
          return <ListGroup.Item style={Background} className='d-flex justify-content-between'>
            {`${user.name} ${user.surname}`}
            <OffcanvasUser placement="end" name={user.name} surname={user.surname} email={user.email} type={user.privilageLevel} birthDate={user.birthDate}/>
            </ListGroup.Item> 
        })
      }
      
    </ListGroup>
  );
}

export default ListUsers;