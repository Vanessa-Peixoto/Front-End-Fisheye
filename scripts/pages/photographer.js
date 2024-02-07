let photographerData = null; // Variable pour stocker les données JSON

// Fonction pour effectuer le Fetch une seule fois
async function getDetailsPhotographers() {
    if (!photographerData) {
        try {
            const response = await fetch("../../data/photographers.json");
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

// Créer une fonction qui génère un nouvel objet pour pouvoir créer facilement les medias
async function getPhotographer() {
    const photographerData = await getDetailsPhotographers();

    // Obtenez l'URL actuelle
    const url = new URL(window.location.href);

    // Récupérez les paramètres de l'URL
    const params = new URLSearchParams(url.search);

    // Récupérez la valeur du paramètre photographerId
    const id = params.get('id');

    // get all medias
    const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];
    const name = photographerFiltre.name.split(' ')[0].replace('-', ' ');

    const media = photographerData.media.filter(data => data.photographerId === parseInt(id));

    return {
        media,
        name
    }
}



async function displayData() {
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



    const mediaSection = document.querySelector('.section-media');
    const photographer = await getPhotographer();
    const media = photographer.media;

    for (let i = 0; i < media.length; i++) {
        const type = media[i].hasOwnProperty('image') ? 'image' : 'video';
        const mediaObject = new MediaFactory(media[i], photographer.name, type);
        const article = mediaObject.createElement(i);
        mediaSection.appendChild(article);
    }
}


setTimeout(function () {
    let likes = document.querySelectorAll('.btn-likes');

    console.log('je click sur le coeur')
    //si je clique sur le coeur, j'ajoute + 1 au span
    function handleLikeClick(e) {
        let element = e.currentTarget.previousSibling;

        let compteur = parseInt(element.innerHTML);
        let compteurIncremente = compteur + 1;

        element.innerHTML = compteurIncremente;

        let totalLikes = document.querySelector('.container-likes');
        let i = totalLikes.childNodes[0];

        let n = parseInt(i.innerHTML);
        nNew = n + 1;
        i.innerHTML = nNew;

        e.currentTarget.removeEventListener('click', handleLikeClick);
    }
    for (let i = 0; i < likes.length; i++) {
        likes[i].addEventListener('click', handleLikeClick)

    }

}, 2000);


function createEncart() {

    const encart = document.getElementById('encart');
    const url = new URL(window.location.href);

    // Récupérez les paramètres de l'URL
    const params = new URLSearchParams(url.search);

    // Récupérez la valeur du paramètre photographerId
    const id = params.get('id');

    const mediaFiltre = photographerData.media.filter(data => data.photographerId === parseInt(id));
    const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];

    console.log(mediaFiltre, photographerFiltre);

    const sum = mediaFiltre.reduce((accumulateur, object) => accumulateur + object.likes, 0);
    console.log(sum)

    const totalLikes = document.createElement('p');
    totalLikes.textContent = sum;

    const likesImg = document.createElement('img');
    likesImg.setAttribute('src', 'assets/icons/heart.svg');
    likesImg.alt = 'likes';
    likesImg.classList.add('likes');

    const containerLikes = document.createElement('div');
    containerLikes.classList.add('container-likes')
    containerLikes.appendChild(totalLikes);
    containerLikes.appendChild(likesImg);



    const price = photographerFiltre.price;
    console.log(price);
    const p = document.createElement('p');
    p.textContent = price + '€ / jour';

    const containerPrice = document.createElement('div');
    containerPrice.appendChild(p);

    encart.appendChild(containerLikes);
    encart.appendChild(containerPrice);


}

//Trie liste déroulante
function orderBy() {
    const url = new URL(window.location.href);

    // Récupérez les paramètres de l'URL
    const params = new URLSearchParams(url.search);

    // Récupérez la valeur du paramètre photographerId
    const id = params.get('id');

    const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];

    const mediaFiltre = photographerData.media.filter(data => data.photographerId === parseInt(id));

    const select = document.getElementById('order-by');
    const name = photographerFiltre.name.split(' ')[0].replace('-', ' ')

    select.addEventListener('change', (e) => {

        if (e.currentTarget.options[select.selectedIndex].value === "popularite") {
            //sort
            console.log('je suis dans popularité');
            mediaFiltre.sort((a, b) => {
                return b.likes - a.likes;
            })
            let mediaSection = document.querySelector('.section-media');
            mediaSection.innerHTML = "";
            for (let i = 0; i < mediaFiltre.length; i++) {
                const img = mediaFiltre[i].image;
                const path = 'assets/images/' + name + '/' + img;
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', path);
                imgElement.alt = mediaFiltre[i].title;
                imgElement.classList.add('vignette')
                const title = mediaFiltre[i].title;
                const titleElement = document.createElement('p');
                titleElement.textContent = title;

                const likes = mediaFiltre[i].likes;
                likesElement = document.createElement('span');
                likesElement.textContent = likes;

                const likesImg = document.createElement('img');
                likesImg.setAttribute('src', 'assets/icons/heart.svg');
                likesImg.alt = 'likes';
                likesImg.classList.add('likes');

                const btnLikes = document.createElement('button');
                btnLikes.classList.add('btn-likes')
                btnLikes.appendChild(likesImg);


                const containerLikes = document.createElement('div');
                containerLikes.appendChild(likesElement);
                containerLikes.appendChild(btnLikes);

                const containerTitle = document.createElement('div');
                containerTitle.classList.add('container-title');
                containerTitle.appendChild(titleElement);
                containerTitle.appendChild(containerLikes);



                const a = document.createElement('a');
                a.setAttribute('href', '#');
                a.classList.add('media');


                a.appendChild(imgElement);

                const article = document.createElement('article');
                article.appendChild(a);
                article.appendChild(containerTitle);


                mediaSection.append(article);
            }



        } else if (e.currentTarget.options[select.selectedIndex].value === 'date') {
            console.log('je suis dans date');
            function comparerDates(objetA, objetB) {
                const dateA = new Date(objetA.date);
                const dateB = new Date(objetB.date);

                return dateB - dateA;
            }
            mediaFiltre.sort(comparerDates);

            let mediaSection = document.querySelector('.section-media');
            mediaSection.innerHTML = "";
            for (let i = 0; i < mediaFiltre.length; i++) {
                const img = mediaFiltre[i].image;
                const path = 'assets/images/' + name + '/' + img;
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', path);
                imgElement.alt = mediaFiltre[i].title;
                imgElement.classList.add('vignette')
                const title = mediaFiltre[i].title;
                const titleElement = document.createElement('p');
                titleElement.textContent = title;

                const likes = mediaFiltre[i].likes;
                likesElement = document.createElement('span');
                likesElement.textContent = likes;

                const likesImg = document.createElement('img');
                likesImg.setAttribute('src', 'assets/icons/heart.svg');
                likesImg.alt = 'likes';
                likesImg.classList.add('likes');

                const btnLikes = document.createElement('button');
                btnLikes.classList.add('btn-likes')
                btnLikes.appendChild(likesImg);


                const containerLikes = document.createElement('div');
                containerLikes.appendChild(likesElement);
                containerLikes.appendChild(btnLikes);

                const containerTitle = document.createElement('div');
                containerTitle.classList.add('container-title');
                containerTitle.appendChild(titleElement);
                containerTitle.appendChild(containerLikes);



                const a = document.createElement('a');
                a.setAttribute('href', '#');
                a.classList.add('media');


                a.appendChild(imgElement);

                const article = document.createElement('article');
                article.appendChild(a);
                article.appendChild(containerTitle);


                mediaSection.append(article);
            }

        } else if (e.currentTarget.options[select.selectedIndex].value === "titre") {
            console.log('je suis dans titre');
            function comparerOrdreAlphabetique(objetA, objetB) {
                const nomA = objetA.title;
                const nomB = objetB.title;

                if (nomA < nomB) {
                    return -1; // A vient avant B
                } else if (nomA > nomB) {
                    return 1; // B vient avant A
                } else {
                    return 0; // Les noms sont égaux
                }
            }

            mediaFiltre.sort(comparerOrdreAlphabetique);
            let mediaSection = document.querySelector('.section-media');
            mediaSection.innerHTML = "";
            for (let i = 0; i < mediaFiltre.length; i++) {
                const img = mediaFiltre[i].image;
                const path = 'assets/images/' + name + '/' + img;
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', path);
                imgElement.alt = mediaFiltre[i].title;
                imgElement.classList.add('vignette')
                const title = mediaFiltre[i].title;
                const titleElement = document.createElement('p');
                titleElement.textContent = title;

                const likes = mediaFiltre[i].likes;
                likesElement = document.createElement('span');
                likesElement.textContent = likes;

                const likesImg = document.createElement('img');
                likesImg.setAttribute('src', 'assets/icons/heart.svg');
                likesImg.alt = 'likes';
                likesImg.classList.add('likes');

                const btnLikes = document.createElement('button');
                btnLikes.classList.add('btn-likes')
                btnLikes.appendChild(likesImg);


                const containerLikes = document.createElement('div');
                containerLikes.appendChild(likesElement);
                containerLikes.appendChild(btnLikes);

                const containerTitle = document.createElement('div');
                containerTitle.classList.add('container-title');
                containerTitle.appendChild(titleElement);
                containerTitle.appendChild(containerLikes);



                const a = document.createElement('a');
                a.setAttribute('href', '#');
                a.classList.add('media');


                a.appendChild(imgElement);

                const article = document.createElement('article');
                article.appendChild(a);
                article.appendChild(containerTitle);


                mediaSection.append(article);
            }


        }


    })
}


async function main() {
    await getDetailsPhotographers();
    displayData();
    createEncart();
    orderBy();
}

main();