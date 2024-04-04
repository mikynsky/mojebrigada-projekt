import React from 'react';
import NavBarUser from '../../components/NavBarUser.jsx';
import Footer from '../../components/Footer.jsx';
import TableShiftsUser from '../../components/TableShiftsUser.jsx';

function SmenyPageUser() {
    return <div>
    <NavBarUser></NavBarUser>
    <TableShiftsUser/>
    <Footer></Footer>
    </div>;
}

export default SmenyPageUser;