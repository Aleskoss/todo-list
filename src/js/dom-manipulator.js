import { projectOpener, Projects } from "./todo-projects";
export class DOMManipulator{
  static #currentProject
  content = document.querySelector('#content') 
  static firstLoadInit(){
    this.#currentProject = ""
    for(let i = 0; i < Projects.projects.length; i++){
    let div = document.createElement('div')
    div.style.width = '200px'
    div.textContent = Projects.projects[i].title
    div.id = Projects.projects[i].title
    content.appendChild(div)
    }
  }
  static openProject(target){
    if(this.#currentProject === ""){
       this.#currentProject = target
      if(this.targetCheck(this.#currentProject)){
      while(content.lastChild){
        content.removeChild(content.lastChild)
      }
      this.addToDoButton()
      this.LoadToDos()
      }
    }
    }
  static targetCheck(target){
    let conditionCheck = Projects.projects.reduce((accumulator,currentVal) => {
      if(target === currentVal.title){
        accumulator = true
      }
      return accumulator
    },false)
    return conditionCheck
  }
  static changeToDo(event){
    const currentProject = projectOpener(this.#currentProject)
    const currentToDo = event.target.textContent
    console.log(event.target)
    currentProject.toDos.map(item => {
      if(item.title === currentToDo){
        item.title = "hell"
      }
    })
  }
  static addToDoButton(){
    let addBtn = document.createElement('button')
    addBtn.textContent = 'Add ToDo'
    addBtn.id = 'add-btn'
    document.body.appendChild(addBtn)
    addBtn.addEventListener('click',() => {
      console.log(projectOpener(this.#currentProject))
      this.addToDoInputs()
    })
  }
  static LoadToDos(){
    let currentProject = projectOpener(this.#currentProject)
      currentProject.toDos.map(item => {
      this.addToDoInputs(item.title,item.description,item.priority,item.dueDate)
      })
  }
  static addToDoInputs(titleValue = "",descriptionValue = "",priorityValue = 1,dueDateValue = ""){
    const toDoDiv = document.createElement('div')
      const title = document.createElement('input')
      title.type = 'text'
      title.value = titleValue
      const description = document.createElement('input')
      description.type = 'text'
      description.value = descriptionValue
      const priority = document.createElement('input')
      priority.type = 'button'
      priority.value = priorityValue
      const dueDate = document.createElement('input')
      dueDate.type = 'time'
      dueDate.value = dueDateValue
      const checkList = document.createElement('input')
      checkList.type = 'radio'
      toDoDiv.appendChild(title)
      toDoDiv.appendChild(description)
      toDoDiv.appendChild(priority)
      toDoDiv.appendChild(dueDate)
      toDoDiv.appendChild(checkList)
      content.appendChild(toDoDiv)
  }
}
