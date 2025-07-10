import { projectOpener, Projects, projectAdder} from "./todo-projects";
import { ToDo } from "./create-todo";
import { isPast, getDay } from "date-fns";
import { DateFormatter } from "./date-formatter";
import { saveToLocalStorage } from "./local-storage";
export class DOMManipulator{
  static #currentProject
  content = document.querySelector('#content') 
  static toDoContainer = document.createElement('div')
  localStorage
  static loadProjects(){
    this.#currentProject = Projects.projects[0].title
    this.LoadToDos()
    this.addProject()
    this.addToDoButton()
    for(let i = 0; i < Projects.projects.length; i++){
    const currentDueDateArr = Projects.projects[i].dueDate.split('-')
    const dateValue = new Date(currentDueDateArr[0],currentDueDateArr[1],currentDueDateArr[2])
    const daysArr = ['Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle']
    const div = document.createElement('div')
    div.id = 'project'
    const projectPara = document.createElement('p')
    projectPara.id = Projects.projects[i].title.toLowerCase()
    projectPara.textContent = Projects.projects[i].title.replace(Projects.projects[i].title[0],Projects.projects[i].title[0].toUpperCase())
    const projectDueDatePara = document.createElement('p')
    projectDueDatePara.textContent = currentDueDateArr.reverse().join('.')
    const dayOfTheDate = document.createElement('p')
    if(isPast(DateFormatter.currentDayPlus(1))){
      projectDueDatePara.style.color = 'red'
    }else{
      projectDueDatePara.style.color = 'green'
    }
    dayOfTheDate.textContent = daysArr[getDay(dateValue)-1]
    div.appendChild(projectPara)
    div.appendChild(projectDueDatePara)
    div.appendChild(dayOfTheDate)
    content.appendChild(div)
    }
  }
  static openProject(target){
    if(this.checkIfProjectInProjects(target)){
      Projects.saveToDos(projectOpener(this.#currentProject),this.toDoContainer.querySelectorAll('form'))
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
    content.appendChild(addBtn)
    addBtn.addEventListener('click',() => {
      this.addToDoInputs()
      Projects.saveToDos(projectOpener(this.#currentProject),this.toDoContainer.querySelectorAll('form'))
      saveToLocalStorage()
    })
  }
  static LoadToDos(){
     while(this.toDoContainer.lastChild){
        this.toDoContainer.removeChild(this.toDoContainer.lastChild)
      }
    let currentProject = projectOpener(this.#currentProject)
      currentProject.toDos.map(item => {
      this.addToDoInputs(item.title,item.description,item.priority,item.dueDate,item.checkList)
      })
  }
  static addToDoInputs(titleValue = "",descriptionValue = "",priorityValue = 1,dueDateValue = "",checkListValue = false){
    const toDoDiv = document.createElement('form')
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
          Projects.saveToDos(projectOpener(this.#currentProject),this.toDoContainer.querySelectorAll('div'))
          ToDo.sortByPriority(projectOpener(this.#currentProject))
          this.LoadToDos()
        }
      })
      const dueDate = document.createElement('input')
      dueDate.type = 'time'
      dueDate.value = dueDateValue
      const checkList = document.createElement('input')
      checkList.type = 'radio'
      checkList.checked = checkListValue
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.addEventListener('click', (event) => event.target.parentNode.remove() )
      this.toDoContainer.id = 'todo-container'
      document.body.appendChild(this.toDoContainer)
      toDoDiv.appendChild(checkList)
      toDoDiv.appendChild(title)
      toDoDiv.appendChild(description)
      toDoDiv.appendChild(priority)
      toDoDiv.appendChild(dueDate)
      toDoDiv.appendChild(deleteBtn)
      this.toDoContainer.appendChild(toDoDiv)
  }
  static addProject(){
    const modalBtn = document.createElement('button')
    modalBtn.textContent = 'Add Project'
    const form = document.createElement('form')
    const dialog = document.createElement('dialog')
    const projectName = document.createElement('input')
    projectName.name = 'project-name'
    const projectDueDate = document.createElement('input')
    projectDueDate.type = "date"
    projectDueDate.value = DateFormatter.currentDayPlus(1)
    form.appendChild(projectName)
    form.appendChild(projectDueDate)
    dialog.appendChild(form)
    content.appendChild(dialog)
    content.appendChild(modalBtn)
    modalBtn.addEventListener('click',() => {
      const projectAddBtn = document.createElement('button')
      projectAddBtn.textContent = 'Add Project'
      form.appendChild(projectAddBtn)
      dialog.showModal()
      projectAddBtn.addEventListener('click', () =>{
        if(this.checkIfProjectInProjects(projectName.value) || !(projectName.value)){
        projectName.value = 'Try Again'
      }else{
        projectAdder(projectName.value,projectDueDate.value)
        while(content.lastChild){
          content.removeChild(content.lastChild)
        }
        this.loadProjects()
      }
      })
    })
  }
}
