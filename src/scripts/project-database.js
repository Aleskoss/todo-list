import Project from "./project-manager.js";

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

  return { addProject, getProject, getAllProjects };
})();

export { projectDatabase };
