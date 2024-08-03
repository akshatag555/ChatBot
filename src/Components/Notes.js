import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  let history=useNavigate()
  const context = useContext(noteContext);
  const { notes, getallnotes,editnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getallnotes();
    }
    else{
      history("/login")
    }
  });
  const ref = useRef(null);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"general"})
  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  };
  
  
  const handleclick = (e) => {
   // console.log("aksad",note)
    editnote(note.id,note.etitle,note.edescription,note.etag)
    //e.preventDefault();
    //addnote(note.title,note.description,note.tag)
    
  };
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <Addnote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    onChange={onChange} minLength={2} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    onChange={onChange} minLength={3} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<2||note.edescription.length<3} onClick={handleclick} data-bs-dismiss="modal" type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length===0&&'No notes to display'}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
