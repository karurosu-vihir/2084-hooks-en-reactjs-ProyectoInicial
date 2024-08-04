import { createContext, useEffect, useReducer, useState } from "react";

export const GlolbalContext = createContext();

const initialState = {
    consulta: '',
    fotosDeGaleria: [],
    fotoSeleccionada: null,
    modalabierto: false 
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONSULTA':
            return {...state, consulta: action.payload};
        case 'SET_FOTOS_DE_GALERIA':
            return {...state, fotosDeGaleria: action.payload};
        case 'SET_FOTO_SELECCIONADA':
            return {...state, 
                fotoSeleccionada: action.payload,
                modalabierto: action.payload != null ? true : false
            };
        case 'ALTERNAR_FAVORTIO':
            const fotosDeGaleria = state.fotosDeGaleria.map(fotoDeGaleria => {
                return {
                    ...fotoDeGaleria,
                    favorita: fotoDeGaleria.id === action.payload.id ? !action.payload.favorita : fotoDeGaleria.favorita
                }
            });
            if(action.payload.id === state.fotoSeleccionada?.id){
            return {...state,
                fotosDeGaleria: fotosDeGaleria,
                fotoSeleccionada: {
                    ...state.fotoSeleccionada, favorita: !state.fotoSeleccionada.favorita
                }
            }}else{
                return{
                    ...state, fotosDeGaleria: fotosDeGaleria}
            }

        default:
            return state;
    }
}

export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer,initialState)

    // const [consulta, setConsulta] = useState("");
    // const [fotosDeGaleria, setFotosDeGaleria] = useState([])
    // const [fotoSeleccionada, setFotoSeleccionada] = useState(null)

    useEffect(() => {
        const getfotos = async () => {
            const res = await fetch('http://localhost:3000/fotos');
            const data = await res.json();
            // setFotosDeGaleria([...data]);
            dispatch({type: 'SET_FOTOS_DE_GALERIA', payload: data});
        }
        setTimeout(() => getfotos(), 5000);
    }, [])

    return (
        <GlolbalContext.Provider value={{state, dispatch}}>
            {children}
        </GlolbalContext.Provider>
    )
}

