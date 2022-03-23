import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Ingredient from './components/Ingredient';
import IngredientAdmin from './components/IngredientAdmin';
import AddIngredient from './components/AddIngredient';
import Recipes from './components/Recipes';
import LogOutStart from './components/LogOutStart';
import IngrRecSplit from './components/IngeRec-split';
import NavbarLogOut from './components/NavbarLogout';
import { SessionContext, UserSession } from './session';
import { useState } from 'react';
import { deleteCookie, getCookie, setCookie } from './cookie';
import EditIngredient from './components/EditIngredient';
import RecipesAdmin from './components/RecipesAdmin';
import AddRecipe from './components/AddRecipe';


function App() {
  const token = getCookie('security_header');
  const [ session, setSession ] = useState(new UserSession(token));

  const setNewSession = (newSession) => {
    if(!newSession){
      deleteCookie('security_header');
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

          {
            (
              () => {
                if(session && session.valid) {
                  return [
                    <Switch>
                      <Route path="/recipes">
                        <Navbar />
                        <RecipesAdmin />
                      </Route>,
                      <Route path="/addrecipe">
                        <Navbar />
                        <AddRecipe /> 
                      </Route>,
                      <Route path="/ingredients">
                        <Navbar /> 
                        <Ingredient />
                      </Route>,
                      <Route path="/ingredientsAdmin">
                        <Navbar /> 
                        <IngredientAdmin />
                      </Route>,
                      <Route path="/addingredient">
                        <Navbar />
                        <AddIngredient />
                      </Route>,
                      <Route path="/editingredient">
                        <Navbar />
                        <EditIngredient />
                      </Route>,
                      <Route path="/">
                        <Navbar />
                        <IngrRecSplit />
                      </Route>
                    </Switch>

                  ]
                } else if (!session || !session.valid) {
                  return [
                   <Route path="/login">
                     <NavbarLogOut/>
                    <LoginRegister/>
                    </Route>,
                    <Route path="/logStart">
                      <NavbarLogOut/>
                      <LogOutStart/>
                    </Route>
                  ]
                }
                 else if(session.isAdmin && session){
                  <Switch>
                      <Route path="/recipes">
                        <Navbar />
                        <RecipesAdmin />
                      </Route>,
                      <Route path="/addrecipe">
                        <Navbar />
                        <AddRecipe />
                      </Route>,
                      <Route path="/ingredients">
                        <Navbar />
                        <Ingredient />
                      </Route>,
                      <Route path="/addingredient">
                        <Navbar />
                        <AddIngredient />
                      </Route>,
                      <Route path="/editingredient">
                        <Navbar />
                        <EditIngredient />
                      </Route>,
                      <Route path="/">
                        <Navbar />
                        <IngrRecSplit />
                      </Route>
                    </Switch>
                }
              }
            )()
          }
        </div>
      
      
      </Router>
    </SessionContext.Provider>
    
  );
}

export default App;
