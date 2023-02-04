function photographerFactory(data) {
    
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
        localisationName.className = "localisation";
        description.className = "description";
        totalPrice.className = "totalPrice";
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
    
    return {  getUserCardDOM };
}