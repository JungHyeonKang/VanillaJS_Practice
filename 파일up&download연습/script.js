;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  class FileUploader{
    constructor(){
      this.container = get('main')
      this.inputFile = get('.drag_area input')
      this.canvas =get('.canvas')
      this.btnSave = get('.btn_save')
    }
  }
  new FileUploader()
})()
