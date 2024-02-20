/**
 * @description Manage slider navigation
 * @param {string: next|previous} action
 */
function handleSliderAction(action) {
    //recover the current element
    const currentContainer = document.querySelector('#slider div.active');
    const mediaCurrent = currentContainer.querySelector('.vignette');
    const mediaCurrentOrder = parseInt(mediaCurrent.getAttribute('data-order'));
    currentContainer.classList.remove('active');
    const tabMedia = document.querySelectorAll('#slider div');

    //create variable which indicate the action
    let order = action === 'next' ? mediaCurrentOrder + 1 : mediaCurrentOrder - 1;

    if (action === 'next' && order > tabMedia.length - 1) {
        order = 0;
    } else if (action === 'previous' && order < 0) {
        order = tabMedia.length - 1;
    }

    const media = document.querySelector('#slider div .vignette[data-order="' + order + '"]');
    media.parentElement.classList.add('active');
    media.focus();
}

//Create variable which listen to click
const nextBtn = document.getElementById('chevron-right');
nextBtn.addEventListener('click', handleSliderAction.bind(null, 'next'));

const previousBtn = document.getElementById('chevron-left');
previousBtn.addEventListener('click', handleSliderAction.bind(null, 'previous'));

document.addEventListener('keydown', handleActionKeydown);

/**
 * @description Manage slider with keyboard
 * @param {*} event 
 */
function handleActionKeydown(event) {
    if (event.keyCode === 39) {
        handleSliderAction('next');
    } else if (event.keyCode === 37) {
        handleSliderAction('previous');
    } else if (event.keyCode === 27) {
        closeLightbox();
    }
}

/**
 * @description Close the lightbox
 */
function closeLightbox() {
    const modal = document.getElementById("lightbox");
    modal.style.display = "none";
    const slider = document.getElementById('slider');
    slider.innerHTML = '';
}

/**
 * @description Create the slider elements
 * @param {Object[]} media
 * @param {string} photographerName
 * @param {Event} ev
 */
function createSliderElements(media, photographerName, ev) {
    //create variable which recover the current element
    const currentElement = ev.currentTarget.firstChild;
    //open the lightbox
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    const slider = document.getElementById('slider');

    //create new element in the slider
    for (let i = 0; i < media.length; i++) {
        const type = media[i].hasOwnProperty('image') ? 'image' : 'video';
        const mediaObject = new MediaFactory(media[i], photographerName, type);
        const article = mediaObject.createElement(i);
        const mediaElement = article.querySelector('.vignette');
        const title = mediaObject.title;
        const h6 = document.createElement('h6');
        h6.textContent = title;

        const containerSlider = document.createElement('div');
        containerSlider.appendChild(mediaElement);
        containerSlider.appendChild(h6);

        const currentOrder = currentElement.getAttribute('data-order');
        if (currentOrder == i) {
            containerSlider.classList.add('active');
        }
        slider.appendChild(containerSlider);
    }
}

/**
 * @description Prepare slider with data.json and add listener
 */
async function prepareSlider() {
    const photographer = await getPhotographer();
    const media = photographer.media;

    const mediaElement = document.querySelectorAll('.media');
    for (let i = 0; i < mediaElement.length; i++) {
        mediaElement[i].addEventListener('click', createSliderElements.bind(null, media, photographer.name))
    }
}

prepareSlider();