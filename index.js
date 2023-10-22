const ul = document.querySelector("[data-ul-container]");
const input = document.querySelector("[data-input]");
const form = document.querySelector("[data-form]");
const clearButton = document.querySelector("[data-clear-completed]");
const clearAllButton = document.querySelector("[data-clear-all]");

function makeTask(e) {
  e.preventDefault();
  if (input.value == "") return;
  let li = `<li data-li-task>
              <button data-check-button class="material-symbols-rounded">circle</button>
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
    button.setAttribute("data-check", true);
    button.textContent = "check";
  } else {
    button.setAttribute("data-check", false);
    button.textContent = "circle";
  }
}

function checkFromSpan(span, previousSibling) {
  span.classList.toggle("line-through");
  if (previousSibling.textContent == "circle") {
    previousSibling.setAttribute("data-check", true);
    previousSibling.textContent = "check";
  } else {
    previousSibling.setAttribute("data-check", true);
    previousSibling.textContent = "circle";
  }
}

function taskButtons(e) {
  const nextSibling = e.target.nextElementSibling;
  const previousSibling = e.target.previousElementSibling;

  if (e.target.textContent == "delete") {
    deleteTask(e.target.parentElement);
  }
  if (e.target.textContent == "circle" || e.target.textContent == "check") {
    checkTask(e.target, nextSibling);
  }

  if (e.target.tagName == "SPAN") {
    checkFromSpan(e.target, previousSibling);
  }
}

function clearCompleted() {
  const checked = document.querySelectorAll('[data-check="true"]');
  checked.forEach((z) => {
    z.parentElement.remove();
  });
}

function clearAll() {
  const li = document.querySelectorAll("[data-li-task]");

  li.forEach((x) => {
    x.remove();
  });
}

form.addEventListener("submit", makeTask);
clearButton.addEventListener("click", clearCompleted);
clearAllButton.addEventListener("click", clearAll);
ul.addEventListener("click", (e) => {
  taskButtons(e);
});
