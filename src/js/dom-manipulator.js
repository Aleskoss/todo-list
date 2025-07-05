import { projectOpener, Projects } from "./todo-projects";
export class DOM{
  static firstLoadInit(){
    for(let i = 0; i < Projects.projects.length; i++){
    let div = document.createElement('div')
    div.textContent = Projects.projects[i].title
    div.id = Projects.projects[i].title
    document.body.appendChild(div)
    }
  }
  static openToDo(){
    document.addEventListener('click', event => {
      console.log(event.target.id)
      while(document.body.lastChild){
        document.body.removeChild(document.body.lastChild)
      }
      let target = projectOpener(event.target.id)
      target.toDos.map(item => {
      const title = document.createElement('h2')
      const description = document.createElement('p')
      const priority = document.createElement('p')
      title.textContent = item.title
      description.textContent = item.description
      priority.textContent = item.priority
      document.body.appendChild(title)
      document.body.appendChild(description)
      document.body.appendChild(priority)
      })
    })
  }
}