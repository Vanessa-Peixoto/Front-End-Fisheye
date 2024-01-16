async function getDetailsPhotographers() {
    const response = await fetch("../../data/photographers.json");
    const photographerData = await response.json();
    return photographerData;
    
}


async function displayData(photographerData) {
    //recupère id dans l'url
    //compare id avec mon tableau media
    //affiche les medias en question 
    // Obtenez l'URL actuelle
const url = new URL(window.location.href);

// Récupérez les paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérez la valeur du paramètre photographerId
const id = params.get('id');

console.log(id);

const mediaFiltre = photographerData.media.filter(data => data.photographerId === parseInt(id));
const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];

console.log(mediaFiltre);

const name = photographerFiltre.name.split(' ')[0].replace('-', ' ')
const mediaSection = document.querySelector('.section-media');


for(let i = 0; i<mediaFiltre.length; i++) {
    const img = mediaFiltre[i].image;
    const path = 'assets/images/' + name + '/' + img;
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', path);
    imgElement.alt = mediaFiltre[i].title;
    mediaSection.appendChild(imgElement);

}


}





async function main() {
    const photographerData = await getDetailsPhotographers();
    await displayData(photographerData);
}

main();

getDetailsPhotographers()