import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home.js'
import Login from '../Login.js'
import Platos from '../Platos.js'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}}>

                <Stack.Screen 
                name= 'Login' 
                component={ Login }
                />

                <Stack.Screen 
                name= 'Home' 
                component={ Home }
                />
                
                <Stack.Screen 
                name= 'Platos' 
                component={ Platos } 
                />

            </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainStack