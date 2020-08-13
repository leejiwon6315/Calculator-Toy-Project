const calcHistDiv = document.getElementById(`jsCalcHistory`);
const panelForm = document.getElementById(`jsPanel`);
const panel = panelForm.querySelector(`h3`);
const num = document.querySelectorAll(`.jsNumber`);

const regExp = document.querySelectorAll(`.regExpButton`);
const resultBtn = document.getElementById(`resultButton`);
const clearBtn = document.querySelector(`#acButton`);

let inputFormula = ``;
let numCheck = true;
//연속된(잘못된) 계산 부호를 체크해주는 변수. 가장 먼저 입력했던 부호만 계산에 입력하기 위해 생성

function callAdd(event) {
  const charNum = event.target.innerText;
  add(charNum);
}

function callFormula(event) {
  const charExp = event.target.innerText;
  formula(charExp);
}

function add(char) {
  numCheck = true;

  if (inputFormula === `` && char !== `.`) {
    panel.innerText = char;
    inputFormula += char;
  } else if (inputFormula === `` && char === `.`) {
    panel.innerText = 0 + char;
    inputFormula += 0 + char;
  } else {
    panel.innerText += char;
    inputFormula += char;
  }
}

function formula(char) {
  if (inputFormula === ``) {
    if (char === "-") {
      panel.innerText = `-`;
      inputFormula += char;
    }
  } else {
    if (numCheck === false) {
    } else {
      numCheck = false;
      panel.innerText = ``;
      inputFormula += char;
    }
  }
}

function reset() {
  panel.innerText = `0`;
  inputFormula = ``;
  numCheck = true;
}

function calculate() {
  if (inputFormula === `` || numCheck === false) {
  } else {
    console.log(inputFormula);
    const result = eval(inputFormula);
    panel.innerText = result;

    const resultText = inputFormula + ` = ` + result;

    const resultDiv = document.createElement("div");
    resultDiv.appendChild(document.createTextNode(resultText));

    calcHistDiv.insertBefore(resultDiv, calcHistDiv.firstChild);

    inputFormula = ``;
    numCheck = true;
  }
}

for (let i = 0; i < 11; i++) {
  num[i].addEventListener(`click`, callAdd);
}
for (let i = 0; i < 4; i++) {
  regExp[i].addEventListener(`click`, callFormula);
}

resultBtn.addEventListener(`click`, calculate);
clearBtn.addEventListener(`click`, reset);
