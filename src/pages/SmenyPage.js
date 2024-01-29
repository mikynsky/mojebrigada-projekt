import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TableSmeny from '../components/TableSmeny';

function SmenyPage() {
    return <div>
    <NavBar></NavBar>
    <TableSmeny/>
    <Footer></Footer>
    </div>;
}

export default SmenyPage;