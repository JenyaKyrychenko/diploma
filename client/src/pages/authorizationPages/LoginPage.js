import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        message(error)
        clearError()
    },[error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.status)
        }catch (e) {
            console.log('Login Error')
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Вступ до аспірантури</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                       id="email" placeholder="Введіть свій email..." name='email' value={form.email} onChange={changeHandler}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                       id="password" placeholder="Пароль" name='password' value={form.password} onChange={changeHandler}/>
                                            </div>
                                            <button className="btn btn-primary btn-user btn-block" onClick={loginHandler} disabled={loading}>
                                                Вхід
                                            </button>
                                        </form>
                                        <hr/>
                                        {/*<div className="text-center">*/}
                                            {/*<NavLink className="small" to='#'>Forgot Password?</NavLink>*/}
                                        {/*</div>*/}
                                        <div className="text-center">
                                            <NavLink className="small" to='/registration' >Зареєструвати аккаунт</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}