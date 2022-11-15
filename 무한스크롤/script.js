;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }
  const $posts = get('.posts')
  let currentPage = 1;
  const limit =10;
  const getPosts = async () =>{
    const API_URL = `https://jsonplaceholder.typicode.com/posts`
    const response =await fetch(API_URL);
    if(!response.ok) return
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
  const loadPosts = async (page , limit) =>{
    let posts = await getPosts();
    showPosts(posts)
  }

  window.addEventListener('DOMContentLoaded',()=>{
    loadPosts(currentPage , limit)
  })
  
})()
