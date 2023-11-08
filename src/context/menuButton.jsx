import {createContext, useState} from 'react'



export const MenuContext = createContext(null);

export const MenuProvider = ({children}) => {
    const [buttonMenu, setButtonMenu] = useState(false)
    const [profileButton, setProfileButton] = useState(false)

    return <MenuContext.Provider value={{buttonMenu, setButtonMenu, profileButton, setProfileButton}}>{children}</MenuContext.Provider>
}

export default MenuContext.Provider
                    