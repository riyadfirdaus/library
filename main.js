let myLibrary = [];

book = new Book(["The hobbit", "J.R.R Tolkien", 195, true]);
myLibrary.push(book);

function Book([title, author, pages, read]) {
  this.title = title;
  this.author = author;
  this.pages = parseInt(pages);
  this.read = read === "true";
  this.info = function () {
    let s = "";
    if (this.read) {
      s = "have been read";
    } else {
      s = "not read yet";
    }
    return `${title} by ${author}, ${pages} page(s), ${s}`;
  };
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openBtn = document.getElementById("add-btn");
const closeBtn = document.querySelector(".close-btn");
const libraryDisplay = document.querySelector(".library");
const submitBtn = document.querySelector(".submit-btn");
const form = document.getElementById("book-form");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  form.reset();
}

function updateLibrary() {
  let div = document.createElement("div");
  let p = document.createElement("p");
  myLibrary.forEach((item) => {
    p.textContent = item.info();
    libraryDisplay.appendChild(p);
  });
}

function callbackFunction(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const param = [];
  formData.forEach((value) => {
    param.push(value);
  });

  const book = new Book(param);
  myLibrary.push(book);
  updateLibrary();
  closeModal();
}
updateLibrary();

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
form.addEventListener("submit", callbackFunction);
