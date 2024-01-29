import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function LoginTab() {
    const formStyle = {
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "50px",
    }
    const titleStyle = {
        fontSize: "2rem",
        textAlign: "center",
    }

    return <div style={{ width: '30rem'}} className='container'>   
    
    <Form style={formStyle}  className='mx-10 my-10 align-items-center justify-content-center'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <h1 style={titleStyle}>mojeBrigáda</h1>
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Zadejte email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Heslo</Form.Label>
      <Form.Control type="password" placeholder="Heslo" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    </Form.Group>
    <div className="d-flex align-items-center justify-content-center">
    <Link to="/domu">
      <Button className="btn-lg" variant="danger" type="submit" >
        Přihlásit se
    </Button>
    </Link>
    </div>
  </Form>
  </div>
}

export default LoginTab;