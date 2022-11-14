;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }
  const keys = Array.from(getAll('.key'))
  const soundsRoot = 'assets/sounds/' // 드럼 사운드 경로
  const drumSounds = [ // 키보드 키코드와 드럼 사운드 데이터 
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]
  const getAudioElement = (index) =>{ // 순서대로 오디오 객체 생성
    const audio = document.createElement('audio');
    audio.dataset.key = drumSounds[index].key
    audio.src = soundsRoot + drumSounds[index].sound
    return audio
  }
  const onMouseDown = (e) =>{ // 마우스 클릭시 소리 출력 이벤트
    const keyCode =e.target.getAttribute('data-key')
    playSound(keyCode)
  }
  const onKeydown = (e) =>{// 키보드 클릭시 소리 출력 이벤트
    const keyCode =  e.keyCode
    playSound(keyCode)
  }
  const playSound = (keyCode)=>{ // 드럼 사운드 이벤트
    const $audio = get(`audio[data-key="${keyCode}"]`)
    const $key = get(`div[data-key="${keyCode}"]`)
    if($audio && $key){
      $key.classList.add('playing')
      $audio.currentTime = 0
      $audio.play()
    }
  }
  const onTransitionEnd = (e) => { // css 복구
    if (e.propertyName === 'transform') {    
      e.target.classList.remove('playing')
    }
  }
  const init = () => { // 페이지 진입시 설정 (audio 객체 삽입 , 각 태그에 이벤트 추가 )
    window.addEventListener('keydown',onKeydown)
    keys.forEach((key,index)=>{
      const audio = getAudioElement(index)
      key.appendChild(audio)
      key.dataset.key = drumSounds[index].key
      key.addEventListener('mousedown' , onMouseDown)
      key.addEventListener('transitionend' , onTransitionEnd)
    })
  }

  init()
})()
