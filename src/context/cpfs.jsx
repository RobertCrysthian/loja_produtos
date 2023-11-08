import { createContext, useState } from "react";


export const CpfContext = createContext();

export const CpfProvider = ({children}) => {
    const [cpfUser, setCpfUser] = useState('')

    return <CpfContext.Provider value={{cpfUser, setCpfUser}}>{children}</CpfContext.Provider>
}

export default CpfContext.Provider
                    