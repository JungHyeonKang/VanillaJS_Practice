;(() => {
  'use strict'

  const get = (element) => document.querySelector(element)
  const allowUser = { //사용자 권한 설정 (비디오 ,오디오)
    audio : true,
    video : true
  }
    
  
  class webRtc{
    constructor(){
      this.media = new MediaSource()
      this.recorder
      this.blobs
      this.playedVideo = get('video.played')
      this.recordVideo = get('video.record')
      this.btnDownload = get('.btn_download')
      this.btnRecord = get('.btn_record')
      this.btnPlay = get('.btn_play')
      this.container = get('.webrtc')
      this.events()
      navigator.mediaDevices.getUserMedia(allowUser).then(videoaudio =>{
        this.success(videoaudio)
      })
    }

    success(audioVideo) {
      this.btnRecord.removeAttribute('disabled')
      window.stream = audioVideo
      if (window.URL) {
        this.playedVideo.setAttribute(
          'src',
          window.URL.createObjectURL(audioVideo)
        )
      } else {
        this.playedVideo.setAttribute('src', audioVideo)
      }
    }

    events(){
      this.btnRecord.addEventListener('click', this.toggleRecord.bind(this))
    }
    toggleRecord(){
      if(this.btnRecord.textContent === '녹화'){
        this.btnRecord.textContent = '중지'
        this.startRecord()
      }else{
        this.btnRecord.textContent = '녹화'
        this.btnPlay.removeAttribute('disabled')
        this.btnDownload.removeAttribute('disabled')
        this.stopRecord()
      }
    }

    startRecord(){
      let type = { mimeType: 'video/webm;codecs=vp9' }
      let blobs = []
      if (!MediaRecorder.isTypeSupported(type.mimeType)) { // 설정한 타입이 아니라면 video/webm로 설정
        type = { mimeType: 'video/webm' }
      }
      this.recorder = new MediaRecorder(window.stream, type) //레코더 생성
      this.btnPlay.setAttribute('disabled' , true)
      this.btnDownload.setAttribute('disabled' , true)
      this.recorder.ondataavailable = this.publishData.bind(this) // 미디어 데이터 얻기 
      this.recorder.start(20)// 20초만 레코딩 되도록 설정
    }

    stopRecord(){
      this.recorder.stop()
      this.recordVideo.setAttribute('controls', true) //비디오 실행 제어 설정
    }

    publishData(e){
      if(e.data.size <1 || !e.data){
        return;
      }
      this.blobs.push(e.data)
    }

    
  }
  
  new webRtc()
})()
