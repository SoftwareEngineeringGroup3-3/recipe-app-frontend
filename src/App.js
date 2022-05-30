import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Ingredient from './components/Ingredient';
import IngredientAdmin from './components/IngredientAdmin';
import AddIngredient from './components/AddIngredient';
import Recipes from './components/Recipes';
import LogOutStart from './components/LogOutStart';
import IngrRecSplit from './components/IngeRec-split';
import IngrRecSplitUser from './components/IngeRec-splitUser';
import NavbarLogOut from './components/NavbarLogout';
import NavbarAdmin from './components/NavbarAdmin';
import DisplayUsers from './components/DisplayUsers';
import { SessionContext, UserSession } from './session';
import { useState } from 'react';
import { deleteCookie, getCookie, setCookie } from './cookie';
import EditIngredient from './components/EditIngredient';
import RecipesAdmin from './components/RecipesAdmin';
import AddRecipe from './components/AddRecipe';
import IngredientsUser from './components/IngredientsUser';
import EditUser from './components/EditUser';

function App() {
  const token = getCookie('security_header');
  const admin = getCookie('admin_credentials');
  const isAdmin = admin != null ? (admin == encodeURIComponent(1) ? true : false) : false;
  const [session, setSession] = useState(new UserSession(token));

  const setNewSession = (newSession) => {
    if (!newSession) {
      deleteCookie('security_header');
    }
    setSession(newSession);
  }


  return (
    <SessionContext.Provider value={{
      session: session,
      setSession: setNewSession
    }}>
      <Router>
        <div className="app">

          {
            (
              () => {
               
                if (session && session.valid && !isAdmin) {
                  return [
                    <Switch>
                      <Route path="/">
                        <Navbar/>
                        <IngredientsUser/>
                      </Route>
                    </Switch>

                  ]
                } 
                else if (!session || !session.valid) {
                  return [
                    <Switch>
                      <Route path="/login">
                        <NavbarLogOut />
                        <LoginRegister />
                      </Route>,
                      <Route path="/">
                        <NavbarLogOut />
                        <LogOutStart />
                      </Route>
                    </Switch>
                  ]
                } else if (session && session.valid && isAdmin) { //admin
                  return [
                    <Switch>
                      <Route path="/recipesAdmin">
                        <NavbarAdmin />
                        <RecipesAdmin />
                      </Route>,
                      <Route path="/addrecipe">
                        <NavbarAdmin />
                        <AddRecipe/>
                      </Route>,
                      <Route path="/ingredientsAdmin">
                        <NavbarAdmin />
                        <IngredientAdmin />
                      </Route>,
                      <Route path="/ingredients">
                        <NavbarAdmin />
                        <Ingredient />
                      </Route>,
                      <Route path="/addingredient">
                        <NavbarAdmin />
                        <AddIngredient />
                      </Route>,
                      <Route path="/editingredient">
                        <NavbarAdmin />
                        <EditIngredient />
                      </Route>,
                      <Route path="/users">
                        <NavbarAdmin />
                        <DisplayUsers />
                      </Route>,
                      <Route path="/edituser">
                        <NavbarAdmin />
                        <EditUser />
                      </Route>,
                      <Route path="/">
                        <NavbarAdmin />
                        <IngrRecSplit />
                      </Route>,
                    </Switch>
                  ]
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
