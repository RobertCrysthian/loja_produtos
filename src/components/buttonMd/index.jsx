import './buttonMd.css'

export default function ButtonMd ({children, onClick}) {
    return(
        <>
            <button className='buttonMd' onClick={onClick}>{children}</button>
        </>
    )
}