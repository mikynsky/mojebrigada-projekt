import React from 'react';


function Footer() {

    let currentYear = new Date().getFullYear()

    const Background = {
        height: "2rem", 
        background: "#F5F1F1"
      }

    return (
        <footer className='fixed-bottom d-flex align-items-center justify-content-center ' style={Background}>
            <p className='mx-0 my-0'>©{currentYear} Mikuláš Čadeni</p>
        </footer>
    );
}

export default Footer;