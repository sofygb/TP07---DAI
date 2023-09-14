import { useEffect, useState } from "react"
import { getPlatos, getInformacionReceta } from "../Consultas"

export const Home = () => {
    const [platos, setPlatos] = useState(null)
    const [recetas, setRecetas] = useState(null)

    const traerPlatos = async () => {
        const data = await getPlatos()
        console.log(data)
        setPlatos([data])
    }
    const traerRecetas = async () => {
        const data = await getInformacionReceta()
        console.log(data)
        setRecetas([data])
    }
    
    useEffect(() => {
        traerPlatos()
        traerRecetas()
        console.log(platos)
    }, [])
    
    return (
        <>
        <h5>Menú:</h5>
        {
            platos != null && platos.map((plato) => 
                <div id={plato.id}>
                    <img src={plato.image}/>
                    <p>Nombre: {plato.title}</p>
                    <p>Precio: ${plato.pricePerServing}</p>
                </div>
            )
        }
        {
            recetas != null && recetas.map((receta) => 
                <div id={receta.id}>
                    <p>Nombre: {receta.title}</p>
                    <p>Porciones por plato: ${receta.servings}</p>
                    <p>Precio: ${receta.pricePerServing}</p>
                    <p>Tiempo de preparación: {receta.readyInMinutes} minutos</p>
                    <p>HealthScore: {receta.healthScore}</p>
                    <p>Libre de lactosa: {receta.dairyFree}</p>
                    <p>Keto: {receta.ketogenic}</p>
                    <p>Apto para celíacos: {receta.glutenFree}</p>
                    <p>Apto para veganos: {receta.vegan}</p>
                    <p>Apto para vegetarianos: {receta.vegetarian}</p>
                    <p>Platos para: {receta.dishTypes.map((comidas) => comidas)}</p>
                </div>
            )
        }
        </>
    )
}