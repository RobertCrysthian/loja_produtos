import { Link, Outlet } from 'react-router-dom'
import './header_adm.css'

export default function HeaderAdm () {
    return(
        <section>
            <div className='div_header_adm'>
                <Link to='/'>Voltar para home</Link>
                <Link to='/editItens'>Alterar produtos</Link>
                <Link to='/editUsers'>Alterar usuários</Link>
            </div>
            <Outlet/>
        </section>
    )
}