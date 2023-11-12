import { useContext, useEffect, useState } from 'react'
import './editItens.css'
import axios from 'axios'
import { decrement, increment } from '../../functions/changePages'
import { deleteItem } from '../../functions/functionsApi'
import Modal from '../../components/Modal'
import InputMD from '../../components/inputMd'
import ButtonMd from '../../components/buttonMd'
import { useNavigate } from 'react-router-dom'
import { CpfContext } from '../../context/cpfs'



export default function EditItens() {

    const [openModal, setOpenModal] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)

    const [apiData, setApiData] = useState()

    const [minItens, setMinItens] = useState(0)
    const [maxItens, setMaxItens] = useState(9)
    const [incrementator, setIncrementator] = useState(8)
    const [pageNumber, setPageNumber] = useState(1)

    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editStock, setEditStock] = useState('')
    const [dataEdit, setDataEdit] = useState('')

    const [newName, setNewName] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newStock, setNewStock] = useState('')
    const [itemId, setItemId] = useState('')

    const {cpfUser} = useContext(CpfContext)

    const navigate = useNavigate()
    useEffect(() => {
        if(cpfUser.length === 0 || cpfUser === undefined){
            navigate('/login')
        }
        else if(cpfUser !== undefined && cpfUser[0].role !== 'Admin'){
            navigate('/login')
        }
    })

    const editItens = (item) => {
        setOpenModal(!openModal)
        setEditName(item.name)
        setEditPrice(item.price)
        setEditStock(item.stock)
        setItemId(item.id)
    }

    const createNewProduct = () => {
        const formatPrice = parseInt(newPrice)
        const formatStock = parseInt(newStock)

        axios.post('http://localhost:8080/posts', {
            name: newName,
            price: formatPrice,
            stock: formatStock
        })
    }

    const submitEdit = () => {
        const formatPrice = parseInt(editPrice)
        const formatStock = parseInt(editStock)

        axios.put(`http://localhost:8080/posts/${itemId}`, {
            name: editName,
            price: formatPrice,
            stock: formatStock
        })
        alert('Item alterado com sucesso')
    }

    useEffect(() => {
    axios.get('http://localhost:8080/posts')
        .then(response => setApiData(response.data))
    },[])
    console.log(dataEdit)
    return(
        <section className='section_edit_itens'>

            <div className='div_edit_itens'>
                <h1 className='edit_itens_title'>Formulário para alteração de produtos</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Preço</td>
                            <td>Quantidade</td>
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
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td><button onClick={() => editItens(item)} className='button_edit_itens'>Editar</button></td>
                                        <td><button className='button_edit_itens delete' onClick={() => deleteItem('posts', item.id, apiData, setApiData)}>Excluir</button></td>
                                    </tr>
                                )
                            }
                            })}
                    </tbody>
                </table>
                <ButtonMd onClick={() => setOpenModal2(!openModal2)}>Criar novo produto</ButtonMd>
                <div className="footer_pages position_fix">
                    <button onClick={() => decrement(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, incrementator)}>{`<<`}</button>
                    <h1>{pageNumber}</h1>
                    <button onClick={() => increment(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, apiData, incrementator)}>{`>>`}</button>
                </div>
            </div>

            {/*  Form de edição  */}
            <Modal title='Editar item:' isOpen={openModal} closeModal={() => setOpenModal(!openModal)}>
                <div className='div_edit_itens_modal'>
                    <h1>Nome</h1>
                    <InputMD value={editName} onChange={e => setEditName(e.target.value)}/>
                    <h1>Preço</h1>
                    <InputMD value={editPrice} onChange={e => setEditPrice(e.target.value)}/>
                    <h1>Quantidade</h1>
                    <InputMD value={editStock} onChange={e => setEditStock(e.target.value)}/>
                    <ButtonMd onClick={() => submitEdit()}>Editar</ButtonMd>
                </div>
            </Modal>

            {/* Form de criação */}
            <Modal title='Criar novo produto' isOpen={openModal2} closeModal={() => setOpenModal2(!openModal2)}>
                <div className='div_edit_itens_modal'>
                    <h1>Nome</h1>
                    <InputMD value={newName} onChange={e => setNewName(e.target.value)}/>
                    <h1>Preço</h1>
                    <InputMD value={newPrice} onChange={e => setNewPrice(e.target.value)}/>
                    <h1>Quantidade</h1>
                    <InputMD value={newStock} onChange={e => setNewStock(e.target.value)}/>
                    <ButtonMd onClick={()=> createNewProduct()}>Enviar</ButtonMd>
                </div>
            </Modal>
        </section>
    )
}