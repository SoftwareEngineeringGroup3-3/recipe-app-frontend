import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Ingredient from './components/Ingredient';
import Recipes from './components/Recipes';
import IngrRecSplit from './components/IngeRec-split';
import { SessionContext, UserSession } from './session';
import { useState } from 'react';
import { deleteCookie, getCookie, setCookie } from './cookie';

function App() {
  const token = getCookie('login_token');
  const [ session, setSession ] = useState(new UserSession(token));

  const setNewSession = (newSession) => {
    if(!newSession){
      deleteCookie('login_token');
    }
    setSession(newSession);
  }

  return (
    <SessionContext.Provider value = {{
      session: session,
      setSession: setNewSession
    }}>
      <Router>
        <div className="app">
        <Navbar />
        <div className="content">
          {
            (
              () => {
                if(session && session.valid) {
                  return [
                    <Route path="/recipes">
                      <Recipes/>
                    </Route>,
                    <Route path="/ingredients">
                          <Ingredient/>
                    </Route>,
                    <Route path="/start">
                      <IngrRecSplit/>
                    </Route>
                  ]
                } else if (!session || !session.valid) {
                  return [
                    <Route path="/login">
                      <LoginRegister/>
                    </Route>
                  ]
                }
              }
            )()
          }
        </div>
      
      </div>
      </Router>
    </SessionContext.Provider>
    
  );
}

export default App;
