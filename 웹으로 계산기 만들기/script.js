//  기존 전역변수 var가 아닌 ES6의 let 변수를 사용하였음

let inputFormula = document.getElementById("input_formula");
let calcHistDiv = document.getElementById("calc_history");

function add(char){
    //  입력칸에 버튼 문자 입력 함수
    
    let display = document.getElementById('input_formula');
    display.value += char;
}

function reset(){
    //  입력칸 초기화 함수
    
    inputFormula.value = "";
}

inputFormula.addEventListener("keyup", function(enterKey){
    //  계산기 버튼이 아닌, 키 입력으로도 계산이 가능하게끔 Enter를 눌렀을때 calculate함수가 실행되게 했음
    
    if(enterKey.code === "Enter"){
        calculate();
    }
})

function calculate(){
    //  입력칸의 문자열이 사칙연산 형식에 맞는가를 판별하고 계산하는 함수
    
    let fm = inputFormula.value;
    let formulaRegExp = /^(\-)?\d+(.\d+)?[+\-*/]{1}\d+(.\d+)?$/;
    //  정규식
    //  (\-)? 첫 숫자가 마이너스가 올수 있음, ? 를 써서 올수도 있고 안올수도 있음 표현 
    //  \d+  1개 이상의 문자열(숫자) 매칭
    //  (.\d+)?  띄어쓰기를 제외한 모든 문자열(숫자) 매칭, ? 가 붙어서 0개 혹은 1개의 문자열(숫자)을 찾음
    //  [+\-*/]{1}  []안의 문자열 중 하나를 찾음, \뒤의 -*/ 는 정규식이 아닌 문자 그대로를 표현/ {1} 이기 때문에 반드시 한번만 사용됨 
    //  \d+(.\d+)?  한개의 문자열(숫자) 혹은 띄어쓰기를 제외한 모든 문자열(숫자)를 매칭
    
    let formulaValid = formulaRegExp.test(fm);
    let resultText = " 식이 이상합니다 ";
    //  사칙연산에 맞지 않는다면 식이 이상하다는 문구 출력
    
    if(formulaValid){
        //  문자열의 형식이 사칙연산 이라면 계산 후 결과 문자열 설정
        
        let answer;
        eval('answer=' + fm);
        resultText = fm + " = ";
        resultText += (answer%1 > 0 ? answer.toFixed(2) : answer.toString());
        //  anwer 를 1로 나눈 값이 0보다 크다면, 소수점 2자리에서 자름(반올림됨)
    }
    
    //  calc_history 상자에 넣을 또다른 div를 생성, 내용 설정 후 삽입
    let resultDiv = document.createElement("div");
    resultDiv.appendChild(document.createTextNode(resultText));
    
    if(!formulaValid) resultDiv.classList.add("invalid");
    calcHistDiv.insertBefore(resultDiv, calcHistDiv.firstChild);

    //  입력칸 초기화
    reset();
}
