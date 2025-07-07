import { projects ,projectOpener } from "./todo-projects"

export class ToDo{
  constructor(title,description,dueDate){
    this.checkList = false
    this.title = title
    this.titleID = crypto.randomUUID()
    this.description = description
    this.descriptionID = crypto.randomUUID()
    this.dueDate = dueDate
    this.dueDateID = crypto.randomUUID()
    this.priority = 1
  }
}

const toDoChecker = {
  deleteCheckedToDo(currentProject){
    currentProject.toDos.map(item => {
      if(item.checkList === true){
        currentProject.toDos.splice(currentProject.toDos.indexOf(item),1)
      }
    })
}}
const prioritySetter = {
  setPriority(currentToDo){
    if(currentToDo.priority < 3) currentToDo.priority += 1
  },
  sortByPriority(currentProject){
    currentProject.toDos.sort((a,b) => b.priority - a.priority)
  }
}
const toDoFinder = {
  findToDo(currentProject,title){
    let currentToDo
    currentProject.toDos.map(item => {
      if(item.title.toLowerCase() === title.toLowerCase()){
        currentToDo = item
      }
    })
    return currentToDo
  }
}
const toDoEditor = {

}
Object.assign(ToDo,toDoChecker)
Object.assign(ToDo,prioritySetter)
Object.assign(ToDo,toDoFinder)
