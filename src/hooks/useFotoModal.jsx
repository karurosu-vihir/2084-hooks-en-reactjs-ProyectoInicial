import { useContext } from "react"
import {GlolbalContext} from "../context/GlobalContext"


function useFotoModal(){

    const {state,dispatch} = useContext(GlolbalContext)

    const openModal = (foto) => {
        dispatch({type: 'SET_FOTO_SELECCIONADA', payload: foto})
    }

    const closeModal = () => {
        dispatch({type: 'SET_FOTO_SELECCIONADA', payload: null})
    }

    const fotoseleccionado = state.fotoSeleccionada
    const estasabiertomodal = state.modalabierto

    return {fotoseleccionado, estasabiertomodal, openModal, closeModal}
}

export default useFotoModal;