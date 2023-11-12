import './initial.css'
import { useContext, useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import MenuNav from '../../components/menuNav'
import axios from 'axios';
import CardProduct from '../../components/cardProduct';
import img from '../../assets/images/images.png'
import { CardContext } from '../../context/cardItens';
import { CpfContext } from '../../context/cpfs';
import { useNavigate } from 'react-router-dom';
import ProfileNav from '../../components/profileNav';
import { MenuContext } from '../../context/menuButton';
import { decrement, increment } from '../../functions/changePages';




export default function InitialPage() {
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState([])

  const {cardList, setCardList} = useContext(CardContext)
  const {subTotal, setSubTotal} = useContext(CardContext)
  const {cpfUser} = useContext(CpfContext);

  const navigate = useNavigate()
  useEffect(() => {
    if(cpfUser.length === 0 || cpfUser === undefined){
      navigate('/login')
    }
  })

  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then(response => setProductData(response.data))
  }, [])


  const addToCard = (item) => {
    const test = cardList.filter((element) => {
      return element.id === item.id
    })

    if(test.length === 0){
      const array = [item, ...cardList]
      setCardList(array)
      console.log(console.log(test))

      setSubTotal(subTotal+item.price)
    }
  }

  const removeItem = (item) => {
    const filter = sortCardList.filter((e) => { return e.id !== item.id})
    setCardList([...filter])

    const removeItem = sortCardList.find((e) => {return e.id === item.id})
    if(removeItem !== undefined){
      setSubTotal(subTotal - item.price)
    }

  }


  //footer
  const [minItens, setMinItens] = useState(0)
  const [maxItens, setMaxItens] = useState(7)
  const [incrementator, setIncrementator] = useState(8)
  const [pageNumber, setPageNumber] = useState(1)

  //modal
  const [minItensModal, setMinItensModal] = useState(0)
  const [maxItensModal, setMaxItensModal] = useState(7)
  const [incrementatorModal, setIncrementatorModal] = useState(8)
  const [pageNumberModal, setPageNumberModal] = useState(1)


  const sortCardList = cardList.sort((a,b) => {
    return b - a
  })

  return (
    <section className="initial_div">
      <MenuNav activeModal={() => setOpenModal(!openModal)} />
      <ProfileNav/>
      
      <div className='title_store'>
        <h1>Loja de produtos</h1>
      </div>
      <div className="div_products">
        {productData.map((item, index) => {
            while(index >= minItens && index <= maxItens) {
              return (
                <CardProduct key={index} productName={item.name} price={item.price} card={() => addToCard(item)} removeItem={() => removeItem(item)} stock={item.stock}/>
              )
            }
        })}
      </div>
      <div className="footer_pages">
        <button onClick={() => decrement(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, incrementator)}>{`<<`}</button>
        <h1>{pageNumber}</h1>
        <button onClick={() => increment(setMinItens, minItens, setMaxItens, maxItens, setPageNumber, pageNumber, productData, incrementator)}>{`>>`}</button>
      </div>
      <Modal title="Meus itens do carrinho:" isOpen={openModal} closeModal={() => setOpenModal(!openModal)} cardList={cardList} description={`Subtotal: R$${subTotal.toFixed(2)}`}>
        {sortCardList.map((item, index) => {
          while(index >= minItensModal && index <= maxItensModal) {
            return (
              <div className='itens_card_div'>
                <CardProduct key={index} productName={item.name} price={item.price} hiddenButton={true} />
                <button className='button_card_list' onClick={() => removeItem(item)}>Remover</button>
              </div>
            )
          }

        })}
        <div className="footer_pages modal">
          <button onClick={() => decrement(setMinItensModal, minItensModal, setMaxItensModal, maxItensModal, setPageNumberModal, pageNumberModal, incrementatorModal)}>{`<<`}</button>
          <h1>{pageNumberModal}</h1>
          <button onClick={() => increment(setMinItensModal, minItensModal, setMaxItensModal, maxItensModal, setPageNumberModal, pageNumberModal, sortCardList, incrementatorModal)}>{`>>`}</button>
        </div>
      </Modal>

    </section>
  )
}