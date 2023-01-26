//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerData() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

  return fetch("data/photographers.json")
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });

}



function displayData(photographers, medias) {
  let urlParams = new URLSearchParams(location.search);
  let id = urlParams.get("id");

  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      
      const photographerModel = photographerFactory(photographer);
      
      photographerModel.getPhotographInfos();
      
    }
  });
  console.log(medias);
  medias.forEach((media) => {
    if (media.photographerId== id ) {
      const photographerCreation = mediaFactory(media);
      photographerCreation.getMediasCardDOM();
    }
  });

  
}


async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographerData();
  
  displayData(photographers, media);
  
}

init();