import { useContext } from "react";
import React from "react";
/*ESTRUCTURA:
{
    idUsuario: int,
    nombre: string,
    imagen: string,
    mail: string,
    contraseña: string,
    listaPlatos: [],
    cantPlatos: int,
    token: int,
    seEstaLogeando: bool
}
*/
export const initialState = {
    idUsuario: -1,
    nombre: '',
    imagen: '',
    mail: '',
    contrasenia: '',
    seEstaLogeando: false,
    token: -1,
    listaPlatos: [],
    cantPlatos: 0,
}

export const ActionTypes = {
    SetIdUsuario: 'SET_IDUSUARIO',
    SetNombre: 'SET_NOMBRE',
    SetImagen: 'SET_IMAGEN',
    SetMail: 'SET_MAIL',
    SetContrasenia: 'SET_CONTRASENIA',
    SetSeEstaLogeando: 'SET_SEESTALOGEANDO',
    SetToken: 'SET_TOKEN',
    SetListaPlatos: 'SET_LISTAPLATOS',
    SetCantPlatos: 'SET_CANTPLATOS'
}

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SetIdUsuario:
            return {
                ...state,
                idUsuario: action.value,
            };
        case ActionTypes.SetNombre:
            return {
                ...state,
                nombre: action.value,
            };
        case ActionTypes.SetImagen:
            return {
                ...state,
                imagen: action.value,
            };
        case ActionTypes.SetMail:
            return {
                ...state,
                mail: action.value,
            };
        case ActionTypes.SetContrasenia:
            return {
                ...state,
                contrasenia: action.value,
            };
        case ActionTypes.SetSeEstaLogeando:
            return {
                ...state,
                seEstaLogeando: action.value,
            };
        case ActionTypes.SetToken:
            return {
                ...state,
                token: action.value,
            };
        case ActionTypes.SetListaPlatos:
            return {
                ...state,
                listaPlatos: action.value,
            };
        case ActionTypes.SetCantPlatos:
            return {
                ...state,
                cantPlatos: action.value,
            };
        default:
            return state;
    }
}

export const initialContext = {
    contextState: initialState,
    setContextState: () => { },
}

//crear el contextState

const Cont = React.createContext(initialContext)

export function ContextProvider({ children, initial = initialState }) {
    const [state, dispatch] = React.useReducer(reducer, initial)

    const contextState = state
    const setContextState = dispatch

    return <Cont.Provider value={{ contextState, setContextState }}>{children}</Cont.Provider>
}

export const useContextState = () => useContext(Cont)