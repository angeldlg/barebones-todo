const ul = document.querySelector('[data-ul-container]')
const input = document.querySelector('[data-input]')
const form = document.querySelector('[data-form]')
const clearButton = document.querySelector('[data-clear-completed]')
const clearAllButton = document.querySelector('[data-clear-all]')

// Function to create a new task
function makeTask(e) {
  e.preventDefault()
  if (input.value == '') return

  // Create the HTML for a new task item
  let li = `<li data-li-task>
              <button data-check-button class="material-symbols-rounded">circle</button>
              <span data-input-value>${input.value}</span>
              <button id="delete" class="material-symbols-rounded">delete</button>
            </li>`

  // Add the new task to the task list
  ul.insertAdjacentHTML('beforeend', li)
  input.value = ''
}

// Function to toggle the completion status of a task
function checkTask(button, nextSibling) {
  nextSibling.classList.toggle('line-through')

  // Toggle the icon and update the data attribute
  if (button.textContent == 'circle') {
    button.setAttribute('data-check', true)
    button.textContent = 'check'
  } else {
    button.setAttribute('data-check', false)
    button.textContent = 'circle'
  }
}

// Function to toggle the completion status of a task from the span element
function checkFromSpan(span, previousSibling) {
  span.classList.toggle('line-through')

  // Toggle the icon and update the data attribute
  if (previousSibling.textContent == 'circle') {
    previousSibling.setAttribute('data-check', true)
    previousSibling.textContent = 'check'
  } else {
    previousSibling.setAttribute('data-check', true)
    previousSibling.textContent = 'circle'
  }
}

// Function to handle task buttons (check, delete)
function taskButtons(e) {
  const nextSibling = e.target.nextElementSibling
  const previousSibling = e.target.previousElementSibling

  // Check if the clicked element is a delete button
  if (e.target.textContent == 'delete') {
    e.target.parentElement.remove()
  }

  // Check if the clicked element is a check or circle button
  if (e.target.textContent == 'circle' || e.target.textContent == 'check') {
    checkTask(e.target, nextSibling)
  }

  // Check if the clicked element is a span (task text)
  if (e.target.tagName == 'SPAN') {
    checkFromSpan(e.target, previousSibling)
  }
}

// Function to clear completed tasks
function clearCompleted() {
  const checked = document.querySelectorAll('[data-check="true"]')
  checked.forEach((z) => {
    z.parentElement.remove()
  })
}

// Function to clear all tasks
function clearAll() {
  const li = document.querySelectorAll('[data-li-task]')
  li.forEach((x) => {
    x.remove()
  })
}

// Event listeners
form.addEventListener('submit', makeTask)
clearButton.addEventListener('click', clearCompleted)
clearAllButton.addEventListener('click', clearAll)
ul.addEventListener('click', (e) => taskButtons(e))
