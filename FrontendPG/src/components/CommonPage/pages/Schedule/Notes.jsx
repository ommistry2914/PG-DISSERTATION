import React, { useState } from 'react';
import './calender.css';

function Notes({ selectedDay, note, onNoteChange, onSubmitNote, onSubmitEvent }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [eventDetails, setEventDetails] = useState({ title: '', date: '', time: '', guests: '', location: '', description: '' });
  const [notify, setNotify] = useState('');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };


  const handleSubmitEvent = (e) => {
    e.preventDefault();
    // Handle submit event
    console.log('Event details:', eventDetails);
  };

  const formattedDate = selectedDay.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="common-pg-event-notes col-sm-12 col-lg-6 col-md-6">
      <div className={`common-pg-flip-card ${isFlipped ? 'common-pg-event-card-flipped' : ''} `}>
        <div className="common-pg-flip-card-inner">
          <div className="common-pg-flip-card-front">
            <div className='common-pg-note-event-heading'><h5>Add Event</h5>
            </div> <form onSubmit={onSubmitEvent} className='common-pg-notes-events-form'>
              
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
              {/* <div className="row"><input
                    type="radio"
                    name="notify"
                    value="True"
                    checked={notify === "True"}
                    onChange={() => setNotify("notify")}
                    required
                  />
                  True</div> */}
              <div className="row">
                <div className="col-sm-6">
                  <button type="submit" className='common-pg-note-event-submit-btn'>Add Event</button>
                </div>
                <div className="col-sm-6">
                  <button onClick={handleFlip} className='common-pg-note-event-btn'>Add Note</button>
                </div>
              </div>
            </form>
          </div>


          <div className="common-pg-flip-card-back">
            <div className='common-pg-note-event-heading' id='common-pg-add-note'><h5>Add Note for {formattedDate}</h5></div>
            <form onSubmit={onSubmitNote} className='common-pg-notes-events-form' >
             
              <div className="row">
                <div className="col-sm-12">
                  <textarea name="note" placeholder="Write your note here" value={note} onChange={(e) => onNoteChange(e.target.value)} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6"><button type="submit" className='common-pg-note-event-submit-btn'>Add Note</button>
                </div>
                <div className="col-sm-6"><button onClick={handleFlip} className='common-pg-note-event-btn'>Back to Event</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div >
  );
}

export default Notes;
