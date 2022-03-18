import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Ingredient from './components/Ingredient';
import Recipes from './components/Recipes';
import IngrRecSplit from './components/IngeRec-split';

function App() {
  return (
    <Router>
      <div className="app">
      <Navbar />
      <div className="content">
        
          <Route path="/start">
            <IngrRecSplit/>
          </Route>
         
          <Route path="/login">
            <LoginRegister/>
          </Route>
         
          <Route path="/recipes">
                <Recipes/>
          </Route>
          <Route path="/ingredients">
                <Ingredient/>
          </Route>
      </div>
     
    </div>
    </Router>
    
    
  );
}

export default App;
