/**
* A collection of todo items and methods to add/remove a todo item.
*/
export class TodoList {
    constructor() {
        // Didn't use Set because Set.has() will only compare object references. 
        this.items = []
    }
  
    /**
     * returns false if the item already exists in the list otherwise adds the element
     * and returns true.
     */
    add(todoItem) {
        if (this.items.some(item => item.isEqual(todoItem))) {
            return false
        }
        this.items.push(todoItem)
        return true
    }
  
    remove(todoItem) {
        this.items = this.items.filter(item => item.todoValue !== todoItem.todoValue)
    }
  
    findByValue(todoValue) {
        return this.items.find(item => item.value === todoValue)
    }
  
    get count() {
        return this.items.length
    }
  
    get unchekedCount() {
        return this.items.filter(item => !item.checked).length
    }
  }