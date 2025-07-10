import { Projects,projectAdder } from "./todo-projects"
export const saveToLocalStorage = () => {
  localStorage.setItem("projects",JSON.stringify(Projects.projects)) 
}
export const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("projects"))
}