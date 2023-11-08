import './cardProduct.css';
import img from '../../assets/images/images.png'
import {BsCart3, BsFillCartFill} from 'react-icons/bs'
import { useContext, useState } from 'react';
import { MenuContext } from '../../context/menuButton';

export default function CardProduct ({productName, price, stock, card, hiddenButton, removeItem}) {
    const [activeCartButton, setActiveCartButton] = useState(false)
    const decimalPrice = price.toFixed(2)

    const changeCartButton = () => {
        setActiveCartButton(!activeCartButton)
    }

    const conectFunctions = (function1, function2, function3, activator) => {
        function1();

        if(activator){
            function3()
        } else {
            function2()
        }
    }

    return(
        <section >
            <div className='section_card_product'>
                <h1>{productName}</h1>
                <img src={img}/>
                <p>R${decimalPrice}</p>
                <p>Itens disponíveis: {stock}</p>
                <div className='div_button'>
                    <button className={`button ${hiddenButton? 'hidden' : ''}`}>Comprar</button>
                    <button className={`button ${hiddenButton? 'hidden' : ''}`} onClick={() => conectFunctions(changeCartButton, card, removeItem, activeCartButton )} >{activeCartButton? <BsFillCartFill/> : <BsCart3/> }</button>
                </div>
            </div>
        </section>
    )
}


