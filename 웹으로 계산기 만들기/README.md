## 🧮 Calculator 🧮
### Description

javascript를 이용한 계산기를 웹에서 구현해 보았습니다.<br/>
기본적인 형태는 html의 table 태그를 활용하였습니다.

<img src="https://user-images.githubusercontent.com/60544994/87878558-f4ea1580-ca1f-11ea-9f98-b02167ff96b2.png" width="412px" height="332px" title="calculator_img" alt="calculator_screenshot"></img>
<br/><br/>
위 계산기의 빈칸에 키보드로 수식을 입력하거나, 버튼을 눌러 수식을 입력할 수 있습니다.<br/>
수식 입력 후 계산기 내의 " = " 버튼 혹은 키보드의 " Enter " 키를 입력하면 결과 값이 나오게 됩니다.<br/>
계산된 결과 값은 계산기 아래의 공간에 자동으로 div 생성 후 추가되어, 사용자가 계산 히스토리를 볼 수 있습니다.<br/>
<br/>
### 구현한 javascript code
```
let inputFormula = document.getElementById("input_formula");
let calcHistDiv = document.getElementById("calc_history");
```
기존에 많이 사용하던 전역변수 var가 아닌 ES6의 let 변수를 사용하였습니다.<br/>
getElementById 를 통해 html 문서 내 id가 부여되어 있는 요소들을 가져옵니다.
<br/><br/>
```
function add(char){
    let display = document.getElementById('input_formula');
    display.value += char;
}
```
수식을 입력하는 칸에 버튼의 문자(숫자)를 입력하는 add 함수 입니다.<br/>
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
<br/><br/><br/>
아래는 입력칸의 문자열이 사칙연산 형식에 맞는가를 판별하고 계산하는 calculate 함수입니다.
```
function calculate(){
    const fm = inputFormula.value;
    const formulaRegExp = /^(\-)?\d+(.\d+)?[+\-*/]{1}\d+(.\d+)?$/;
```
formulaRegExp 는 사칙연산에 필요한 정규식입니다. 값이 바뀌거나 재할당 될 일이 없기 때문에 const 변수를 사용하였습니다. <br/><br/>
" ( \ - ) ? " Description : 첫 숫자가 마이너스가 올수 있기 때문에, ? 를 사용하여 0개 혹은 1개의 부호를 찾아 매칭합니다.<br/>
" \d + ( . \d + ) ? " Description : 1개 이상의 문자열(숫자) 매칭, 띄어쓰기를 제외한 앞의 0개 혹은 1개의 문자열(숫자) 매칭합니다.<br/>
" [ + \ - * / ]{1} " Description : " [ ] " 내 문자열 중 하나를 찾습니다. " \ " 는 뒤 따라오는 " - * / " 문자에 대하여 정규식이 아닌 문자 그대로를 의미하며, {1} 이기 때문에 반드시 한번만 사용됩니다.<br/><br/>
```
    const formulaValid = formulaRegExp.test(fm);
    let resultText = " 식이 이상합니다 ";
    
    if(formulaValid){
        let answer;
        eval('answer=' + fm);
        resultText = fm + " = ";
        resultText += (answer%1 > 0 ? answer.toFixed(2) : answer.toString());
    }
```
문자열의 형식이 사칙연산에 맞다면, 계산 후 결과 문자열을 설정합니다.<br/>
answer 를 1로 나눈 값이 0보다 크다면(소수점이 존재한다면), 소수점 2자리까지 표현합니다.
<br/><br/>

```
    let resultDiv = document.createElement("div");
    resultDiv.appendChild(document.createTextNode(resultText));
    
    if(!formulaValid) resultDiv.classList.add("invalid");
    calcHistDiv.insertBefore(resultDiv, calcHistDiv.firstChild);

    reset();
}
```
마지막으로 계산한 결과를 div를 생성하여 calc_history 에 추가하고, reset 함수를 실행시켜 입력창을 초기화합니다.

