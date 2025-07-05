import '../styles/style.css'
import { Projects,projectOpener } from './todo-projects'
import { ToDo } from './create-todo'
const currentProject = projectOpener("default")
ToDo.deleteCheckedToDo()
console.log(Projects.projects)

