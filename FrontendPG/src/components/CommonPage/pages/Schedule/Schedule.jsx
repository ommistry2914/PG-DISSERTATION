import React, { useState, useEffect } from 'react'
import './calender.css'
import { useParams } from 'react-router-dom';
import Calender from './Calender';
import TaskCards from './TaskCards';
import { FaPlus } from 'react-icons/fa';
import Notes from './Notes';

export default function Schedule() {

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [note, setNote] = useState('');
  const [task, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [From, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const { studentid } = useParams();
  const [events, setEvents] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    fetchNotesForSelectedDay(day);
  };

  const onNoteChange = (newNote) => {
    setNote(newNote);
  };

  useEffect(() => {
    fetchEventsAndNotes();
  }, []);

  const fetchEventsAndNotes = () => {
    fetch(`http://localhost:8080/${studentid}/studentguide/schedule`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const events = data.map(event => ({
            date: event.from && event.from.split('T')[0],
            type: 'event'
          })).filter(event => event.date); // Filter out undefined dates
          const notes = data.map(note => ({
            date: note.date && note.date.split('T')[0],
            type: 'note'
          })).filter(note => note.date); // Filter out undefined dates
          const allDates = [...events, ...notes];
          const uniqueDates = [...new Set(allDates.map(date => date.date))];
          setEvents(uniqueDates);
        } else {
          console.error('Invalid data structure in response:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching events and notes:', error);
      });
  };




  const formattedDate = selectedDay.toISOString().split('T')[0];
  const fetchNotesForSelectedDay = () => {

    fetch(`http://localhost:8080/${studentid}/studentguide/schedule/date?date=${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data); // Log the entire data object
        if (data.length > 0) {
          console.log('Notes from API:', data); // Log the notes if they exist
          setTasks(data);
        } else {
          console.log('No notes found in the response');
          setTasks([]);
        }
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const eventData = {
      title: e.target.title.value,
      from: e.target.From.value,
      to: e.target.to.value,
      guests: e.target.guests.value,
      location: e.target.location.value,
      description: e.target.description.value
    };

    console.log('Event Data:', eventData);

    fetch(`http://localhost:8080/${studentid}/studentguide/schedule/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Event added successfully!');
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
          setSelectedDay(new Date());
        } else {
          console.error('Failed to add event');
          setShowSuccessAlert(false);
          setShowErrorAlert(true);
        }
      })
      .catch(error => {
        console.error('Error adding event:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      });

  };


  const onSubmitNote = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/${studentid}/studentguide/schedule/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: selectedDay, notes: note })
    })
      .then(response => {
        if (response.ok) {
          console.log('Note added successfully!');
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
          setNote('');
        } else {
          console.error('Failed to add note');
          setShowSuccessAlert(false);
          setShowErrorAlert(true);
        }
      })
      .catch(error => {
        console.error('Error adding note:', error);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
      });

    console.log(`Note for ${formattedDate}: ${note}`);
  };


  return (
    <div className='common-pg-contents'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Student</a></li>
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
          <Notes selectedDay={selectedDay} note={note} onNoteChange={onNoteChange} onSubmitNote={onSubmitNote} onSubmitEvent={onSubmitEvent} showErrorAlert={showErrorAlert} showSuccessAlert={showSuccessAlert} />

        )}
      </div>
      <div className='common-pg-task-container'>
        <TaskCards selectedDay={selectedDay} notes={task} />
      </div>
    </div>
  );
};
