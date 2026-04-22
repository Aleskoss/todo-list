export default class ToDo {
  constructor(title, description, dueDate, prority = 1, status) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.prority = prority;
    this.id = crypto.randomUUID();
    this.status = false;
  }
}

const priotrityChanger = {
  increasePriority() {
    if (this.priority < 3) {
      priority++;
    }
  },
  decreasePriority() {
    if (this.priority > 1) {
      priority--;
    }
  },
};

const completeStatusChanger = {
  changeStatus() {
    if (this.status === false) {
      this.status = true;
    } else {
      this.status = false;
    }
  },
};

Object.assign(ToDo.prototype, priotrityChanger);
Object.assign(ToDo.prototype, completeStatusChanger);
