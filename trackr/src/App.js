import React from 'react';
import logo from './official_tR.png';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import moment from 'moment';



function App() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [companyName, setCompanyName] = useState('');
  const changeCompanyName = event => setCompanyName(event.target.value);

  const [jobTitle, setJobTitle] = useState('');
  const changeJobTitle = event => setJobTitle(event.target.value);

  const [startDate, setStartDate] = useState('');
  const changeStartDate = event => setStartDate(event.target.value);

  let currDate = moment().format("MM/DD/YYYY");
  const [dateApplied, setDateApplied] = useState(currDate);
  const changeDateApplied = event => setDateApplied(event.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         &nbsp;&nbsp; 

        <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Track New Job!
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} contentStyle={{width: '80%'}}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>

          Company Name:
          <input
            type={"text"}
            id="companyName"
            onChange={changeCompanyName}
            value={companyName}
          />
          <br></br>

          Job Title:
          <input
            type={"text"}
            id="jobTitle"
            onChange={changeJobTitle}
            value={jobTitle}
          />

          <br></br>

          Start Date:
          <input
            type={"text"}
            id="startDate"
            onChange={changeStartDate}
            value={startDate}
          />

          <br></br>

          Date Applied:
          <input
            type={"text"}
            id="dateApplied"
            onChange={changeDateApplied}
            value={dateApplied}
          />

          <br></br>

          <button>
            Submit
          </button>
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