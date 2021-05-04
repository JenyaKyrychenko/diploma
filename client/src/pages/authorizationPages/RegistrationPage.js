import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const RegistrationPage = () =>{
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        repeatPassword:''
    })

    useEffect(()=>{
        message(error)
        clearError()
    },[error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registrationHandler = async () => {
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            message(data.message)
        }catch (e) {

        }
    }

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleFirstName"
                                                   placeholder="First Name" name='firstName' onChange={changeHandler}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleLastName"
                                                   placeholder="Last Name" name='lastName' onChange={changeHandler}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user"
                                               id="exampleInputEmail"
                                               placeholder="Email Address" name='email' onChange={changeHandler}/>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleInputPassword" placeholder="Password" name='password' onChange={changeHandler}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleRepeatPassword" placeholder="Repeat Password" name='repeatPassword' onChange={changeHandler}/>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-user btn-block" onClick={registrationHandler} disabled={loading}>
                                        Register Account
                                    </button>
                                </form>
                                <hr/>
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to='/'>Already have an account? Login!</NavLink>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}