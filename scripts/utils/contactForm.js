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
function checkCondition(condition) {
  if (!condition) return false;
  else return true;
}

// Send specific error message rather than elementId provided
// Add aria invalid for use CSS
function getErrorMessage(elementId, message, inputAssociate) {
  if (elementId && message) {
    elementId.style.display = "block";
    elementId.innerText = message;
    if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "true");
  } else throw new Error("Missing parameter for handler error message");
}

//2nd submit, hide a valid field previous invlid
// Swich aria invalid to false for use CSS
function hideErrorMessage(elementId, inputAssociate) {
  if (elementId) elementId.style.display = "none";
  if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "false");
}

function validate() {
  const form = document.getElementsByName("reserve");
  let firstNameValid = checkCondition(form[0][0]?.value) && checkCondition(form[0][0].value.length >= 2);
  firstNameValid ? hideErrorMessage(firstNameError, form[0][0]) : getErrorMessage(firstNameError, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form[0][0]);
  let lastNameValid = checkCondition(form[0][1]?.value) && checkCondition(form[0][1].value.length >= 2);
  lastNameValid ? hideErrorMessage(lastNameError, form[0][1]) : getErrorMessage(lastNameError, "Veuillez entrer 2 caractères ou plus pour le champ du nom.", form[0][1]);

  //https://regex101.com/
  let emailValid = checkCondition(form[0][2]?.value) && checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(form[0][2].value));
  emailValid ? hideErrorMessage(emailError, form[0][2]) : getErrorMessage(emailError, "Veuillez entrer une adresse mail valide.", form[0][2]);

if (firstNameValid && lastNameValid && emailValid ) {
  return true
}

}

// recuperation du formulaire dans la console
submitBtn.addEventListener("click", () => {
    if (validate() === true) {
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
