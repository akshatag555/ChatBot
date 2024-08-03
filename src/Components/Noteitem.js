import React, { useContext } from "react";

import noteContext from "../Context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updateNote } = props;
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title text-primary">{note.title}</h5>
          <p className="card-text text-secondary">{note.description}</p>
          <i className="fa-solid fa-trash fa-bounce mx-2 text-danger" onClick={() => deletenote(note._id)}></i>
          <i className="fa-regular fa-pen-to-square fa-bounce mx-2 text-info" onClick={() => updateNote(note)}></i>
          <span className="badge bg-success position-absolute top-0 end-0">{note.tag}</span> {/* Add tag here */}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
