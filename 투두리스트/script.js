;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }
  const getAll = (target) => {
    return document.querySelectorAll(target);
  }
  const API_URL = `http://localhost:3000/todos`
  const $todos = get(".todos")

  const createTodoElement = (item) => {
    const { id, content } = item
    const $todoItem = document.createElement('div')
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem
  }
  const renderAllTodos = (todo) => {
    $todos.innerHTML = ""
    todo.forEach(item => {
      const todoElement = createTodoElement(item)
      $todos.appendChild(todoElement)
    });
    
  }

  const getTodos = ()=>{
    fetch(API_URL)
    .then((response)=>response.json())
    .then((todo)=>renderAllTodos(todo))
    .catch((error)=>console.log(error))
  }

  const init = () => {
    window.addEventListener('DOMContentLoaded',()=>{
      getTodos()
    })
  }

  init()
})()
