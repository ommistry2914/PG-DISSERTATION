import React,{useState} from 'react'
import './calender.css'

export default function Calender({ selectedDay, onDayClick, events }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const renderCalendar = () => {
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const daysInMonth = lastDay.getDate();
  
      const firstDayIndex = firstDay.getDay();
      const lastDayIndex = lastDay.getDay();
  
      const prevMonthDays = [];
      const thisMonthDays = [];
      const nextMonthDays = [];
  
      // Render days from previous month
      for (let i = firstDayIndex; i > 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), -i + 1);
          prevMonthDays.push(date);
      }
  
      // Render days from current month
      for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          thisMonthDays.push(date);
      }
  
      // Render days from next month
      for (let i = 1; i <= 6 - lastDayIndex; i++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
          nextMonthDays.push(date);
      }
  
      const allDays = [...prevMonthDays, ...thisMonthDays, ...nextMonthDays];
  
      return allDays.map((day) => (
          <div
              key={day.toDateString()}
              className={`common-pg-calender-day ${selectedDay && selectedDay.toDateString() === day.toDateString() ? 'common-pg-selectedDay' : ''}`}
              onClick={() => onDayClick(day)}
          >
              {events.includes(day.toDateString()) && <div className="common-pg-calender-dot"></div>}
              {day.getDate()}
               
          </div>
      ));
  };
  
  
    const goToPrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };
  
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

  return (
    
    <div className="common-pg-calendar common-pg-calender-container-col col-sm-12 col-lg-6 col-md-6">
      <div className="common-pg-calender-header">
        <button className='common-pg-schedule-calender-btns' onClick={goToPrevMonth}>&lt;</button>
        <h5>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
        <button className='common-pg-schedule-calender-btns' onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="common-pg-calender-days">{renderCalendar()}</div>
    </div>
  )
}
