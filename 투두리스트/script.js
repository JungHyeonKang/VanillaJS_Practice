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
  const $form = get(".todo_form")
  const $inputTodo = get('.todo_input')
  



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

  const addTodo = (e) => {
    e.preventDefault()

    let content = $inputTodo.value
    if(!content) return;
    let data = {
      content : content,
      completed : false
    }
    fetch(API_URL,{
      method : 'POST',
      headers: { 'Content-type': 'application/json' },
      body : JSON.stringify(data)
    })
    .then(getTodos())
    .then(()=>{
      $inputTodo.value = ''
      $inputTodo.focus()
    })
    .catch(e => console.log(e))
  }

  const changeEditMode = (e) =>{
    const $item = e.target.closest('.item')
    const $editInput =  $item.querySelector('input[type="text"]')
    const $contentbuttons =  $item.querySelector('.content_buttons')
    const $editbuttons =  $item.querySelector('.edit_buttons')
    const $label = $item.querySelector('label')
    const value = $label.innerText;
    if(e.target.className === 'todo_edit_button'){
      $label.style.display = 'none'
      $editInput.style.display = 'block'
      $contentbuttons.style.display = 'none'
      $editbuttons.style.display = 'block'
      $editInput.focus()
      $editInput.value = '';
      $editInput.value = value
    }

    if(e.target.className ==='todo_edit_cancel_button'){
      $label.style.display = 'block'
      $editInput.style.display = 'none'
      $contentbuttons.style.display = 'block'
      $editbuttons.style.display = 'none'
      $editInput.value =$label.innerText
    }
  }
  const editTodo = (e) => {
    if(e.target.className !=='todo_edit_confirm_button') return;
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const $editInput = $item.querySelector('input[type="text"]')
    const content = $editInput.value
    fetch(`${API_URL}/${id}`,{
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    .then(getTodos)
    .error((error)=>console.log(error))
  }
  const init = () => {
    window.addEventListener('DOMContentLoaded',()=>{
      getTodos()
    })

    $form.addEventListener("submit",addTodo)
    $todos.addEventListener("click",changeEditMode)
    $todos.addEventListener("click",editTodo)
  }

  init()
})()
