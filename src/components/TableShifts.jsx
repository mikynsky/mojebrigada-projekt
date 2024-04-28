import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import AddShift from './AddShift';
import ShiftBlock from './ShiftBlock';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function WeekTable(props) {
  const { id, previous, next, current } = props;
  const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

  const [week, setWeek] = useState([]);
  const [isLast, setIsLast] = useState()


  useEffect(() => {
    axios.get(`http://localhost:3001/api/Weeks?weekNumber=${id}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  }) 
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

    if (date[8] === 0) {
      day = date[9]
    } else {
      day = date[8] + date[9]
    }
    

    if (date[5] === 0) {
      month = date[6]
    } else {
      month = date[5] + date[6]
    }

    return day + "." + month
  }

  useEffect(() => {
    if (id === 1 && !isLast) {
      setIsLast(true);
    } else if (id !== 1 && isLast) { 
      setIsLast(false);
    }
  }, [id, isLast])

  var button = document.getElementById("left")
  console.log(button);
  


  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDate = new Date();

  for (const day of days) {
    const date = week[day]?.dayDate; 
    console.log(date)
    console.log(typeof date)
    console.log(currentDate)

    if (date instanceof Date && date.toDateString() === currentDate.toDateString() ) {
      const currentDayElement = document.getElementById(day);
      currentDayElement.classList.add('current-day');
    }
  }

  if (week.length === 0){
    return (
      <>
      </>
    )
  }

  return (
  <>
  <thead>
      <tr>
        <th><button id="left" onClick={previous} disabled={isLast}>&lt;</button></th>
          <th className='d-flex justify-content-between'>Směny na týden {formatedDate(week.monday.dayDate)} - {formatedDate(week.sunday.dayDate) + " " + week.sunday.dayDate[0]+ week.sunday.dayDate[1]+ week.sunday.dayDate[2]+ week.sunday.dayDate[3]} {current}<button onClick={next}>&gt;</button></th>
      </tr>
    </thead>
    <tbody>
      
  <tr id={daysOfWeek[0]}>
  <td>
    <p>{daysOfWeek[0]}</p>
    <p>{formatedDate(week.monday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {
        week.monday.shifts.map(week => {
          return <ShiftBlock assignedTo={week.monday.shifts} startTime={week.monday.shifts} endTime={week.monday.shifts} capacity={week.monday.shifts} date={week.monday.dayDate}/>
        })
      }
    <AddShift date={week.monday.dayDate} />
  </div>
</tr>
<tr id={daysOfWeek[1]}>
  <td>
    <p>{daysOfWeek[1]}</p>
    <p>{formatedDate(week.tuesday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.tuesday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[2]}</p>
    <p>{formatedDate(week.wednesday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.wednesday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[3]}</p>
    <p>{formatedDate(week.thursday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.thursday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[4]}</p>
    <p>{formatedDate(week.friday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.friday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[5]}</p>
    <p>{formatedDate(week.saturday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.saturday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[6]}</p>
    <p>{formatedDate(week.sunday.dayDate)}</p>
  </td>
  <div className='shift-container'>
    <ShiftBlock></ShiftBlock>
    <AddShift date={week.sunday.dayDate}/>
  </div>
</tr>

</tbody>
</>

)}

  

function TableShifts() {

  const [tablePage, setTablePage] = useState()
  const [currentWeek, setCurrentWeek] = useState()

  const handlePrevious = () => {
    setTablePage(tablePage - 1) 
  };

  const handleNext = () => {
    setTablePage(tablePage + 1)
  };



  useEffect(()=> {
    axios.get("http://localhost:3001/api/WeeksCurrent", {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(response => {
    setCurrentWeek(response.data);
    setTablePage(response.data); 
  })
    .catch(err => console.log(err))
  }, []);

  if (tablePage === null) {
      return <><Spinner animation="border" variant="danger" /><p>Loading</p></>; 
  } 
  var current = ""
  if (tablePage === currentWeek) {
    current = "Aktuální týden"
  } else (
    current = ""
  )

  return ( 
    <div className='d-flex justify-content-center'>
      <Table  responsive className='mx-5 my-1' style={{width:"100vh"}}>
          <WeekTable id={tablePage} current={current} previous={handlePrevious} next={handleNext}></WeekTable>
      </Table>
    </div>
  )
};


export default TableShifts;