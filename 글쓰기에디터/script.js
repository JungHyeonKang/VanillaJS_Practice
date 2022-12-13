;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const commands = [
    {
      cmd: 'backColor',
      val: 'red',
      label: '배경 컬러',
    },
    {
      cmd: 'bold',
      label: '굵기',
    },
    {
      cmd: 'delete',
      label: '삭제',
    },
    {
      cmd: 'fontSize',
      label: '폰트 사이즈',
      val: '1-7',
    },
    {
      cmd: 'foreColor',
      label: '폰트 컬러',
      val: 'rgba(0,0,0,.5)',
    },
    {
      cmd: 'insertImage',
      label: '이미지 추가',
      val: 'http://dummyimage.com/160x90',
    },
    {
      cmd: 'italic',
      label: '기울이기',
    },
    {
      cmd: 'justifyCenter',
      label: '중앙 정렬',
    },
    {
      cmd: 'justifyFull',
      label: '양쪽 정렬',
    },
    {
      cmd: 'justifyLeft',
      label: '좌측 정렬',
    },
    {
      cmd: 'justifyRight',
      label: '우측 정렬',
    },

    {
      cmd: 'selectAll',
      label: '전체 선택',
    },
    {
      cmd: 'underline',
      label: '밑줄',
    },
    {
      cmd: 'undo',
      label: '취소',
    },
  ]

  const editbuttons = get('.editor_buttons')
  const editorHtml = get('.editor.html')
  const editorEdit = get('.editor.edit')
  const editShowButton = get('.show_editor_button')
  const htmlShowButton = get('.show_html_button')

  const commandObject = {}
  const doCommand = (cmdKey)=>{
    const cmd = commandObject[cmdKey]
    console.log(cmd)
    const val = cmd.val ? prompt('입력해주세요' , cmd.val) : ''
    document.execCommand(cmd.cmd , false , val || '')
  }

  const showEdit = ()=>{
    editorEdit.innerHTML = editorHtml.innerText
    editorHtml.classList.toggle('show')
    editorEdit.classList.toggle('show')
  } 

  const showHtml = ()=>{
    console.log("dsa")
    editorHtml.innerText = editorEdit.innerHTML
    editorEdit.classList.toggle('show')
    editorHtml.classList.toggle('show')
  }

  const init = () =>{
    commands.map((command)=>{
      commandObject[command.cmd] = command
      const element = document.createElement('button')
      element.innerText = command.label
      element.addEventListener('click',(e)=>{
        e.preventDefault()
        doCommand(command.cmd)
      })
      editbuttons.appendChild(element)
    })

    editShowButton.addEventListener('click',showEdit)
    htmlShowButton.addEventListener('click',showHtml)
  }
  init()
})()
