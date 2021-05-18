import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {StudentCreateFormPage} from "./pages/studentPages/StudentCreateFormPage";
import {LoginPage} from "./pages/authorizationPages/LoginPage";
import {RegistrationPage} from "./pages/authorizationPages/RegistrationPage";
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
import {MentorChooseStudent} from "./pages/mentorPages/MentorChooseStudent";
import {PgHeadProfilePage} from "./pages/pgHeadPages/PgHeadProfilePage";
import {MentorProfilePage} from "./pages/mentorPages/MentorProfilePage";
import {DepHeadProfilePage} from "./pages/departmentHeadPages/DepHeadProfilePage";
import {DepHeadShowAllStudents} from "./pages/departmentHeadPages/DepHeadShowAllStudents";

export const useRoutes = (isAuthenticated, userStatus) => {
    if(isAuthenticated && userStatus){
        if(userStatus === 'student') { // postgraduate
            return (
                <Switch>
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
                    <Redirect to="/student/profile"/>
                </Switch>
            )
        }
        if(userStatus === 'mentor'){ // science mentor
            return (
                <Switch>
                    <Route path="/mentor/profile" exact>
                        <MentorProfilePage/>
                    </Route>
                    <Route path="/mentor/students" exact>
                        <MentorsStudents/>
                    </Route>
                    <Route path="/mentor/confirm" exact>
                        <MentorMentoring/>
                    </Route>
                    <Route path="/mentor/choosestudent" exact>
                        <MentorChooseStudent/>
                    </Route>
                    <Redirect to="/mentor/profile"/>
                </Switch>
            )
        }
        if(userStatus === 'dephead'){ // department head
            return (
                <Switch>
                    <Route path="/dephead/profile" exact>
                        <DepHeadProfilePage/>
                    </Route>
                    <Route path="/dephead/speciality/add" exact>
                        <DepHeadAddSpeciality/>
                    </Route>
                    <Route path="/dephead/examresults" exact>
                        <DepHeadExamResults/>
                    </Route>
                    <Route path="/dephead/students" exact>
                        <DepHeadShowAllStudents/>
                    </Route>
                    <Redirect to="/dephead/profile"/>
                </Switch>
            )
        }
        if(userStatus === 'pghead'){ // postgraduate head
            return (
                <Switch>
                    <Route path="/pghead/profile" exact>
                        <PgHeadProfilePage/>
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
                    <Redirect to="/pghead/profile"/>
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