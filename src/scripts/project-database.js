import Project from "./project-manager.js";
import ToDo from "./to-do-manager.js";

const projectSearcher = {
  getProject(title) {
    for (const project of projects) {
      if (project.title === title) {
        return project;
      }
    }
  },
};

const projectAdder = {
  addProject(title) {
    this.projects.push(new Project(title));
  },
};

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
  return Object.assign({ projects }, projectAdder, projectSearcher);
})();

export { projectDatabase };
