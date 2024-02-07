/**
 * @description 
 * @param {string: next|previous} action
 */
function handleSliderAction(action) {
    const currentContainer = document.querySelector('#slider div.active');
    const mediaCurrent = currentContainer.querySelector('.vignette');
    const mediaCurrentOrder = parseInt(mediaCurrent.getAttribute('data-order'));

    currentContainer.classList.remove('active');
    const tabMedia = document.querySelectorAll('#slider div');

    let order = action === 'next' ? mediaCurrentOrder + 1 : mediaCurrentOrder - 1;

    if (action === 'next' && order > tabMedia.length - 1) {
        order = 0;
    } else if (action === 'previous' && order < 0) {
        order = tabMedia.length - 1;
    }

    const media = document.querySelector('#slider div .vignette[data-order="' + order + '"]');
    media.parentElement.classList.add('active');
}

const nextBtn = document.getElementById('chevron-right');
nextBtn.addEventListener('click', handleSliderAction.bind(null, 'next'));

const previousBtn = document.getElementById('chevron-left');
previousBtn.addEventListener('click', handleSliderAction.bind(null, 'previous'));

function closeLightbox() {
    const modal = document.getElementById("lightbox");
    modal.style.display = "none";
    const slider = document.getElementById('slider');
    slider.innerHTML = '';
}

function createSliderElements(media, photographerName, ev) {
    const currentElement = ev.currentTarget.firstChild;
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    const slider = document.getElementById('slider');

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

async function prepareSlider() {
    const photographer = await getPhotographer();
    const media = photographer.media;

    const mediaElement = document.querySelectorAll('.media');
    for (let i = 0; i < mediaElement.length; i++) {
        mediaElement[i].addEventListener('click', createSliderElements.bind(null, media, photographer.name))
    }
}

prepareSlider();