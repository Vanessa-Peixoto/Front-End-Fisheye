document.addEventListener('keydown', handleActionKeydown);

function handleActionKeydown(ev) {
    if(ev.keyCode === 27) {
        closeModal();
    }
}

/**
 * @description Open the contact modal
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    
}

/**
 * @description Close the contact modal
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

/**
 * @description Validate the data in form
 */
function validate() {

    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        message: message.value,
    }
    console.log(data);
}

/**
 * @description Recover the photographer data
 */
async function getPhotographers() {
    const photographerData = await getPhotographer()
    const namePhotographer = photographerData.photographerFiltre.name;
    const form = document.querySelector('.form-title');
    const h2 = form.closest('h2');
    h2.textContent = "Contactez-moi " + namePhotographer;
}

getPhotographers();











