import { projects } from "./todo-projects"
export class ToDoCreator{
  constructor(title,description,dueDate,priority){
    this.checkList = false
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }
}

const toDoChecker = {
  checkedToDo(item,project){
    if(item.checkList === true){
      project.toDos.splice(project.toDos.indexOf(item),1)
    }
}}

Object.assign(ToDoCreator.prototype,toDoChecker)