// html 연결
const $form = document.querySelector("#form");
const $inp = document.querySelector("#inp");
const $btn = document.querySelector("#btn");
const $outp = document.querySelector("#outp");

// 랜덤한 번호를 저장한 변수들
let getNumbers = Array(9).fill(0).map((v,i) =>{
  return v +i +1 ;
});

console.log("getNumbes", getNumbers);

const setNumbers = [];
for(let i = 0; i < 4; i++){
  const index = Math.floor(Math.random() * getNumbers.length);
  setNumbers.push(getNumbers[index]);
  getNumbers.splice(index,1);
}
console.log("getNumbes", getNumbers);
console.log("setNumbers", setNumbers);

const answer = setNumbers.join(""); // typeOf() => string (not array)


// 입력을 받을 변수
let user = "";
const saveUsers = []; // 원본 숫자들
// const saveSorted = []; // 원본 숫자를 sort한거

// 그 외 이벤트에 필요 변수들
let count = 0; 
let out = 0;

// 함수

// 1 ~ 9까지 체크 함수
const checkNum = (str) => {
  let swich = true;
  let arr = [...str]; //  Array.from();
  arr.map((v,_) =>{
    if(!/^[1-9]$/.test(v)){
      swich = false;
    }
  })
  return swich;
}

// 중복값 체크 ( 이 프로그램에선 1234 와 4321은 같은 숫자 문자열이다 )
const checkArr = (str) => {
  // 특정 숫자와 arr의 있는 값 비교인데
  // 특정 숫자와 arr의 값을 sort하여 비교
  // 함수의 분활을 연습하고 있기에, 여기는 비교하는 함수만 정의
 // str = [...str].sort().join("");
 // if(saveSorted.includes(str)){
 //   return true;
 // }
  if(saveUsers.includes(str)) return true;
  // saveSorted.push(str);
  return false;
}

// 이벤트 함수
const checkError = (str) => {
  if(str.length !== 4){
    return alert("숫자 4개를 입력해주세요.");
  }

  if(new Set(str).size !== 4){
    return alert("중복된 숫자가 있습니다."); 
  }

  if(str.trim().length !== 4) {
    return alert("공백을 입력했습니다.");
  }

  if(!checkNum(str)){
    return alert("1 ~ 9까지의 숫자만 입력해주세요");
  }

  if(checkArr(str)){
    return alert("이미 한번 등록된 숫자 입니다."); 
    // 기준을 너무 빡세게 잡았음 너프 해야됨
    // 만약 4ball이 나왔을때, 정답을 입력못하는 경우가 나온다
  }

  console.log("정상 입력 확인");
  return true;
}

const homerun = () => {
  return (user === answer);
}

const checkCount = (count) => {
  return (count >= 10) ;
}

const checkBall = () => {
  let strike = 0;
  let ball = 0;

  for(let index =0 ; index < answer.length; index++){
    if((answer.indexOf(user[index])) > -1){
      if(answer[index] === user[index]){
        strike++;
      } else {
        ball++;
      }
    }
  }

  console.log(ball,"ball");
  console.log(strike,"strike");
  const checkOut = strike + ball;
  if(!checkOut) return `[아웃 : ${++out}]` 

  return `[스트라이크 : ${strike}] [볼 : ${ball}]`;
}

// 입력창과 버튼입력 이벤트
$form.addEventListener("submit",(event)=> {
  event.preventDefault();

  user = event.target.inp.value;
  if(!checkError(user)) return; // 오류 체크
  saveUsers.push(user);

  // 홈런 일 경우 < 종료 조건 >
  if(homerun()) {
    $outp.textContent = "축하합니다!! 승리!!";
    // 이 이후로 입력을 못하게 막아야되는 상황
  } else {
      // 10번 진행 했는지 확인
    if(checkCount(++count)) return alert("10번 진행로 패배"); // 여기도 < 종료 조건 >이 들어가야됨

    // 스트라이크와 볼 표시
    const message = checkBall();
    $outp.append(message, " 입력 : ", user, document.createElement("br"));

    if(out === 3){
      $outp.append("3 out임으로 게임 패배");
    }
  }

  event.target.inp.value = "";
});
