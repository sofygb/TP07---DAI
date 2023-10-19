import { useEffect, useState } from "react";
import { getPlatos, getInformacionReceta, getPlatosByName, getInformacionRecetaById } from "../Consultas";
import * as React from "react";
import { Portal, Button, PaperProvider } from "react-native-paper";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import { value, SearchBar } from "@rneui/base";
import Lupa from './img/lupita.png'
import {Icon} from '@iconify/react';

export default function Home({ navigation }) {
  const [platos, setPlatos] = useState(null);
  const [detallePlato, setDetallePlato] = useState(null);
  const [recetas, setRecetas] = useState(null);
  const [value, setValue] = React.useState("");
  const [resultado, setResultado] = React.useState(null); //Platos del buscador
  

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
    localStorage.setItem("listaPlatos", JSON.stringify([]))
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

  useEffect(() => {
    //detalleQuery()
  }, [resultado]) //ERROR, VER COMO HACER PARA TRAER LAS RECETAS DE LOS PLATOS Y QUE ESPERE A Q SE ABRA EL MODAL

  const detalleQuery = async (id) => {
    const data = await getInformacionRecetaById(id)
    setDetallePlato(data)
  }
  //setModalVisible(!modalVisible)

  useEffect(() => {
    console.log(detallePlato)
  },[detallePlato])

  const agregarAlMenu = (e) => {
    const dataPrevia = JSON.parse(localStorage.getItem("listaPlatos"))
    const newId = e
    localStorage.setItem("listaPlatos", JSON.stringify([...dataPrevia, newId]))
  }

  return (
    <div style={{marginLeft: '1.5rem', marginRight: '1.5rem'}}>
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
      <div style={{display: 'flex'}}>
        <Button onPress={() => resultadoQuery(value)}>Buscar</Button>
        <Button onPress={() => {navigation.navigate("Platos")}}>Ver Menú</Button>
      </div>

      <h5>Resultados:</h5>
      <div style={styles.card2}>

        {resultado != null && //Resultado de la búsqueda
          resultado.map((plato) => (
            <>
              {/* La card */}
              <div id={plato.id} style={styles.card}>
                <img src={plato.image} style={styles.img} alt="" />
                <p style={styles.text}>Nombre: {plato.title}</p>
                {/*<p style={styles.text}>Cadena: {plato.restaurantChain}</p>*/}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ marginTop: 30, color: 'white', fontWeight: 'bold', backgroundColor: 'rgb(122, 93, 59)', borderWidth: 0, marginBottom: '4%' }} onClick={() => {detalleQuery(plato.id), setModalVisible(!modalVisible)}}>
                  Show
                </button>
                <button id={plato.id} style={{ marginTop: 30, color: 'white', fontWeight: 'bold', backgroundColor: 'rgb(122, 93, 59)', borderWidth: 0, marginBottom: '4%' }} onClick={(e) => {agregarAlMenu(e.currentTarget.id)}}>
                <Icon icon="icon-park-solid:add-one" color="white" width={'9rem'} style={{maxHeight: '2.5rem', maxWidth: '5rem'}} />
                </button>
                </div>
                <PaperProvider>
                  {/* El Modal */}
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
                      <div style={styles.modal}>
                        
                        {<Text>
                          {detallePlato != null &&
                              <div id={detallePlato.id}>
                                <p>Nombre: {detallePlato.title}</p>
                                <p>Porciones: {detallePlato.servings} por plato</p>
                                <p>Precio: ${detallePlato.pricePerServing}</p>
                                <p>
                                  Tiempo de preparación: {detallePlato.readyInMinutes}{" "}
                                  minutos
                                </p>
                                <p>HealthScore: {detallePlato.healthScore}</p>
                                <p>Libre de lactosa: {detallePlato.dairyFree ? "Si" : "No"}</p>
                                <p>Keto: {detallePlato.ketogenic ? "Si" : "No"}</p>
                                <p>Apto para celíacos: {detallePlato.glutenFree ? "Si" : "No"}</p>
                                <p>Apto para veganos: {detallePlato.vegan ? "Si" : "No"}</p>
                                <p>Apto para vegetarianos: {detallePlato.vegetarian ? "Si" : "No"}</p>
                                <p>
                                  Platos para:{" "}
                                  {detallePlato.dishTypes.map((comidas, i) => i === detallePlato.dishTypes.length-1 ? comidas : comidas + ", ")}
                                </p>
                                <p>
                                  Ingredientes:{" "}
                                  {detallePlato.extendedIngredients.map((obj, i) => i === detallePlato.extendedIngredients.length-1 ? obj.name : obj.name + ", ")}
                                </p>
                                {/*detallePlatos.findIndex((plato) => )*/}
                              </div>
                            }
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


      {/*<h5>Menú:</h5>
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
            </div>}
          ))*/}
    </div>
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
  modal: {
    display: 'flex', marginLeft: '2rem', marginRight: '2rem', alignSelf: 'center', marginTop: '20%', flexDirection: 'column', alignItems: 'center' 
  },
  card2: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }
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

  /*{ setDetallePlatos([(detallePlatos !== null ? [...detallePlatos] : [...{}]), detalleQuery(plato.id)])}{console.log(detallePlatos)}
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
        </div>
    ) : <p>No cargó aun</p>
  }*/