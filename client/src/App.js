import React from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Loader} from "./components/Loader";

function App() {
    const {token, login, logout, userId, ready, userStatus} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, userStatus)

    if(!ready){
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, userStatus}}>
            <Router>
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
