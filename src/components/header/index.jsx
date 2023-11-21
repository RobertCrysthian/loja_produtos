import { Outlet } from 'react-router-dom'
import './header.css'
import { AiOutlineHome} from 'react-icons/ai'
import { AiOutlineMenu} from 'react-icons/ai'
import { BsPersonFill} from 'react-icons/bs'
import { useContext } from 'react'
import { MenuContext } from '../../context/menuButton'



export default function Header () {

    const {buttonMenu, setButtonMenu, profileButton, setProfileButton} = useContext(MenuContext)

    return(
        <>
        <div className="div_header">
        <AiOutlineMenu className="icon_header" onClick={() => {setButtonMenu(!buttonMenu)}}/>
        <AiOutlineHome className="icon_header"/>
        <BsPersonFill className="icon_header" onClick={() => {setProfileButton(!profileButton)}}/>
        </div>
        <Outlet/>
        </>
    )
}