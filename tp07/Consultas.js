const key = "apiKey=0cb9a80046de48228264993c6810fd45"

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
    const resp = await fetch(`${API5}query=${input}&${key}`);
    const data = await resp.json();
    return data.results;
}

export const getInformacionRecetaById = async (id) => {
    const resp = await fetch(`${API4}${id}/information?includeNutrition=false&${key}`);
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