import Task from './Task'
import UI from './UI'

export default class TaskManager {
  static taskList = [
    { id: 1, name: 'Finish to do app', completed: true },
    { id: 2, name: 'Reach the end of thought', completed: false },
  ]

  static addTask(name, id) {
    TaskManager.taskList.push(new Task(name, id))
    UI.renderTasks()
  }

  static deleteTask(i) {
    const index = TaskManager.taskList.findIndex(task => task.id === Number(i))
    TaskManager.taskList.splice(index, 1)
    UI.renderTasks()
  }

  static checkTask(e) {
    const selectedTask = TaskManager.taskList.find(task => Number(e.target.id) === task.id)
    selectedTask.completed = e.target.checked
  }

  static deleteAllTasks() {
    TaskManager.taskList = []
    UI.renderTasks()
  }

  static deleteCompletedTasks() {
    const uncompletedTasks = TaskManager.taskList.filter(task => !task.completed)
    TaskManager.taskList = uncompletedTasks
    UI.renderTasks()
  }

  static getTaskList = () => TaskManager.taskList
}
