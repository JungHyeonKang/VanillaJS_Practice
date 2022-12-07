;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const getAll = (target) => {
    return document.querySelectorAll(target)
  }
  
  class Calculator{
    constructor(element){
      this.element = element
      this.currentValue = ''
      this.prevValue = ''
      this.operation = null
    }
  }

  const display = get('.display')
  const numberButtons = getAll('.cell_button.number')
  const calculator = new Calculator(display)
  
})()
