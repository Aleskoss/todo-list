import { Project, TimedProject } from "./project-manager.js";

const projectDatabase = (() => {
  const projects = [
    new Project("Default"),
    new Project(new Date().toLocaleDateString()),
    new Project(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
      ).toLocaleDateString(),
    ),
  ];

  const addProject = (project) => {
    projects.push(project);
  };

  const getProject = (title) => {
    for (const project of projects) {
      if (project.title === title) {
        return project;
      }
    }
    return false;
  };

  const getAllProjects = () => {
    return [...projects];
  };

  const returnChosenDateProject = (date) => {
    const chosenDateProjects = [];
    const project = chosenDateProjects.find(
      (project) => project.title === date,
    );
    if (!project) {
      chosenDateProjects.push(new TimedProject(new Date()));
    }

    for (const dateProject of chosenDateProjects) {
      if (dateProject.title === date) {
        for (project of projects) {
          for (todo of project.toDos) {
            if (todo.date === date) {
              dateProject.addToDo(todo);
            }
          }
        }
      }
    }
    return dateProject;
  };
  return { addProject, getProject, getAllProjects, returnChosenDateProject };
})();

export { projectDatabase };
