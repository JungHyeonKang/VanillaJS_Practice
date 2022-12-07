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
      if(this.currentValue){ // 연산자 키 누르면 숫자 안지워지기 위해 설정
        this.element.value = this.currentValue
      }
      
    }

    setOperation(operation){
      this.operation = operation
      this.prevValue = this.currentValue
      this.currentValue = ''
      const elements = Array.from(getAll('.cell_button.operation')) 
      const element =elements.filter((element) =>
        element.innerText.includes(this.operation)
      )[0]
      element.classList.add('active')
    }
  }

  const display = get('.display')
  const numberButtons = getAll('.cell_button.number')
  const operationButtons = getAll('.cell_button.operation')
  const calculator = new Calculator(display)
  
  numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
      calculator.setOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
})()
