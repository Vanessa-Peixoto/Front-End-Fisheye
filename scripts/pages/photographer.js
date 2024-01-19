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

const headerSection = document.querySelector('.photograph-header');

const photographerName = photographerFiltre.name;
const photographerLocation = photographerFiltre.city + ', ' + photographerFiltre.country;
const photographerMessage = photographerFiltre.tagline;
const photographerImg = photographerFiltre.portrait;

const picture = `assets/photographers/${photographerImg}`


nameElement = document.createElement('h1');
locationElement = document.createElement('p');
messageElement = document.createElement('p');
imgElement = document.createElement( 'img' );


nameElement.textContent = photographerName;
locationElement.textContent = photographerLocation;
messageElement.textContent = photographerMessage;
imgElement.setAttribute("src", picture);
imgElement.alt = photographerName;

const section = document.createElement('section');
section.appendChild(nameElement);
section.appendChild(locationElement);
section.appendChild(messageElement);


headerSection.appendChild(section);
headerSection.appendChild(imgElement);



const name = photographerFiltre.name.split(' ')[0].replace('-', ' ')
const mediaSection = document.querySelector('.section-media');


for(let i = 0; i<mediaFiltre.length; i++) {
    console.log(mediaFiltre[i])
    if(mediaFiltre[i].hasOwnProperty('image')) {
        const img = mediaFiltre[i].image;
        const path = 'assets/images/' + name + '/' + img;
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', path);
        imgElement.alt = mediaFiltre[i].title;
        const title = mediaFiltre[i].title;
        const titleElement = document.createElement ('p');
        titleElement.textContent = title;
    
    
        const div = document.createElement('div');
        div.appendChild(imgElement);
        div.appendChild(titleElement);
    
    
    
        mediaSection.appendChild(div);

    } else {
        const video = mediaFiltre[i].video;
        const videoElement = document.createElement('video');
        const pathVideo = 'assets/images/' + name + '/' + video;
        videoElement.controls = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = pathVideo;
        sourceElement.type = "video/mp4";

        videoElement.appendChild(sourceElement);

        const title = mediaFiltre[i].title;
        const titleElement = document.createElement ('p');
        titleElement.textContent = title;
    
    
        const div = document.createElement('div');
        div.appendChild(videoElement);
        div.appendChild(titleElement);

        
        
        mediaSection.appendChild(div);
    }
}

}

/**
 * ouvrir la 
 */





async function main() {
    const photographerData = await getDetailsPhotographers();
    await displayData(photographerData);
}

main();

getDetailsPhotographers()