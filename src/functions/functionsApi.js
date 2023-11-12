import axios from "axios"

export const deleteItem = (section, id, array, setArray) => {
    axios.delete(`http://localhost:8080/${section}/${id}`)
    .then(() => {
        const newItens = array.filter(item => item.id !== id)
        setArray([...newItens])
    })
}