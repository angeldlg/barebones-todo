const ul = document.querySelector("[data-ul-container]");
const input = document.querySelector("[data-input]");
const form = document.querySelector("[data-form]");

function makeTask(e) {
  e.preventDefault();
  if (input.value == "") return;
  let li = `<li>
              <button class="material-symbols-rounded">circle</button>
              <span data-input-value>${input.value}</span>
              <button id="delete" class="material-symbols-rounded">delete</button>
            </li>`;

  ul.insertAdjacentHTML("beforeend", li);
  input.value = "";
}

function deleteTask(task) {
  task.remove();
}

function checkTask(button, nextSibling) {
  nextSibling.classList.toggle("line-through");
  if (button.textContent == "circle") {
    button.textContent = "check";
  } else {
    button.textContent = "circle";
  }
}

function checkFromSpan(span, previousElement) {
  span.classList.toggle("line-through");
  if (previousElement.textContent == "circle") {
    previousElement.textContent = "check";
  } else {
    previousElement.textContent = "circle";
  }
}

function taskButtons(e) {
  const nextSibling = e.target.nextElementSibling;
  const previousElement = e.target.previousElementSibling;

  if (e.target.textContent == "delete") {
    deleteTask(e.target.parentElement);
  }
  if (e.target.textContent == "circle" || e.target.textContent == "check") {
    checkTask(e.target, nextSibling);
  }

  if (e.target.tagName == "SPAN") {
    checkFromSpan(e.target, previousElement);
    console.log(previousElement);
  }
}

form.addEventListener("submit", makeTask);
ul.addEventListener("click", (e) => {
  taskButtons(e);
});
