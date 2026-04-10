"use strict";

// flagが"pen-flag"のときpenguinsのターン、"bear-flag"のときbearのターン
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

// class="square" を取得（しゅとく）
const squares = document.getElementsByClassName("square");

// Array に変換（へんかん）
const squaresArray = Array.from(squares);

// squaresの要素（ようそ）を取得（しゅとく）
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタン取得（しゅとく）
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// WinningLine pattern
const line1 = [a_1, a_2, a_3];
const line2 = [b_1, b_2, b_3];
const line3 = [c_1, c_2, c_3];
const line4 = [a_1, b_1, c_1];
const line5 = [a_2, b_2, c_2];
const line6 = [a_3, b_3, c_3];
const line7 = [a_1, b_2, c_3];
const line8 = [a_3, b_2, c_1];

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image">\
<img src ="img/penguins.jpg" width=61px height=61px>\
</p>\
<p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image">\
<img src ="img/whitebear.jpg" width=61px height=61px>\
</p>\
<p class="text">WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image">\
<img src ="img/penguins.jpg" width=61px height=61px>\
</p>\
<p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image">\
<img src ="img/whitebear.jpg" width=61px height=61px>\
</p>\
<p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image">\
<img src ="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px>\
</p>\
<p class="text animate__bounceIn">Draw!!</p>';

// サウンド
let currentAudio = null; // 再生中のオーディオを保持する変数
let click_sound1 = new Audio("./sound/click_sound1.mp3")
let click_sound2 = new Audio("./sound/click_sound2.mp3")
let penwin_sound = new Audio("./sound/penwin_sound.mp3")
let bearwin_sound = new Audio("./sound/bearwin_sound.mp3")
let draw_sound = new Audio("./sound/draw_sound.mp3")

// **********************************************
// ページ本体が読み込まれたタイミングで実行するコード
// **********************************************
window.addEventListener("DOMContentLoaded",
  function () {
    // メッセージ（最初はpenguinsのターンから）
    setMessage("pen-turn");
  }, false
);

// **********************************************
// squareをクリックしたときにイベント発火
// **********************************************
a_1.addEventListener("click",
  function () {
    isSelect(a_1);
  }, false
);
// 上記のコードを省略して記述したパターン
a_2.addEventListener("click", () => {
  isSelect(a_2);
});

a_3.addEventListener("click", () => {
  isSelect(a_3);
});

b_1.addEventListener("click", () => {
  isSelect(b_1);
});

b_2.addEventListener("click", () => {
  isSelect(b_2);
});

b_3.addEventListener("click", () => {
  isSelect(b_3);
});

c_1.addEventListener("click", () => {
  isSelect(c_1);
});

c_2.addEventListener("click", () => {
  isSelect(c_2);
});

c_3.addEventListener("click", () => {
  isSelect(c_3);
});

// **********************************************
// squareをクリックした時の処理
// **********************************************
function isSelect(selectSquare) {

  // ペンギンの時
  if (flag === "pen-flag") {
    // クリックサウンド
    soundControl(click_sound1);
    // squareにはpenguinsを表示。squareをクリックできないようにする。
    selectSquare.classList.add("js-pen-checked", "js-unclickable");
    // ペンギンの勝ち
    if (isWinner("penguins")) {
      setMessage("pen-win"); //display win message
      gameOver("penguins");
      return;
    }
    // メッセージ表示
    setMessage("bear-turn");
    flag = "bear-flag";

    // クマの時
  } else {
    // クリックサウンド
    soundControl(click_sound2);
    // squareにはbearを表示。squareをクリックできないようにする。
    selectSquare.classList.add("js-bear-checked", "js-unclickable");
    // クマの勝ち
    if (isWinner("bear")) {
      setMessage("bear-win");
      gameOver("bear");
      return;
    }
    // メッセージ表示
    setMessage("pen-turn");
    flag = "pen-flag";
  }

  // ターン数カウンターを－１する
  counter--;

  // ターン数＝０になったら引き分け(draw)
  if (counter === 0) {
    // メッセージ表示
    setMessage("draw");
    gameOver("draw");
  }

}
// **********************************************
// 勝敗判定(Win or Lose)
// **********************************************
function isWinner(symbol) {
  // some: 1つでも条件（じょうけん）を満たしていればTrueを返す
  const result = lineArray.some(function (line) {
    // every: 全て条件を満たしていればTrueを返す
    const subResult = line.every(function (square) {
      if (symbol === "penguins") {
        return square.classList.contains("js-pen-checked");
      }
      if (symbol === "bear") {
        return square.classList.contains("js-bear-checked");
      }
    });
    // trueを返したlineをwinningLineに代入
    if (subResult) { winningLine = line }

    return subResult;
  });
  return result;
}

// **********************************************
// メッセージ表示
// **********************************************
function setMessage(id) {
  switch (id) {
    case "pen-turn":
      document.getElementById("msgtext").innerHTML = msgtxt1;
      break;
    case "bear-turn":
      document.getElementById("msgtext").innerHTML = msgtxt2;
      break;
    case "pen-win":
      document.getElementById("msgtext").innerHTML = msgtxt3;
      break;
    case "bear-win":
      document.getElementById("msgtext").innerHTML = msgtxt4;
      break;
    case "draw":
      document.getElementById("msgtext").innerHTML = msgtxt5;
      break;
    default:
      document.getElementById("msgtext").innerHTML = msgtxt1;
  }
}

// **********************************************
// ゲーム終了時の処理
// **********************************************
function gameOver(status) {
  // GameOver サウンド
  let w_sound // wkサウンドの種類
  switch (status) {
    case "penguins":
      w_sound = penwin_sound;
      break;
    case "bear":
      w_sound = bearwin_sound;
      break;
    case "draw":
      w_sound = draw_sound;
      break;
  }
  soundControl(w_sound);

  // all square unclickable
  squaresArray.forEach(function (square) {
    square.classList.add("js-unclickable");
  });

  // display New Game button：display
  newgamebtn_display.classList.remove("js-hidden");
  // winEffect
  if (status === "penguins") {
    // winner-line penguins high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-pen_highLight");
      });
    }
    // penguins win!! ==>snow color is pink
    $(document).snowfall({
      flakeColor: "rgb(255,240,245)", // 雪の色
      maxSpeed: 3, // 最大速度（さいだい　そくど）
      minSpeed: 1, // 最小速度（さいしょう　そくど）
      maxSize: 20, // 最大サイズ（さいだい　サイズ）
      minSize: 10, // 最小サイズ（さいしょう　サイズ）
      round: true // 雪の形を丸にする
    });

  } else if (status === "bear") {
    // winner-line bear high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-bear_highLight");
      });
    }
    // whitebear win!! ==>snow color is blue
    $(document).snowfall({
      flakeColor: "rgb(175,238,238)", // 雪の色
      maxSpeed: 3, // 最大速度（さいだい　そくど）
      minSpeed: 1, // 最小速度（さいしょう　そくど）
      maxSize: 20, // 最大サイズ（さいだい　サイズ）
      minSize: 10, // 最小サイズ（さいしょう　サイズ）
      round: true // 雪の形を丸にする
    });
  }

}

// **********************************************
// NewGameボタン　クリック時、ゲーム初期化
// **********************************************
newgamebtn.addEventListener("click", function () {
  // penguinsのターン
  flag = "pen-flag";
  // ターン数カウンター
  counter = 9;
  winningLine = null;
  squaresArray.forEach(function (square) {
    square.classList.remove("js-pen-checked", "js-bear-checked", "js-unclickable", "js-pen_highLight", "js-bear_highLight");
  });

  setMessage("pen-turn");
  newgamebtn_display.classList.add("js-hidden");

  // snowfall stop
  $(document).snowfall("clear");
});

// **********************************************
// sound 
// **********************************************
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