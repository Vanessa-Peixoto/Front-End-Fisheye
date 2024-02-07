/**
 * @description 
 * @param {string: next|previous} action
 */
function handleSliderAction(action) {

    const mediaCurrent = document.querySelector('#slider .vignette.active');
    const mediaCurrentOrder = parseInt(mediaCurrent.getAttribute('data-order'));

    mediaCurrent.classList.remove('active');
    const tabMedia = document.querySelectorAll('#slider .vignette');

    let order = action === 'next' ? mediaCurrentOrder + 1 : mediaCurrentOrder - 1;

    if (action === 'next' && order > tabMedia.length - 1) {
        order = 0;
    } else if (action === 'previous' && order < 0) {
        order = tabMedia.length - 1;
    }

    const media = document.querySelector('#slider .vignette[data-order="' + order + '"]');

    media.classList.add('active');
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

async function prepareSlider() {
    const photographer = await getPhotographer();
    const media = photographer.media;

    const mediaElement = document.querySelectorAll('.media');
    for (let i = 0; i < mediaElement.length; i++) {
        mediaElement[i].addEventListener('click', (ev) => {
            const currentElement = ev.currentTarget.firstChild;
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';
            lightbox.classList.add('active');
            const slider = document.getElementById('slider');

            for (let i = 0; i < media.length; i++) {
                if (media[i].hasOwnProperty('image')) {
                    const img = media[i].image;
                    const path = 'assets/images/' + photographer.name + '/' + img;
                    const imgElement = document.createElement('img');
                    imgElement.setAttribute('src', path);
                    imgElement.alt = media[i].title;
                    imgElement.classList.add('vignette');
                    imgElement.setAttribute('data-order', i);

                    const currentOrder = currentElement.getAttribute('data-order');
                    if (currentOrder == i) {
                        imgElement.classList.add('active');
                    }

                    slider.appendChild(imgElement);
                }

            }

        })
    }
}

prepareSlider();