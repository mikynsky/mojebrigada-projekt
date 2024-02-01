import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import LoginTab from '../components/LoginTab';

function LoginPage() {

  const Background = {
    height: "100vh", 
    backgroundColor: "rgb(131,58,180)",
    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
  }

  return <div className="d-flex align-items-center justify-content-center" style={Background}>
   <LoginTab></LoginTab>
  </div>
  ;
}

export default LoginPage;