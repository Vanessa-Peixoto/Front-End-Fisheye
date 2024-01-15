async function getDetailsPhotographers() {
    const response = await fetch("../../data/photographers.json");
    const media = await response.json();

    return media;
}

async function displayData(media) {
    //recupère id dans l'url
    //compare id avec mon tableau media
    //affiche les medias en question 
}

// Obtenez l'URL actuelle
const url = new URL(window.location.href);

// Récupérez les paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérez la valeur du paramètre photographerId
const id = params.get('id');

console.log(id);






getDetailsPhotographers()