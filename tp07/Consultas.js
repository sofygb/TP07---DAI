const key = "apiKey=0cb9a80046de48228264993c6810fd45"

const keySofi = "apiKey=fa048256202b4bdc8b079fae6bdb4426"

const API1 = "https://api.spoonacular.com/recipes/716429/information?"

const API2 = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&"

const API3 = "https://api.spoonacular.com/food/menuItems/search?"

//https://api.spoonacular.com/recipes/716429/information?apiKey=0cb9a80046de48228264993c6810fd45&
//https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=0cb9a80046de48228264993c6810fd45
//https://spoonacular.com/food-api/docs#Search-Recipes-Complex 

export const getPlatos = async () => {
    const resp = await fetch(`${API1}${keySofi}`);
    const data = await resp.json();
    return data;
}

export const getInformacionReceta = async () => {
    const resp = await fetch(`${API2}${keySofi}`);
    const data = await resp.json();
    return data;
}

export const getPlatosByName = async (input) => {
    const resp = await fetch(`${API3}query=${input}&${cs}`);
    const data = await resp.json();
    return data.menuItems;
}