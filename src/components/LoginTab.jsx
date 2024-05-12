import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

function LoginTab() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const [alertStyle, setAlertStyle] = useState({visibility: "hidden"}); // Stav pro viditelnost chybové zprávy



    const formStyle = {
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "50px",
    }
    const titleStyle = {
        fontSize: "2rem",
        textAlign: "center",
    }

// Odeslání požadavku na přihlášení
    const handleLogin = async (event) => {
      event.preventDefault(); 

      axios.post('http://localhost:3001/api/Login', {email,password})
        .then(response => {
            console.log(response);
            const { token } = response.data; // Získání tokenu z odpovědi
            localStorage.setItem('token', token); // Uložení tokenu do localStorage
            const decoded = jwtDecode(token); // Dekódování JWT tokenu
            login(decoded.privilegeLevel); // Aktualizace kontextu s úrovní práv
            console.log(decoded);

            // Navigace podle úrovně práv uživatele
            if (decoded.privilegeLevel === 'Admin') {
              navigate('/domu');
            } else if (decoded.privilegeLevel === 'User') {
              navigate('/domuUser');
            }
        })
        .catch(error => {
          if (!error.response) {
            console.error("Server neodpovídá.");
            alert("Server neodpovídá. Zkontrolujte zda API server běží. Pokud ne, je třeba ho zapnout.");
        } else if (error.response.status === 400) {
            console.error("Chybí email nebo heslo");
            alert("Chybí email nebo heslo");
        } else if (error.response.status === 401) {
            console.error("Invalid Credentials");
        } else {
            console.error("Login Error:", error);
            alert("Login Error");
        }
            setAlertStyle({visibility: "visible"})
        });
    }
    

    return (
     
      <div style={{ width: '30rem'}} className='container'>  

        <Form id="login-form" style={formStyle} onSubmit={handleLogin} className='mx-10 my-10 align-items-center justify-content-center'>
        <Form.Group className="mb-3">
            <h1 style={titleStyle}>mojeBrigáda</h1>

            <Alert id="login-error-msg" style={alertStyle} key="danger" variant="danger">
              Nesprávné heslo nebo email
            </Alert>
            
          <Form.Label>Email</Form.Label>
          <Form.Control id="email"  type="name" placeholder="Zadejte email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Heslo</Form.Label>
          <Form.Control id="password" type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-center">
          <Button id="login-form-submit" className="btn-lg" variant="danger"  type="submit" >
            Přihlásit se
        </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginTab;