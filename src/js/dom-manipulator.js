import { projectOpener, Projects } from "./todo-projects";
export class DOM{
  content = document.querySelector('#content')
  static firstLoadInit(){
    for(let i = 0; i < Projects.projects.length; i++){
    let div = document.createElement('div')
    div.style.width = '200px'
    div.textContent = Projects.projects[i].title
    div.id = Projects.projects[i].title
    content.appendChild(div)
    }
  }
  static openToDo(){
    document.addEventListener('click', event => {
      console.log(event.target.id)
      const target = event.target.id
      if(this.targetCheck(target)){
      while(content.lastChild){
        content.removeChild(content.lastChild)
      }
      let currentProject = projectOpener(event.target.id)
      currentProject.toDos.map(item => {
      const toDoDiv = document.createElement('div')
      const title = document.createElement('h2')
      const description = document.createElement('p')
      const priority = document.createElement('p')
      const dueDate = document.createElement('p')
      const checkList = document.createElement('p')
      toDoDiv.id = item.title
      title.textContent = item.title
      description.textContent = item.description
      priority.textContent = item.priority
      dueDate.textContent = item.dueDate
      checkList.textContent = item.checkList
      toDoDiv.appendChild(title)
      toDoDiv.appendChild(description)
      toDoDiv.appendChild(priority)
      toDoDiv.appendChild(dueDate)
      toDoDiv.appendChild(checkList)
      content.appendChild(toDoDiv)
      })
      }
    })
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
}