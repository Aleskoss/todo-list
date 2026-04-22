import { projectDatabase } from "./project-database.js";

const DOMRender = (() => {
  const renderProjects = () => {
    for (const project of projectDatabase.projects) {
      const p = document.createElement("p");
      p.textContent = project.title;
      document.body.appendChild(p);
    }
  };

  return { renderProjects };
})();

export { DOMRender };
