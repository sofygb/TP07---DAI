import { useEffect, useState } from "react";
import { getPlatos, getInformacionReceta, getPlatosByName, getInformacionRecetaById } from "../Consultas";
import * as React from "react";
import { Portal, Button, PaperProvider } from "react-native-paper";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import { value, SearchBar } from "@rneui/base";
import Lupa from './img/lupita.png'

export const Home = () => {
  const [platos, setPlatos] = useState(null);
  const [detallePlatos, setDetallePlatos] = useState(null);
  const [recetas, setRecetas] = useState(null);
  const [value, setValue] = React.useState("");
  const [resultado, setResultado] = React.useState(null);

  const traerPlatos = async () => {
    const data = await getPlatos();
    console.log(data);
    //setPlatos([data]);
  };
  const traerRecetas = async () => {
    const data = await getInformacionReceta();
    console.log(data);
    setRecetas([data]);
  };

  useEffect(() => {
    traerPlatos();
    traerRecetas();
    console.log(platos);
  }, []);

  const [modalVisible, setModalVisible] = React.useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  console.log(modalVisible);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const resultadoQuery = async (input) => {
    const data = await getPlatosByName(input)
    setResultado(data)
    console.log(data)
  }
  console.error("XXX")

  useEffect(() => {
    //detalleQuery()
  }, [resultado]) //ERROR, VER COMO HACER PARA TRAER LAS RECETAS DE LOS PLATOS Y QUE ESPERE A Q SE ABRA EL MODAL

  const detalleQuery = async (id) => {
    const data = await getInformacionRecetaById(id)
    setRecetas([data])
  }
  //setModalVisible(!modalVisible)

  return (
    <>
      <h5>Buscador:</h5>
      <SearchBar
        platform="default"
        containerStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: 'rgb(227 229 231)' }}
        inputStyle={{ color: 'gray' }}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        searchIcon={Lupa}
        lightTheme
        loadingProps={{}}
        onChangeText={newVal => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Buscar comida..."
        placeholderTextColor="#888"
        round
        showCancel
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log(onCancel())}
        value={value}
      />
      <Button onPress={() => resultadoQuery(value)}>Buscar</Button>

      <h5>Resultados:</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

        {resultado != null &&
          resultado.map((plato) => (
            <>
              <div id={plato.id} style={styles.card}>
                <img src={plato.image} style={styles.img} alt="" />
                <p style={styles.text}>Nombre: {plato.title}</p>
                <p style={styles.text}>Cadena: {plato.restaurantChain}</p>
                <PaperProvider>
                  <Portal>
                    <Modal
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                      contentContainerStyle={containerStyle}
                      style={{ width: "400%" }}
                    >
                      <div style={{ display: 'flex', marginLeft: '2rem', alignSelf: 'center', marginTop: '20%', flexDirection: 'column', alignItems: 'center' }}>
                        {setDetallePlatos([(detallePlatos !== null ? [...detallePlatos] : [...{}]), detalleQuery(plato.id)])}{console.log(detallePlatos)}
                        {
                          detallePlatos.findIndex((elPlato) => elPlato.id === plato.id) !== -1 ?
                          (
                            <div id={detallePlatos[plato.id].id}>
                                <p>Nombre: {detallePlatos[plato.id].title}</p>
                                <p>Porciones por plato: ${detallePlatos[plato.id].servings}</p>
                                <p>Precio: ${detallePlatos[plato.id].pricePerServing}</p>
                                <p>
                                  Tiempo de preparación: {detallePlatos[plato.id].readyInMinutes}{" "}
                                  minutos
                                </p>
                                <p>HealthScore: {detallePlatos[plato.id].healthScore}</p>
                                <p>Libre de lactosa: {detallePlatos[plato.id].dairyFree}</p>
                                <p>Keto: {detallePlatos[plato.id].ketogenic}</p>
                                <p>Apto para celíacos: {detallePlatos[plato.id].glutenFree}</p>
                                <p>Apto para veganos: {detallePlatos[plato.id].vegan}</p>
                                <p>Apto para vegetarianos: {detallePlatos[plato.id].vegetarian}</p>
                                <p>
                                  Platos para:{" "}
                                  {detallePlatos[plato.id].dishTypes.map((comidas) => comidas)}
                                </p>
                                {/*detallePlatos.findIndex((plato) => )*/}
                                <Button style={{ marginTop: 30 }} onPress={showModal}>
                                  Show
                                </Button>
                              </div>
                          ) : <p>No cargó aun</p>
                        }
                        
                        {<Text>
                          {detallePlatos != null &&
                            detallePlatos.map((receta) => (
                              console.log(receta),
                              <div id={receta.id}>
                                <p>Nombre: {receta.title}</p>
                                <p>Porciones por plato: ${receta.servings}</p>
                                <p>Precio: ${receta.pricePerServing}</p>
                                <p>
                                  Tiempo de preparación: {receta.readyInMinutes}{" "}
                                  minutos
                                </p>
                                <p>HealthScore: {receta.healthScore}</p>
                                <p>Libre de lactosa: {receta.dairyFree}</p>
                                <p>Keto: {receta.ketogenic}</p>
                                <p>Apto para celíacos: {receta.glutenFree}</p>
                                <p>Apto para veganos: {receta.vegan}</p>
                                <p>Apto para vegetarianos: {receta.vegetarian}</p>
                                <p>
                                  Platos para:{" "}
                                  {receta.dishTypes.map((comidas) => comidas)}
                                </p>
                                {/*detallePlatos.findIndex((plato) => )*/}
                                <Button style={{ marginTop: 30 }} onPress={showModal}>
                                  Show
                                </Button>
                              </div>
                            ))}
                        </Text>}
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => { setModalVisible(!modalVisible) }}>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                      </div>
                    </Modal>
                  </Portal>
                </PaperProvider>
              </div>
            </>
          ))}
      </div>


      <h5>Menú:</h5>
      {recetas != null &&
        recetas.map((receta) => (
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
            <p>Platos para: {receta.dishTypes.map((comidas) => comidas + " - ")}</p>
          </div>
        ))}
    </>
  );
};



const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    width: "80%",
    borderRadius: "10%",
    backgroundColor: "#7a5d3b",
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
  },
  body: {
    margin: "auto",
    maxWidth: "500px",
  },
  wrapper: {
    display: "inline-flex",
    flexDirection: "column",
  },
  button: {
    margin: "20px",
    border: "1px solid #2185d0",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "white",
    width: "140px",
  },

  list: {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.175)",
    border: "1px solid #ccc",
    listStyleType: "none",
    width: "auto",
    display: "inline-block",
  },
  listItem: {
    padding: "8px",
    cursor: "pointer",
    backgroundColor: "white",
  },
});

{/* platos != null &&
platos.map((plato) => (
  <div id={plato.id} style={styles.card}>
  <img src={plato.image} style={styles.img} alt="" />
  <p style={styles.text}>Nombre: {plato.title}</p>
  <p style={styles.text}>Precio: ${plato.pricePerServing}</p>
  <PaperProvider>
  <Portal>
  <Modal
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
  }}
  contentContainerStyle={containerStyle}
  style={{ width: "400%"}}
  >
  <div style={{ display: 'flex',marginLeft: '2rem', alignSelf: 'center', marginTop: '20%', flexDirection: 'column', alignItems: 'center' }}> //    display: flex;
  
  <Text>
  {recetas != null &&
    recetas.map((receta) => (
      <div id={receta.id}>
      <p>Nombre: {receta.title}</p>
      <p>Porciones por plato: ${receta.servings}</p>
      <p>Precio: ${receta.pricePerServing}</p>
      <p>
      Tiempo de preparación: {receta.readyInMinutes}{" "}
      minutos
      </p>
      <p>HealthScore: {receta.healthScore}</p>
      <p>Libre de lactosa: {receta.dairyFree}</p>
      <p>Keto: {receta.ketogenic}</p>
      <p>Apto para celíacos: {receta.glutenFree}</p>
      <p>Apto para veganos: {receta.vegan}</p>
      <p>Apto para vegetarianos: {receta.vegetarian}</p>
      <p>
      Platos para:{" "}
      {receta.dishTypes.map((comidas) => comidas)}
      </p>
      </div>
      ))}
      </Text>
      <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}>
      <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable>
      </div>
      </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
      Show
      </Button>
      </PaperProvider>
      </div>
    )) */}
{/* id: 306187
    image: "https://spoonacular.com/menuItemImages/hamburger.jpg"
    imageType: "jpg"
    restaurantChain: "Garfield's Restaurant & Pub"
    servings: {number: 1, size: null, unit: null}
  title: "Burger"*/}