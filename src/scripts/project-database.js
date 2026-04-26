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
  const chosenDateProjects = [];

  const addProject = (project) => {
    projects.push(project);
  };

  const getProject = (title) => {
    const project = projects.find((proj) => proj.title === title);
    return project;
  };

  const getAllProjects = () => {
    return [...projects];
  };

  const returnChosenDateProject = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    let project = chosenDateProjects.find(
      (project) => project.title === formattedDate,
    );

    if (!project) {
      project = new TimedProject(date);
      chosenDateProjects.push(project);
    }
    for (const proj of projects)
      for (const todo of proj.toDos) {
        if (
          todo.dueDate === formattedDate &&
          !project.toDos.some((toDo) => todo.id === toDo.id)
        ) {
          project.addToDo(todo);
        }
      }

    return project;
  };

  return { addProject, getProject, getAllProjects, returnChosenDateProject };
})();

export { projectDatabase };
