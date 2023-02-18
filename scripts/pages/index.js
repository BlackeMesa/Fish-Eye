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
    const photographerCard = new Photographer({
      name: photographer.name,
      portrait: photographer.portrait,
      id: photographer.id,
      city: photographer.city,
      country: photographer.country,
      tagline: photographer.tagline,
      price: photographer.price,
    });
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

