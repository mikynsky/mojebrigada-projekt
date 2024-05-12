import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import AddShift from './AddShift';
import ShiftBlock from './ShiftBlock';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

function WeekTable(props) {
  const { id, previous, next, current } = props; // Přístup k předaným props
  const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

  // Stav pro uložení dat týdne získaných z API
  const [week, setWeek] = useState({
    monday: { dayDate: 0, shifts: [] },
    tuesday: { dayDate: 0, shifts: [] },
    wednesday: { dayDate: 0, shifts: [] },
    thursday: { dayDate: 0, shifts: [] },
    friday: { dayDate: 0, shifts: [] },
    saturday: { dayDate: 0, shifts: [] },
    sunday: { dayDate: 0, shifts: [] }
  });
  const [isLast, setIsLast] = useState()

  // Načítání dat pro zadaný týden z API při změně ID týdne
  useEffect(() => {
    axios.get(`http://localhost:3001/api/Weeks?weekNumber=${id}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  }) 
    .then(response => {
      if (response.data) {
        setWeek(response.data);
      } else {
      console.error('No data returned from API');
  }})
    .catch(err => {
      console.log("Error fetching week data:", err)
      setWeek({ 
        // Reset stavu nebo zacházení s chybovým stavem
        monday: { dayDate: 2, shifts: [] },
      })});
  }, [id]);

  // Funkce pro formátování data
  function formatedDate(date) {
    if (!date) return ''; 
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

  // Další useEffect pro aktualizaci stavu `isLast`, závisí na ID týdne
  useEffect(() => {
    if (id === 1 && !isLast) {
      setIsLast(true);
    } else if (id !== 1 && isLast) { 
      setIsLast(false);
    }
  }, [id, isLast])

  var button = document.getElementById("left")
  

  // Kontrola a zvýraznění aktuálního dne v týdnu
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const currentDate = new Date();

  for (const day of days) {
    const date = week[day]?.dayDate; 


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

  // Render logika, včetně podmíněného renderování spinneru pokud data nejsou dostupná
  if (!week || !week.monday || !week.monday.dayDate) {
    return <Spinner animation="border" variant="primary" />;
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
    {week.monday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.monday.dayDate)}
      />
    })}
    <AddShift date={week.monday.dayDate} />
  </div>
</tr>
<tr id={daysOfWeek[1]}>
  <td>
    <p>{daysOfWeek[1]}</p>
    <p>{formatedDate(week.tuesday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.tuesday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.tuesday.dayDate)}
      />
    })}
    <AddShift date={week.tuesday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[2]}</p>
    <p>{formatedDate(week.wednesday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.wednesday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.wednesday.dayDate)}
      />
    })}
    <AddShift date={week.wednesday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[3]}</p>
    <p>{formatedDate(week.thursday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.thursday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.thursday.dayDate)}
      />
    })}
    <AddShift date={week.thursday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[4]}</p>
    <p>{formatedDate(week.friday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.friday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.friday.dayDate)}
      />
    })}
    <AddShift date={week.friday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[5]}</p>
    <p>{formatedDate(week.saturday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.saturday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.saturday.dayDate)}
      />
    })}
    <AddShift date={week.saturday.dayDate} />
  </div>
</tr>
<tr>
  <td>
    <p>{daysOfWeek[6]}</p>
    <p>{formatedDate(week.sunday.dayDate)}</p>
  </td>
  <div className='shift-container'>
  {week.sunday.shifts.map(shift => {
      return <ShiftBlock
        key={shift._id}
        assignedTo={shift.assignedTo}
        startTime={shift.startTime}
        endTime={shift.endTime}
        capacity={shift.capacity}
        date={formatedDate(week.sunday.dayDate)}
      />
    })}
    <AddShift date={week.sunday.dayDate}/>
  </div>
</tr>

</tbody>
</>

)}

  

function TableShifts() {

  const [tablePage, setTablePage] = useState(1) // Stav pro sledování aktuální stránky tabulky
  const [currentWeek, setCurrentWeek] = useState(1) // Stav pro sledování aktuálního týdne

  // Logika pro přechod mezi týdny
  const handlePrevious = () => {
    setTablePage(tablePage - 1) 
  };

  const handleNext = () => {
    setTablePage(tablePage + 1)
  };


  // Efekt pro načtení aktuálního týdne z API
  useEffect(()=> {
    axios.get("http://localhost:3001/api/WeeksCurrent", {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(response => {
    console.log(response.data)
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