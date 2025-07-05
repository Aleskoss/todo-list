import { ToDoCreator } from "./create-todo"

export const projects = (() => {
  return []
})()
export class ProjectCreator {
  constructor(title){
    this.title = title
    this.toDos = []
  }
}

export const toDoAdder = (title) => {
  const projectTitle = title.toLowerCase()
  projects.map(item => {
    if(item.title === projectTitle){
      item.toDos.push(new ToDoCreator("sadasd","sadawd","sadasd","sadsad"))
    }
  })
}
export const projectAdder = (title) => {
  projects.push(new ProjectCreator(title.toLowerCase()))  
}
export const projectOpener = (title) => {
  const openedProject = title.toLowerCase()
  projects.map(projectItem => {
    if(projectItem.title === openedProject){
      projectItem.toDos.map(toDoItem => toDoItem.checkedToDo(toDoItem,projectItem))
      
    }
  })
}

projectAdder("Default")
toDoAdder("Default")
toDoAdder("Default")
projects[0].toDos[0].checkList = true
projectOpener("Default")
console.log(projects)