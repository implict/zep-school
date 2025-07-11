/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

// Set game time
const GAME_TIME = 60 * 90;
let ONE_SEC = 1;

App.onJoinPlayer.Add(function (player) {
  player.tag = {};
});




App.onUpdate.Add(function (dt) {
  if (ONE_SEC > 0) {
    ONE_SEC -= dt;
  } else {
    ONE_SEC = 1;
    for (let player of App.players) {
      
      if (player.tag.playtime) {
        if(player.tag.startTimer){
          player.tag.playtime += ONE_SEC;
        }
      } else {
        player.tag.playtime = ONE_SEC;
      }
      // When GAME_TIME is exceeded
      if (player.tag.playtime >= GAME_TIME) {
        let minutes = Math.floor((GAME_TIME - player.tag.playtime) * -1 / 60);
        let seconds = Math.floor((GAME_TIME - player.tag.playtime) * -1 % 60);
        let minutes_string = minutes < 10 ? "0" + String(minutes) : String(minutes);
        let seconds_string = seconds < 10 ? "0" + String(seconds) : String(seconds);

        showTimerLabel(player, "main", "⏰ Overtime : ", `${minutes_string} : ${seconds_string}`);
      }
      else {
        let minutes = Math.floor((GAME_TIME - player.tag.playtime) / 60);
        let seconds = Math.floor((GAME_TIME - player.tag.playtime) % 60);
        let minutes_string = minutes < 10 ? "0" + String(minutes) : String(minutes);
        let seconds_string = seconds < 10 ? "0" + String(seconds) : String(seconds);

        showTimerLabel(player, "main", "⏰ Remaining time : ",`${minutes_string} : ${seconds_string}`);
      }
    }
  }
});



// Set timer start location name
App.addOnLocationTouched("start_timer", function (player) {
  player.tag.startTimer = true;
});

// Set timer end location name
App.addOnLocationTouched("end_timer", function (player) {
  player.tag.startTimer = false;
});

// Set timer widget view
function showTimerLabel(player, key, text1, text2) {
	const isMobile = player.isMobile;
	const topGap = isMobile ? 10 : -2; 

	const labelPercentWidth = isMobile ? 50 : 20;
	const labelDisplayTime = 300000;

	const parentStyle = `
    display: flex; 
    align-items: center;
    justify-content: center;
    text-align: center;
    `;

	const firstRowStyle = `
    font-size: ${isMobile ? "14px" : "18px"};
    font-weight: 700; 
    color: white;`;

	const highlightSpanStyle = `
    font-size: ${isMobile ? "14px" : "18px"};
    font-weight: 700; 
    color: #FFEB3A;`;

    const customLabelOption = {
        key: key,
        borderRadius: '12px',
        fontOpacity: false,
        padding: '8px 24px',
    }

	let htmlStr = `<span style="${parentStyle}">
        <span style="${firstRowStyle}">${text1}</span>
        <span style="${highlightSpanStyle}">${text2}</span>
    </span>`;

    player.showCustomLabel(htmlStr, 0xffffff, 0x27262e, topGap, labelPercentWidth, 0.64, labelDisplayTime, customLabelOption);
}