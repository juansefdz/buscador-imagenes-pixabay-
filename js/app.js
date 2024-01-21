//selectores

const contenedorBuscador = document.querySelector(".search_zone");
const contenedorImagenes = document.querySelector(".image_zone");
const textImages = document.querySelector(".image_text");

//zona imagenes elementos
const TextBoxPeliculas = document.createElement("textarea");
const labelPeliculas = document.createElement("label");
const btnBusqueda = document.createElement("button");

labelPeliculas.textContent = "INGRESA QUE DESEAS BUSCAR";
btnBusqueda.textContent = "BUSCAR";

contenedorBuscador.appendChild(labelPeliculas);
contenedorBuscador.appendChild(TextBoxPeliculas);
contenedorBuscador.appendChild(btnBusqueda);

let mesage;
TextBoxPeliculas.addEventListener("input", (e) => {
  mesage = e.target.value;
  getImages();
});

btnBusqueda.addEventListener("click", (event) => {
  event.preventDefault();
});

//obtener imagenes

async function getImages() {
  const URL = `https://pixabay.com/api/?key=41911978-130c602cb0b54b6cd3a2d6726&q=${mesage}`;
  const response = await fetch(URL);
  const data = await response.json();

  printImages(data.hits);
}

function printImages(images) {
  clearHTML();

  if (!images) {
    const titleAlert = document.createElement("h2");
    titleAlert.textContent = "¡No se encontraron imagenes! ";
    titleAlert.classList.add("alert");
    contenedorImagenes.appendChild(titleAlert);
    return;
  }
  images.forEach((img) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card");
    imageContainer.innerHTML = `<img src="${img.previewURL}" alt="image" />`;
    contenedorImagenes.appendChild(imageContainer);
  });
}

function clearHTML() {
  while (contenedorImagenes.firstChild) {
    contenedorImagenes.removeChild(contenedorImagenes.firstChild);
  }
}
