import React, {useState, useEffect} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {Loader} from "../Loader";

export const RegisterAsMentor = ({specialitys, userData}) => {
    const message = useMessage()
    const {request} = useHttp()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [scienceTitle, setScienceTitle] = useState('')
    const [chosenSpecialitys, setChosenSpecialitys] = useState([])

    const [formErrors, setFormErrors] = useState({name:'', surname:'', scienceTitle:''})

    const changeName = (event) => {
        setName(event.target.value)
    }

    const changeSurname = (event) => {
        setSurname(event.target.value)
    }

    const changeScienceTitle = (event) => {
        setScienceTitle(event.target.value)
    }

    const changeSpeciality = (event) => {
        if (!event.target.checked) {
            for (let i in chosenSpecialitys) {
                if (chosenSpecialitys[i] === event.target.value) {
                    delete chosenSpecialitys[i]
                    const filteredArr = chosenSpecialitys.filter(() => {
                        return true
                    })
                    setChosenSpecialitys(filteredArr)
                    return
                }
            }
        }
        const arr = chosenSpecialitys
        arr.push(event.target.value)
        setChosenSpecialitys(arr)
    }

    const validateField = () => {
        let nameValid = name.length < 25 && name.match("[А-ЯA-ZЇІ][А-Яа-яA-Za-z' -іїІЇ]");
        formErrors.name = nameValid ? '' : "Ім'я повинно починатися з великої букви![2-25]";

        let surnameValid = surname.length < 25 && surname.match("[А-ЯA-ZІЇ][А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.surname = surnameValid ? '' : "Прізвище повинно починатися з великої букви![2-25]";

        let scienceTitleValid = scienceTitle.length < 40 && scienceTitle.length >= 5 && scienceTitle.match("[А-Яа-яA-Za-z' -іїІЇ]+");
        formErrors.scienceTitle = scienceTitleValid ? '' : " [5;40] символів(Научне звання)";

        setFormErrors(formErrors)
    }

    useEffect(() => {
        validateField()
    })

    const registerAsMentor = async (event) => {
        event.preventDefault()
        for (let e in formErrors) {
            if (formErrors[e]) {
                alert(formErrors[e])
                return
            }
        }
        try {
            const res = await request('/api/mentor/create','POST',{name, surname, scienceTitle, email: userData.email})
            if(res.exists){
                message(res.message)
                return
            }
            for(let i in chosenSpecialitys){
                await request(`/api/speciality/${chosenSpecialitys[i]}/mentor/add`,'POST',{email:userData.email})
            }
            message(res)
        }catch (e) {
            console.log(e)
        }

    }

    if (!specialitys) {
        return <Loader/>
    }

    return (
        <div className="container-fluid declarationContainer">
            <h2>Реєстрація научним керівником</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Ім'я:</label>
                    <input onChange={changeName} value={name} type="text" className={`form-control ${formErrors.name ? 'has-error' : 'validated'}`} id="exampleInputName"
                           aria-describedby="nameHelp"/>
                    <p className='red-color'>{formErrors.name}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputSurname" className="form-label">Прізвище:</label>
                    <input onChange={changeSurname} value={surname} type="text" className={`form-control ${formErrors.surname ? 'has-error' : 'validated'}`}
                           id="exampleInputSurname"/>
                    <p className='red-color'>{formErrors.surname}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputScienceTitle" className="form-label">Наукове звання:</label>
                    <input onChange={changeScienceTitle} value={scienceTitle} type="text" className={`form-control ${formErrors.scienceTitle ? 'has-error' : 'validated'}`}
                           id="exampleInputScienceTitle"/>
                    <p className='red-color'>{formErrors.name}</p>
                </div>

                <label htmlFor="exampleInputScienceTitle" className="form-label">Оберіть спеціальності:</label>
                <div className="checkbox">
                    {specialitys.map((s, index) => {
                        return (
                            <div className="form-check form-switch" key={index}>
                                <input onChange={changeSpeciality} value={s.specialityCode} className="form-check-input"
                                       type="checkbox" id="flexSwitchCheckDefault"/>
                                <label className="form-check-label"
                                       htmlFor="flexSwitchCheckDefault">{s.specialityCode}</label>
                            </div>
                        )
                    })}
                </div>
                <div className='buttonConfirmPage'>
                    <button onClick={registerAsMentor} type="submit" className="btn btn-primary">Підтвердити</button>
                </div>

            </form>

        </div>

    )
}