;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }

  const $button = get('.modal_open_button')
  const $body = get('.body')
  const $modal = get('.modal')

  $button.addEventListener('click',()=>{
    toggleModal()
  })

  const toggleModal = ()=>{
    $modal.classList.toggle('show')
    $body.classList.toggle('scroll_lock')
  }
})()
