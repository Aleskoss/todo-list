export class ToDo{
  constructor(title,description,priority,dueDate,checkList){
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.checkList = checkList
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
Object.assign(ToDo,toDoChecker)
Object.assign(ToDo,prioritySetter)
Object.assign(ToDo,toDoFinder)
