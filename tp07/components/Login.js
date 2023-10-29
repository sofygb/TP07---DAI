import { Button, View } from "react-native-web"
import { useIsFocused } from "@react-navigation/native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { getToken } from "../Consultas";
import { ActionTypes, useContextState, setContextState, contextState } from './navigation/contextState'
import Antirana from './img/antirana.jpg'

export default function Login({ navigation }) {
    const isFocused = useIsFocused();

    const [email, setEmail] = useState('challenge@alkemy.org')
    const [password, setPassword] = useState('react')

    const [error, setError] = useState(null)
    const [contador, setContador] = useState(0)

    const { contextState, setContextState } = useContextState()
    console.log(contextState)

    const fakeLogin = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (await postLogin(email, password) != Error) {
                    let token = null
                    token = await postLogin(email, password)
                    setContextState({
                        type: ActionTypes.SetToken,
                        value: token.token
                    });

                    resolve({ token });

                }
                reject(new Error('Usuario o contraseña incorrectos'));
            }, 1000);
        })
    }

    const validacion = async () => {
        if (email === 'challenge@alkemy.org' && password === 'react') {
            setContextState({
                type: ActionTypes.SetSeEstaLogeando,
                value: true
            })

            var data = null 
            try {
                data = await getToken(email, password)
            }
            catch (error){
                console.error('Error: No se pudo obtener el token. ', error)
            }
            finally{
                console.log(data)
            setContextState({
                type: ActionTypes.SetToken,
                value: data.token
            })
            setContextState({
                type: ActionTypes.SetIdUsuario,
                value: 0
            })
            setContextState({
                type: ActionTypes.SetMail,
                value: email
            })
            setContextState({
                type: ActionTypes.SetContrasenia,
                value: password
            })
            setContextState({
                type: ActionTypes.SetImagen,
                value: Antirana
            })
            setContextState({
                type: ActionTypes.SetSeEstaLogeando,
                value: false
            })
            navigation.navigate('Home')
            }
        }
        else {
            setError(`Error: Email y contraseña inválidos (${contador})`)
            setContador(contador + 1)
        }
    }

    return (
        <div style={{ margin: '1.5rem' }}>
            <h1>Inicio de Sesión</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Email:</Text>
                <TextInput style={{ marginBottom: '1rem' }} placeholder="Correo" onChangeText={(text) => { setEmail(text) }} value={email} />

                <Text style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Contraseña:</Text>
                <TextInput style={{ marginBottom: '1rem' }} placeholder="Password" onChangeText={(text) => { setPassword(text) }} value={password} />
            </div>
            <div>
                {
                    !contextState.seEstaLogeando ? 
                    <button style={{ alignSelf: 'center', marginBottom: '1rem' }} onClick={() => { validacion() }}>Login</button>
                    :
                    <>
                    <button style={{ alignSelf: 'center', marginBottom: '1rem' }} onClick={() => { validacion() }} disabled>Login</button> <br></br>
                    <i>Logeando...</i>
                    </>
                }
                {
                    error != null &&
                    <i>{error}</i>
                }
            </div>
        </div>
    )
}