;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }
  const $posts = get('.posts')
  const $loader = get('.loader')
  let currentPage = 1;
  const limit =10;
  const end = 100;
  let total = 10;

  const getPosts = async (page,limit) =>{
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response =await fetch(API_URL);
    if(!response.ok) {
      throw new Error('에러가 발생했습니다.')
    }
    let posts = await response.json();
    return posts
  }
  const showPosts =  (posts) =>{
    posts.forEach((post,index)=>{
      const $post = document.createElement('div')
      $post.innerHTML = `
        <div class="header">
          <div class="id">${post.id}</div>
          <div class="title">${post.title}</div>
        </div>
        <div class="body">${post.body}</div>
      `
      $posts.appendChild($post)
    })
  }
  const showLoader = () =>{
    $loader.classList.add('show')
  }
  const hideLoader = () =>{
    $loader.classList.remove('show')
  }
  const loadPosts = async (page , limit) =>{
    showLoader()
    try {
      let posts = await getPosts(page,limit);
      showPosts(posts)
    } catch (error) {
      console.log(error)
    }finally{
      hideLoader()
    }
  }
  const onScroll = () =>{
    const {scrollHeight,scrollTop,clientHeight} = document.documentElement;

    if(total === end){
      window.removeEventListener('scroll',onScroll)
      return;
    }
    if(scrollTop + clientHeight  >=scrollHeight -5){
      currentPage++
      total +=10
      loadPosts(currentPage , limit)
      return;
    }

  }
  window.addEventListener('DOMContentLoaded',()=>{
    window.addEventListener('scroll',onScroll)
    loadPosts(currentPage , limit)
  })
  
})()
