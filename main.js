// main.js


//UI가 노출될 위치(정렬, 가로, 세로) 값을 변수로 사전에 제작
let postion = 'middle';
let width = 400;
let height = 400;

// my.html로 state라는 태그를 만들어 hello라는 값을 전달
let _widget = player.showWidget('my.html', position, width, height);
_widget.sendMessage({
	state: "hello",
}); 




App.showCenterLabel("Hello world");

// App이 최초로 시작될 때
App.onInit.Add(function(){
	// 이 시점에 App에는 플레이어들이 참가하지 않은 상태
  // App의 나머지 필요한 부분을 초기화시킨다.
  App.showCenterLabel("onInit");
});

// 플레이어가 들어올 때
App.onJoinPlayer.Add(function(player){
  // 해당하는 모든 플레이어가 이 이벤트를 통해 App에 입장
  App.showCenterLabel("onJoinPlayer");
});

// 플레이어가 모두 입장한 뒤에 한번 호출
App.onStart.Add(function(){
  // App에서 원하는 플레이어 속성값을 부여할 수 있다.
  App.showCenterLabel("onStart");
});

// 플레이어가 떠날 때
App.onLeavePlayer.Add(function(player){
  // 플레이어가 단순히 중간에 나갔을 때
  // App이 종료될 때에서 이 이벤트를 통해 모두 App에서 퇴장합니다.
  App.showCenterLabel("onLeavePlayer");
})

// 매 20ms(0.02초) 마다 실행
App.onUpdate.Add(function(){
})

// App이 종료될 때
App.onDestroy.Add(function(){
   // 이미 모든 플레이어가 App에서 나간 상태
   // App을 나머지를 정리한다.
})