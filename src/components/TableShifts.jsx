import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import AddShift from './AddShift';
import ShiftBlock from './ShiftBlock';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function WeekTable(props) {
  const { id, previous, next } = props;
  const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

  const [week, setWeek] = useState([]);
  const [isLast, setIsLast] = useState()


  useEffect(() => {
    axios.get(`http://localhost:3001/api/Weeks?weekNumber=${id}`) 
    .then(response => {
      if (response.data) {
        setWeek(response.data);
    }
  })
    .catch(err => console.log(err));
  }, [id]);

  function formatedDate(date) {
    let month;
    let day;

    if (date[8] == 0) {
      day = date[9]
    } else {
      day = date[8] + date[9]
    }
    

    if (date[5] == 0) {
      month = date[6]
    } else {
      month = date[5] + date[6]
    }

    return day + "." + month
  }

  useEffect(() => {
    if (id === 1 && !isLast) {
    setIsLast(true);
    } else if (id !== 1 && !isLast) { 
      setIsLast(false);
    }
  }, [id, isLast])

  var button = document.getElementById("left")
  console.log(button);
  


  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDate = new Date();

  for (const day of days) {
    const date = week[day]?.dayDate; // undefined
    console.log(date)
    console.log(typeof date)
    console.log(currentDate)

    if (date instanceof Date && date.toDateString() === currentDate.toDateString() ) {
      const currentDayElement = document.getElementById(day);
      currentDayElement.classList.add('current-day');
    }
  }

  if (week.length == 0){
    return (
      <>
      </>
    )
  }

  return (
  <>
  <thead>
      <tr>
        <th><button id="left" onClick={previous} >&lt;</button></th>
          <th className='d-flex justify-content-between'>Směny na týden {formatedDate(week.monday.dayDate)} - {formatedDate(week.sunday.dayDate) + " " + week.sunday.dayDate[0]+ week.sunday.dayDate[1]+ week.sunday.dayDate[2]+ week.sunday.dayDate[3]}<button onClick={next}>&gt;</button></th>
      </tr>
      {/* {
        button.addEventListener('click', function() {
          if (isLast == true) {
            var button = document.getElementById("left")
            console.log(button);
            button.disabled = true
          } else {
            button.disabled = false
        }})
      } */}
    </thead>
    <tbody>
      
  <tr id={daysOfWeek[0]}>
  <td>
    <p>{daysOfWeek[0]}</p>
    <p>{formatedDate(week.monday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.monday.dayDate} />
  </p>
</tr>
<tr id={daysOfWeek[1]}>
  <td>
    <p>{daysOfWeek[1]}</p>
    <p>{formatedDate(week.tuesday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.tuesday.dayDate} />
  </p>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[2]}</p>
    <p>{formatedDate(week.wednesday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.wednesday.dayDate} />
  </p>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[3]}</p>
    <p>{formatedDate(week.thursday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.thursday.dayDate} />
  </p>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[4]}</p>
    <p>{formatedDate(week.friday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.friday.dayDate} />
  </p>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[5]}</p>
    <p>{formatedDate(week.saturday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.saturday.dayDate} />
  </p>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[6]}</p>
    <p>{formatedDate(week.sunday.dayDate)}</p>
  </td>
  <p className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.sunday.dayDate}/>
  </p>
</tr>

</tbody>
</>

)}

function TableShifts() {

  const [tablePage, setTablePage] = useState()

  const handlePrevious = () => {
    setTablePage(tablePage - 1) 
  };

  const handleNext = () => {
    setTablePage(tablePage + 1)
  };



  useEffect(()=> {
    axios.get("http://localhost:3001/api/WeeksCurrent")
    .then(value => setTablePage(value.data))
    .catch(err => console.log(err))
  }, []);

  if (tablePage == null) {
      return <><Spinner animation="border" variant="danger" /><p>Loading</p></>; 
  } 
  
  return ( 
    <div className='d-flex justify-content-center'>
      <Table  responsive className='mx-5 my-1' style={{width:"100vh"}}>
          <WeekTable id={tablePage} previous={handlePrevious} next={handleNext}></WeekTable>
      </Table>
    </div>
  )
};

export default TableShifts;