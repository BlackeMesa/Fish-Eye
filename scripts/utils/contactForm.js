//  dom elements
const main = document.querySelector("#main");
const modal = document.querySelector("#contact_modal");
const firstName = document.querySelector("#prenom");
const lastName = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("#form");
const closeBtn = document.querySelector(".close-btn");

//  message de succes
const success = document.querySelector(".success");
const successMessage = document.createElement("p");
success.appendChild(successMessage);
 
// messages d'erreur
const firstNameError = document.querySelector(".first-error");
const lastNameError = document.querySelector(".last-error");
const emailError = document.querySelector(".email-error");
const messageError = document.querySelector(".message-error");

// fonction ouverutre modale
function displayModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);
  firstName.focus();
}

//  fonction fermeture modale
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", false);
  success.style.display = "none";
  form.reset();
}

// fermeture avec touche echap
function keydown(e) {
  if (e.keyCode == 27) {
    closeModal();
  }
}

// affichage du nom du photographe
function contactFactory(data) {
    const { name } = data;

    function getContactCardDOM() {
        const contactForm = document.querySelector(".form-contact");
        const photographerName = document.createElement("h2");
        photographerName.textContent = name;

        contactForm.appendChild(photographerName);
    }

    return { name, getContactCardDOM };
}

//  fermeture modale souris
closeBtn.addEventListener("click", closeModal);

//  fermeture modale clavier
document.addEventListener("keydown", keydown);

// verification du formulaire
function checkContactForm() {
    let checkForm = true;
    if (firstName.value == "") {
        firstNameError.textContent = "Merci d'indiquer votre prénom";
        firstName.style.border = "solid 2px red";
        firstName.setAttribute("aria-invalide", true);
        checkForm = false;

    } else {
        firstNameError.textContent = "";
        firstName.style.border = "none";
        firstName.setAttribute("aria-invalide", false);


    }

    if (lastName.value == "") {
        lastNameError.textContent = "Merci d'indiquer votre nom";
        lastName.style.border = "solid 2px red";
        lastName.setAttribute("aria-invalide", true);
        checkForm = false;
    } else {
        lastNameError.textContent = "";
        lastName.style.border = "none";
        lastName.setAttribute("aria-invalide", false);
    }

    if (email.value == "") {
        emailError.textContent = "Merci d'indiquer votre adresse email";
        email.style.border = "solid 2px red";
        email.setAttribute("aria-invalide", true);
        checkForm = false;
    } else {
        emailError.textContent = "";
        email.style.border = "none";
        email.setAttribute("aria-invalide", false);
    }

    if (message.value == "") {
        messageError.textContent = "Merci d'indiquer votre message";
        message.style.border = "solid 2px red";
        message.setAttribute("aria-invalide", true);
        checkForm = false;
    } else {
        messageError.textContent = "";
        message.style.border = "none";
        message.setAttribute("aria-invalide", false);
    }

    return checkForm;
}

// recuperation du formulaire dans la console
submitBtn.addEventListener("click", () => {
    if (checkContactForm() === true) {
        success.style.display = "block";
        successMessage.focus();
        successMessage.textContent = "Votre message a bien été envoyé.";
        successMessage.style.color = "black";
        console.log("Prénom: " + firstName.value);
        console.log("Nom: " + lastName.value);
        console.log("Email: " + email.value);
        console.log("Message: " + message.value);
        form.reset();

    } else {
        console.log("Erreur de formulaire");
    }
});
