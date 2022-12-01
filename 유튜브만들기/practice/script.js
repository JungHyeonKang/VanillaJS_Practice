;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)
  const getAll = (target) => document.querySelectorAll(target)

  const $search = get('#search')
  const $list = getAll('.contents.list figure')
  const $searchButton = get('.btn_search')

  const init = () => {
    $search.addEventListener('keyup', search)
    $searchButton.addEventListener('click', search)
    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('picture');
      $target.addEventListener('mouseover', onMouseover)
      $target.addEventListener('mouseout', onMouseout)
    }
  }
  const search = () =>{
    const searchText = $search.value.toLowerCase()
    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('strong');
      const text = $target.textContent.toLowerCase()     
      if(-1 < text.indexOf(searchText)){
        $list[index].style.display = 'flex'
      }else{
        $list[index].style.display = 'none'
      }
    }
  }

  const onMouseover = (e) => {
    const $webp = e.target.parentNode.querySelector('source')
    $webp.setAttribute('srcset','./assets/sample.webp')
  }

  const onMouseout = (e) =>{
    const $webp = e.target.parentNode.querySelector('source')
    $webp.setAttribute('srcset' , './assets/sample.jpg')
  }
  
  init()
})()
