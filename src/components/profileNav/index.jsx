import { useContext, useEffect, useState } from 'react'
import './profileNav.css'
import { MenuContext } from '../../context/menuButton'
import { CpfContext } from '../../context/cpfs'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import axios from 'axios'

export default function ProfileNav ({activeModal2}) {

    const {profileButton} = useContext(MenuContext)
    const {cpfUser, setCpfUser} = useContext(CpfContext)
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [nameInput, setNameInput] = useState(cpfUser[0] !== undefined && cpfUser[0].name)
    const [linkInput, setLinkInput] = useState(cpfUser[0] !== undefined && cpfUser[0].pfp)

    useEffect(() => {
      if(cpfUser.length === 0 || cpfUser === undefined){
        navigate('/login')
      }
    }, [])


    const changeData = () => {
        axios.put(`http://localhost:8080/profiles/${cpfUser[0] !== undefined && cpfUser[0].id}`, {
            CPF: cpfUser[0].CPF,
            name: nameInput,
            pfp: linkInput,
            role: cpfUser[0].role
        })
        alert('Dados alterados com sucesso. Logue novamente para seus dados aparecem de forma atualizada')
        logOff()
    }

    const logOff = () => {
        setCpfUser(undefined)
        navigate('/login')
    }

    console.log(cpfUser)
    return(
        <nav className={`profile_nav_menu ${profileButton? 'profile_nav_active' : ''} `}>
            <div className='div_profile_nav'>
                <h1>Nome: {cpfUser[0] !== undefined && cpfUser[0].name}</h1>
                <h1>CPF:{cpfUser[0] !== undefined && cpfUser[0].CPF}</h1>
                <img className={`${profileButton? '' : 'hide_image'} `} src={cpfUser[0] !== undefined && cpfUser[0].pfp} alt='imagem de perfil' />
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
                <img src={cpfUser[0] !== undefined && cpfUser[0].pfp} />
                <button onClick={() => changeData()}>Enviar</button>
            </div>

        </Modal>
        </nav>
    )
}