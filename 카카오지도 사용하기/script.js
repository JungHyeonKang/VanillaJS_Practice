;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const shops = [
    {
      id: 1292273001,
      name: '매콤돈가스&칡불냉면 판교점',
      lat: 37.40189834738935,
      lng: 127.10624455094185,
    },
    {
      id: 1151112822,
      name: '탄탄면공방 판교테크노밸리점',
      lat: 37.40193038525563,
      lng: 127.11060980539878,
    },
    {
      id: 15775065,
      name: '파리바게뜨 판교테크노점',
      lat: 37.40133360873933,
      lng: 127.10801128231743,
    },
  ]

  const defaultPos = { //기본 위치는 판교테크노밸리로 설정
    lat: 37.4020589,
    lng: 127.1064401,
  }
  const $map = get('#map')
  const geoLocationButton = get('.geolocation_button')
  
  const mapContainer = new kakao.maps.Map($map,{
    center: new kakao.maps.LatLng(defaultPos.lat, defaultPos.lng), //지도의 중심좌표.
	  level: 3 //지도의 레벨(확대, 축소 정도)
  })

  const createMarkerImg = () =>{
    const imageSrc = 'assets/marker.png'
    const imageSize = new kakao.maps.Size(30, 46); 
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    return markerImage
  }
  const createMarker = (lat , lng) =>{
    const marker = new kakao.maps.Marker({
      map: mapContainer, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(lat, lng), // 마커를 표시할 위치
      image : createMarkerImg() // 마커 이미지 
  });
    return marker
  }

  const createShopElement = () =>{
    shops.map(shop=>{
      const {lat , lng} = shop
      const marker =createMarker(lat ,lng)
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 2px;">
        <a href="https://place.map.kakao.com/${shop.id}" target="_blank">${shop.name}</a>
      </div>`,
    });
      infowindow.open(mapContainer, marker); 
    })
  }
  const getLocation = ()=>{
    if (navigator.geolocation) {
    
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition( successGeolocation,errorGeolocation)
        
      
  } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
          message = 'geolocation을 사용할수 없어요..'
          
     // displayMarker(locPosition, message);
  }
  }
  const successGeolocation = (position) =>{
    var lat = position.coords.latitude; // 위도
    var lon = position.coords.longitude; // 경도
    var locPosition = new kakao.maps.LatLng(lat, lon)
    mapContainer.setCenter(locPosition);
    const marker =createMarker(lat ,lon)
    marker.setMap(mapContainer)
  } 

  const errorGeolocation = (error) => {
    if (error.code == 1) {
      alert('위치 정보를 허용해주세요.')
    } else if (error.code == 2) {
      alert('사용할수 없는 위치 입니다.')
    } else {
      alert('오류가 발생했습니다.')
    }
  }
  const init = () => {
    geoLocationButton.addEventListener('click', () => {
      getLocation()
    })
    
    createShopElement()
  }
  init()
})()
