import { useEffect } from "react"

export const verifyAdm = (CPF, Role, navigate) => {
        if(CPF === null || CPF === undefined){
            navigate('/')
        }
        else if(Role !== undefined && Role !== 'Admin'){
            navigate('/')
        }
}
