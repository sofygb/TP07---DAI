import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import { getInformacionRecetaById } from "../Consultas";
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native-web';

export default function Menu({ navigation }) {
    const [healthScore, setHealthScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [cantPorciones, setCantPorciones] = useState(0)
    const [listaPlatos, setListaPlatos] = useState(null)

    useEffect(() => {
        const listado = JSON.parse(localStorage.getItem("listaPlatos")) || null
        console.log(listado)
        setListaPlatos(listado)
    }, [])

    useEffect(() => {
        if (listaPlatos !== null) {
            var sumaHealthScore = 0
            var precioFinal = 0
            var porcionesCount = 0
            listaPlatos.map((platos) => {
                sumaHealthScore += platos.plato.healthScore,
                    precioFinal += (platos.porciones * platos.plato.pricePerServing)
                    porcionesCount += platos.porciones
                })
            setHealthScore((sumaHealthScore / listaPlatos.length == 0 ? 1 : listaPlatos.length).toFixed(2))
            setTotal(precioFinal.toFixed(3))
            setCantPorciones(porcionesCount)
        }
    }, [listaPlatos])

    const eliminarPlato = (plato) => {
        const posicion = listaPlatos.findIndex((platos) => platos.plato.id === plato)
        var lista1 = listaPlatos.slice(0, posicion)
        var lista2 = listaPlatos.slice(posicion + 1, listaPlatos.length)

        const listaFinal = lista1.concat(lista2)

        setListaPlatos(listaFinal)
        localStorage.setItem("listaPlatos", JSON.stringify(listaFinal))
    }

    return (
        <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: "column" }}>
            <h1>Tu Menú</h1>

            {listaPlatos != null &&
                <>
                    <h2>Platos</h2>
                    {
                        listaPlatos.map((platos) =>
                            <>
                                <div style={styles.card}>
                                    <img style={styles.img} src={platos.plato.image} />
                                    <div style={{ ...styles.text, marginBottom: '2rem' }}>
                                        <p>Nombre: {platos.plato.title}</p>
                                        <p>Precio por porción: ${platos.plato.pricePerServing}</p>
                                        <i>Cantidad de porciones: {platos.porciones}</i><br />
                                        <a id={platos.plato.id} style={{ alignSelf: 'center', paddingBottom: '2%', fontWeight: 'bold', color: '#e64d4d', textDecoration: 'underline' }} onClick={(e) => eliminarPlato(parseInt(e.target.id))}>Eliminar</a>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </>
            }

            <h2>Factura</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {listaPlatos != null && <><i>Cantidad de platos: {listaPlatos.length}</i><i>Cantidad de porciones: {cantPorciones}</i></>}
                <p>Promedio HealthScore: {healthScore}pts</p>
                <p>Total: ${total}</p>
                <a style={{ alignSelf: 'center', paddingBottom: '2%', fontWeight: 'bold', color: '#3887e9', textDecoration: 'underline' }} onClick={() => navigation.navigate("Home")}>Volver</a>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        width: "80%",
        borderRadius: "10%",
        backgroundColor: 'grey',
        boxShadow: "13px 10px 15px 0px #00000036",
        marginBottom: "3rem"
    },

    text: {
        textAlign: "left",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "100%",
        paddingBottom: "15px",
        display: "revert",
        marginLeft: "1rem",
        marginLeft: '1.4rem',
        padding: '1px',
        paddingRight: '30px',
    },
    img: {
        width: "100%",
        borderRadius: "inherit",
        borderBottomLeftRadius: "0%",
        borderBottomRightRadius: "0%",
        paddingBottom: "15px",
    }
})

/*
aggregateLikes: 1
analyzedInstructions: [{…}]
cheap: false
cookingMinutes: -1
creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit"
cuisines: []
dairyFree: false
diets: []
dishTypes: ['dessert']
extendedIngredients: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
gaps: "no"
glutenFree: false
healthScore: 0
id: 641314
image: "https://spoonacular.com/recipeImages/641314-556x370.jpg"
imageType: "jpg"
instructions: "<ol><li>Preheat oven to 375 degrees. In a mixing bowl, combine the flour, baking powder, baking soda, salt, cocoa powder, and sugar.  Now add the butter and egg, and mix until it's combined. The mixture will come together as a dough, but the texture is a bit coarse.</li><li>Use a food scoop (or a tablespoon measuring spoon), and scoop the dough on to a cookie sheet. You're looking for no bigger than golf ball size. Lightly wet your hand or a glass with a flat bottom and gently press down on the dough balls until they're a bit flat.</li><li>Bake the cookies for 9 minutes. Let them cool on a rack.</li><li>For the filling, just mix the butter, shortening, and vanilla until combined and then gradually add the powdered sugar. You can use the same food scoop to scoop the filling on half the cookies, or you can put the filling in a plastic bag, cut off the tip, and pipe the cream filling out.</li></ol>"
license: "CC BY 3.0"
lowFodmap: false
occasions: []
originalId: null
preparationMinutes: -1
pricePerServing: 23.3
readyInMinutes: 45
servings: 20
sourceName: "Foodista"
sourceUrl: "http://www.foodista.com/recipe/ZW5QD6FG/decadent-homemade-oreos"
spoonacularSourceUrl: "https://spoonacular.com/decadent-homemade-oreos-641314"
summary: "Decadent Homemade Oreos is a dessert that serves 20. One serving contains <b>207 calories</b>, <b>2g of protein</b>, and <b>10g of fat</b>. For <b>23 cents per serving</b>, this recipe <b>covers 3%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 1 foodies and cooks. If you have sugar, baking soda, vanillan extract, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. From preparation to the plate, this recipe takes around <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 11%</b>, which is not so tremendous. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/homemade-oreos-573253\">Homemade Oreos</a>, <a href=\"https://spoonacular.com/recipes/homemade-oreos-592571\">Homemade Oreos</a>, and <a href=\"https://spoonacular.com/recipes/homemade-oreos-80299\">Homemade Oreos</a>."
sustainable: false
title: "Decadent Homemade Oreos"
vegan: false
vegetarian: false
veryHealthy: false
veryPopular: false
weightWatcherSmartPoints: 10
winePairing:
*/