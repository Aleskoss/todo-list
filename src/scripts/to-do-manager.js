export default class ToDo {
  constructor(title, description, dueDate, status, priority = 1) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate).toLocaleDateString();
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.status = false;
  }

  increasePriority() {
    if (this.priority < 3) {
      priority++;
    }
  }
  decreasePriority() {
    if (this.priority > 1) {
      priority--;
    }
  }
  changeStatus() {
    if (this.status === false) {
      this.status = true;
    } else {
      this.status = false;
    }
  }
}
