import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {StudentCreateFormPage} from "./pages/studentPages/StudentCreateFormPage";
import {StudentHomePage} from "./pages/studentPages/StudentHomePage";
import {LoginPage} from "./pages/authorizationPages/LoginPage";
import {RegistrationPage} from "./pages/authorizationPages/RegistrationPage";
import {MentorHomePage} from "./pages/mentorPages/MentorHomePage";
import {MentorCreateFormPage} from "./pages/mentorPages/MentorCreateFormPage";
import {DepHeadHomePage} from "./pages/departmentHeadPages/DepHeadHomePage";
import {DepHeadCreateFormPage} from "./pages/departmentHeadPages/DepHeadCreateFormPage";
import {PgHeadHomePage} from "./pages/pgHeadPages/PgHeadHomePage";
import {PgHeadCreateFormPage} from "./pages/pgHeadPages/PgHeadCreateFormPage";
import {StudentProfilePage} from "./pages/studentPages/StudentProfilePage";

export const useRoutes = (isAuthenticated, userStatus) => {
    if(isAuthenticated && userStatus){
        if(userStatus === 'student') { // postgraduate
            return (
                <Switch>
                    <Route path="/student/home" exact>
                        <StudentHomePage/>
                    </Route>
                    <Route path="/student/createform" exact>
                        <StudentCreateFormPage/>
                    </Route>
                    <Route path="/student/profile" exact>
                        <StudentProfilePage/>
                    </Route>
                    <Redirect to="/student/home"/>
                </Switch>
            )
        }
        if(userStatus === 'mentor'){ // science mentor
            return (
                <Switch>
                    <Route path="/mentor/home" exact>
                        <MentorHomePage/>
                    </Route>
                    <Route path="/mentor/createform" exact>
                        <MentorCreateFormPage/>
                    </Route>
                    <Redirect to="/mentor/home"/>
                </Switch>
            )
        }
        if(userStatus === 'dephead'){ // department head
            return (
                <Switch>
                    <Route path="/dephead/home" exact>
                        <DepHeadHomePage/>
                    </Route>
                    <Route path="/dephead/createform" exact>
                        <DepHeadCreateFormPage/>
                    </Route>
                    <Redirect to="/dephead/home"/>
                </Switch>
            )
        }
        if(userStatus === 'pghead'){ // postgraduate head
            return (
                <Switch>
                    <Route path="/pghead/home" exact>
                        <PgHeadHomePage/>
                    </Route>
                    <Route path="/pghead/createform" exact>
                        <PgHeadCreateFormPage/>
                    </Route>
                    <Redirect to="/pghead/home"/>
                </Switch>
            )
        }
    }

    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <Route path="/registration" exact>
                <RegistrationPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}