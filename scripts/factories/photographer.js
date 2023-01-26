function photographerFactory(data) {
    console.log(data);
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const containerImg = document.createElement('div');
        const img = document.createElement( 'img' );
        const localisationName = document.createElement( 'h3' );
        const description = document.createElement( 'span' );
        const totalPrice = document.createElement( 'span' );
        const link = document.createElement( 'a')
        localisationName.innerHTML= `${city}, ${country}`;
        description.innerHTML= tagline;
        totalPrice.innerHTML = `${price}€/jour`;
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        link.setAttribute("href", `/photographer.html?id=${id}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(link);
        link.appendChild(containerImg);
        containerImg.appendChild(img);
        link.appendChild(h2);
        article.appendChild(localisationName);
        article.appendChild(description);
        article.appendChild(totalPrice);

        return (article);
    }
    function getPhotographInfos() {
      const photographHeader = document.querySelector(".photograph-header");
      const main = document.querySelector("main");
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
    return {  getUserCardDOM, getPhotographInfos };
}