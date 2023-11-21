import { createContext, useState } from "react";


export const CpfContext = createContext();

export const CpfProvider = ({children}) => {
    const [cpfUser, setCpfUser] = useState('')

    const sessionCPF = sessionStorage.getItem('sessionCPF')
    const sessionName = sessionStorage.getItem('sessionName')
    const sessionRole = sessionStorage.getItem('sessionRole')
    const sessionPfp = sessionStorage.getItem('sessionPfp')
    const sessionId = sessionStorage.getItem('sessionId')

    return <CpfContext.Provider value={{cpfUser, setCpfUser, sessionCPF, sessionName, sessionRole, sessionPfp, sessionId}}>{children}</CpfContext.Provider>
}

export default CpfContext.Provider
                    