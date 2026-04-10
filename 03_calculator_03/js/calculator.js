'use strict';
// ページ上の要素（Element)を参照
const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");
const elementBtnEqual = document.getElementById("btnEqual");

// イベントを登録
elementSelect.addEventListener("change", clear);

elementNum1.addEventListener("change", clear);

elementNum2.addEventListener("change", clear);

elementBtnEqual.addEventListener("click", calculate);

/** 計算します。 */
function calculate() {
  let num1 = Number(elementNum1.value); // 1番目のテキスト入力フォームの値
  let num2 = Number(elementNum2.value); // 2番目のテキスト入力フォームの値
  let calcType = elementSelect.value // セレクトボックスの値（計算の種類）
  let result;
  // 計算の種類で処理を分岐
  switch (calcType) {
    case "type-add": // 足し算の場合
      result = num1 + num2;
      break;
    case "type-substract": // 引き算の場合
      result = num1 - num2;
      break;
    case "type-multiply": // 掛け算の場合
      result = num1 * num2;
      break;
    case "type-divide": // 割り算の場合
      result = num1 / num2;
      break;
  }
  // 画面に表示
  elementResult.innerHTML = result; // テキストを代入
}

// 計算結果をクリアします。
function clear() {
  elementResult.innerHTML = "";
}