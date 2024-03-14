import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

function LoginTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertStyle, setAlertStyle] = useState({visibility: "hidden"});


    const formStyle = {
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "50px",
    }
    const titleStyle = {
        fontSize: "2rem",
        textAlign: "center",
    }


    const handleLogin = async (event) => {
      event.preventDefault(); // Prevent the default form submit action

      axios.post('http://localhost:3001/api/Login', {email,password})
        .then(response => {
            console.log(response.data);
            alert('Login successful!');
        })
        .catch(error => {
            console.error('Error logging in:', error.response.data);
            alert('Login failed: Invalid credentials');
            setAlertStyle({visibility: "visible"})
        });
    };
    

    return (
     
      <div style={{ width: '30rem'}} className='container'>  

        <Form id="login-form" style={formStyle} onSubmit={handleLogin} className='mx-10 my-10 align-items-center justify-content-center'>
        <Form.Group className="mb-3">
            <h1 style={titleStyle}>mojeBrigáda</h1>
            <Alert id="login-error-msg" style={alertStyle} key="danger" variant="danger">
              Nesprávný email nebo heslo!
            </Alert>
          <Form.Label>Email</Form.Label>
          <Form.Control id="email" type="email" placeholder="Zadejte email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Heslo</Form.Label>
          <Form.Control id="password" type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-center">
        <Link to="/domu">
          <Button id="login-form-submit" className="btn-lg" variant="danger" onClick={handleLogin} type="submit" >
            Přihlásit se
        </Button>
        </Link>
        </div>
      </Form>
    </div>
  );
}

export default LoginTab;