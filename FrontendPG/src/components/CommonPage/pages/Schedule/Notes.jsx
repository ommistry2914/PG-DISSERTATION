import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './calender.css'

export default function Notes() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  const addNote = () => {
    if (note.trim() !== '') {
      setNotesList([...notesList, note]);
      setNote('');
    }
  };

  const removeNote = (index) => {
    const newNotesList = [...notesList];
    newNotesList.splice(index, 1);
    setNotesList(newNotesList);
  };


  return (
    <div className="notes calender-container-col col-sm-12 col-md-6 col-lg-6">
       <form action="">
        <label htmlFor="">
          Event Start
          <input type="text" />
        </label>
       </form>
    </div>
  )
}
