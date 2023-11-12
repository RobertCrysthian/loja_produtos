import './inputMd.css'

export default function InputMD ({placeholder, value, onChange}) {
    return (
        <div className='div_inputMD'>
            <input placeholder={placeholder} value={value} onChange={onChange} className='inputMd'/>
        </div>
    )
}