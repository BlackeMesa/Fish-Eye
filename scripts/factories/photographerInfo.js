function photographerInfoFactory(data) {
    
const { name, portrait, city, country, tagline, price } = data;


const picture = `assets/photographers/${portrait}`;

function getPhotographInfos() {
  const photographHeader = document.querySelector(".photograph-header");
  const likeAndPrice = document.querySelector(".like-and-price");

  // creation du container
  const photographInfos = document.createElement("div");
  photographInfos.classList.add("photograph-infos");
  photographHeader.appendChild(photographInfos);

  // affichage du nom
  const photographerName = document.createElement("h1");
  photographerName.classList.add("photographer-name");
  photographerName.textContent = name;
  photographInfos.append(photographerName);

  // affichage de la ville et du pays
  const photographerLocation = document.createElement("h2");
  photographerLocation.classList.add("photograph-location");
  photographerLocation.textContent = city + ", " + country;
  photographInfos.append(photographerLocation);

  // affichage de la tagline
  const photographerTagLine = document.createElement("p");
  photographerTagLine.classList.add("photograph-tagline");
  photographerTagLine.textContent = tagline;
  photographInfos.append(photographerTagLine);

  // affichage du bouton de contact
  const contactBtn = document.createElement("button");
  contactBtn.classList.add("contact_button");
  contactBtn.setAttribute("onclick", "displayModal()");
  contactBtn.innerText = "Contactez-moi";
  photographHeader.appendChild(contactBtn);

  // affichage de la photo
  const photographerPortrait = document.createElement("img");
  photographerPortrait.classList.add("photograph-portrait");
  photographerPortrait.setAttribute("alt", "Portrait de " + name);
  photographerPortrait.setAttribute("src", picture);
  photographHeader.appendChild(photographerPortrait);

  // affichage du prix dans l'onglet en bas
  const priceElement = document.createElement("div");
  const photographerPrice = document.createElement("h4");
  priceElement.classList.add("media-price");
  photographerPrice.textContent = price + "€/jour";
  likeAndPrice.appendChild(priceElement);
  priceElement.appendChild(photographerPrice);

  return photographInfos;
}

 return { getPhotographInfos };
}
