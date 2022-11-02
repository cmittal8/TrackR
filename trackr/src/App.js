import React from 'react';
import logo from './official_tR.png';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'



function App() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         &nbsp;&nbsp; 


        <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Controlled Popup
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
          ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
          doloribus. Odit, aut.
        </div>
      </Popup>
      
        <br/><br/>
      
      
          <a
          className="App-link"
          href="https://docs.google.com/spreadsheets/d/1ITTlbL4_oWT3mWk4XAuFpX-sN8uwTRQWrRnNFchPJ00/edit#gid=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To Spreadsheet 
        </a>
        </header>
    </div>
  );
}



export default App;