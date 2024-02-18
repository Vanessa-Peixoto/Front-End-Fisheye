let photographerData = null;

/**
 * @description Get the photographer data
 */
async function getDetailsPhotographers() {
    if (!photographerData) {
        try {
            const response = await fetch("data/photographers.json");
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier JSON');
            }
            photographerData = await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }
    return photographerData;
}

/**
 * @description Generate new object with details of photographer
 * @returns object media, photographer'name, photographer details
 */
async function getPhotographer() {
    const photographerData = await getDetailsPhotographers();

    //recover url
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');

    //get all media of photographer
    const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];
    const name = photographerFiltre.name.split(' ')[0].replace('-', ' ');
    const media = photographerData.media.filter(data => data.photographerId === parseInt(id));

    return {
        media,
        name,
        photographerFiltre
    }
}

/**
 * @description Sort by popularity
 * @param {Element} mediaA 
 * @param {Element} mediaB 
 */
function sortByPopularity(mediaA, mediaB) {
    return mediaB.likes - mediaA.likes;
}

/**
 * @description Sort by date
 * @param {Element} mediaA 
 * @param {Element} mediaB 
 */
function sortByDate(mediaA, mediaB) {
    const dateA = new Date(mediaA.date);
    const dateB = new Date(mediaB.date);
    return dateB - dateA;
}

/**
 * @description Sort by title
 * @param {Element} mediaA 
 * @param {Element} mediaB 
 */
function sortByTitle(mediaA, mediaB) {
    const nomA = mediaA.title;
    const nomB = mediaB.title;

    if (nomA < nomB) {
        return -1;
    } else if (nomA > nomB) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * @description Create media element
 * @param {string} sortBy 
 */
async function createMedias(sortBy) {
    const mediaSection = document.querySelector('.section-media');
    mediaSection.innerHTML = "";
    const photographer = await getPhotographer();
    const media = photographer.media;

    //sort media based on specific criteria
    if (sortBy === 'popularite') {
        media.sort(sortByPopularity);
    } else if (sortBy === 'date') {
        media.sort(sortByDate);
    } else if (sortBy === 'titre') {
        media.sort(sortByTitle);
    }

    for (let i = 0; i < media.length; i++) {
        const type = media[i].hasOwnProperty('image') ? 'image' : 'video';
        const mediaObject = new MediaFactory(media[i], photographer.name, type);
        const article = mediaObject.createElement(i);
        const btnLike = article.querySelector('.btn-likes');
        btnLike.addEventListener('click', handleLikeClick);
        mediaSection.appendChild(article);
    }
}

/**
 * @description Create header element
 */
async function createHeader() {

    const photographerData = await getPhotographer();
    const headerSection = document.querySelector('.photograph-header');

    const photographerName = photographerData.photographerFiltre.name;
    const photographerLocation = photographerData.photographerFiltre.city + ', ' + photographerData.photographerFiltre.country;
    const photographerMessage = photographerData.photographerFiltre.tagline;
    const photographerImg = photographerData.photographerFiltre.portrait;
    const picture = `assets/photographers/${photographerImg}`;

    nameElement = document.createElement('h1');
    locationElement = document.createElement('p');
    messageElement = document.createElement('p');
    imgElement = document.createElement('img');

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
}

/**
 * @description Action to add new like
 * @param {Event} e 
 */
function handleLikeClick(e) {
    let element = e.currentTarget.previousSibling;

    let currentLikes = parseInt(element.innerHTML);
    element.innerHTML = ++currentLikes;

    let totalLikes = document.querySelector('.container-likes');
    let i = totalLikes.childNodes[0];

    let totalEncartLikes = parseInt(i.innerHTML);
    i.innerHTML = ++totalEncartLikes;

    e.currentTarget.removeEventListener('click', handleLikeClick);
}

/**
 * @description Create encart with price and total likes
 */
async function createEncart() {
    const encart = document.getElementById('encart');
    const photographerData = await getPhotographer()

    const sum = photographerData.media.reduce((accumulateur, object) => accumulateur + object.likes, 0);

    const totalLikes = document.createElement('p');
    totalLikes.textContent = sum;

    const likesImg = document.createElement('img');
    likesImg.setAttribute('src', 'assets/icons/heart-total.svg');
    likesImg.alt = 'likes';
    likesImg.classList.add('likes');

    const containerLikes = document.createElement('div');
    containerLikes.classList.add('container-likes')
    containerLikes.appendChild(totalLikes);
    containerLikes.appendChild(likesImg);

    const price = photographerData.photographerFiltre.price;
    const p = document.createElement('p');
    p.textContent = price + '€ / jour';

    const containerPrice = document.createElement('div');
    containerPrice.appendChild(p);
    encart.appendChild(containerLikes);
    encart.appendChild(containerPrice);
}

/**
 * @description Listen to change and order the media
 */
function orderBy() {
    const select = document.getElementById('order-by');
    select.addEventListener('change', (ev) => createMedias(ev.currentTarget.options[select.selectedIndex].value))
}

async function main() {
    await getDetailsPhotographers();
    createHeader();
    createMedias();
    createEncart();
    orderBy();
}

main();