import React, { useState } from "react";
import NoteContext from "./NoteContext";
//import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);
  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  };
  const addnote = async (title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      
      body: JSON.stringify({ title, description, tag }),
    });
    
    const note=await response.json();
    
    setNotes(notes.concat(note));
  };
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },

      
    });
    const json=response.json();
    //console.log(json);
    //console.log("delete id note" + id);
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnote);
  };
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    //const json = await response.json();
    let newnotes=JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newnotes.length; i++) {
      const element = newnotes[i];
      if (element._id === id) {
        newnotes[i].title = title;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;
      }
      
    }
    setNotes(newnotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getallnotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};
export default NoteState;
