import React from 'react';
import { Link } from "react-router-dom";

function LoginRedirect() {

    const style = {
        height: "100vh", 
        backgroundColor: "rgb(131,58,180)",
        background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        width: "20rem",
        height: "8rem",
        border: "1rem",
        borderRadius: "20px",
        fontSize: "2rem",
        padding: "15px",
    }

    const style2 = {
        height: "100vh", 
    }

    const text = {
        textDecoration: "none",
        color: "white"
    }

    return <div style={style2} className='container d-flex justify-content-center align-items-center'><div style={style} className='text-center'><Link style={text} to="/login">
        Pokračovat k přihlášení</Link></div></div>
}

export default LoginRedirect;