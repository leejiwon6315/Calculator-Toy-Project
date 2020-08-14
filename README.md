# 🧮 Calculator ver.2 🧮
> Vanilla JS 로 제작한 계산기입니다. 
<br/>

ver.1 의 계산기와 마찬가지로 Vanilla JS로 계산기를 웹에서 구현해 보았습니다.<br/>

<img src="https://user-images.githubusercontent.com/60544994/90222985-218b2480-de48-11ea-97f6-2bbbffa08f18.png" width="470px" height="332px" title="calculator.ver.2_img" alt="calculator.ver.2_screenshot"></img>
<br/><br/>
ver.1 과 다르게 input 을 없애고 버튼형으로만 구현이 되게하였습니다.<br/>
ver.1 과 마찬가지로 계산된 결과 값은 계산기 아래의 공간에 자동으로 div 생성 후 추가되어, 사용자가 계산 히스토리를 볼 수 있습니다.<br/>
<br/>
### 구현한 javascript code
```
const calcHistDiv = document.getElementById(`jsCalcHistory`);
const panelForm = document.getElementById(`jsPanel`);
const panel = panelForm.querySelector(`h3`);
const num = document.querySelectorAll(`.jsNumber`);

const regExp = document.querySelectorAll(`.regExpButton`);
const resultBtn = document.getElementById(`resultButton`);
const clearBtn = document.querySelector(`#acButton`);

let inputFormula = ``;
let numCheck = true;
```
js 파일에서 사용될 id 와 class 들을 불러옵니다.<br/>
numCheck 변수는 연산자가 중복 사용되는 것을 방지하기 위해 선언해두었습니다. 연산자 부호가 클릭되면 false 로 바뀌어,<br/>
숫자 문자열만 입력이 가능해집니다. 숫자 문자열을 클릭시에는 true 로 변경됩니다.
<br/><br/>
```
function callAdd(event) {
  const charNum = event.target.innerText;
  add(charNum);
}

function callFormula(event) {
  const charExp = event.target.innerText;
  formula(charExp);
}
```
callAdd 함수와 callFormula 함수.<br/>
각각 숫자나 . 으로 이루어진 버튼, 연산자 부호로 이루어진 버튼을 클릭했을 때 계산할 문자열에 문자를 추가하고,<br/>
다음 동작을 실행하는 함수를 호출합니다.
<br/><br/>
```
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
```
최종 계산에 필요한 inputFormula 문자열에 숫자를 추가하는 함수<br/>
맨 처음 . 이 클릭됐을 때, 0. 으로 표시되게끔 구현하였습니다.<br/>
계산 문자열에 추가되는 동시에 화면의 innerText에서 즉각적으로 문자열의 변경이 이루어집니다.
<br/><br/>
```
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
```
최종 계산에 필요한 inputFormula 문자열에 연산자 부호를 추가하는 함수 입니다. <br/>
첫 입력 문자가 - 일 경우 음수로 적용하여 계산할 수 있게끔 구현 하였으며, 연산자 부호의 중복입력 또한 방지합니다.
<br/><br/>
```
function reset() {
  panel.innerText = `0`;
  inputFormula = ``;
  numCheck = true;
}
```
history 를 제외한 전체값을 초기화하는 함수입니다.
<br/><br/>
```
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
```
eval 함수를 활용하여 입력이 추가된 문자열을 계산하고, history 에 div를 생성해 계산식과 결과를 추가합니다.<br/>
eval 함수는 javascipt 코드를 그대로 실행하며, input text 로 문자열 식을 입력받을 경우 숫자나 부호 외 문자를<br/>
입력 받을 수 있기 때문에 오류나 버그를 발생시킬 수 있다고 판단하여, innerText 에 문자가 보이는 방식을 적용하였습니다.
<br/><br/>
```
for (let i = 0; i < 11; i++) {
  num[i].addEventListener(`click`, callAdd);
}
for (let i = 0; i < 4; i++) {
  regExp[i].addEventListener(`click`, callFormula);
}

resultBtn.addEventListener(`click`, calculate);
clearBtn.addEventListener(`click`, reset);
```
querySelectorAll 로 받아온 숫자와 연산자 부호들에 반복문을 활용하여 addEventListener 를 추가해 주었습니다.<br/>
= 버튼 클릭 시 계산을 수행하는 calculate 함수를 호출하고, C 버튼 클릭 시 reset 함수를 호출합니다.
<br/><br/>

---

# 🧮 Calculator ver.1 🧮
> Vanilla JS 로 제작한 계산기입니다. 
<br/>

javascript를 이용한 계산기를 웹에서 구현해 보았습니다.<br/>
기본적인 형태는 html의 table 태그를 활용하였습니다.

<img src="https://user-images.githubusercontent.com/60544994/87878558-f4ea1580-ca1f-11ea-9f98-b02167ff96b2.png" width="412px" height="332px" title="calculator_img" alt="calculator_screenshot"></img>
<br/><br/>
위 계산기의 빈칸에 키보드로 수식을 입력하거나, 버튼을 눌러 수식을 입력할 수 있습니다.<br/>
수식 입력 후 계산기 내의 " = " 버튼 혹은 키보드의 " Enter " 키를 입력하면 결과 값이 나오게됩니다.<br/>
계산된 결과 값은 계산기 아래의 공간에 자동으로 div 생성 후 추가되어, 사용자가 계산 히스토리를 볼 수 있습니다.<br/>
<br/>
### 구현한 javascript code
```
const inputFormula = document.getElementById("input_formula");
const calcHistDiv = document.getElementById("calc_history");
```
기존에 많이 사용하던 전역변수 var가 아닌 ES6의 const 변수를 사용하였습니다.<br/>
getElementById 를 통해 html 문서 내 id가 부여되어 있는 요소들을 가져옵니다.
<br/><br/>
```
function add(char){
    let display = document.getElementById('input_formula');
    display.value += char;
}
```
수식을 입력하는 칸에 버튼의 문자(숫자)를 입력하는 add 함수 입니다.<br/>
값이 변할 수 있는 변수는 var가 아닌 ES6의 let을 활용하였습니다.<br/>
add 함수를 구현하여 html 내의 버튼들에 직접 onclick 이벤트를 추가해 주었습니다.
<br/><br/>
```
function reset(){
    inputFormula.value = "";
}
```
계산기 내 " AC " 버튼을 누르거나 계산을 완료하였을 때, 입력 창을 초기화 해주는 reset 함수입니다.
<br/><br/>
```
inputFormula.addEventListener("keyup", function(enterKey){
    if(enterKey.code === "Enter"){
        calculate();
    }
})
```
계산기 " = " 버튼 뿐만 아닌, " Enter " 키 입력으로도 calculate 함수가 실행될 수 있도록 하는 코드입니다.
<br/><br/>
```
function keyBlock(){
    if(!((event.keyCode >= 65)&&(event.keyCode <= 90))){
        event.returnValue = false;
    }
}
```
계산을 실행할 때 사용할 eval 함수는 javascript 코드를 인식합니다.<br/>
계산기 입력창에 javascript 코드 입력을 방지하기 위해, 입력창에 영어가 들어오지 못하게 하는 함수입니다.
<br/><br/>
```
function calculate(){
    const fm = inputFormula.value;
    let resultText = " ";       
    let answer;
    eval('answer=' + fm);
    resultText = fm + " = ";
    resultText += (answer%1 > 0 ? answer.toFixed(2) : answer.toString());    
    
    const resultDiv = document.createElement("div");
    resultDiv.appendChild(document.createTextNode(resultText));
    
    calcHistDiv.insertBefore(resultDiv, calcHistDiv.firstChild);

    reset();
}
```
입력칸에 입력된 값을 계산하는 calculate 함수입니다.<br/>
계산 식을 fm에 저장하고 계산 결과를 answer에 저장합니다. answer가 유리수라면 소수점 둘째자리까지만 표현합니다.<br/>
answer의 값을 div를 생성하여 calc_history에 추가하고, reset 함수를 실행시켜 입력창을 초기화합니다.


