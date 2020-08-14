# 🧮 Calculator ver.2 🧮
> Description
<br/>

Vanilla JS로 계산기를 웹에서 구현해 보았습니다.<br/>
기본적인 형태는 html의 table 태그를 활용하였습니다.

<img src="https://user-images.githubusercontent.com/60544994/90222985-218b2480-de48-11ea-97f6-2bbbffa08f18.png" width="470px" height="332px" title="calculator.ver.2_img" alt="calculator.ver.2_screenshot">
<br/><br/>
ver.1 

---

# 🧮 Calculator ver.1 🧮
> Description
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


