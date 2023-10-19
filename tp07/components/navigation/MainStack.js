import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home.js'
import Login from '../Login.js'
import Platos from '../Platos.js'
import { ActionTypes, useContextState, setContextState, contextState } from './contextState.js'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    const { contextState, setContextState } = useContextState()

    //const usuario = localStorage.getItem('usuario') || { logeado: false, historial: [] }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, }}>

                {
                    contextState.idUsuario != -1 ?
                        <>
                            <Stack.Screen
                                name='Home'
                                component={Home}
                            />

                            <Stack.Screen
                                name='Platos'
                                component={Platos}
                            />
                        </>
                        :
                        <Stack.Screen
                            name='Login'
                            component={Login}
                        />
                }




            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack