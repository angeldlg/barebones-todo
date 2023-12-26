class UI {
  static initItems() {
    const taskForm = document.querySelector('[data-task-form]')
    const clearAllButton = document.querySelector('[data-clear-all]')
    const clearCompletedButton = document.querySelector('[data-clear-completed]')
    clearCompletedButton.addEventListener('click', TaskManager.deleteCompletedTasks)
    clearAllButton.addEventListener('click', TaskManager.deleteAllTasks)
    taskForm.addEventListener('submit', UI.handleTaskForm)
    UI.renderTasks()
  }

  static handleTaskForm(e) {
    if (e.target[0].value) TaskManager.addTask(e.target[0].value, Date.now())
    e.target[0].value = null
    e.preventDefault()
  }

  static renderTasks() {
    UI.deleteTasks()
    TaskManager.getTaskList().forEach((task) => {
      const taskTemplate = document.querySelector('[data-task-template]')
      const taskElement = document.importNode(taskTemplate.content, true)
      const deleteButton = taskElement.querySelector('[data-delete-button]')
      const checkboxInput = taskElement.querySelector('[data-task-checkbox]')
      const taskText = taskElement.querySelector('[data-input-value]')
      const taskList = document.querySelector('[data-tasks-ul]')
      checkboxInput.addEventListener('change', TaskManager.checkTask)
      deleteButton.addEventListener('click', TaskManager.deleteTask)
      deleteButton.id = task.id
      checkboxInput.id = task.id
      checkboxInput.checked = task.completed
      taskText.append(task.name)
      taskList.appendChild(taskElement)
    })
  }

  static deleteTasks() {
    const taskList = document.querySelector('[data-tasks-ul]')
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }
}

class Task {
  constructor(name, id) {
    this.id = id
    this.name = name
    this.completed = false
  }
}

class TaskManager {
  static taskList = [
    { id: 1, name: 'Finish the to do app', completed: true },
    { id: 2, name: 'Reach the end of thought', completed: false },
  ]

  static addTask(name, id) {
    TaskManager.taskList.push(new Task(name, id))
    UI.renderTasks()
  }

  static deleteTask(e) {
    const selectedTask = TaskManager.taskList.find((task) => Number(e.target.id) === task.id)
    const index = TaskManager.taskList.findIndex((task) => task === selectedTask)

    TaskManager.taskList.splice(index, 1)
    UI.renderTasks()
  }

  static checkTask(e) {
    const selectedTask = TaskManager.taskList.find((task) => Number(e.target.id) === task.id)
    selectedTask.completed = e.target.checked
  }

  static deleteAllTasks() {
    TaskManager.taskList = []
    UI.renderTasks()
  }

  static deleteCompletedTasks() {
    const uncompletedTasks = TaskManager.taskList.filter((task) => !task.completed)
    TaskManager.taskList = uncompletedTasks
    UI.renderTasks()
  }

  static getTaskList = () => TaskManager.taskList
}

UI.initItems()
