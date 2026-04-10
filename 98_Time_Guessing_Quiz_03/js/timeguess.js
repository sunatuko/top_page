"use strict";

const timer = document.getElementById("timer"); //★chg "time" => "timer"
const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop"); //★chg  "btn_Stop"=>"btn_stop"
const btn_reset = document.getElementById("btn_reset");

let currentAudio = null; // ★★ add 
let sound_start = new Audio("./sound/start.mp3") // ★★ add 
let sound_stop1 = new Audio("./sound/stop1.mp3") // ★★ add 
let sound_stop2 = new Audio("./sound/stop2.mp3") // ★★ add 
let sound_reset = new Audio("./sound/reset.mp3") // ★★ add 

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間

// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
btn_start.addEventListener("click", //★ chg btn_Start => btn_start
  function () {
    soundControl(sound_start); //★★ add
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning(); //★chg setButtonStaterunning(); => setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
btn_stop.addEventListener("click",
  function () {
    // タイマーを"停止中"状態とする
    setButtonStateStopped(); //★chg setButtonStateStopped; => setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    //★★★ add-str
    // 10秒台でストップできたら、花火を打ち上げる。 
    if (stopTime >= 10000 && stopTime < 11000) {
      document.body.style.backgroundImage = "url('img/fireworks.gif')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
      soundControl(sound_stop2);
    } else {
      soundControl(sound_stop1); // ★★ add => ★★★ move
    }
    //★★★ add-end
  }, false
); //★ add );

////////////////////////
// Resetボタンクリック
////////////////////////
btn_reset.addEventListener("click", //★chg "change" => "click"
  function () {
    soundControl(sound_reset); //★★ add
    // ボタンを"初期"状態とする
    setButtonStateInitial()
    timer.textContent = "00:00.000";
    stopTime = 0;
    document.body.style.backgroundImage = ""; //★★ add
    document.body.style.backgroundColor = ""; //★★ add cssで設定されている色に戻る
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  btn_start.classList.remove("js-inactive");
  btn_stop.classList.add("js-inactive");
  btn_reset.classList.add("js-inactive");
  btn_start.classList.remove("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  btn_start.classList.add("js-inactive");   // 非活性
  btn_stop.classList.remove("js-inactive");  // 活性
  btn_reset.classList.add("js-inactive");   // 非活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.remove("js-unclickable");
  btn_reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  btn_start.classList.add("js-inactive"); // 活性
  btn_stop.classList.add("js-inactive");    // 非活性
  btn_reset.classList.remove("js-inactive"); // 活性
  btn_start.classList.add("js-unclickable");
  btn_stop.classList.add("js-unclickable");
  btn_reset.classList.remove("js-unclickable");
} //★add

// ★★ add sound control
function soundControl(w_sound) {
  // もし前の音が再生中なら止める
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  // 再生
  w_sound.play();
  // 再生中のオーディオを保持
  currentAudio = w_sound;
}