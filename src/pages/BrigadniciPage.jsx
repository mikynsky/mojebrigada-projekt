import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ListUsers from '../components/ListUsers';
import AddButtonUser from '../components/AddButtonUser';

function BrigadniciPage() {


    return ( <div>
        <NavBar></NavBar>
        <ListUsers></ListUsers>
        <div className='sticky'><AddButtonUser content="+" /></div>
        <Footer></Footer>
        </div>
)}

export default BrigadniciPage;