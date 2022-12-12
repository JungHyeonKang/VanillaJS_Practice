;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  class FileUploader{
    constructor(){
      this.container = get('main')
      this.inputFile = get('.drag_area input')
      this.canvas =get('.canvas')
      this.fileImage = get('.fileImage')
      this.btnSave = get('.btn_save')
      this.fileUpload()
      this.clickEvent()
    }
    clickEvent(){
      this.btnSave.addEventListener('click',this.fileDownload.bind(this))
    }
    fileUpload(){
      this.inputFile.addEventListener('change',(e)=>{
       const fileURL = URL.createObjectURL(e.target.files[0])
       this.fileImage.setAttribute('src',fileURL)
      })
    }
    fileDownload(){
      const fileName = this.canvas.toDataURL()
      const filedownloader = document.createElement('a')
      filedownloader.style.display = 'none'
      filedownloader.setAttribute('href', fileName)
      filedownloader.setAttribute('download', 'test.png')
      this.container.appendChild(filedownloader)
      filedownloader.click()
      setTimeout(()=>{
        this.container.removeChild(filedownloader)
      },100)

    }
  }
  new FileUploader()
})()
