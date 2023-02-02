class Lightbox {
  static init() {
    // récupération des liens des images
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const images = links.map((link) => link.getAttribute("href"));
    // récupération des textes alternatifs des images
    const altImg = Array.from(document.querySelectorAll(".img, .video"));
    const alt = altImg.map((text) => text.getAttribute("alt"));
    let main = document.querySelector("#main");
console.log(links);
    // pour chaque lien d'image/vidéo cliqué
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        // on empêche le comportement par défaut
        e.preventDefault();
        // On instencie une nouvelle Lightbox (url = current target, image et alt)
        new Lightbox(e.currentTarget.getAttribute("href"), images, alt);
        console.log(new Lightbox(e.currentTarget.getAttribute("href"), images, alt));
        main.setAttribute("aria-hidden", true);
      })
    );
  }


  constructor(url, images, alt) {
    this.images = images;
    this.alt = alt;
    this.element = this.buildLightbox(url);
    // si l'url termine par MP4
    if (url.split(".").pop() == "mp4") {
      // on load la video à partir de l'url
      this.loadVideo(url);
    } else {
      // sinon on load l'image à partir de l'url
      this.loadImage(url, alt);
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  // chargement de l'image
  loadImage(url, alt) {
    this.url = null;
    const image = document.createElement("img");
    const container = this.element.querySelector(".lightbox-container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.innerHTML = "";
    image.setAttribute("alt", alt);
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  // chargement de la vidéo
  loadVideo(url) {
    this.url = url;
    const video = document.createElement("video");
    const source = document.createElement("source");
    video.setAttribute("controls", "controls");
    video.classList.add("video");
    source.type = "video/mp4";
    source.src = url;
    const container = this.element.querySelector(".lightbox-container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.innerHTML = "";
    video.appendChild(source);
    container.appendChild(video);
  }

  // Ferme la lightbox
  close(e) {
    let main = document.querySelector("#main");
    e.preventDefault();
    this.element.classList.add("closed");
    main.setAttribute("aria-hidden", false);
    window.setTimeout(() => {
      this.element.remove();
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  // Navigation à la prochaine image/vidéo
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((img) => img === this.url);
    // si le type de la prochaine image/vidéo n'est pas undefined, alors on passe à la prochaine
    if (typeof this.images[i + 1] !== "undefined") {
      if (this.images[i + 1].split(".").pop() == "mp4") {
        this.loadVideo(this.images[i + 1]);
      } else {
        this.loadImage(this.images[i + 1], this.alt[i + 1]);
      }
    }
  }

  // Navigation à l'image/vidéo précédente
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((img) => img === this.url);
    // si le type de l'image/vidéo précédente n'est pas undefined, alors on passe à la précédente
    if (typeof this.images[i - 1] !== "undefined") {
      if (this.images[i - 1].split(".").pop() == "mp4") {
        this.loadVideo(this.images[i - 1]);
      } else {
        this.loadImage(this.images[i - 1], this.alt[i - 1]);
      }
    }
  }

  // Gestion de la lightbox au clavier
  onKeyUp(e) {
    if (e.key == "Escape") {
      this.close(e);
    } else if (e.key == "ArrowLeft") {
      this.prev(e);
    } else if (e.key == "ArrowRight") {
      this.next(e);
    }
  }

  // Construction de la Lightbox dans le DOM
  buildLightbox(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.setAttribute("role", "dialog");
    dom.setAttribute("aria-label", "lightbox");
    dom.innerHTML = `<button class="lightbox-close">Fermer</button>
        <button class="lightbox-next">Suivant</button>
        <button class="lightbox-prev">Précent</button>
        <div class="lightbox-container">
            <img src="${url}" alt="">
        </div>`;

    // Bind des method de fermeture/suivant/précédent avec les boutons présents sur la page
    dom.querySelector(".lightbox-close").addEventListener("click", this.close.bind(this));
    dom.querySelector(".lightbox-next").addEventListener("click", this.next.bind(this));
    dom.querySelector(".lightbox-prev").addEventListener("click", this.prev.bind(this));

    return dom;
  }
}
