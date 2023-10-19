const key = "apiKey=0cb9a80046de48228264993c6810fd45"

const keySofi = "apiKey=fa048256202b4bdc8b079fae6bdb4426"

const keyMyacovino1 = "apiKey=95c6ef577ef544dd8edb0694400143c6"

const keycitomate73 = "apiKey=10e0c6dd11304196a05d3851a40fb476"

const keycamiON1 = "apiKey=d5952207753c42b8950925fdf0a38b36"

const keycamiON2 = "apiKey=7bcb73bccf54400b8a96d33fbf71bdec"

const keypencilkase = "apiKey=8608f7ce293a4b16a44cb134dcda129d"

const API1 = "https://api.spoonacular.com/recipes/716429/information?"

const API2 = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&"

const API3 = "https://api.spoonacular.com/food/menuItems/search?"

const API4 = "https://api.spoonacular.com/recipes/"

const API5 = 'https://api.spoonacular.com/recipes/complexSearch?'

const API6 ='http://challenge-react.alkemy.org?email='



//https://api.spoonacular.com/recipes/716429/information?apiKey=0cb9a80046de48228264993c6810fd45&
//https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=0cb9a80046de48228264993c6810fd45
//https://spoonacular.com/food-api/docs#Search-Recipes-Complex 

export const getPlatos = async () => {
    const resp = await fetch(`${API1}${keypencilkase}`);
    const data = await resp.json();
    return data;
}

export const getInformacionReceta = async () => {
    const resp = await fetch(`${API2}${keypencilkase}`);
    const data = await resp.json();
    return data;
}

export const getPlatosByName = async (input) => {
    const resp = await fetch(`${API5}query=${input}&${keypencilkase}`);
    const data = await resp.json();
    return data.results;
}

export const getInformacionRecetaById = async (id) => {
    const resp = await fetch(`${API4}${id}/information?includeNutrition=false&${keypencilkase}`);
    const data = await resp.json();
    return data;
}

export const getToken = async (email, password) => {
    const resp = await fetch(`${API6}${email}&password=${password}`, {
        method: 'POST',
    });
    const data = await resp.json();
    return data;
}