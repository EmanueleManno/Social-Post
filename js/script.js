//# FUNZIONI

// aaaa-mm-dd
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const createCard = (post) => {
  const { image, id, likes, content, created, author } = post;
  const { name: authorName, image: authorImage } = author;

  return `  <!--POST-->
  <div class="post">

    <!--Header del post-->
    <div class="post__header">
      <div class="post-meta">
        <div class="post-meta__icon">
          <img
            class="profile-pic"
            src="${authorImage}"
            alt="${authorName}"
          />
        </div>
        <div class="post-meta__data">
          <div class="post-meta__author">${authorName}</div>
          <div class="post-meta__time">${formatDate(created)}</div>
        </div>
      </div>
    </div>

    <!--Contenuto del post-->
    <div class="post-content">
      <div class="post__text">${content}</div>
    </div>

    <!--Immagine del post-->
    <div class="post-image-area">
      <div class="post__image"><img src="${image}" alt="Immagine" /></div>
    </div>

    <!--Footer del post-->
    <div class="post__footer">
      <div class="likes js-likes">
        <div class="likes__cta">
          <button class="like-button js-like-button" data-postid="${id}">
            <i
              class="like-button__icon fas fa-thumbs-up"
              aria-hidden="true"
            ></i>
            <span class="like_button__label">Mi piace</span>
          </button>
        </div>
        <div class="likes__counter">
          Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
        </div>
      </div>
    </div>
  </div>
  `;
};

//_______________________
//# OPERAZIONI INIZIALI

//Recupero il container:
const postContainer = document.getElementById("container");

//Genero le card:
const cards = posts.reduce((result, post) => (result += createCard(post)), "");

//Inserisco in pagina le card:
postContainer.innerHTML = cards;

//_______________________
//# LIKE SUI BOTTONI

//Recupero tutti i bottoni:
const likeButtons = document.querySelectorAll(".js-like-button");

//Aggancio l'event listener a tutti i bottoni:
for (const button of likeButtons) {
  button.addEventListener("click", () => {
    //Aggiungo la classe cliccata:
    button.classList.toggle("like-button--liked");

    //Flag per capire se è stato cliccato o no:
    const isLiked = button.classList.contains("like-button--liked");

    const buttonText = isLiked ? "Mi Piace" : "Non Mi Piace";
    const buttonIcon = isLiked ? "fa-thumbs-up" : "fa-thumbs-down";

    button.innerHTML = `<i class="like-button__icon fas ${buttonIcon}" aria-hidden="true"></i><span class="like_button__label"> ${buttonText}</span>`;

    //Recuper il post id dal data-attribute:
    const postId = button.dataset.postid;

    //Recupero il contatore:
    const counter = document.getElementById(`like-counter-${postId}`);

    //Prendo il post di riferimento dall'array di post:
    const post = posts.find((post) => post.id == postId);

    //Recupero e modifico i like del post e li mostro in pagina:
    counter.innerText = isLiked ? ++post.likes : --post.likes;
  });
}
