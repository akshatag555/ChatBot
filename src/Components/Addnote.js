import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../Context/notes/NoteContext";
const Addnote = () => {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setnote] = useState({title:"",description:"",tag:""})
  const handleadd = (e) => {
    e.preventDefault();
    addnote(note.title,note.description,note.tag)
    setnote({title:"",description:"",tag:""})
  };
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
             minLength={2} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={note.description}
            className="form-control"
            id="description"
            onChange={onChange} minLength={3} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag}
            className="form-control"
            id="tag"
            onChange={onChange} 
          />
        </div>

        <button disabled={note.title.length<2||note.description.length<3} type="submit" className="btn btn-primary" onClick={handleadd}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
