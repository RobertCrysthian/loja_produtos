import { useContext, useEffect, useState } from 'react'
import './Login.css'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom';
import { CpfContext } from '../../context/cpfs';
import axios from 'axios';


export default function Login() {

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const {cpfUser, setCpfUser} = useContext(CpfContext);
    const [cpfList, setCpfList] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/profiles')
        .then(response => setCpfList(response.data))
    },[])

    const login = (event) => {
        event.preventDefault()

        const validate = cpfList.filter((e) => {return e.CPF === inputValue})
        if(validate.length > 0) {
            setCpfUser(validate)
            sessionStorage.setItem('sessionCPF', validate[0].CPF)
            sessionStorage.setItem('sessionName', validate[0].name)
            sessionStorage.setItem('sessionRole', validate[0].role)
            sessionStorage.setItem('sessionPfp', validate[0].pfp)
            sessionStorage.setItem('sessionId', validate[0].id)
            navigate('/')
        }
    }

    return(
        <section className='section_login'>
            <form className='form_login' onSubmit={login}>
                <h1>Informe o CPF para logar</h1>
                <InputMask mask="999.999.999-99" placeholder='000.000.000-00' value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <button>Entrar</button>
            </form>
        </section>
    )
}