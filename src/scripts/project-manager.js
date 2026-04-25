class Project {
  constructor(title) {
    this.title = title;
    this.toDos = [];
  }
}

const toDoAdder = {
  addToDo(ToDo) {
    this.toDos.push(ToDo);
  },
};

const toDoGetter = {
  getToDo(id) {
    for (const toDo in this.toDos) {
      if (toDo.id === id) {
        return toDo;
      }
    }
  },
};

const timedProjectToDoAdder = {
  addToDo(ToDo) {
    if (ToDo.date === this.date) {
      this.toDos.push(ToDo);
    }
  },
};
class TimedProject extends Project {
  constructor(date) {
    super(new Date(date).toLocaleDateString());
  }
}

Object.assign(Project.prototype, toDoAdder);
Object.assign(Project.prototype, toDoGetter);
Object.assign(TimedProject.prototype, toDoGetter);

export { TimedProject, Project };
