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
      $list[index].addEventListener('click',hashChange)
    }
    window.addEventListener('hashchange',()=>{
      console.log("hashchage 후 입장")
      
      const isView = window.location.hash.indexOf('view')
      if(isView){
        getViewPage()
      }else{
        getListPage()
      }
    })
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

  const hashChange = (e) => {
    console.log("hashChange 입장")
    e.preventDefault()
    const $target = e.target.closest('figure')
    const titleText = $target.querySelector('strong').textContent
    window.location.hash = `view&${titleText}`
    getViewPage()
  }

  const getViewPage = () =>{
    console.log("getViewPage 입장")
    const viewTitle = get('.view strong')
    const text =decodeURI(window.location.hash.split('&')[1])
    viewTitle.innerText = text
    

    get('.list').style.display = 'none'
    get('.view').style.display = 'flex'
  }

  const getListPage = () =>{
    console.log("getListPage 입장")
    get('.list').style.display = 'flex'
    get('.view').style.display = 'none'
  }
  init()
})()
