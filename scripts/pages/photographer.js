
async function getPhotographerData() {
  return fetch("data/photographers.json")
    .then((resp) => resp.json())
    .then((data) => {

     const medias = data.media;

     // Je vérifie que l'url contient l'id du photographe
     let mediaId = new URLSearchParams(window.location.search).get("id");
     // Je stock les bonnes photos dans la variable pictures
      
     const pictures = medias.filter((ID) => ID.photographerId == mediaId);

     // Affichage de la gallerie d'image
    //  displayMedias(pictures);

     // Gestion des filtres par titre/date/popularité
     filterMedias(pictures);

     // Affichage du compteur de like en bas de page
     totalLikes(pictures);
    
     return data
    });

}

let urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");


function displayData(photographers) {
  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      
      const photographerModel = photographerFactory(photographer);
      photographerModel.getPhotographInfos();
      
      
      const contactModel = contactFactory(photographer);
      contactModel.getContactCardDOM();   
    }
  });
}

function displayMedias(medias) {
  const mediaSection = document.querySelector(".photograph-media");
  mediaSection.innerHTML = "";
  medias.forEach((media) => {
    if (media.photographerId== id ) {
      const photographerCreation = mediaFactory(media);
      photographerCreation.getMediasCardDOM();
    }
  });

  
}

// fonction pour gérer les likes 

function likeCounter() {
  const likeButton = document.querySelectorAll(".heart-like"); // récupération du button coeur
  const totalLike = document.querySelector(".like-count"); // récupération des like total en bas de la page

  for (let i = 0; i < likeButton.length; i++) {
    let btnLike = likeButton[i]; // récupération de tous les boutons like de la page

    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("liked"); // on change la classe pour lui donner la classe "liked"
      let counter = btnLike.parentElement.children[0]; // récupération de l'input clické contenant le nombre de like

      if (btnLike.classList.contains("liked")) {
        counter.textContent = Number(counter.textContent) + 1; // on incrémente de 1 la valeur de l'input clické
        totalLike.textContent = Number(totalLike.textContent) + 1; // on incrémente de 1 la valeur des like total
      } else {
        counter.textContent = Number(counter.textContent) - 1; // on décrémente de 1 la valeur de l'input clické
        totalLike.textContent = Number(totalLike.textContent) - 1; // on décrémente de 1 la valeur des like total
      }
    });
  }
}

function filterMedias(pictures) {
  const filterSelect = document.getElementById("filter-select");

  filterSelect.addEventListener("change", () => {
    if (filterSelect.value == "popularite") {
      // Tri par popularité (du + au - liké)
      pictures = pictures.sort((a, b) => b.likes - a.likes);
      displayMedias(pictures);
    } else if (filterSelect.value == "titre") {
      // Tri par ordre alphabétique
      pictures = pictures.sort((a, b) => a.title.localeCompare(b.title));
      displayMedias(pictures);
    } else if (filterSelect.value == "date") {
      // Tri par date
      pictures = pictures.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      displayMedias(pictures);
    }
  });
}

async function init() {
  // Récupère les datas des photographes
   
  const { photographers, media } = await getPhotographerData();
  
 

  displayData(photographers);
  displayMedias(media);
  likeCounter();
  Lightbox.init();
}

init();