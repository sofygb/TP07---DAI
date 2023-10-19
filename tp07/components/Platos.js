
export default function Platos({ navigation }) {
    const listado = JSON.parse(localStorage.getItem("listaPlatos")) || null
    return(
        <>
            {listado != null &&
                listado.map((numero) => <p>{numero}</p>)
            }
        </>
    )
}