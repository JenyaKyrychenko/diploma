import React, {useContext, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {useMessage} from "../../hooks/message.hook";

const CreateStatement = ({specialities}) => {
    const {request} = useHttp()
    const {userId} = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        formOfEducation: '',
        competitiveOffer: '',
        speciality: '',
        educationProgram: '',
        educationDegree: '',
        contract: '-',
        budget: '-',
        wasStudied: '',
        wasGraduated: '',
        language: '',
        specialConditions: '',
        gpa: '',
        hostel: '',
        gender: '',
        nationality: '',
        birthday: '',
        placeOfBirth: '',
        street: '',
        house: '',
        flatNumber: '',
        city: '',
        district: '',
        region: '',
        index: '',
        phoneNumber: '',
        email: '',
        address: '',
        additionalInfo: '',
    })

    const changeFormElement = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const changeCheckForm = (event) => {
        if (event.target.checked) {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        } else {
            setForm({
                ...form,
                [event.target.name]: '-'
            })
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()

        // Все ли поля заполнены
        for(var key in form){
            if(!form[key]){
                message(`Форма ${key} не заповнена!`)
                return
            }
        }
        try {
            const res = await request(`/api/declaration/user/${userId}/add`, 'POST',
                {
                    ...form
                })
            message(res.message)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container-fluid declarationContainer marginBottom">
            <h2>Формування заяви для вступу в аспірантуру</h2>
            <hr/>
            <form onSubmit={submitForm}>

                {/*Прізвище*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Прізвище:</label>
                    <input onChange={changeFormElement} name='lastName' value={form.lastName} type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.lastName}</p>
                </div>

                {/*Ім'я*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Ім'я:</label>
                    <input onChange={changeFormElement} name='firstName' value={form.firstName} type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.firstName}</p>
                </div>

                {/*По-батькові*/}

                <div className="mb-3">
                    <label className="font-weight-bold">По-батькові:</label>
                    <input onChange={changeFormElement} name='patronymic' value={form.patronymic} type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.patronymic}</p>
                </div>

                {/*Форма навчання*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Форма здобуття освіти:</label>
                    <select onChange={changeFormElement} value={form.formOfEducation} name='formOfEducation'
                            className='form-select'>
                        <option value=''>Форма здобуття освіти</option>
                        <option>денна</option>
                        <option>заочна</option>
                        <option>вечірня</option>
                    </select>
                    <p className='red-color'>{form.formOfEducation}</p>
                </div>

                {/*Конкурсна пропозиція*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Конкурсна пропозиція:</label>
                    <input onChange={changeFormElement} name='competitiveOffer' value={form.competitiveOffer}
                           type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.competitiveOffer}</p>
                </div>

                {/*Спеціальність*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Спеціальність:</label>
                    <select onChange={changeFormElement} value={form.speciality} name='speciality'
                            className='form-select'>
                        <option value=''>Спеціальність</option>
                        {specialities ? specialities.map(spec => {
                            return <option key={spec.id}
                                           value={`${spec.specialityCode} - ${spec.specialityName}`}>{spec.specialityCode}</option>
                        }) : ''}
                    </select>
                    <p className='red-color'>{form.speciality}</p>
                </div>

                {/*Назва освітньої програми*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Назва освітньої програми:</label>
                    <input onChange={changeFormElement} name='educationProgram' value={form.educationProgram}
                           type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.educationProgram}</p>
                </div>

                {/*Назва освітнього / освітньо-кваліфікаційного рівня / ступеня*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Назва освітнього / освітньо-кваліфікаційного рівня / ступеня:</label>
                    <input onChange={changeFormElement} name='educationDegree' value={form.educationDegree} type="text"
                           className={`form-control`}/>
                    <p className='red-color'>{form.educationDegree}</p>
                </div>

                {/*Бюджет / Контракт*/}

                <div className="form-check">
                    <input onChange={changeCheckForm} name='contract' className="form-check-input" type="checkbox"
                          value="+"/>
                    <label className="form-check-label">
                        Претендую на участь у конкурсі виключно на місця за кошти фізичних та/або юридичних осіб,
                        повідомлений про неможливість переведення в межах вступної кампанії на місця державного або
                        регіонального замовлення
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='budget' className="form-check-input" type="checkbox"
                           value="+"/>
                    <label className="form-check-label">
                        Претендую на участь у конкурсі на місце державного або регіонального замовлення і на участь у
                        конкурсі на місця за кошти фізичних та/або юридичних осіб у разі неотримання рекомендації за
                        цією конкурсною пропозицією за кошти державного або місцевого бюджету (за державним або
                        регіональним замовленням).
                    </label>
                </div>

                <hr/>
                {/*Вже вчився або ні*/}

                <label className="font-weight-bold">
                    Відповідний ступінь вищої освіти за бюджетні кошти:
                </label>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='wasStudied' className="form-check-input" type="radio"
                           value='ніколи не здобувався'/>
                    <label className="form-check-label">
                        ніколи не здобувався
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='wasStudied' className="form-check-input" type="radio"
                           value='вже здобутий раніше'/>
                    <label className="form-check-label">
                        Вже здобутий раніше
                    </label>
                </div>
                <div className="form-check marginBottom20">
                    <input onChange={changeCheckForm} name='wasStudied' className="form-check-input" type="radio"
                           value='вже здобувався раніше (навчання не завершено)'/>
                    <label className="form-check-label">
                        Вже здобувався раніше (навчання не завершено)
                    </label>
                </div>

                {/*Закінчив ВУЗ*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Закінчив(ла):</label>
                    <input onChange={changeFormElement} name='wasGraduated' value={form.wasGraduated}
                           type="text"
                           className={`form-control`}/>
                    <p className='small'>(повне найменування закладу освіти, рік закінчення, назва спеціальності,
                        спеціалізації, освітньої програми)</p>
                </div>

                {/*Мова*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Іноземна мова, яку вивчав(ла):</label>
                    <input onChange={changeFormElement} name='language' value={form.language}
                           type="text"
                           className={`form-control`}/>
                </div>

                {/*Спеціальні умови*/}

                <label className="font-weight-bold">
                    Спеціальними умовами щодо участі у конкурсному відборі під час вступу для здобуття вищої освіти:
                </label>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='specialConditions' className="form-check-input" type="radio"
                           value='користуюсь'/>
                    <label className="form-check-label">
                        користуюсь
                    </label>
                </div>
                <div className="form-check marginBottom20">
                    <input onChange={changeCheckForm} name='specialConditions' className="form-check-input" type="radio"
                           value='не користуюсь'/>
                    <label className="form-check-label">
                        не користуюсь
                    </label>
                </div>

                {/*Середній бал*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Середній бал додатку до документа про раніше здобуту освіту:</label>
                    <input onChange={changeFormElement} name='gpa' value={form.gpa}
                           type="number"
                           className={`form-control`}/>
                </div>

                {/*Гуртожиток*/}

                <label className="font-weight-bold">
                    На час навчання поселення в гуртожиток:
                </label>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='hostel' className="form-check-input" type="radio"
                           value='потребую'/>
                    <label className="form-check-label">
                        потребую
                    </label>
                </div>
                <div className="form-check marginBottom20">
                    <input onChange={changeCheckForm} name='hostel' className="form-check-input" type="radio"
                           value='не потребую'/>
                    <label className="form-check-label">
                        не потребую
                    </label>
                </div>

                {/*Гуртожиток*/}

                <label className="font-weight-bold">
                    Стать:
                </label>
                <div className="form-check">
                    <input onChange={changeCheckForm} name='gender' className="form-check-input" type="radio"
                           value='чоловіча'/>
                    <label className="form-check-label">
                        чоловіча
                    </label>
                </div>
                <div className="form-check marginBottom20">
                    <input onChange={changeCheckForm} name='gender' className="form-check-input" type="radio"
                           value='жіноча'/>
                    <label className="form-check-label">
                        жіноча
                    </label>
                </div>

                {/*Громадянство*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Громадянство:</label>
                    <input onChange={changeFormElement} name='nationality' value={form.nationality}
                           type="text"
                           className={`form-control`}/>
                </div>

                {/*Дата народження*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Дата народження:</label>
                    <input onChange={changeFormElement} name='birthday' value={form.birthday}
                           type="date"
                           className={`form-control`}/>
                </div>

                {/*Місце народження*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Місце народження:</label>
                    <input onChange={changeFormElement} name='placeOfBirth' value={form.placeOfBirth}
                           type="text"
                           className={`form-control`}/>
                </div>

                {/*Місце проживання*/}

                <label className="font-weight-bold">
                    Місце проживання:
                </label>
                <div className="mb-3">
                    <label>вулиця:</label>
                    <input onChange={changeFormElement} name='street' value={form.street}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>будинок:</label>
                    <input onChange={changeFormElement} name='house' value={form.house}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>квартира:</label>
                    <input onChange={changeFormElement} name='flatNumber' value={form.flatNumber}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>місто/селище/село:</label>
                    <input onChange={changeFormElement} name='city' value={form.city}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>район:</label>
                    <input onChange={changeFormElement} name='district' value={form.district}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>область:</label>
                    <input onChange={changeFormElement} name='region' value={form.region}
                           type="text"
                           className={`form-control`}/>
                </div>
                <div className="mb-3">
                    <label>індекс:</label>
                    <input onChange={changeFormElement} name='index' value={form.index}
                           type="number"
                           className={`form-control`}/>
                </div>

                {/*Номер телефону*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Номер телефону:</label>
                    <input onChange={changeFormElement} name='phoneNumber' value={form.phoneNumber}
                           type="number"
                           className={`form-control`}/>
                </div>

                {/*Email*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Електронна пошта:</label>
                    <input onChange={changeFormElement} name='email' value={form.email}
                           type="text"
                           className={`form-control`}/>
                </div>

                {/*Додаткова інформація*/}

                <div className="mb-3">
                    <label className="font-weight-bold">Додаткова інформація:</label>
                    <input onChange={changeFormElement} name='additionalInfo' value={form.additionalInfo}
                           type="text"
                           className={`form-control`}/>
                </div>

                <button type="submit" className="btn btn-primary buttonSubmit">Відправити</button>
            </form>
        </div>
    )
}

export default CreateStatement