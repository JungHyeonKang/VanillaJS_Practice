;(function () {
  'use strict'
  const get = (target) => {
    return document.querySelector(target)
  }

  const $button = get('.modal_open_button')
  const $body = get('.body')
  const $modal = get('.modal')
  const $modalConfirm = get('.modal_button.confirm')
  const $modalCancel = get('.modal_button.cancel')

  $button.addEventListener('click',()=>{
    toggleModal()
  })

  const toggleModal = ()=>{
    $modal.classList.toggle('show')
    $body.classList.toggle('scroll_lock')
  }

  $modalConfirm.addEventListener('click',()=>{
    toggleModal()
  })
  $modalCancel.addEventListener('click',()=>{
    toggleModal()
  })

  window.addEventListener('click',(e)=>{
    if(e.target === $modal){
      toggleModal()
    }
  })
})()
