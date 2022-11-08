const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

/**
 * Represents a single todo item.
 */
class Todo {
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

/**
* A collection of todo items and methods to add/remove a todo item.
*/
class TodoList {
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

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const todoInput = document.getElementById('todo-input')
const errorText = document.getElementById('error-text')
const emptyMsgContainer = document.getElementById('empty-message-container')

const todoList = new TodoList()

if (todoList.count == 0) {
  showEmptyMessage()
}

function newTodo() {
  const todoItem = new Todo(todoInput.value)

  if (!todoList.add(todoItem)) {
    errorText.textContent = 'Duplicate todo';
    setTimeout(() => errorText.textContent = '', 2000)
    return
  }
  updateTodoListView(todoItem)
  itemCountSpan.textContent = todoList.count
  uncheckedCountSpan.textContent = todoList.unchekedCount
  hideEmptyMessage()
  clearTodoInput()
}

function handleTodoInput(e) {
  const key = e.key
  if (key == 'Enter') {
    newTodo()
  }
}

function updateTodoListView(todoItem) {
  const todoValue = todoItem.value
  const todoListItemTemplate = document.getElementById('todo-list-item-template')
  const todoListItem = todoListItemTemplate.content.firstElementChild.cloneNode(true)
  todoListItem.setAttribute('name', todoValue)
  const checkBox = todoListItem.querySelector('input')
  checkBox.setAttribute('name', todoValue)

  const checkBoxLabel = todoListItem.querySelector('label')
  checkBoxLabel.setAttribute('for', todoValue)
  checkBoxLabel.setAttribute('id', todoValue)
  checkBoxLabel.appendChild(document.createTextNode(todoValue))

  const deleteBtn = todoListItem.querySelector('button')
  deleteBtn.setAttribute('name', todoValue)

  list.appendChild(todoListItem)
}

function clearTodoInput() {
  todoInput.value = ''
}


function onTodoItemCheck(checkbox) {
  const todoItem = todoList.findByValue(checkbox.name)
  const label = document.getElementById(checkbox.name)
  if (checkbox.checked == true) {
    todoItem.check()
    label.innerHTML = '<del>' + label.textContent + '<del>'
  } else {
    todoItem.uncheck()
    label.innerHTML = label.textContent
  }
  updateUnchekedCount()
}

function updateUnchekedCount() {
  uncheckedCountSpan.textContent = todoList.unchekedCount
}

function updateItemCount() {
  itemCountSpan.textContent = todoList.count
}

function onDeleteTodo(button) {
  const value = button.name
  for (let li of list.children) {
    if (li.getAttribute('name') === value) {
      list.removeChild(li)
      todoList.remove(todoList.findByValue(value))
      updateItemCount()
      updateUnchekedCount()
      break
    }
  }
  if (todoList.count === 0) {
    showEmptyMessage()
  }
}


function showEmptyMessage() {
  emptyMsgContainer.style.display = 'block'
}

function hideEmptyMessage() {
  emptyMsgContainer.style.display = 'none'
}