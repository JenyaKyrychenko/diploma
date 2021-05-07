import React,{useState, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";


export const LoadResearchWork = () => {
    const {userId} = useContext(AuthContext)
    const [text, setText] = useState()
    const {request} = useHttp()
    const message = useMessage()

    const changeHandler = (event) =>{
        setText(event.target.value)
    }

    const loadWork = async () =>{
        if(!text){
            alert('Введіть текст!')
            return
        }
        try {
            const res = await request(`/api/researchwork/user/${userId}/add`,'POST',{text})
            message(res)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container-fluid researchWorkContainer">
            <label htmlFor="validationCustom04" className="form-label">Введіть свою дослідницьку пропозицію</label>
            <div className="form-floating">
                <textarea onChange={changeHandler} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label htmlFor="floatingTextarea">Дослідницька пропозиція</label>
            </div>
                <button onClick={loadWork} type='submit' className="btn btn-success btn-icon-split buttonResearchWork">
                    <span className="text">Завантажити</span>
                </button>
        </div>
    )
}