import '../styles/style.css'
import { DateFormatter } from './date-formatter'
import { DOMManipulator } from './dom-manipulator'
import { Projects,projectAdder } from './todo-projects'
if(!(localStorage.getItem("projects"))){
    projectAdder("Default",DateFormatter.currentDayPlus(0))
}
DOMManipulator.loadProjects()
document.addEventListener('click', event => {
DOMManipulator.openProject(event.target.id)
})

