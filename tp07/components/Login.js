import { Button, View } from "react-native-web"
import { useIsFocused } from "@react-navigation/native";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

export default function Login({ navigation }) {
    const isFocused = useIsFocused();

    const [email, setEmail] = useState('challenge@alkemy.org')
    const [password, setPassword] = useState('react')

    const [error, setError] = useState(null)
    const [contador, setContador] = useState(0)

    //useEffect(() => {contadorErrores = 0}, [])

    const validacion = () => {
        if (email === 'challenge@alkemy.org' && password === 'react') {
            navigation.navigate('Home')
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
                <button style={{ alignSelf: 'center', marginBottom: '1rem' }} onClick={() => { validacion() }}>Login</button>
                {
                    error != null &&
                    <i>{error}</i>
                }
            </div>
        </div>
    )
}