import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
      <Navbar />
      <div className="content">
        <Switch>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/login">
            <LoginRegister/>
          </Route>
        </Switch>
      </div>
     
    </div>
    </Router>
    
    
  );
}

export default App;
