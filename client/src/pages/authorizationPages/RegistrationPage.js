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
                        <div className="col-lg-5 d-none d-lg-block my_bg_image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Реєстрація</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleFirstName"
                                                   placeholder="Ім'я" name='firstName' onChange={changeHandler}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"
                                                   id="exampleLastName"
                                                   placeholder="Прізвище" name='lastName' onChange={changeHandler}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user"
                                               id="exampleInputEmail"
                                               placeholder="Email" name='email' onChange={changeHandler}/>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleInputPassword" placeholder="Пароль" name='password' onChange={changeHandler}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                   id="exampleRepeatPassword" placeholder="Повторіть пароль" name='repeatPassword' onChange={changeHandler}/>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-user btn-block" onClick={registrationHandler} disabled={loading}>
                                        Зареєструватися
                                    </button>
                                </form>
                                <hr/>
                                    <div className="text-center">
                                        <NavLink className="small" to='/'>Вже маєте аккаунт? Ввійти!</NavLink>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}