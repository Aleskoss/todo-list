export default class ToDo {
  constructor(title, description, dueDate, status, priority = 1) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate).toLocaleDateString();
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.status = false;
  }

  changePriority(value) {
    if (value < 3 || value > 1) {
      this.priority = value;
    } else {
      return "Priority can be set in range 1 - 3";
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
