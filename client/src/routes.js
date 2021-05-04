import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {StudentCreateFormPage} from "./pages/studentPages/StudentCreateFormPage";
import {StudentHomePage} from "./pages/studentPages/StudentHomePage";
import {LoginPage} from "./pages/authorizationPages/LoginPage";

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/home" exact>
                    <StudentHomePage/>
                </Route>
                <Route path="/create" exact>
                    <StudentCreateFormPage/>
                </Route>
                <Redirect to="/home"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}