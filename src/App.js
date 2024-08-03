//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Alert from './Components/Alert'
import Home from './Components/Home';
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Signup from './Components/Signup';
import Login from './Components/Login';
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Navbar />
      {/* <Alert message="wabba labba dub dub"/> */}
      <div className='container'><Routes>
        <Route path="/" element={<Home />}></Route>
        
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      </div>
      
    </BrowserRouter>
    </NoteState>
    
  </>
  );
}

export default App;
