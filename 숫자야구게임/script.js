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
    if(!!end){ //게임이 끝낫는지 체크
      return ;
    }
    
    const inputNumber = $input.value;
    const {password} = baseball
    if(inputNumber.length !=digit){
      alert(`${digit}자리 숫자를 입력해주세요`)
    }
    else if(isDuplicated(inputNumber)){
      alert("중복된 숫자는 입력할 수 없습니다.")
    }
    else{     
      trial++
      if(trial >=limit && !isCorrect(inputNumber , password)){ // 10번째 시도인데 답이 틀렸을 경우 
        alert("쓰리아웃")
        end = true;
        $answer.innerHTML = password;
      }

      const result = onPlayed(inputNumber , getResult(inputNumber,password)) 
       $question.innerHTML += `<span>${result}</span>` // 결과값 출력
    }
    $input.value = '';
    $input.focus();
    
  }
  
  const isDuplicated = (number) =>{ // 중복체크함수
    return [...new Set(number.split(""))].length !== digit; // 입력된 숫자를 배열로 바꾸고 set으로 변형하여 중복체크
  }

  const onPlayed = (number , hint) => { // 정답 체크 후 결과 값 출력 함수
    return `${trial}차 시도 : ${number} , ${hint}`
  }

  const isCorrect = (number , password) =>{ // 정답 확인 함수
    return number === password;
  }

  const getResult = (number , password) => { // 답 비교 후 결과 값 생성 함수 (홈런 , 스트라이크 , 볼) 
    if(isCorrect(number,password)){ // 정답일경우 홈런 리턴
      $answer.innerHTML = password;
      end = true;
      return `홈런!`
    }
    //  정답이 아닐경우 스트라이크 , 볼 결과 리턴
    const strike = getStrikes(number , password);
    const ball = getBalls(number , password);

    return `Strike : ${strike} , Ball : ${ball}`
  }

  const getStrikes = (number, password) => { // 스트라이크값 생성 
    let strike = 0;
      number.split("").map((num,index)=>{
        if(num === password[index]){ // 입력 값과 정답 값이 똑같고 자리까지 똑같음
          strike++
        }
      })
      return strike;
  }

  const getBalls = (number, password) => { // 볼값 생성 
    let ball = 0;
    const passwordCheckArray = Array(limit).fill(false) 
    password.split("").map((num) => {
      passwordCheckArray[num] = true; // 정답 값과 같은 배열INDEX를 TRUE로 변환 , 즉 값이 TRUE이면 정답 번호 중 하나
    })
    number.split("").map((num , index)=>{
      if(passwordCheckArray[num] && num !== password[index]){ // passwordCheckArray[num] 가 TRUE면 정답 번호는 맞음 && num !== password[index] 값이 다르면 자리는 다름
        ball++
      }
    })
    return ball;
  }
  init()
})()
