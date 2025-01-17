/**
 * @description Recover the data.json
 */
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = await response.json();
    return photographers;
}

/**
 * @description Show the photographers data
 * @param {Object[]} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();