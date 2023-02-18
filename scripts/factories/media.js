function mediaFactory(data) {
  const { image, video, title, likes } = data;

  const mediaImage = `assets/medias/${image}`;
  const mediaVideo = `assets/medias/${video}`;

  function getMediasCardDOM() {
    // affichage de la gallerie
    const mediaSection = document.querySelector(".photograph-media");
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    const link = document.createElement("a");
    const mediaTitle = document.createElement("h3");
    const mediaLike = document.createElement("div");
    const totalLike = document.createElement("h4");
    const heartBtn = document.createElement("button");
    link.className = "gallery-link";
    link.setAttribute("title", title);
    caption.className = "figcaption";
    mediaTitle.className = "media-title";
    mediaTitle.innerHTML = title;
    mediaLike.classList.add("like-section");
    heartBtn.classList.add("fa-solid");
    heartBtn.classList.add("fa-heart");
    heartBtn.classList.add("heart-like");
    heartBtn.setAttribute("aria-label", "likes");
    totalLike.classList.add("total-like");
    totalLike.innerText = likes;
    mediaSection.appendChild(figure)
    figure.appendChild(link);
    figure.appendChild(caption);
    caption.appendChild(mediaTitle);
    caption.appendChild(mediaLike);
    mediaLike.appendChild(totalLike);
    mediaLike.appendChild(heartBtn);

    // S'il n'y a pas de vidéo, on crée une image. Sinon, on crée une vidéo.
    if (video == undefined) {
      const image = document.createElement("img");
      link.setAttribute("href", mediaImage);
      image.setAttribute("src", mediaImage);
      image.classList.add("img");
      image.setAttribute("alt", title);
      link.appendChild(image);
    } else {
      const video = document.createElement("video");
      const source = document.createElement("source");
      link.setAttribute("href", mediaVideo);
      source.setAttribute("src", mediaVideo);
      video.setAttribute("controls", "controls");
      video.classList.add("video");
      source.setAttribute("type", "video/mp4");
      link.appendChild(video);
      video.appendChild(source);
    }

    return mediaSection;
  }

  return { getMediasCardDOM };
}
