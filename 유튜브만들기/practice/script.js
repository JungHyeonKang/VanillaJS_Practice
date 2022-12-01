;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)
  const getAll = (target) => document.querySelectorAll(target)

  const $search = get('#search')
  const $list = getAll('.contents.list figure')
  const $searchButton = get('.btn_search')

  // 상세보기
  const $player = get('.view video')
  const $btnPlay = get('.js-play')
  const $btnReplay = get('.js-replay')
  const $btnStop = get('.js-stop')
  const $btnMute = get('.js-mute')
  const $progress = get('.js-progress')
  const $volume = get('.js-volume')
  const $fullScreen = get('.js-fullScreen')

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
      
      const isView = window.location.hash.indexOf('view')
      if(isView){
        getViewPage()
      }else{
        getListPage()
      }
    })
    viewPageSetting()
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
    e.preventDefault()
    const $target = e.target.closest('figure')
    const titleText = $target.querySelector('strong').textContent
    window.location.hash = `view&${titleText}`
    getViewPage()
  }

  const getViewPage = () =>{
    const viewTitle = get('.view strong')
    const text =decodeURI(window.location.hash.split('&')[1])
    viewTitle.innerText = text
    
    get('.list').style.display = 'none'
    get('.view').style.display = 'flex'
  }

  const getListPage = () =>{
    get('.list').style.display = 'flex'
    get('.view').style.display = 'none'
  }
  const buttonChange = (btn , btnText) =>{
    btn.innerHTML = btnText
  }
  const viewPageSetting = () =>{
    //볼륨
    $volume.addEventListener('change',(e)=>{
      $player.volume = e.target.value
    })
    //비디오 플레이어
    $player.addEventListener('play',buttonChange($btnPlay , 'pause'))
    $player.addEventListener('pause',buttonChange($btnPlay , 'play'))
    $player.addEventListener('timeupdate',setProgress)
    $player.muted ? buttonChange($btnMute , 'unmute') : buttonChange($btnMute , 'mute')
    $player.addEventListener('ended' , $player.pause())
    //프로그래스바
    $progress.addEventListener('click', getCurrent)
    // 그외 버튼
    $btnPlay.addEventListener('click', playVideo)
    $btnReplay.addEventListener('click' , replayVideo)
    $btnStop.addEventListener('click' , stopVideo)
    $btnMute.addEventListener('click', muteVideo)
    $fullScreen.addEventListener('click', fullScreen)
  }
  // 프로그레스 바 설정
  const setProgress = () =>{
    let percentage = Math.floor((100 / $player.duration) * $player.currentTime)
    $progress.value = percentage
  }

  const getCurrent = (e) => {
    let percent = e.offsetX / $progress.offsetWidth
    $player.currentTime = percent * $player.duration
    e.target.value = Math.floor(percent / 100)
  }

  const playVideo = () => {
    if($player.ended || $player.paused){
      buttonChange($btnPlay , 'pause')
      $player.play()
    }else{
      buttonChange($btnPlay , 'play')
      $player.pause()
    }
  }

  const replayVideo = () =>{
    $player.currentTime = 0;
    $player.play()
    buttonChange($btnPlay , 'pause')
  }

  const stopVideo = () =>{
    $player.pause()
    $player.currentTime = 0
    buttonChange($btnPlay , 'play')
  }
  
  const muteVideo = (e) =>{
    if($player.muted){
      buttonChange($btnMute , 'mute')
      $player.muted = false;
    }else {
      buttonChange($btnMute, 'unmute')
      $player.muted = true
    }
  }
    const fullScreen = () => {
      if ($player.requestFullscreen)
        if (document.fullScreenElement) {
          document.cancelFullScreen()
        } else {
          $player.requestFullscreen()
        }
      else if ($player.msRequestFullscreen)
        if (document.msFullscreenElement) {
          document.msExitFullscreen()
        } else {
          $player.msRequestFullscreen()
        }
      else if ($player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
          document.mozCancelFullScreen()
        } else {
          $player.mozRequestFullScreen()
        }
      else if ($player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
          document.webkitCancelFullScreen()
        } else {
          $player.webkitRequestFullscreen()
        }
      else {
        alert('Not Supported')
    }
  }
  init()
})()
