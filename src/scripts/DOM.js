import { projectDatabase } from "./project-database.js";
import ToDo from "./to-do-manager.js";
import Project from "./project-manager.js";

const DOMToDoRender = (() => {
  const bodyEle = document.body;
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");
  const projectsContainer = document.createElement("div");
  projectsContainer.id = "projects-div";
  const toDosContainer = document.createElement("div");
  toDosContainer.id = "todos-container";
  projectDatabase.getProject("Default").addToDo(new ToDo("s", "s", "s", false));

  const render = () => {
    addProject();
    renderProjects();
  };

  function renderTodo(item) {
    const container = document.createElement("div");
    container.dataset.todoId = item.id;
    container.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.dueDate}</p>
    <input name="status" id="status" type="checkbox" ${item.status ? "checked" : ""}>
    <input name="priority" id="priority" type="number" value="${item.priority}">
  `;
    return container;
  }

  function removeContent(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }
  }

  function renderProjects() {
    removeContent(projectsContainer);
    for (const project of projectDatabase.getAllProjects()) {
      const p = document.createElement("p");
      p.textContent = project.title;
      projectsContainer.appendChild(p);
    }
    sidebar.appendChild(projectsContainer);
    renderToDos();
  }

  function renderToDos() {
    const projectParas = document.querySelectorAll("#projects-div p");
    projectParas.forEach((p) =>
      p.addEventListener("click", () => {
        removeContent(toDosContainer);
        const toDoArray = projectDatabase.getProject(p.textContent).toDos;
        for (const item of toDoArray) {
          toDosContainer.appendChild(renderTodo(item));
        }
        main.appendChild(toDosContainer);
      }),
    );
  }

  function addProject() {
    const projectForm = document.querySelector("#project-form");
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const projectTitle = document.querySelector("#project-title").value;
      if (projectDatabase.getProject(projectTitle)) {
        return;
      }
      projectDatabase.addProject(new Project(projectTitle));
      renderProjects();
    });
  }

  return { render };
})();

export default DOMToDoRender;
