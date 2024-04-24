import React, { useState, useEffect } from 'react'
import './calender.css'
import { Link, useParams } from 'react-router-dom';
import Calender from './Calender';
import TaskCards from './TaskCards';
import { FaPlus } from 'react-icons/fa';
import Notes from './Notes';

export default function Schedule() {

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [note, setNote] = useState('');
  const [task, setTasks] = useState([]);

  const { studentid, taskId } = useParams();
  const [events, setEvents] = useState([]);
  const formattedDate = selectedDay.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleDayClick = (day) => {
    setSelectedDay(day);
    fetchEvents(day);
  };

  const onNoteChange = (newNote) => {
    setNote(newNote);
  };

  useEffect(() => {
    const today = new Date();
    fetchEvents(today);
  }, []);

  const fetchEvents = async (selectedDay) => {
    try {
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule`);
      const data = await response.json();
      const eventDates = [];

      data.forEach(item => {
        if (item.event && item.from && item.to) {
          const fromDate = new Date(item.from);
          const toDate = new Date(item.to);
          for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
            eventDates.push(date.toDateString());
          }
        }
      });

      data.forEach(item => {
        if (item.notes) {
          const noteDate = new Date(item.date);
          eventDates.push(noteDate.toDateString());
        }
      });

      const uniqueEventDates = Array.from(new Set(eventDates));

      setEvents(uniqueEventDates);

      const formattedDate = selectedDay.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
      console.log(formattedDate)

      const formattedDateForComparison = formattedDate.split('-').reverse().join('-');

      if (data) {
        const filteredEvents = data.filter(item => {
          if (item.event && item.from && item.to) {
            const eventFromDate = new Date(item.from);
            const eventToDate = new Date(item.to);
            return formattedDateForComparison >= eventFromDate.toISOString().slice(0, 10) &&
              formattedDateForComparison <= eventToDate.toISOString().slice(0, 10);
          }
          return false;
        });

        const filteredNotes = data.filter(item => {
          if (item.notes) {
            const noteDate = new Date(item.date);
            return formattedDateForComparison === noteDate.toISOString().slice(0, 10);
          }
          return false;
        });

        const filteredTasks = [...filteredEvents, ...filteredNotes];

        if (filteredTasks.length > 0) {
          console.log('Tasks from API:', filteredTasks); // Log the tasks if they exist
          setTasks(filteredTasks);
        } else {
          console.log('No tasks found for the selected day');
          setTasks([]);
        }
      } else {
        console.log('No events or notes found in the response');
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  const onSubmitEvent = async (e) => {
    e.preventDefault();
    const notify = e.target.notify.value === "true";
    const eventData = {
      event: e.target.title.value,
      from: e.target.From.value,
      to: e.target.to.value,
      description: e.target.description.value,
      notify: notify
    };

    console.log('Event Data:', eventData);

    try {
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        console.log('Event added successfully!');
        setSelectedDay(new Date());
        await fetchEvents(new Date());
        e.target.title.value = '';
      } else {
        console.error('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };



  const onSubmitNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: selectedDay, notes: note })
      });

      if (response.ok) {
        await fetchEvents(new Date());
        setNote('');
        console.log('Note added successfully!');
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }

    console.log(`Note for ${formattedDate}: ${note}`);
  };



  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Student</a></li>
          <li className="breadcrumb-item"><Link to={`/${studentid}/studentguide`}>Dissertation</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Schedule</li>
        </ol>
      </nav>

      <div className="common-pg-calender-container row">
        <Calender
          selectedDay={selectedDay}
          onDayClick={handleDayClick}
          events={events}
        />
        {selectedDay && (
          <Notes selectedDay={selectedDay} note={note} onNoteChange={onNoteChange} onSubmitNote={onSubmitNote} onSubmitEvent={onSubmitEvent} />

        )}
      </div>
      <div className='common-pg-task-container'>
        <TaskCards selectedDay={selectedDay} notes={task} fetchEvents={fetchEvents} />
      </div>
    </div>
  );
};
