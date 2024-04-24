import React, { useState, useRef, useEffect } from 'react'
import './calender.css'
import { FaCross, FaEdit, FaRegMinusSquare, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

// const tasks = [
//   { task: 'Task 1', time: '10:00 AM' },
//   { task: 'Task 2', time: '11:00 AM' },
//   { task: 'Task 3', time: '12:00 PM' },
//   { task: 'Task 4', time: '01:00 PM' },
//   { task: 'Task 5', time: '01:00 PM' },
//   { task: 'Task 6', time: '01:00 PM' },
// ];

const TaskCards = ({ selectedDay, notes, fetchEvents }) => {
  const { studentid, noteid, eventid } = useParams();
  const [editNote, setEditNote] = useState(null);
  const formRef = useRef(null);

  if (!Array.isArray(notes)) {
    return <div>No notes available</div>;
  }

  useEffect(() => {
    fetchEvents(selectedDay);
  }, [notes, selectedDay, fetchEvents]);

  const handleDelete = async (noteid, type) => {
    let deletePath = '';
    if (type === 'event') {
      deletePath = `http://localhost:8080/${studentid}/studentguide/schedule/events/${noteid}`;
    } else if (type === 'note') {
      deletePath = `http://localhost:8080/${studentid}/studentguide/schedule/notes/${noteid}`;
    }

    try {
      const response = await fetch(deletePath, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Deleted successfully');
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  const handleEventDone = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule/events/${noteId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark note as done');
      }
    } catch (error) {
      console.error('Error marking note as done:', error);
    }
  };

  const handleNoteDone = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule/notes/${noteId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark note as done');
      }
    } catch (error) {
      console.error('Error marking note as done:', error);
    }
  };


  const handleNoteEdit = (note) => {
    setEditNote({ ...note });
  };

  const handleCancelEdit = () => {
    setEditNote(null);
  };

  const handleSubmitEdit = async (editedNote) => {
    try {
      const { id, ...rest } = editedNote;
      const response = await fetch(`http://localhost:8080/${studentid}/studentguide/schedule/${editedNote.event ? 'events' : 'notes'}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      });

      if (response.ok) {
        console.log('Note or event updated successfully!');
        setEditNote(null);
      } else {
        console.error('Failed to update note or event');
      }
    } catch (error) {
      console.error('Error updating note or event:', error);
    }
  };



  return (
    <div ref={formRef} className="common-pg-task-cards common-pg-calender-container-col col-sm-12 col-lg-6 col-md-6">
      <h3>Tasks</h3>
      {notes.length > 0 ? (
      notes.map((note) => (
        <div key={note.id} className="common-pg-task-card">
          {editNote && editNote.id === note.id ? (
            <div className="common-pg-edit-form">
              <h4>{note.event ? 'Edit Event' : 'Edit Note'}</h4>
              {note.event ? (
                <>
                  <div className="row">
                    <div className="col-12"><label htmlFor="event">Event:</label></div>
                    <div className="col-12"><input type="text" id="event" value={editNote.event} onChange={(e) => setEditNote({ ...editNote, event: e.target.value })} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12"> <label htmlFor="description">Description:</label></div>
                    <div className="col-12"><input type="text" id="description" value={editNote.description} onChange={(e) => setEditNote({ ...editNote, description: e.target.value })} />
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <label htmlFor="from">From: </label> <br />
                      <input type="datetime-local" id="from" value={new Date(editNote.from).toISOString().slice(0, 16)} onChange={(e) => setEditNote({ ...editNote, from: e.target.value })} />

                    </div>
                    <div className='col-6'>
                      <label htmlFor="to">To: </label> <br />
                      <input type="datetime-local" id="to" value={new Date(editNote.to).toISOString().slice(0, 16)} onChange={(e) => setEditNote({ ...editNote, to: e.target.value })} />

                    </div>
                  </div>
                </>
              ) : (
                <>
                  <textarea id="note" value={editNote.notes} onChange={(e) => setEditNote({ ...editNote, notes: e.target.value })}></textarea>
                  <br />
                </>
              )}
              <div className="row">
                <div className="col-6">   <button className='common-pg-schedule-btns' onClick={() => handleSubmitEdit(editNote)}>Save</button></div>
                <div className="col-6"> <button className='common-pg-schedule-btns' onClick={handleCancelEdit}>Cancel</button></div>


              </div></div>
          ) : (
            <>
              {note.notes && (
                <div className="common-pg-note row">
                  <div className='col-9'>{note.notes}</div>
                  <div className='col-3'>
                    <button>{note.completionStatus ? <FaCheckCircle style={{ color: "green" }} /> : <FaPlusCircle onClick={() => handleNoteDone(note.id)} />} </button>
                    <button onClick={() => handleNoteEdit(note)}><FaEdit /></button>
                    <button onClick={() => handleDelete(note.id, 'note')}><FaRegMinusSquare /></button>
                  </div>
                </div>
              )}
              {note.event && (
                <div className='common-pg-event row'>
                  <div className="col-9">
                    <details>
                      <summary className="title">{note.event}</summary>
                      <div className="description">Description: {note.description}</div>
                      <div className="from-to">{new Date(note.from).toLocaleDateString('en-US', {
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
                    </details>
                  </div>
                  <div className='col-3'>
                    <button>{note.completionStatus ? <FaCheckCircle style={{ color: "green" }} /> : <FaPlusCircle onClick={() => handleEventDone(note.id)} />} </button>
                    <button onClick={() => handleNoteEdit(note)}><FaEdit /></button>
                    <button onClick={() => handleDelete(note.id, 'event')}><FaRegMinusSquare /></button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )) ) : (
        <p>No notes for this day.</p>
      )}
    </div>

  );
};

export default TaskCards;

