import '../styles/style.css'
import { Projects,projectOpener } from './todo-projects'
import { openProject } from './create-todo'
import { DOMManipulator } from './dom-manipulator'
DOMManipulator.loadProjects()
DOMManipulator.addToDoButton()
document.addEventListener('click', event => {
DOMManipulator.openProject(event.target.id)
})

