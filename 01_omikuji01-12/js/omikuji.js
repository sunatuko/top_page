"use strict";
let n = null; // 01-12 add ランダムな数値を格納する変数
let prev_n = null; // 01-12 add 前回のランダムな数値を格納する変数

let currentAudio = null; // 01-10 add 再生中のオーディオを保持する変数
let omikuji_sound1 = new Audio("./sound/omikuji_sound1.mp3") // 01-10 add 
let omikuji_sound2 = new Audio("./sound/omikuji_sound2.mp3") // 01-10 add 
let omikuji_sound3 = new Audio("./sound/omikuji_sound3.mp3") // 01-10 add 
let omikuji_sound4 = new Audio("./sound/omikuji_sound4.mp3") // 01-10 add 
let omikuji_sound5 = new Audio("./sound/omikuji_sound5.mp3") // 01-10 add
let omikuji_sound6 = new Audio("./sound/omikuji_sound6.mp3") // 01-10 add
let resultSound = [
  omikuji_sound1,
  omikuji_sound2,
  omikuji_sound3,
  omikuji_sound4,
  omikuji_sound5,
  omikuji_sound6
] // 01-10 add

window.addEventListener(
  "DOMContentLoaded",
  function () {
    // ページ本体が読み込まれたタイミングで実行するコード
    // 01-08 add headerのテキスト１文字ずつランダム表示
    $("header").textillate({
      loop: false, // ループのオンオフ
      minDisplayTime: 9000, // テキストが置き換えられるまでの表示時間
      initialDelay: 1000, // 遅延時間
      autoStart: true, // アニメーションを自動的にスタート
      in: {
        // フェードインのエフェクトの詳細設定
        effect: "fadeInLeftBig", // エフェクトの名前（animate.css参照）
        delayScale: 1.5, // 遅延時間の指数
        delay: 50, // 文字ごとの遅延時間
        sync: false, // trueはアニメーションをすべての文字に同時に適用
        shuffle: true, // trueは文字を順番にではなく、ランダムに
      },
    });

    // 01-08 add omikuji.png(id="btn1")　ボヤァと表示
    $(function () {
      ScrollReveal().reveal("#btn1", { duration: 9000 });
    });

    this.setTimeout(function () {
      let popMessage = "いらっしゃい！　おみくじ引いてって！";
      this.window.alert(popMessage);
    }, "3000");
  },
  false,
);

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage"); // 01-11 add
btn1.addEventListener(
  "click",
  function () {
    // 01-09 add Array => 01-11 chg image
    let resultTextImage = [
      "./img/omikuji_daikichi.png",
      "./img/omikuji_kichi.png",
      "./img/omikuji_chuukichi.png",
      "./img/omikuji_syoukichi.png",
      "./img/omikuji_suekichi.png",
      "./img/omikuji_kyou.png",
    ];
    // let resultColor = [ // 01-11 del
    //   "#ff0000",
    //   "#c71585",
    //   "#ff1493",
    //   "#ff69b4",
    //   "#ff8c00",
    //   "#1e90ff",
    // ];
    // let resultFontSize = ["80px", "70px", "60px", "50px", "40px", "30px"]; // 01-11 del
    let resultMaxSpeed = [20, 15, 10, 10, 5, 5]; // 01-11 chg
    let resultMaxSize = [35, 30, 30, 20, 30, 30]; // 01-11 chg
    let resultMinSize = [20, 15, 20, 10, 10, 15];
    let resultImage = [
      "img/star.png",
      "img/sakura_hanabira.png",
      "img/redLeaves4.png", // 01-11 add
      "img/water1.png", // 01-11 add
      "img/leaf.png",
      "img/snowflakes.png",
    ];

    //let n = Math.floor(Math.random() * resultTextImage.length); // 01-09 chg => 01-11 chg => 01-12 del
    // 01-12 add-str
    while (n === prev_n) {
      n = Math.floor(Math.random() * resultTextImage.length);
    }
    prev_n = n; // ランダムな数値を退避
    // 01-12 add-end

    // omikujiText.textContent = resultText[n]; //01-11 del
    // omikujiText.style.color = resultColor[n]; //01-11 del
    // omikujiText.style.fontSize = resultFontSize[n]; // 01-11 del

    // 01-11 add-str
    omikujiTextImage.src = resultTextImage[n];
    omikujiTextImage.classList.add("omikujiPaper");
    // アニメーション終了時にクラスを削除
    omikujiTextImage.addEventListener("animationend",
      function () {
        omikujiTextImage.classList.remove("omikujiPaper");
      }, false
    );
    // 01-11 add-end

    soundControl(resultSound[n]); // 01-10 add

    // 01-09 del
    // switch (n) {
    //   case 0:
    //     omikujiText.textContent = "Very Happy!!!";
    //     omikujiText.style.color = "red";
    //     omikujiText.style.fontSize = "38px";
    //     break;
    //   case 1:
    //     omikujiText.textContent = "Happy!!!";
    //     omikujiText.style.color = "yellow";
    //     omikujiText.style.fontSize = "30px";
    //     break;
    //   case 2:
    //     omikujiText.textContent = "UnHappy!!!";
    //     omikujiText.style.color = "black";
    //     omikujiText.style.fontSize = "20px";
    //     break;
    // }

    // 01-08 add snowfall stop
    $(document).snowfall("clear");

    // 01-08 add snowfall start
    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: resultMaxSpeed[n], // 最大速度 01-09 chg Array
        minSpeed: 1, // 最小速度
        maxSize: resultMaxSize[n], // 最大サイズ 01-09 chg Array
        minSize: resultMinSize[n], // 最小サイズ 01-09 chg Array
        image: resultImage[n], // 画像ファイル  01-09 chg Array
      });
    });

  },
  false,
);

// 01-10 add sound control
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