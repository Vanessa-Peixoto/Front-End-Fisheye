function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


/**
 * @description Function which check value in name field
 * @param {*} element 
 * @returns boolean
 */
function checkNameValue(element) {
    //condition if element is not empty and >2
    const nameRegex = new RegExp('^[a-zA-Z]+$');
    return element.value !== '' && element.value.length >= 2 && nameRegex.test(element.value);
}

/**
 * @description Function which check value in email field
 * @param {*} element 
 * @returns boolean
 */
function checkEmailValue(element) {
    //new regex to verify the email
    const emailRegex = new RegExp("[a-zA-Z.-_0-9]+@[a-zA-Z.-_0-9]+\\.[a-zA-Z.-_]+");
    return emailRegex.test(element.value);
}

/**
 * @description Function which check value in message field
 * @param {*} element 
 * @returns boolean
 */
function checkMessageValue(element) {
    //condition if element is not empty and >2
    return element.value !== '' && element.value.length >= 2;
}



/**
 * @description Function that checks if element is valid and add show/remove an error message
 * @param {*} element 
 * @param {function} validationFunction 
 * @param {string} message 
 * @returns boolean
 */
function validateField(element, validationFunction, message) {
    //the field is validated by default
    let isVerified = true;

    //if function which check element is false
    if (!validationFunction(element)) {
        isVerified = false
        //show the error message
        showErrorMessage(element, message)
    } else {
        //when it's ok, remove the error
        removeError(element)
    }
    //get field status
    return isVerified
}

/**
 * @description Function which verify field with the listener change
 */
function verifyFields() {
    //Select elements
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    //For each element, add a listener change
    firstname.addEventListener('input', (e) => {
        //Call function which verify the value on field and add the error message
        validateField(e.target, checkNameValue, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.')
    })

    lastname.addEventListener('input', (e) => {
        validateField(e.target, checkNameValue, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.')
    })

    email.addEventListener('input', (e) => {
        validateField(e.target, checkEmailValue, 'Veuillez entrer un email valide.')
    })

    message.addEventListener('input', (e) => {
        validateField(e.target, checkMessageValue, 'Vous devez écrire un message de plus de 2 caractères.')
    })

}

verifyFields()

/**
 * @description Function validate form
 * @returns boolean
 */
function validate() {
    //Select element
    const firstname = document.getElementById('firstname')
    //Call the function which check the field
    validateField(firstname, checkNameValue, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.')

    const lastname = document.getElementById('lastname')
    validateField(lastname, checkNameValue, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.')

    const email = document.getElementById('email')
    validateField(email, checkEmailValue, 'Veuillez entrer un email valide.')

    const message = document.getElementById('message')
    validateField(birthdate, checkMessageValue, 'Veuillez écrire un message de plus de 2 caractères.')

    //create data object with each value of the form
    const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        message: message.value,
    }
    console.log(data)
}
