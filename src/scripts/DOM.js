import { projectDatabase } from "./project-database.js";
import ToDo from "./to-do-manager.js";
import { Project, TimedProject } from "./project-manager.js";

const DOMToDoRender = (() => {
  const bodyEle = document.body;
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const projectsContainer = document.createElement("div");
  let currentProject, toDoArray;
  projectsContainer.id = "projects-div";
  const toDosContainer = document.createElement("div");
  toDosContainer.id = "todos-container";
  projectDatabase
    .getProject("Default")
    .addToDo(
      new ToDo(
        "Dokončit školu",
        "Description Helo it is me",
        "2026-04-25",
        false,
      ),
    );
  projectDatabase
    .getProject("Default")
    .addToDo(new ToDo("Title", "Description", "2026-04-28", false));
  projectDatabase
    .getProject("Default")
    .addToDo(new ToDo("Title", "Description", "2026-04-25", false));

  const render = () => {
    addProject();
    renderProjects();
    renderDateProjects();
  };

  function renderTodo(item) {
    const container = document.createElement("div");
    container.dataset.todoId = item.id;
    container.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.dueDate}</p>
    <input  class="priority" type="number" value="${item.priority}" min="1" max="3">
    <input  class="status" type="checkbox" ${item.status ? "checked" : ""}>
    <button class="remove">X</button>
    <input type="checkbox" class="expand">
  `;

    const priority = container.querySelector(".priority");
    const status = container.querySelector(".status");
    const removeBtn = container.querySelector(".remove");
    const expandCheckbox = container.querySelector(".expand");
    removeBtn.addEventListener("click", () => {
      projectDatabase.getProject(currentProject).removeToDo(item);
      renderToDos(toDoArray);
    });
    priority.addEventListener("change", () =>
      item.changePriority(priority.value),
    );
    status.addEventListener("change", () => item.changeStatus());
    expandCheckbox.addEventListener("change", () => {
      if (expandCheckbox.checked) {
        const descriptionP = document.createElement("textarea");
        descriptionP.classList = "description";
        descriptionP.textContent = item.description;
        container.appendChild(descriptionP);
      } else {
        item.description = container.querySelector(".description").value;
        container.removeChild(container.lastChild);
      }
    });
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
    renderTitledProjects();
  }

  function renderTitledProjects() {
    const projectParas = document.querySelectorAll("#projects-div p");
    projectParas.forEach((p) =>
      p.addEventListener("click", () => {
        currentProject = p.textContent;
        toDoArray = projectDatabase.getProject(p.textContent).toDos;
        renderToDos(toDoArray);
      }),
    );
  }

  function renderToDos(toDoArray) {
    removeContent(toDosContainer);
    for (const item of toDoArray) {
      toDosContainer.appendChild(renderTodo(item));
    }
    main.appendChild(toDosContainer);
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

  function renderDateProjects() {
    const dateInput = header.querySelector("#date-project-picker");
    dateInput.addEventListener("input", () => {
      toDoArray = projectDatabase.returnChosenDateProject(
        dateInput.value,
      ).toDos;
      renderToDos(toDoArray);
    });
  }

  return { render };
})();

export default DOMToDoRender;
