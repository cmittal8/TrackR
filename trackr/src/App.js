/*global chrome*/
// "content_security_policy": "script-src 'self' https://accounts.google.com/gsi/client https://apis.google.com; object-src 'self'"
import React from "react";
import logo from "./official_tR.png";
import "reactjs-popup/dist/index.css";
import "./App.css";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import moment from "moment";
import { gapi } from "gapi-script";
import axios from "axios";

const apiKey = "AIzaSyBPJmfyTPfRPGV566hxysCCkv3H8TscVJQ";
const discoveryDocs = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
];
var spreadsheetId = "1tHZnpezywsKwHmdCtDfXIBZ-Yn7MmliK4VI9_he9i7Q";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [email, setEmail] = useState("");
    const [userSheet, setUserSheet] = useState("");
    const changeSheet = (event) => setUserSheet(event.target.value);
    const apiURL = "https://efy1mn4ye6.execute-api.us-east-1.amazonaws.com/test/";
    let url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/`;

    useEffect(() => {
        const start = () => {
            chrome.identity.getProfileUserInfo({}, (i) => {
                console.log(i);
                setEmail(i.email);
            });
            gapi.client
                .init({
                    apiKey: apiKey,
                    discoveryDocs: discoveryDocs,
                })
                .then(() => {
                    chrome.identity.getAuthToken({}, (token) => {
                        if (!token) {
                            setLoggedIn(false);
                        } else {
                            console.log(token);
                            gapi.auth.setToken({ access_token: token });
                            setLoggedIn(true);
                        }
                    });
                });
        };
        gapi.load("client", start);
    }, []);

    const signIn = (e) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            console.log(token);
            gapi.auth.setToken({ access_token: token });
            setLoggedIn(true);
        });
        
    };

    const addNewSheetId = async (e) => {
        e.preventDefault();
        axios.post(apiURL + `newsheet?email=${email}&sheetId=${userSheet}`)
        .then((res) => console.log("success", res))
        .catch((res) => console.log("error", res));
    };

    const track = () => {
        setLoading(true)
        axios.get(apiURL + `getsheet?email=${email}`).then((res)=>{
            spreadsheetId = res.data.sheetId
            setLoading(false)
        })
        setOpen((o) => !o)

    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                &nbsp;&nbsp;
                <button
                    type="button"
                    className="button"
                    onClick={track}
                >
                    Track New Job!
                </button>
                <form onSubmit={addNewSheetId}>
                    <input
                        type={"text"}
                        id="userSheetId"
                        onChange={changeSheet}
                        value={userSheet}
                    />
                    <button type="submit">Add Spreadsheet</button>
                </form>
                <Popup
                    open={open}
                    closeOnDocumentClick
                    onClose={closeModal}
                    contentStyle={{ width: "80%" }}
                >
                    <div className="modal">
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                        <br></br>
                        {!loggedIn ? (
                            <button onClick={signIn}>
                                Sign in with Google
                            </button>
                        ) : (
                            !loading? <Forms/> : <div> loading... </div>
                        )}
                    </div>
                </Popup>
                <br />
                <br />
                <a
                    className="App-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Go To Spreadsheet
                </a>
            </header>
        </div>
    );
}

function Forms() {
    const [companyName, setCompanyName] = useState("");
    const changeCompanyName = (event) => setCompanyName(event.target.value);

    const [jobTitle, setJobTitle] = useState("");
    const changeJobTitle = (event) => setJobTitle(event.target.value);

    const [startDate, setStartDate] = useState("");
    const changeStartDate = (event) => setStartDate(event.target.value);

    let currDate = moment().format("MM/DD/YYYY");
    const [dateApplied, setDateApplied] = useState(currDate);
    const changeDateApplied = (event) => setDateApplied(event.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        gapi.client.sheets.spreadsheets
            .batchUpdate({
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
                            inheritFromBefore: false,
                        },
                    },
                ],
            })
            .then(console.log)
            .then(() =>
                gapi.client.sheets.spreadsheets.values
                    .batchUpdate({
                        spreadsheetId: spreadsheetId,
                        data: [
                            {
                                majorDimension: "ROWS",
                                range: "A2:E2",
                                values: [
                                    [
                                        companyName,
                                        jobTitle,
                                        startDate,
                                        currDate,
                                        "Applied",
                                    ],
                                ],
                            },
                        ],
                        valueInputOption: "RAW",
                    })
                    .then(console.log)
            );

        console.log(
            companyName + " " + jobTitle + " " + startDate + " " + currDate
        );
    };
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
            <button type="submit">Submit</button>
        </form>
    );
}

export default App;
