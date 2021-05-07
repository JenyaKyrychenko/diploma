import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";

const CreateDeclaration = () => {
    const {request} = useHttp()
    const {userId} = useContext(AuthContext)
    const message = useMessage()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [nationality, setNationality] = useState('')
    const [birthday, setBirthday] = useState('')
    const [passport, setPassport] = useState('')
    const [gender, setGender] = useState('')
    const [school, setSchool] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [language, setLanguage] = useState('')
    const [formErrors, setFormErrors] = useState({
        name: '',
        surname: '',
        nationality: '',
        passport: '',
        address: '',
        phone: '',
        email: '',
        language: ''
    })

    const changeName = (event) => {
        setName(event.target.value)
    }
    const changeSurname = (event) => {
        setSurname(event.target.value)
    }
    const changeNationality = (event) => {
        setNationality(event.target.value)
    }
    const changeBirthday = (event) => {
        setBirthday(event.target.value)
    }
    const changePassport = (event) => {
        setPassport(event.target.value)
    }
    const changeGender = (event) => {
        setGender(event.target.value)
    }
    const changeSchool = (event) => {
        setSchool(event.target.value)
    }
    const changeAddress = (event) => {
        setAddress(event.target.value)
    }
    const changePhone = (event) => {
        setPhone(event.target.value)
    }
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    const changeLanguage = (event) => {
        setLanguage(event.target.value)
    }

    const validateField = () => {
        let nameValid = name.length < 25 && name.match("[А-ЯA-ZЇІ][А-Яа-яA-Za-z' -іїІЇ]");
        formErrors.name = nameValid ? '' : "Ім'я повинно бути введене з великої букви![2-25]";

        let surnameValid = surname.length < 25 && surname.match("[А-ЯA-ZІЇ][А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.surname = surnameValid ? '' : "Фамілія повинна бути введене з великої букви![2-25]";

        let nationalityValid = nationality.length < 30 && nationality.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.nationality = nationalityValid ? '' : "Максимальна довжина 30 символів(Громадянство)";

        let passportValid = passport.length < 20 && passport.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.passport = passportValid ? '' : "Максимальна довжина 20 символів(Паспорт)";

        let addressValid = address.length < 100 && address.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.address = addressValid ? '' : "Максимальна довжина 100 символів(Адреса)";

        let phoneValid = phone.length < 15 && phone.length > 4
        formErrors.phone = phoneValid ? '' : "Максимальна довжина 15 символів(Телефон)";

        let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Некоректний email';

        setFormErrors(formErrors)
    }

    useEffect(() => {
        validateField()
    })

    const loadDeclaration = async (e) => {
        e.preventDefault()
        for (e in formErrors) {
            if (formErrors[e]) {
                console.log(formErrors[e])
                return
            }
        }
        if(!birthday || !language && language !== 'Мова' || !school || !gender && gender !== 'Стать'){
            alert('Заповніть всі поля!')
            return
        }

        const res = await request(`/api/declaration/user/${userId}/add`, 'POST', {
            name, surname, nationality, passport, birthday, gender, school, address, phone, email, language
        })
        message(res)

    }

    if (!formErrors) {
        console.log('OK!')
    }


    return (
        <div className="container-fluid declarationContainer">
            <h2>Формування заяви для вступу в аспірантуру</h2>
            <hr/>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Ім'я:</label>
                    <input onChange={changeName} value={name} type="text"
                           className={`form-control ${formErrors.name ? 'has-error' : 'validated'}`}
                           id="exampleInputName" aria-describedby="nameHelp"/>
                    <p className='red-color'>{formErrors.name}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputSurname" className="form-label">Фамілія:</label>
                    <input onChange={changeSurname} value={surname} type="text"
                           className={`form-control ${formErrors.surname ? 'has-error' : 'validated'}`}
                           id="exampleInputSurname"/>
                    <p className='red-color'>{formErrors.surname}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputNationality" className="form-label">Громадянство:</label>
                    <input onChange={changeNationality} value={nationality} type="text"
                           className={`form-control ${formErrors.nationality ? 'has-error' : 'validated'}`}
                           id="exampleInputNationality"/>
                    <p className='red-color'>{formErrors.nationality}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputBirthday" className="form-label">Дата народження:</label>
                    <input onChange={changeBirthday} value={birthday} type="date" className={`form-control ${!birthday ? 'has-error':'validated'}`}
                           id="exampleInputBirthday"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassport" className="form-label">Номер паспорта:</label>
                    <input onChange={changePassport} value={passport} type="text"
                           className={`form-control ${formErrors.passport ? 'has-error' : 'validated'}`}
                           id="exampleInputPassport"/>
                    <p className='red-color'>{formErrors.passport}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassport" className="form-label">Стать:</label>
                    <select onChange={changeGender} value={gender} className='form-select' id="validationCustom04">
                        <option>Стать</option>
                        <option>Чоловіча</option>
                        <option>Жіноча</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputSchool" className="form-label">Дата закінчення школи:</label>
                    <input onChange={changeSchool} value={school} type="date" className={`form-control ${!school ? 'has-error':'validated'}`}
                           id="exampleInputSchool"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Повна поштова адреса:</label>
                    <input onChange={changeAddress} value={address} type="text"
                           className={`form-control ${formErrors.address ? 'has-error' : 'validated'}`}
                           id="exampleInputAddress"/>
                    <div id="emailAddress" className="form-text">Поштовий індекс, країна, місто, вулиця № кв, і так
                        далі
                    </div>
                    <p className='red-color'>{formErrors.address}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">Телефон:</label>
                    <input onChange={changePhone} value={phone} type="number"
                           className={`form-control ${formErrors.phone ? 'has-error' : 'validated'}`}
                           id="exampleInputPassword1"/>
                    <p className='red-color'>{formErrors.phone}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email:</label>
                    <input onChange={changeEmail} value={email} type="email"
                           className={`form-control ${formErrors.email ? 'has-error' : 'validated'}`}
                           id="exampleInputEmail"/>
                    <p className='red-color'>{formErrors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLanguage" className="form-label">Мова навчання:</label>
                    <select onChange={changeLanguage} value={language} className="form-select" id="validationCustom04">
                        <option>Мова</option>
                        <option>Українська</option>
                        <option>Російська</option>
                        <option>Англійська</option>
                    </select>
                </div>
                <button onClick={loadDeclaration} type="submit" className="btn btn-primary">Відправити</button>
            </form>
        </div>
    )
}

export default CreateDeclaration