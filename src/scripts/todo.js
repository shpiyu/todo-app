
/**
 * Represents a single todo item.
 */
 export class Todo {
    constructor(todoValue, checked=false) {
        this.todoValue = todoValue
        this.checked = checked
    }
  
    check() {
        this.checked = true
    }
  
    uncheck() {
        this.checked = false
    }
  
    get value() {
        return this.todoValue
    }
  
    get isChecked() {
        return this.checked
    }
  
    // Todo items are compared by their todo values.
    isEqual(other) {
        return this.todoValue === other.todoValue;
    }
  }