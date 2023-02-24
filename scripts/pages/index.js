async function getPhotographersData() {
  
 return fetch("data/photographers.json")
    .then((resp) => resp.json())
    .then((data) => {
      return data
    });
    
}


async function displayData(photographers) {
  
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerCard = new Photographer(photographer);
    const card = photographerCard.getUserCardDOM();
    photographersSection.appendChild(card);
  });
}

async function init() {
  // Récupère les datas des photographes
  const  {photographers}  = await getPhotographersData();
  displayData(photographers);
}

init();

