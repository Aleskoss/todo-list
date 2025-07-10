import { ToDo } from "./create-todo"
import { loadFromLocalStorage, saveToLocalStorage} from './local-storage'

export class Projects {
  static projects = loadFromLocalStorage() || []
  constructor(title,dueDate){
    this.title = title
    this.dueDate = dueDate
    this.toDos = []
  }
}

export const toDoAdder = (currentProject) => {
  currentProject.toDos.push(new ToDo("sadasd","sadawd","sadasd","sadsad"))
}
export const projectAdder = (title,dueDate) => {
  Projects.projects.push(new Projects(title.toLowerCase(),dueDate))  
}
export const projectOpener = (title) => {
  let currentProject
  const openedProject = title.toLowerCase()
  Projects.projects.map(projectItem => {
    if(projectItem.title === openedProject){
      currentProject = projectItem
    }
  })
  return currentProject
}
const toDoSaver = {
  saveToDos(currentProject,container){
    currentProject.toDos.splice(0,currentProject.toDos.length)
    container.forEach(element => {
      currentProject.toDos.push(new ToDo(element.childNodes[1].value,element.childNodes[2].value,element.childNodes[3].value,element.childNodes[4].value,element.childNodes[0].checked))
    });
    saveToLocalStorage()
  }
}

Object.assign(Projects,toDoSaver)