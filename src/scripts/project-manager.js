export default class Project {
  constructor(title) {
    this.title = title;
    this.toDos = [];
  }
}

const adder = {
  addToDo(ToDo) {
    this.toDos.push(ToDo);
  },
};

const searcher = {
  searchToDo(id) {
    for (const toDo in this.toDos) {
      if (toDo.id === id) {
        return toDo;
      }
    }
  },
};

Object.assign(Project.prototype, adder);
Object.assign(Project.prototype, searcher);
