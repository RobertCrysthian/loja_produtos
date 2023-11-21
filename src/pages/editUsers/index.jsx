import { useContext, useEffect, useState } from 'react'
import './editUsers.css'
import axios from 'axios'
import { decrement, increment } from '../../functions/changePages'
import { deleteItem } from '../../functions/functionsApi'
import Modal from '../../components/Modal'
import ButtonMd from '../../components/buttonMd'
import InputMD from '../../components/inputMd'
import { useNavigate } from 'react-router-dom'
import { CpfContext } from '../../context/cpfs'
import { verifyAdm } from '../../functions/verifications'

export default function EditUsers () {
    const [apiData, setApiData] = useState()
    const [openModal, setOpenModal] = useState(false)

    const [minItens, setMinItens] = useState(0)
    const [maxItens, setMaxItens] = useState(9)
    const [incrementator, setIncrementator] = useState(8)
    const [pageNumber, setPageNumber] = useState(1)

    const [editName, setEditName] = useState('')
    const [editCPF, setEditCPF] = useState('')
    const [editPfp, setEditPfp] = useState('')
    const [editRole, setEditRole] = useState('')
    const [itemId, setItemId] = useState('')
    const {sessionCPF, sessionRole} = useContext(CpfContext)

    const navigate = useNavigate()
    useEffect(() => {
        verifyAdm(sessionCPF, sessionRole, navigate)
    })

    useEffect(() => {
    axios.get('http://localhost:8080/profiles')
        .then(response => setApiData(response.data))
    },[])

    const editItens = (item) => {
        setOpenModal(!openModal)
        setEditName(item.name)
        setEditCPF(item.CPF)
        setEditPfp(item.pfp)
        setEditRole(item.role)

        setItemId(item.id)
    }

    const submitUser = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:8080/profiles/${itemId}`, {
            name: editName,
            CPF: editCPF,
            pfp: editPfp,
            role: editRole,
        })
        alert('Usuário alterado com sucesso')
    }

    return(
            <section className='section_edit_itens'>
    
                <div className='div_edit_itens'>
                    <h1 className='edit_itens_title'>Formulário para alteração de produtos</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>Nome</td>
                                <td>CPF</td>
                                <td>Foto</td>
                                <td>Cargo</td>
                                <td>Editar</td>
                                <td>Excluir</td>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData !== undefined && apiData.map((item, index) => {
                                while (index >= minItens && index <= maxItens) {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.CPF}</td>
                                            <td>Link</td>
                                            <td>{item.role}</td>
                                            <td><button onClick={() => editItens(item)} className='button_edit_itens'>Editar</button></td>
                                            <td><button className='button_edit_itens delete' onClick={() => deleteItem('profiles', item.id, apiData, setApiData)}>Excluir</button></td>
                                        </tr>
                                    )
                                }
                                })}
                        </tbody>
                    </table>
                    <div className="footer_pages position_fix">
                        <button onClick={() => decrement(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, incrementator)}>{`<<`}</button>
                        <h1>{pageNumber}</h1>
                        <button onClick={() => increment(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, apiData, incrementator)}>{`>>`}</button>
                    </div>
                </div>

                <Modal title='Criar novo usuário' isOpen={openModal} closeModal={() => setOpenModal(!openModal)}>
                <form className='div_edit_itens_modal' onSubmit={submitUser}>
                    <h1>Nome</h1>
                    <InputMD value={editName} onChange={e => setEditName(e.target.value)}/>
                    <h1>CPF</h1>
                    <InputMD value={editCPF} onChange={e => setEditCPF(e.target.value)}/>
                    <h1>Link da foto</h1>
                    <InputMD value={editPfp} onChange={e => setEditPfp(e.target.value)}/>
                    <h1>Cargo</h1>
                    <select name='' required onChange={e => setEditRole(e.target.value)}>
                        <option></option>
                        <option value={'User'}>Usuário</option>
                        <option value={'Admin'}>Administrador</option>
                    </select>
                    <ButtonMd >Enviar</ButtonMd>
                </form>
            </Modal>

            </section>
    )
}