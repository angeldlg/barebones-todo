import TaskManager from "./TaskManager"

export default class UI {
  static initItems() {
    const clearCompletedButton = document.querySelector('[data-clear-completed]')
    const clearAllButton = document.querySelector('[data-clear-all]')
    const taskForm = document.querySelector('[data-task-form]')
    taskForm.addEventListener('submit', UI.handleTaskForm)
    clearAllButton.addEventListener('click', TaskManager.deleteAllTasks)
    clearCompletedButton.addEventListener('click', TaskManager.deleteCompletedTasks)
    UI.renderTasks()
  }

  static handleTaskForm(e) {
    if (e.target[0].value) TaskManager.addTask(e.target[0].value, Date.now())
    e.target[0].value = null
    e.preventDefault()
  }

  static deleteAllTasks() {
    const taskList = document.querySelector('[data-tasks-ul]')
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }

  static renderTasks() {
    UI.deleteAllTasks()
    TaskManager.getTaskList().forEach(task => {
      const taskHtml = `
            <li data-task-li class="tasks__item">
              <label class="tasks__label">
                <input data-task-checkbox type="checkbox" class="tasks__input" id="${task.id}">
                <span class="tasks__checkbox"></span>
                <span class="tasks__text">${task.name}</span>
              </label>
              <button data-delete-button class="tasks__delete" id="${task.id}"></button>
            </li>`
      const tasksList = document.querySelector('[data-tasks-ul]')
      tasksList.insertAdjacentHTML('beforeend', taskHtml)
      //
      const deleteButton = document.querySelector(`[data-delete-button][id="${task.id}"]`)
      const checkboxInput = document.querySelector(`[data-task-checkbox][id="${task.id}"]`)
      checkboxInput.addEventListener('change', UI.handleTaskCheckbox)
      deleteButton.addEventListener('click', UI.deleteTask)
      checkboxInput.checked = task.completed
    })
  }

  static deleteTask(e) {
    TaskManager.deleteTask(e.target.id)
  }

  static handleTaskCheckbox(e) {
    TaskManager.checkTask(e)
  }
}
