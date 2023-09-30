const input = document.querySelector("input");
const list = document.querySelector(".list");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector(".clearBtn");
const check = document.querySelectorAll(".check");
const trash = document.querySelectorAll(".trash");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    const newUl = document.createElement("ul");

    const newLi = document.createElement("li");
    newLi.textContent = input.value;

    const newP = document.createElement("p");
    newP.textContent = "radio_button_unchecked";

    const newTrshBtn = document.createElement("button");
    newTrshBtn.textContent = "close";

    newP.classList.add("material-symbols-outlined");
    newTrshBtn.classList.add("trash", "material-symbols-outlined");

    newUl.appendChild(newP);
    newUl.appendChild(newLi);
    newUl.appendChild(newTrshBtn);
    list.appendChild(newUl);

    newTrshBtn.addEventListener("click", () => {
      newUl.remove();
    });

    newP.addEventListener("click", () => {
      newP.classList.toggle("check");
      newLi.classList.toggle("checked");
      newUl.classList.toggle("ulChecked");
      if (newP.textContent === "done") {
        return (newP.textContent = "radio_button_unchecked");
      }
      newP.textContent = "done";
    });
    newLi.addEventListener("click", () => {
      newP.classList.toggle("check");
      newLi.classList.toggle("checked");
      newUl.classList.toggle("ulChecked");
      if (newP.textContent === "done") {
        return (newP.textContent = "radio_button_unchecked");
      }
      newP.textContent = "done";
    });
  }
  input.value = "";
});

clearBtn.addEventListener("click", () => {
  const ulChecked = document.querySelectorAll(".ulChecked");
  ulChecked.forEach((ulChecked) => {
    ulChecked.remove();
  });
});