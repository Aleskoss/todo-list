import { projectOpener, Projects, toDoAdder } from "./todo-projects";
import { ToDo } from "./create-todo";
export class DOMManipulator{
  static #currentProject
  content = document.querySelector('#content') 
  static loadProjects(){
    console.log(Projects.projects)
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
       while(content.lastChild){
        content.removeChild(content.lastChild)
      }
      this.#currentProject = target
      this.LoadToDos()
      this.addToDoButton()
      this.saveToDoButton()
      }
    }
  static checkIfProjectInProjects(target){
    let conditionCheck = Projects.projects.reduce((accumulator,currentVal) => {
      if(target === currentVal.title){
        accumulator = true
      }
      return accumulator
    },false)
    return conditionCheck
  }
  static addToDoButton(){
    const addBtn = document.createElement('button')
    addBtn.textContent = 'Add ToDo'
    addBtn.id = 'add-btn'
    document.body.appendChild(addBtn)
    addBtn.addEventListener('click',() => {
      this.addToDoInputs()
    })
  }
  static LoadToDos(){
     while(content.lastChild){
        content.removeChild(content.lastChild)
      }
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
  static saveToDoButton(){
    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'
    saveBtn.id = 'save-btn'
    document.body.appendChild(saveBtn)
    saveBtn.addEventListener('click',() => {
      let containers = content.querySelectorAll('div')
      this.saveToDos(containers)
    })
  }
  static saveToDos(container){
    console.log(container)
    let currentProject = projectOpener(this.#currentProject)
    currentProject.toDos.splice(0,currentProject.toDos.length)
    container.forEach(element => {
      console.log(element.childNodes[0].value)
      currentProject.toDos.push(new ToDo(element.childNodes[0].value,element.childNodes[1].value,element.childNodes[3].value))
    });
  }
}
