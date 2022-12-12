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
    }

    fileUpload(){
      this.inputFile.addEventListener('change',(e)=>{
       const fileURL = URL.createObjectURL(e.target.files[0])
       this.fileImage.setAttribute('src',fileURL)
      })
    }

  }
  new FileUploader()
})()
