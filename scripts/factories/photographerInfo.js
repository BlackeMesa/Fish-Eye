function photographerInfoFactory(data) {
    
const { name, portrait, city, country, tagline, price } = data;


const picture = `assets/photographers/${portrait}`;

function getPhotographInfos() {
  const photographHeader = document.querySelector(".photograph-header");
  const likeAndPrice = document.querySelector(".like-and-price");
  const photographInfos = document.createElement("div");
  photographInfos.classList.add("photograph-infos");
  photographHeader.appendChild(photographInfos);
  const photographerName = document.createElement("h1");
  photographerName.classList.add("photographer-name");
  photographerName.textContent = name;
  photographInfos.append(photographerName);
  const photographerLocation = document.createElement("h2");
  photographerLocation.classList.add("photograph-location");
  photographerLocation.textContent = city + ", " + country;
  photographInfos.append(photographerLocation);
  const photographerTagLine = document.createElement("p");
  photographerTagLine.classList.add("photograph-tagline");
  photographerTagLine.textContent = tagline;
  photographInfos.append(photographerTagLine);
  const contactBtn = document.createElement("button");
  contactBtn.classList.add("contact_button");
  contactBtn.setAttribute("onclick", "displayModal()");
  contactBtn.setAttribute("aria-label", "Contactez-Moi");
  contactBtn.innerText = "Contactez-moi";
  photographHeader.appendChild(contactBtn);
  const photographerPortrait = document.createElement("img");
  photographerPortrait.classList.add("photograph-portrait");
  photographerPortrait.setAttribute("alt", "Portrait de " + name);
  photographerPortrait.setAttribute("src", picture);
  photographHeader.appendChild(photographerPortrait);
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
