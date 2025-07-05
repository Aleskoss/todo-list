import { projects ,projectOpener } from "./todo-projects"

export class ToDo{
  constructor(title,description,dueDate,priority){
    this.checkList = false
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }
}

const toDoChecker = {
  deleteCheckedToDo(){
    const currentProject = projectOpener("default")
    currentProject.toDos.map(item => {
      if(item.checkList === true){
        currentProject.toDos.splice(currentProject.toDos.indexOf(item),1)
      }
    })
}}


Object.assign(ToDo,toDoChecker)
