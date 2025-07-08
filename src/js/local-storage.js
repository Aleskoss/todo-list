import { Projects } from "./todo-projects"
export const saveToLocalStorage = () => {
  localStorage.setItem(JSON.stringify(Projects.projects.toDos,savedData))

}