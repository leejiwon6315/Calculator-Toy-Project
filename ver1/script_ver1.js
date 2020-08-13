const inputFormula = document.getElementById("input_formula");
const calcHistDiv = document.getElementById("calc_history");

function add(char){   
    let display = document.getElementById('input_formula');
    display.value += char;
}

function reset(){
    inputFormula.value = "";
}

inputFormula.addEventListener("keyup", function(enterKey){
    if(enterKey.code === "Enter"){
        calculate();
    }
})

function keyBlock(){
    if(!((event.keyCode>=65)&&(event.keyCode<=90))){
        event.returnValue = false;
    }
}

function calculate(){
    const fm = inputFormula.value;    
    let resultText = "";
    let answer;
    
    eval('answer=' + fm);
    resultText = fm + " = ";
    resultText += (answer%1 > 0 ? answer.toFixed(2) : answer.toString());

    
    const resultDiv = document.createElement("div");
    resultDiv.appendChild(document.createTextNode(resultText));

    calcHistDiv.insertBefore(resultDiv, calcHistDiv.firstChild);


    reset();
}
