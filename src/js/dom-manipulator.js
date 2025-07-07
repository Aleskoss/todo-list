import { projectOpener, Projects, projectAdder} from "./todo-projects";
import { ToDo, sortByPriority} from "./create-todo";
export class DOMManipulator{
  static #currentProject
  content = document.querySelector('#content') 
  static loadProjects(){
    this.#currentProject = ""
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
    if(this.#currentProject === "" && this.checkIfProjectInProjects(target)){
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
      priority.addEventListener('click',(event)=>{
        if(parseInt(event.target.value) < 3){
          event.target.value = parseInt(event.target.value) + 1
          this.saveToDos()
          sortByPriority(projectOpener(this.#currentProject))
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
      this.saveToDos()
    })
  }
  static saveToDos(){
    let containers = content.querySelectorAll('div')
    let currentProject = projectOpener(this.#currentProject)
    currentProject.toDos.splice(0,currentProject.toDos.length)
    containers.forEach(element => {
      currentProject.toDos.push(new ToDo(element.childNodes[0].value,element.childNodes[1].value,element.childNodes[2].value,element.childNodes[3].value))
    });
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
