export default class Project {
  constructor(title) {
    this.title = title;
    this.toDos = [];
  }

  addToDo(ToDo) {
    this.toDos.push(ToDo);
  }

  getToDo(id) {
    for (const toDo in this.toDos) {
      if (toDo.id === id) {
        return toDo;
      }
    }
  }
}
