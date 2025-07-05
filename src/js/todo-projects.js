import { ToDo } from "./create-todo"

export class Projects {
  static projects = []
  constructor(title){
    this.title = title
    this.toDos = []
  }
}

export const toDoAdder = (title) => {
  const currentProject = projectOpener(title)
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


projectAdder("Default")
projectAdder("Second")
projectAdder("Third")
toDoAdder("Default")
toDoAdder("Default")

