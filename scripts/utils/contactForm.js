function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function validate() {

    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        message: message.value,
    }
    console.log(data);
}

async function getPhotographers() {
    const response = await fetch("../../data/photographers.json");
    const photographerData = await response.json();

    const url = new URL(window.location.href);

    // Récupérez les paramètres de l'URL
    const params = new URLSearchParams(url.search);

    // Récupérez la valeur du paramètre photographerId
    const id = params.get('id');

    const photographerFiltre = photographerData.photographers.filter(data => data.id === parseInt(id))[0];

    const namePhotographer = photographerFiltre.name;
    console.log(namePhotographer);

    const form = document.querySelector('.form-title');

    const h2 = form.closest('h2');
    h2.textContent = "Contactez-moi " + namePhotographer;

}

getPhotographers();











