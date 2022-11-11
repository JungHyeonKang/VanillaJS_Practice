;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)
  
  let baseball = {
    limit: 10,
    digit: 4,
    trial : 0,
    end : false,
    $answer : get(".ball_answer"),
    $question : get(".ball_question"),
    $input :  get(".ball_input"),
  }
  const { limit, digit, $question, $answer, $input } = baseball
  let { trial, end } = baseball

  const init = () =>{
   
    get('form').addEventListener('submit',(e)=>{
      playGame(e)
    }
    )
   setPassword()
  }

  const setPassword = () =>{
    let passwordArray = Array(limit).fill(false) //0~9까지 10개의 정수를 표시할 배열 생성
    let password = ''
    while(password.length<digit){   //4자리 숫자로 만들기
      let random = parseInt(Math.random() * 10 ,10) // 0~9 정수 랜덤 생성
      if(passwordArray[random]){ //true라는 의미는 이미 숫자가 있다는 뜻이므로 랜덤숫자가 중복이라는 의미 continue
        continue;
      }
      password += random
      passwordArray[random] = true; // 중복 표사를 위한 true 체크
    }

     baseball.password = password;
     console.log(password)
  }
  
  const playGame = (e) =>{
    e.preventDefault();
    const inputNumber = $input.value;
    if(inputNumber.length !=digit){
      alert(`${digit}자리 숫자를 입력해주세요`)
    }
    else if(isDuplicated(inputNumber)){
      alert("중복된 숫자는 입력할 수 없습니다.")
    }
    else{
     
    }
  }
  
  const isDuplicated = (number) =>{
    return [...new Set(number.split(""))].length !== digit; // 입력된 숫자를 배열로 바꾸고 set으로 변형하여 중복체크
  }

  init()
})()
