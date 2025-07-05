import '../styles/style.css'
import { Projects,projectOpener } from './todo-projects'
import { ToDo } from './create-todo'
const currentProject = projectOpener("default")
Projects.projects[0].toDos[0].checkList = true
Projects.projects[0].toDos[1].priority = 3
Projects.projects[0].toDos[3].priority = 3
Projects.projects[0].toDos[1].title = "Hello"
Projects.projects[0].toDos[3].title = "New"
ToDo.sortByPriority(projectOpener("default"))
ToDo.deleteCheckedToDo(projectOpener("default"))
ToDo.setPriority(ToDo.findToDo(projectOpener("default"),"hello"))
console.log(Projects.projects)

