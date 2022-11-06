const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const todoInput = document.getElementById('todo-input')
const errorText = document.getElementById('error-text')

function newTodo() {
  if (todoAlreadyExists(todoInput.value)) {
    errorText.textContent = 'Duplicate todo';
    setTimeout(() => errorText.textContent = '', 2000)
    return
  }
  appendTodoList(todoInput.value)
  let itemCount = parseInt(itemCountSpan.innerText) + 1
  itemCountSpan.textContent = itemCount
  incrementUnchecked()
  clearTodoInput()
}

function appendTodoList(todoValue) {
  console.log(todoValue)
  const li = document.createElement('li')
  li.setAttribute('class', 'todo-list-item')
  li.setAttribute('name', todoValue)

  const checkBoxItem = document.createElement('input')
  checkBoxItem.setAttribute('type', 'checkbox')
  checkBoxItem.setAttribute('name', todoValue)
  checkBoxItem.setAttribute('onchange', 'onTodoItemCheck(this)')

  const checkBoxLabel = document.createElement('label')
  checkBoxLabel.setAttribute('for', todoValue)
  checkBoxLabel.setAttribute('id', todoValue)
  checkBoxLabel.appendChild(document.createTextNode(todoValue))
  checkBoxLabel.setAttribute('style', 'padding-left: 10px')

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.setAttribute('class', 'right')
  deleteButton.setAttribute('onclick', 'onDeleteTodo(this)')
  deleteButton.setAttribute('name', todoValue)

  li.appendChild(checkBoxItem)
  li.appendChild(checkBoxLabel)
  li.appendChild(deleteButton)
  list.appendChild(li)
}

function clearTodoInput() {
  todoInput.value = ''
}


function onTodoItemCheck(checkbox) {
  const label = document.getElementById(checkbox.name)
  if (checkbox.checked == true) {
    decrementUnchecked()
    label.innerHTML = '<del>' + label.textContent + '<del>'
  } else {
    incrementUnchecked()
    label.innerHTML = label.textContent
  }
}

function decrementUnchecked() {
  uncheckedCountSpan.textContent = parseInt(uncheckedCountSpan.innerText) - 1
}

function incrementUnchecked() {
  uncheckedCountSpan.textContent = parseInt(uncheckedCountSpan.innerText) + 1
}

function decrementItemCount() {
  itemCountSpan.textContent = parseInt(itemCountSpan.textContent) - 1
}

function todoAlreadyExists(todoValue) {
  childrenArray = Array.from(list.children)
  return childrenArray.some(li => li.children[0].getAttribute('name') == todoValue)
}

function onDeleteTodo(button) {
  buttonName = button.name
  for (let li of list.children) {
    if (li.getAttribute('name') === buttonName) {
      
      decrementItemCount()

      // if unchecked decrement unchecked count
      if(!li.children[0].checked) {
        decrementUnchecked()
      }

      list.removeChild(li)
      break;
    }
  }
  
}