const key = "apiKey=0cb9a80046de48228264993c6810fd45"

const keySofi = "apiKey=fa048256202b4bdc8b079fae6bdb4426"

const keyMyacovino1 = "apiKey=95c6ef577ef544dd8edb0694400143c6"

const keycitomate73 = "apiKey=10e0c6dd11304196a05d3851a40fb476"

const API1 = "https://api.spoonacular.com/recipes/716429/information?"

const API2 = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&"

const API3 = "https://api.spoonacular.com/food/menuItems/search?"

const API4 = "https://api.spoonacular.com/recipes/"

//https://api.spoonacular.com/recipes/716429/information?apiKey=0cb9a80046de48228264993c6810fd45&
//https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=0cb9a80046de48228264993c6810fd45
//https://spoonacular.com/food-api/docs#Search-Recipes-Complex 

export const getPlatos = async () => {
    const resp = await fetch(`${API1}${key}`);
    const data = await resp.json();
    return data;
}

export const getInformacionReceta = async () => {
    const resp = await fetch(`${API2}${key}`);
    const data = await resp.json();
    return data;
}

export const getPlatosByName = async (input) => {
    const resp = await fetch(`${API3}query=${input}&${key}`);
    const data = await resp.json();
    return data.menuItems;
}

export const getInformacionRecetaById = async (id) => {
    const resp = await fetch(`${API4}${id}/information?includeNutrition=false&${key}`);
    const data = await resp.json();
    return data;
}