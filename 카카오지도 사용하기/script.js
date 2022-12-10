;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const defaultPos = { //기본 위치는 판교테크노밸리로 설정
    lat: 37.4020589,
    lng: 127.1064401,
  }
  const $map = get('#map')
  
  const mapContainer = new kakao.maps.Map($map,{
    center: new kakao.maps.LatLng(defaultPos.lat, defaultPos.lng), //지도의 중심좌표.
	  level: 3 //지도의 레벨(확대, 축소 정도)
  })

  
})()
