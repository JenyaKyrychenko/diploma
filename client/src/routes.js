import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {StudentCreateFormPage} from "./pages/studentPages/StudentCreateFormPage";
import {StudentHomePage} from "./pages/studentPages/StudentHomePage";
import {LoginPage} from "./pages/authorizationPages/LoginPage";
import {RegistrationPage} from "./pages/authorizationPages/RegistrationPage";
import {MentorHomePage} from "./pages/mentorPages/MentorHomePage";
import {DepHeadHomePage} from "./pages/departmentHeadPages/DepHeadHomePage";
import {PgHeadHomePage} from "./pages/pgHeadPages/PgHeadHomePage";
import {StudentProfilePage} from "./pages/studentPages/StudentProfilePage";
import {StudentChooseSpeciality} from "./pages/studentPages/StudentChooseSpeciality";
import {StudentResearchWork} from "./pages/studentPages/StudentResearchWork";
import {StudentExams} from "./pages/studentPages/StudentExams";
import {MentorsStudents} from "./pages/mentorPages/MentorsStudents";
import {MentorMentoring} from "./pages/mentorPages/MentorMentoring";
import {DepHeadAddSpeciality} from "./pages/departmentHeadPages/DepHeadAddSpeciality";
import {PgHeadAddExam} from "./pages/pgHeadPages/PgHeadAddExam";
import {PgHeadShowStudents} from "./pages/pgHeadPages/PgHeadShowStudents";
import {StudentExamResults} from "./pages/studentPages/StudentExamResults";
import {PgHeadExamResults} from "./pages/pgHeadPages/PgHeadExamResults";
import {DepHeadExamResults} from "./pages/departmentHeadPages/DepHeadExamResults";

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
                    <Route path="/student/speciality" exact>
                        <StudentChooseSpeciality/>
                    </Route>
                    <Route path="/student/researchwork" exact>
                        <StudentResearchWork/>
                    </Route>
                    <Route path="/student/exams" exact>
                        <StudentExams/>
                    </Route>
                    <Route path="/student/exam/results" exact>
                        <StudentExamResults/>
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
                    <Route path="/mentor/students" exact>
                        <MentorsStudents/>
                    </Route>
                    <Route path="/mentor/confirm" exact>
                        <MentorMentoring/>
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
                    <Route path="/dephead/speciality/add" exact>
                        <DepHeadAddSpeciality/>
                    </Route>
                    <Route path="/dephead/examresults" exact>
                        <DepHeadExamResults/>
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
                    <Route path="/pghead/exam/add" exact>
                        <PgHeadAddExam/>
                    </Route>
                    <Route path="/pghead/students" exact>
                        <PgHeadShowStudents/>
                    </Route>
                    <Route path="/pghead/students/examresults" exact>
                        <PgHeadExamResults/>
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