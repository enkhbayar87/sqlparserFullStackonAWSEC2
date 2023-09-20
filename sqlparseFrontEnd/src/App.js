import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./main";


export default class App extends Component {
    state = {
        token: null
    };
    handleLogout = () => {
        console.log("logged out...");
    }
  
  
    render() {
    return (
        <Router>
            <div className='container'>
                <Routes>
                    <Route exact path = "/" Component={ Main } />
                </Routes>    
            </div>
        </Router>
    )
  }
}
