const key = "?apiKey=0cb9a80046de48228264993c6810fd45&"

const API1 = "https://api.spoonacular.com/recipes/716429/information"

//https://api.spoonacular.com/recipes/716429/information?apiKey=0cb9a80046de48228264993c6810fd45&

export const getPlatos = async () => {
    const resp = await fetch(`${API1}${key}`);
    const data = await resp.json();
    return data;
}