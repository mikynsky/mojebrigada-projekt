import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import LoginTab from '../../components/LoginTab';
import Footer from '../../components/Footer';

function LoginPage() {

  const background = {
    height: "100vh", 
    backgroundColor: "rgb(131,58,180)",
    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
  }

  return <div className="d-flex align-items-center justify-content-center" style={background}>
   <LoginTab></LoginTab>
   <Footer></Footer>
  </div>
  ;
}

export default LoginPage;