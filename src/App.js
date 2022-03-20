import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginRegister from './components/Login/';
import Ingredient from './components/Ingredient';
import Recipes from './components/Recipes';
import LogOutStart from './components/LogOutStart';
import IngrRecSplit from './components/IngeRec-split';
import NavbarLogOut from './components/NavbarLogout';
import { SessionContext, UserSession } from './session';
import { useState } from 'react';
import { deleteCookie, getCookie, setCookie } from './cookie';

function App() {
    const token = getCookie('security_header');
    const [session, setSession] = useState(new UserSession(token));

    const setNewSession = (newSession) => {
        if (!newSession) {
            deleteCookie('security_header');
        }
        setSession(newSession);
    }

    return ( <
        SessionContext.Provider value = {
            {
                session: session,
                setSession: setNewSession
            }
        } >
        <
        Router >
        <
        div className = "app" >



        {
            (
                () => {
                    if (session && session.valid) {
                        return [ <
                            Route path = "/recipes" >
                            <
                            Navbar / >
                            <
                            Recipes / >
                            <
                            /Route>, <
                            Route path = "/ingredients" >
                            <
                            Navbar / >
                            <
                            Ingredient / >
                            <
                            /Route>, <
                            Route path = "/start" >
                            <
                            Navbar / >
                            <
                            IngrRecSplit / >
                            <
                            /Route>,
                            // <Route path="/logStart">
                            //   <Navbar/>
                            //   <LogOutStart/>
                            // </Route>,
                        ]
                    } else if (!session || !session.valid) {
                        return [ <
                            Route path = "/login" >
                            <
                            NavbarLogOut / >
                            <
                            LoginRegister / >
                            <
                            /Route>, <
                            Route path = "/logStart" >
                            <
                            NavbarLogOut / >
                            <
                            LogOutStart / >
                            <
                            /Route>

                        ]
                    }
                }
            )()
        } <
        /div>


        <
        /Router> <
        /SessionContext.Provider>

    );
}

export default App;