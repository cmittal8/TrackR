import React from 'react';
import logo from './official_tR.png';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup'
import moment from 'moment';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleApi, GoogleApiProvider } from 'react-gapi';
import AuthPage from './Components/AuthPage';
import { gapi } from 'gapi-script';


const apiKey = "AIzaSyBPJmfyTPfRPGV566hxysCCkv3H8TscVJQ"
const clientId = "739140650399-hdlcrsphdb1eh83tgh95q5e9bop0nck6.apps.googleusercontent.com"
const discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "profile"
]
const spreadsheetId = "1tHZnpezywsKwHmdCtDfXIBZ-Yn7MmliK4VI9_he9i7Q"






function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState(null)
  const closeModal = () => setOpen(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        discoveryDocs: discoveryDocs
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = response => {
    console.log('SUCCESS', response);
    setCredentials(response)
    setLoggedIn(true)
    const accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken);
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };

  // const gapi = useGoogleApi({
  //   apiKey: apiKey,
  //   clientId: clientId,
  //   discoveryDocs: discoveryDocs,
  //   scopes: scopes
  // })

  // gapi.auth2.init()

  // const auth = gapi?.auth2.getAuthInstance()

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
          <br></br>
          {/* {
            !loggedIn?
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse)
                setCredentials(credentialResponse)
                setLoggedIn(true)
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              auto_select
            /> : 
              <GoogleApiProvider clientId={clientId}>
                <Forms credentials={credentials}/>
              </GoogleApiProvider>
          } */}
          {
            !loggedIn?
            <div>
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
            </div>:
            <Forms />
          }
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

function Forms (credentials) {
  const [companyName, setCompanyName] = useState('');
  const changeCompanyName = event => setCompanyName(event.target.value);

  const [jobTitle, setJobTitle] = useState('');
  const changeJobTitle = event => setJobTitle(event.target.value);

  const [startDate, setStartDate] = useState('');
  const changeStartDate = event => setStartDate(event.target.value);

  let currDate = moment().format("MM/DD/YYYY");
  const [dateApplied, setDateApplied] = useState(currDate);
  const changeDateApplied = event => setDateApplied(event.target.value);
  
  // const gapi = useGoogleApi({
  //   apiKey: apiKey,
  //   clientId: clientId,
  //   discoveryDocs: discoveryDocs,
  //   scopes: scopes
  // })

  // console.log(gapi)




  // gapi.auth2?.init()

  // gapi.auth.setToken(credentials.credential)

  // auth?.isSignedIn.get()
  // if (!auth?.isSignedIn.get()) 
  // auth.signIn()


  const onSubmit = async (e) => {
    e.preventDefault()
    gapi.client.sheets.spreadsheets.batchUpdate({
      auth: credentials.credential,
      spreadsheetId: spreadsheetId,
      requests: [
      {
        insertDimension: {
          range: {
            sheetId: 0,
            dimension: "ROWS",
            startIndex: 1,
            endIndex: 2,
          },
          inheritFromBefore: false
        }
      }
    ]}
    ).then(console.log)

    console.log(companyName + " " + jobTitle + " " + startDate + " " + currDate)
  }
  return (
  <form onSubmit={onSubmit}>
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

    <button type='submit'>
      Submit
    </button>
  </form>
  );
}

export default App;