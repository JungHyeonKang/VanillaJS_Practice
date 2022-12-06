;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  class Stopwatch{
    constructor(element){
      this.timer = element;
      this.defaultTime = '00:00.00'
      this.startTime = 0
      this.interval = null
      this.elapsedTime = 0    
    }
    start(){
      clearInterval(this.interval) // 여러번 누르면 interval이 쌓이기 때문에 누를때마다 interval 초기화
      this.startTime = Date.now() - this.elapsedTime // 시작 시간 구하기
      this.interval = setInterval(this.startTimer.bind(this),10) // setInterval은 window 객체 this를 사용하므로 클래스 this를 사용하기 위해 명시적으로 this 바인딩
    }
    startTimer(){
      this.elapsedTime = Date.now() - this.startTime //흐른 시간 구하기
      const time = this.timeToString(this.elapsedTime)
      this.print(time)
    }
    timeToString(time){
      const date = new Date(time);
      const minutes = date.getUTCMinutes()
      const seconds = date.getUTCSeconds()
      const milliSeconds = date.getUTCMilliseconds()
      return `${minutes}:${seconds}.${milliSeconds}`
    }
    print(text){
      this.timer.innerHTML = text;
    }
  }

  const $timer = get('.timer')
  const $startButton = get('.timer_button.start')
  const $stopButton = get('.timer_button.stop')
  const $resetButton = get('.timer_button.reset')

  const stopwatch = new Stopwatch($timer)

  $startButton.addEventListener('click', () => {
    stopwatch.start()
  })

})()
