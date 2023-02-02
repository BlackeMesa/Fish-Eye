function totalLikes(pictures) {
  const totalLikes = document.querySelector(".like-count");

  let total = 0;

  // Pour chaque image, total = like de l'image qui s'additionne au prochain
  pictures.forEach((picture) => (total += Number(picture.likes)));
  totalLikes.textContent = total;
}
