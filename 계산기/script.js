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
    appendNumber(number){
      if(number === '.' && this.currentValue.includes('.')) return
      this.currentValue = this.currentValue + number.toString()
    }
    updateDisplay(){
      this.element.value = this.currentValue
    }
  }

  const display = get('.display')
  const numberButtons = getAll('.cell_button.number')
  const calculator = new Calculator(display)
  
  numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
})()
