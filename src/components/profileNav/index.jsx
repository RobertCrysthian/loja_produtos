import { useContext, useEffect, useState } from 'react'
import './profileNav.css'
import { MenuContext } from '../../context/menuButton'
import { CpfContext } from '../../context/cpfs'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import axios from 'axios'

export default function ProfileNav () {

    const {profileButton} = useContext(MenuContext)
    const {sessionCPF, sessionName, sessionPfp, sessionRole, sessionId} = useContext(CpfContext)
    console.log(sessionPfp)
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [nameInput, setNameInput] = useState(sessionName !== undefined && sessionName)
    const [linkInput, setLinkInput] = useState(sessionPfp !== undefined && sessionPfp)

     useEffect(() => {
       if(sessionCPF === null || sessionCPF === undefined){
         navigate('/login')
       }
     }, [])


    const changeData = () => {
        axios.put(`http://localhost:8080/profiles/${sessionId !== undefined && sessionId}`, {
            CPF: sessionCPF,
            name: nameInput,
            pfp: linkInput,
            role: sessionRole
        })
        sessionStorage.setItem('sessionName', nameInput)
        sessionStorage.setItem('sessionPfp', linkInput)
        alert('Dados alterados com sucesso.')
        window.location.reload()
    }

    const logOff = () => {
        sessionStorage.clear()
        navigate('/login')
    }


    return(
        <nav className={`profile_nav_menu ${profileButton? 'profile_nav_active' : ''} `}>
            <div className='div_profile_nav'>
                <h1>Nome: {sessionName !== undefined && sessionName}</h1>
                <h1>CPF:{sessionCPF !== undefined && sessionCPF}</h1>
                <img className={`${profileButton? '' : 'hide_image'} `} src={sessionPfp !== undefined && sessionPfp} alt='imagem de perfil' />
            </div>
            <div className='button_logoff_div'>
                    <button onClick={() => setOpenModal(!openModal)}>Editar Perfil</button>
                <button onClick={() => logOff()}>Deslogar</button>
            </div>

        <Modal title="Editar perfil: " isOpen={openModal} closeModal={() => setOpenModal(!openModal)}>
            <div className="section_modal_profile">
                <h1>Nome:</h1>
                <input value={nameInput} onChange={(e) => {setNameInput(e.target.value)}}/>
                <h1>Link da foto de perfil:</h1>
                <input value={linkInput} onChange={(e) => setLinkInput(e.target.value)}/>
                <h1>Foto:</h1>
                <img src={sessionPfp !== undefined && sessionPfp} />
                <button onClick={() => changeData()}>Enviar</button>
            </div>

        </Modal>
        </nav>
    )
}