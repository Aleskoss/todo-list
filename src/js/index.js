import '../styles/style.css'
import { DateFormatter } from './date-formatter'
import { DOMManipulator } from './dom-manipulator'
import { projectAdder } from './todo-projects'
import { saveToLocalStorage } from './local-storage'
import { ToDo } from './create-todo'
if(!(localStorage.getItem("projects"))){
    saveToLocalStorage(projectAdder("Default",DateFormatter.currentDayPlus(0)))
}
DOMManipulator.loadProjects()
document.addEventListener('click', event => {
DOMManipulator.openProject(event.target.id)
})

