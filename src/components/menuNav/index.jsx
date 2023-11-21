import { useContext, useState } from 'react'
import './menuNav.css'
import { BsCart3} from 'react-icons/bs'
import { MenuContext } from '../../context/menuButton'
import { AiOutlineHome } from 'react-icons/ai'
import { CpfContext } from '../../context/cpfs'
import Modal from '../Modal'
import { Link } from 'react-router-dom'

export default function MenuNav ({activeModal}) {

    const {sessionRole} = useContext(CpfContext)
    const {buttonMenu} = useContext(MenuContext)

    return(
        <nav className={`lateral_menu ${buttonMenu? 'lateral_menu_active' : ''}`}>
            <ul>
                <li className="menu_item">
                    <a href='#' onClick={activeModal}>
                        <span className='icon_lateral_menu'><BsCart3/></span>
                        <span className='txt_link'>Carrinho</span>
                    </a>
                </li>
                <li className="menu_item">
                    <a href='#'>
                        <span className='icon_lateral_menu'><AiOutlineHome/></span>
                        <span className='txt_link'>Home</span>
                    </a>
                </li>
                {sessionRole !== undefined && sessionRole === "Admin" &&                
                    <li className="menu_item">
                        <Link to='/editItens'>
                            <span className='icon_lateral_menu'><AiOutlineHome/></span>
                            <span className='txt_link'>Administração</span>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
}