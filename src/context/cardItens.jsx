import { createContext, useState } from "react";


export const CardContext = createContext();

export const CardProvider = ({children}) => {
    const [subTotal, setSubTotal] = useState(0)
    const [cardList, setCardList] = useState([])

    return <CardContext.Provider value={{subTotal, setSubTotal, cardList, setCardList}}>{children}</CardContext.Provider>
}

export default CardContext.Provider