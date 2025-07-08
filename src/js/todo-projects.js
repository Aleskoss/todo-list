import { ToDo } from "./create-todo"

export class Projects {
  static projects = []
  constructor(title){
    this.title = title
    this.toDos = []
  }
}

export const toDoAdder = (currentProject) => {
  currentProject.toDos.push(new ToDo("sadasd","sadawd","sadasd","sadsad"))
}
export const projectAdder = (title) => {
  Projects.projects.push(new Projects(title.toLowerCase()))  
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
      currentProject.toDos.push(new ToDo(element.childNodes[0].value,element.childNodes[1].value,element.childNodes[2].value,element.childNodes[3].value))
    });
  }
}

Object.assign(Projects,toDoSaver)
projectAdder("Default")

