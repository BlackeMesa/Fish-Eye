
async function getPhotographerData() {
  return fetch("data/photographers.json")
    .then((resp) => resp.json())
    .then((data) => {
     return data
    });

}

let urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");


function displayData(photographers) {
  photographers.forEach((photographer) => {
    if (photographer.id == id) {

      const photographerModel = photographerInfoFactory(photographer);
      photographerModel.getPhotographInfos();
      
      const contactModel = contactFactory(photographer);
      contactModel.getContactCardDOM();   
    }
  });
}

function displayMedias(medias) {
  const mediaSection = document.querySelector(".photograph-media");
  mediaSection.innerHTML = "";
  let pictures = [];
  medias.forEach((media) => {
    if (media.photographerId == id ) {
      pictures.push(media);
      const photographerCreation = mediaFactory(media);
      photographerCreation.getMediasCardDOM();
      filterMedias(pictures);
      totalLikes(pictures);
      
    }
  });

  
}

// fonction pour gérer les likes 

function likeCounter() {
  const likeButton = document.querySelectorAll(".heart-like"); 
  const totalLike = document.querySelector(".like-count"); 

  for (let i = 0; i < likeButton.length; i++) {
    let btnLike = likeButton[i]; 

    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("liked"); 
      let counter = btnLike.parentElement.children[0]; 

      if (btnLike.classList.contains("liked")) {
        counter.textContent = Number(counter.textContent) + 1; 
        totalLike.textContent = Number(totalLike.textContent) + 1; 
        console.log("ajout +1")
      } else {
        counter.textContent = Number(counter.textContent) - 1; 
        totalLike.textContent = Number(totalLike.textContent) - 1; 
        console.log("retrait -1");
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
    likeCounter();
    Lightbox.init();
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