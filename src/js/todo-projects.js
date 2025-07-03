import { ToDoCreator } from "./create-todo"
export const projects = (function(){
  const projectsArray = []
  return {projectsArray}
})()

const toDoAdder = () => {
  projects.projectsArray.push(new ToDoCreator("sad","asd","sad","asd","asd"))
}
toDoAdder()