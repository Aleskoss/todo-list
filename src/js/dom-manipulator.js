import { projectOpener, Projects, projectAdder} from "./todo-projects";
import { ToDo, sortByPriority} from "./create-todo";
export class DOMManipulator{
  static #currentProject
  content = document.querySelector('#content') 
  static toDoContainer = document.createElement('div')
  localStorage
  static loadProjects(){
    this.#currentProject = "default"
    this.addProject()
    for(let i = 0; i < Projects.projects.length; i++){
    let div = document.createElement('div')
    div.style.width = '200px'
    div.textContent = Projects.projects[i].title.replace(Projects.projects[i].title[0],Projects.projects[i].title[0].toUpperCase())
    div.id = Projects.projects[i].title
    content.appendChild(div)
    }
  }
  static openProject(target){
    if(this.checkIfProjectInProjects(target)){
      Projects.saveToDos(projectOpener(this.#currentProject),this.toDoContainer.querySelectorAll('div'))
      this.#currentProject = target
      this.LoadToDos()
      }
    }
  static checkIfProjectInProjects(target){
    let conditionCheck = Projects.projects.reduce((accumulator,currentVal) => {
      if(target.toLowerCase() === currentVal.title.toLowerCase()){
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
     while(this.toDoContainer.lastChild){
        this.toDoContainer.removeChild(this.toDoContainer.lastChild)
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
      priority.addEventListener('click',(event)=>{
        if(parseInt(event.target.value) < 3){
          event.target.value = parseInt(event.target.value) + 1
          this.saveToDos()
          ToDo.sortByPriority(projectOpener(this.#currentProject))
          this.LoadToDos()
        }
      })
      const dueDate = document.createElement('input')
      dueDate.type = 'time'
      dueDate.value = dueDateValue
      const checkList = document.createElement('input')
      checkList.type = 'radio'
      checkList.addEventListener('click', () => {
        this.checkIfChecked(checkList)
      })
      document.body.appendChild(this.toDoContainer)
      toDoDiv.appendChild(title)
      toDoDiv.appendChild(description)
      toDoDiv.appendChild(priority)
      toDoDiv.appendChild(dueDate)
      toDoDiv.appendChild(checkList)
      this.toDoContainer.appendChild(toDoDiv)
  }
  static checkIfChecked(target){
    if(target.checked === true){
      target.parentNode.remove()
    }
  }
  static addProject(){
    const projectAddBtn = document.createElement('button')
    projectAddBtn.textContent = 'Add Project'
    const projectName = document.createElement('input')
    projectName.name = 'project-name'
    content.appendChild(projectName)
    content.appendChild(projectAddBtn)
    projectAddBtn.addEventListener('click',() => {
      if(this.checkIfProjectInProjects(projectName.value) || !(projectName.value)){
        projectName.value = 'Try Again'
      }else{
        projectAdder(projectName.value)
        while(content.lastChild){
          content.removeChild(content.lastChild)
        }
        this.loadProjects()
      }
    })
  }
}
