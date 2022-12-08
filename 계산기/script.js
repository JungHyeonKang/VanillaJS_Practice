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
        return
      }else if(this.prevValue){ // 연산자 키 눌러도 현재 입력값 표시하기 위해 설정
        this.element.value = this.prevValue
        return
      }
      this.element.value = 0 // 연산자를 연속으로 누르면 0 으로 초기화
    }

    setOperation(operation){
      this.resetOperation()
      this.operation = operation
      this.prevValue = this.currentValue
      this.currentValue = ''    
      console.log(this.prevValue)
      const elements = Array.from(getAll('.cell_button.operation')) 
      const element =elements.filter((element) =>
        element.innerText.includes(this.operation)
      )[0]
      element.classList.add('active')
    }

    compute(){
      let computation
      let current = parseFloat(this.currentValue) 
      let prev = parseFloat(this.prevValue) 
      if(isNaN(current) || isNaN(prev)) return

      switch(this.operation){
        case '+' :
          computation = prev + current
          break
        case '-' :
          computation = prev + current
          break
        case '*' :
          computation = prev + current
          break
        case '÷' :
          computation = prev + current
          break
        default :
          return
      }
      console.log(this.currentValue)
      this.currentValue = computation.toString()
      this.prevValue = ''
      this.resetOperation()
    }

    resetOperation(){
      this.operation = null
      const elements = Array.from(getAll('.cell_button.operation'))
      elements.forEach(ele=>{
        ele.classList.remove('active')
      })
    }

    clear(){ //뒤로가기 기능
      if(this.currentValue){ // 숫자 입력했을때
        this.currentValue = ''
        return
      }
      if(this.operation){ // 연산자 입력했을 때
        this.resetOperation()
        this.currentValue = this.prevValue
        return
      }
      if(this.prevValue){ 
        this.prevValue = ''
        return
      }
    }
  }

  const display = get('.display')
  const numberButtons = getAll('.cell_button.number')
  const operationButtons = getAll('.cell_button.operation')
  const computeButton = get('.cell_button.compute')
  const clearButton = get('.cell_button.clear')
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

  computeButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
  })

  clearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
  })
})()
