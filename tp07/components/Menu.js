import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import { getInformacionRecetaById } from "../Consultas";

export default function Menu({ navigation }) {
    const listado = JSON.parse(localStorage.getItem("listaPlatos")) || null
    console.log(listado)
    var listadoMejorado = []
    const cargarLista = async () => {
        listadoMejorado = listado.map((platos) => ({
            porciones: platos.porciones,
            platos: [await getInformacionRecetaById(platos.plato.id)] //CONSULTAR
        })
        )
    }
    console.log(listadoMejorado)
    return (
        <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem', display: 'flex', flexDirection: "column" }}>
            <h1>Tu Menú</h1>
            <i>Cantidad de platos: {listado.length}</i><br/>
            {listado != null &&
                <>
                    {
                        listado.map((platos) =>
                            <>
                                <div style={styles.card}>
                                    <img style={styles.img} src={platos.plato.image} />
                                    <div style={{...styles.text, marginBottom: '2rem'}}>
                                        <p>Nombre: {platos.plato.title}</p>
                                        <i>Cantidad de porciones: {platos.porciones}</i>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    <a onClick={() => navigation.navigate("Home")}>Volver</a>
                </>
            }
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