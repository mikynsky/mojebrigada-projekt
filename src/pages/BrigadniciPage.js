import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ListZamestnanci from '../components/ListZamestnanci';

function BrigadniciPage() {
    return <div>
        <NavBar></NavBar>
        <ListZamestnanci></ListZamestnanci>
        <Footer></Footer>
        </div>;
}

export default BrigadniciPage;