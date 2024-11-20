// html과 연결
const $header = document.querySelector("#header");
const $valueInp = document.querySelector("#valueInp");


// 변수
let value1 = "";
let value2 = "";
let operator = "";

let intV1 = 0;
let intV2 = 0;
let resultValue = 0;

// function
  const result = () => {
    intV1 = parseInt(value1);
    intV2 = parseInt(value2);
    resultValue = 0;

    if(operator === "+"){
      resultValue= intV1 + intV2;
    }
    else if(operator === "-"){
      resultValue = intV1 - intV2;;
    }
    else if(operator === "x"){
      resultValue = intV1 * intV2;; 
    }
    else if(operator === "/"){
      resultValue = intV1 / intV2;;
    }
  
  }

  const view = (string) => {
    if(["+","-","/","x"].includes(string)){
      $valueInp.value = "";
      $header.textContent = value1 + string;
    }

    else if("=" === string){
      result();
      $header.textContent = value1 + operator + value2 + "=" + resultValue;
      value1 =  resultValue;
      value2 = "";
      operator = "";
      $valueInp.value = "";
    }

    else {
      $valueInp.value += string;
    }
  }


// Event function
const checkChar = (event) => {
  const string = event.target.textContent;
  console.log(string);
}

const numbers = (event) => {
  if(value1.length === 0){
    if(event.target.textContent === "0"){
      return;
    }
  }

  if(resultValue && !operator){
    return alert("연산자를 입력해주세요");
  }
  
  if(!operator){
    value1 += event.target.textContent;
  } else if (operator){
    value2 += event.target.textContent;
  }

  view(event.target.textContent);

}

const opEvent = (event) => {
  if(!value1 || value2) return;

  operator = event.target.textContent;

  view(operator);
}

// 숫자
const $num1 = document.querySelector("#num-1").addEventListener("click",numbers);
const $num2 = document.querySelector("#num-2").addEventListener("click",numbers);
const $num3 = document.querySelector("#num-3").addEventListener("click",numbers);
const $num4 = document.querySelector("#num-4").addEventListener("click",numbers);
const $num5 = document.querySelector("#num-5").addEventListener("click",numbers);
const $num6 = document.querySelector("#num-6").addEventListener("click",numbers);
const $num7 = document.querySelector("#num-7").addEventListener("click",numbers);
const $num8 = document.querySelector("#num-8").addEventListener("click",numbers);
const $num9 = document.querySelector("#num-9").addEventListener("click",numbers);
const $num0 = document.querySelector("#num-0").addEventListener("click",numbers);

// operator
const $div = document.querySelector("#div").addEventListener("click",opEvent);;
const $mul = document.querySelector("#mul").addEventListener("click",opEvent);;
const $plus = document.querySelector("#plus").addEventListener("click",opEvent);;
const $min = document.querySelector("#min").addEventListener("click",opEvent);;

const $clean = document.querySelector("#clean").addEventListener("click",()=>{
  console.log("클릭");
  value1 = "";
  value2 = "";
  operator = "";

  intV1 = 0;
  intV2 = 0;
  resultValue = 0;

  $valueInp.value ="";
  $header.textContent = "";
});
const $equal = document.querySelector("#equal").addEventListener("click",(event)=>{
  if(!value2 || !operator ) return;

  view(event.target.textContent);

});;