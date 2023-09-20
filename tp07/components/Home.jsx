import { useEffect, useState } from "react"
import { getPlatos, getInformacionReceta } from "../Consultas"
import { StyleSheet } from "react-native-web"
import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

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

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <>
      <h5>Menú:</h5>
      {
        platos != null && platos.map((plato) =>
          <div id={plato.id} style={styles.card}>
            <img src={plato.image} style={styles.img} alt="" />
            <p style={styles.text}>Nombre: {plato.title}</p>
            <p style={styles.text}>Precio: ${plato.pricePerServing}</p>
            {/*Cambiar el formato del modal, no cierra */}
            <PaperProvider>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ width: '400%' }}>
                  <Text>{
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
                  }</Text>
                </Modal>
              </Portal>
              <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
              </Button>
            </PaperProvider>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    width: '30%',
    borderRadius: '10%',
    backgroundColor: '#7a5d3b',
    boxShadow: "13px 10px 15px 0px #00000036",
  },
  text: {
    textAlign: 'left',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '100%',
    paddingBottom: '15px',
    display: 'revert',
    marginLeft: '1rem',
  },
  img: {
    width: '100%',
    borderRadius: 'inherit',
    borderBottomLeftRadius: '0%',
    borderBottomRightRadius: '0%',
    paddingBottom: '15px'
  }
})
