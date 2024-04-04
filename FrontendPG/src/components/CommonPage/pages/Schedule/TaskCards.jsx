import React, { useState, useEffect } from 'react'
import './calender.css'
import { FaCheckCircle, FaCross, FaEdit, FaPlusCircle, FaRegMinusSquare, FaTimesCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

// const tasks = [
//   { task: 'Task 1', time: '10:00 AM' },
//   { task: 'Task 2', time: '11:00 AM' },
//   { task: 'Task 3', time: '12:00 PM' },
//   { task: 'Task 4', time: '01:00 PM' },
//   { task: 'Task 5', time: '01:00 PM' },
//   { task: 'Task 6', time: '01:00 PM' },
// ];

const TaskCards = ({ selectedDay, notes }) => {
  const { noteid, eventid, studentid } = useParams();
  const [showEventForm, setShowEventForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);

  if (!Array.isArray(notes)) {
    return <div>No notes available</div>;
  }
  const handleDelete = (noteid, type) => {
    let deletePath = '';
    if (type === 'event') {
      deletePath = `http://localhost:8080/${studentid}/studentguide/schedule/events/${noteid}`;
    } else if (type === 'note') {
      deletePath = `http://localhost:8080/${studentid}/studentguide/schedule/notes/${noteid}`;
    }

    fetch(deletePath, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Deleted successfully');
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  const handleEdit = (noteid, type, updatedData) => {
    let editPath = '';
    if (type === 'event') {
      editPath = `http://localhost:8080/${studentid}/studentguide/schedule/events/${noteid}`;
    } else if (type === 'note') {
      editPath = `http://localhost:8080/${studentid}/studentguide/schedule/notes/${noteid}`;
    }

    fetch(editPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData) // Assuming updatedData is an object with the new note/event data
    })
      .then(response => {
        if (response.ok) {
          console.log('Note updated successfully!');
        } else {
          console.error('Failed to update note');
        }
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  };


  const handleDone = (noteId) => {
    fetch(`http://localhost:8080/${studentid}/studentguide/schedule/events/${noteId}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to mark note as done');
      }
      // Handle success response
    }).catch(error => {
      // Handle error
      console.error('Error marking note as done:', error);
    });
  };

  function NoteForm({ onSubmitNote, onClose }) {
    const [note, setNote] = useState('');

    const handleNoteChange = (e) => {
      setNote(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmitNote(note);
      onClose();
    };

    return (
      <div className="common-pg-flip-card-back">
        <div className='common-pg-note-event-heading' id='common-pg-add-note'><h5>Add Note for </h5></div>
        <form onSubmit={handleSubmit} className='common-pg-notes-events-form' >

          <div className="row">
            <div className="col-sm-12">
              <textarea name="note" placeholder="Write your note here" value={note} onChange={(e) => handleNoteChange(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6"><button type="submit" className='common-pg-note-event-submit-btn'>Add Note</button>
            </div>
            <div className="col-sm-6"><button onClick={onClose} className='common-pg-note-event-btn'>Cancel</button>
            </div>
          </div>
        </form>

      </div>
    );
  }

  function EventForm({ onSubmitEvent, onClose }) {
    const [eventDetails, setEventDetails] = useState({
      title: '',
      from: '',
      to: '',
      description: '',
      guests: '',
      location: '',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };

    return (
  <div > <form onSubmit={onSubmitEvent} className='common-pg-notes-events-form'>

  <div className="row">
    <div className="col-sm-12">
      <label>Title:</label>
      <input type="text" name="title" placeholder="Title" value={eventDetails.title} onChange={handleInputChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6">
      <label>From:</label>
      <input type="datetime-local" name="From" value={eventDetails.from} onChange={handleInputChange} />
    </div>
    <div className="col-sm-6">
      <label>To:</label>
      <input type="datetime-local" name="to" value={eventDetails.to} onChange={handleInputChange} />
    </div>
  </div>
  <div className="row">
    <div className="col-sm-12">
      <label>Description:</label>
      <input type="text" name="description" placeholder="Description" value={eventDetails.description} onChange={handleInputChange} />
    </div>
  </div>
  <div className="row">
    <div className="col-sm-6">
      <button type="submit" className='common-pg-note-event-submit-btn'>Add Event</button>
    </div>
    <div className="col-sm-6">
      <button onClick={onClose} className='common-pg-note-event-btn'>Cancel</button>
    </div>
  </div>
</form>
     </div >
    );
  }

const closeEventForm = () => {
  setShowEventForm(false);
};

const closeNoteForm = () => {
  setShowNoteForm(false);
};

const handleSubmitEvent = (e) => {
  e.preventDefault();
  // Implement event submission logic
};

const handleSubmitNote = (e) => {
  e.preventDefault();
  // Implement note submission logic
};




return (
  <div className="common-pg-task-cards common-pg-calender-container-col col-sm-12 col-lg-6 col-md-6">
    <h3>Tasks</h3>
    <button onClick={() => setShowNoteForm(true)} >NOte</button>
    <button onClick={() => setShowEventForm(true)}>Event</button>
    {notes.map((note) => (
      <div key={note.id} className="common-pg-task-card">
        {note.notes &&
          <div className="common-pg-note row">
            <div className='col-10'>
              {note.notes}
            </div>
            <div className='col-2'>
              <button><FaEdit onClick={() => setShowNoteForm(true)} /></button>
              <button><FaRegMinusSquare onClick={() => handleDelete(note.id, 'note')} /></button>
            </div>
          </div>} {/* Display note if it exists */}

        {note.event && (
          <div className='common-pg-event row' >
            <div className="col-9">
              <details>
                <summary className="common-pg-title">{note.event}</summary>
                <div className="common-pg-description ">{note.description}</div>
                <div className="common-pg-from-to ">{new Date(note.from).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })} - {new Date(note.to).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}</div>
              </details></div>
            <div className='col-3'>
              <button>{note.completionStatus ? <FaCheckCircle style={{ color: "green" }} /> : <FaPlusCircle onClick={() => handleDone(note.id)} />} </button>
              <button><FaEdit onClick={() => setShowEventForm(true)} /></button>
              <button><FaRegMinusSquare onClick={() => handleDelete(note.id, 'event')} /></button>
            </div>
          </div>
        )}

      </div>
    ))}

    <div className="common-pg-form">
      {showEventForm && <EventForm onSubmitEvent={handleSubmitEvent} onClose={closeEventForm} />}
      {showNoteForm && <NoteForm onSubmitNote={handleSubmitNote} onClose={closeNoteForm} />}
    </div>
  </div>

);
};

export default TaskCards;

