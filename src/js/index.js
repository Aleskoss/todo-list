import '../styles/style.css'
import { Projects,projectOpener } from './todo-projects'
import { openProject } from './create-todo'
import { DOMManipulator } from './dom-manipulator'
DOMManipulator.loadProjects()
document.addEventListener('click', event => {
console.log(Projects.projects)
DOMManipulator.openProject(event.target.id)
})
