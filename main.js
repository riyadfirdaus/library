let myLibrary = [];

book = new Book(["The hobbit", "J.R.R Tolkien", 195, true]);
myLibrary.push(book);

function removeBook(id) {
  id = parseInt(id);
  const newLibrary = myLibrary.filter((book, key) => {
    return key !== id;
  });
  myLibrary = newLibrary;
  updateLibrary();
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openBtn = document.getElementById("add-btn");
const closeBtn = document.querySelector(".close-btn");
const libraryDisplay = document.querySelector(".library");
const submitBtn = document.querySelector(".submit-btn");
const form = document.getElementById("book-form");

function Book([title, author, pages, read]) {
  this.title = title;
  this.author = author;
  this.pages = parseInt(pages);
  this.read = read === "true" || read === true;
  this.info = function () {
    let s = "";
    if (this.read) {
      s = "have been read";
    } else {
      s = "not read yet";
    }
    return `${title} by ${author}, ${pages} page(s), ${s}`;
  };
  this.param = function () {
    return [this.title, this.author, this.pages, this.read];
  };
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  form.reset();
}

function createSlider(parameter, key) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = parameter;
  input.id = key;

  const span = document.createElement("span");
  span.className = "slider rounded";

  label.append(input, span);
  input.addEventListener("click", () => {
    myLibrary[key].read = !myLibrary[key].read;
  });
  return label;
}

function createDeleteButton(key) {
  const button = document.createElement("button");
  button.className = "delete-btn";
  button.id = key;
  const i = document.createElement("i");
  i.id = key;
  i.className = "fa fa-trash";
  button.appendChild(i);

  button.addEventListener("click", (e) => {
    removeBook(e.target.id);
  });
  return button;
}

function updateLibrary() {
  let bookTable = document.querySelector(".book-table");

  //   Create Header
  bookTable.innerHTML =
    "<tr>" +
    "   <th>No</th>" +
    "   <th>Title</th>" +
    "   <th>Author</th>" +
    "   <th>Pages</th>" +
    "   <th>Read yet</th>" +
    "   <th>Action</th>" +
    "</tr>";

  //Create Row
  myLibrary.forEach((item, key) => {
    row = document.createElement("tr");
    let cell = document.createElement("td");

    cell.appendChild(document.createTextNode(key + 1));
    row.appendChild(cell);

    item.param().forEach((parameter, index) => {
      cell = document.createElement("td");
      if (index == 3) {
        // Jika di kolom read
        cell.appendChild(createSlider(parameter, key));
      } else {
        cell.appendChild(document.createTextNode(parameter));
      }
      row.appendChild(cell);
    });

    //Add Button
    cell = document.createElement("td");
    cell.appendChild(createDeleteButton(key));
    row.appendChild(cell);

    //Append row to book Table
    bookTable.appendChild(row);
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
