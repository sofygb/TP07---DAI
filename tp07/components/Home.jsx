import { useEffect, useState } from "react"
import { getPlatos } from "../Consultas"

export const Home = () => {
    const [platos, setPlatos] = useState(null)

    const traerPlatos = async () => {
        const data = await getPlatos()
        console.log(data)
        setPlatos([data])
    }
    
    useEffect(() => {
        traerPlatos()
    }, [])
    
    console.log(platos)
    return (
        <>
        <h5>Menú:</h5>
        {
            platos != null && platos.map((plato) => {
                <>
                <img src={plato.image}/>
                <p>Nombre: {plato.title}</p>
                <p>Precio: {plato.pricePerServing}</p>
                </>
            })
        }
        </>
    )
}