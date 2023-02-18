class Photographer {
  constructor(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    this.picture = `assets/photographers/${portrait}`;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.id = id;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
    <a href="/photographer.html?id=${this.id}">
      <div class="img-container">
        <img src="${this.picture}" alt="${this.name}">
      </div>
      <h2>${this.name}</h2>
    </a>
    <h3 class="localisation">${this.city}, ${this.country}</h3>
    <span class="description">${this.tagline}</span>
    <span class="totalPrice">${this.price}€/jour</span>
  `;
    return article;
  }
}
