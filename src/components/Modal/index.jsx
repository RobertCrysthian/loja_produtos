import {AiOutlineClose} from 'react-icons/ai'
import './Modal.css'

export default function Modal({isOpen, closeModal, children, title, description}) {
    if (isOpen) return (
        
        <div className="background_style">
            <div className="div_modal">
                <div className="div_icon">
                    <AiOutlineClose className="icon" onClick={closeModal}/>
                </div>
                <h2 className='title_modal'>{title}</h2>
                <h3 className='description_modal'>{description}</h3>
                <div className="div_content">
                        {children}
                </div>
            </div>
        </div>
    ) 
    return null

}