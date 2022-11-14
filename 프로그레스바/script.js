;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }
  let timeId
  const throttle = ((callback , time)=>{
    timeId = setTimeout(()=>{
      if(timeId) return
      timeId = undefined
      callback()
    },time)
  })
  const $progressBar = get('.progress-bar')
  const onscroll = () =>{
    const scrollTop = document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollWidth = (scrollTop / height) * 100
    $progressBar.style.width = scrollWidth + '%'
  }

  window.addEventListener('scroll',()=>throttle(onscroll(),1000))
 
})()
