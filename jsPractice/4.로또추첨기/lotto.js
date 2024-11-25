// html 태그와 연결
// head
const $input = document.querySelector("#input");
const $inputText = document.querySelector("#inputText");
const $draw = document.querySelector("#draw");
const $auto = document.querySelector("#auto");
const $outUsers = document.querySelector("#outUsers");
const $lotto = document.querySelector("#lotto");
const $bonus = document.querySelector("#bonus");
const $result = document.querySelector("#result");

//number-pad
const $table = document.querySelector("#table");

// 변수 1
let setUsers = [];
let setSixNum = [];
const timePromis = (ms) => new Promise((resolve) => {
  setTimeout(resolve,ms);
});

// 이벤트 함수들
const setColor = ($target) => {
  const value = parseInt($target.textContent);
  if(value >= 1 && value <= 10){
    $target.className = "colorYello";
  }
  else if (value >= 11 && value <= 20){
    $target.className = "colorBlue";
  }
  else if (value >= 21 && value <= 30){
    $target.className = "colorRed";
  }
  else if (value >= 31 && value <= 40){
    $target.className = "colorBlack";
  }
  else if (value >= 41 && value <= 45){
    $target.className = "colorGreen";
  }
}

// 버튼 번호와 연결할 배열 + 클릭 이벤트  
const numbers = [];
let count = 1;

for(let i = 0; i < 5; i++){
  const $tr = document.createElement("tr");
  const rows = [];
  for(let j = 0; j < 9; j++){
    const $td = document.createElement("td");
    rows.push($td);
    $tr.append($td);
    $td.textContent = count++;
  }
  numbers.push(rows);
  $table.append($tr);
}

// 클릭 이벤트

// 넘버패드
$table.addEventListener("click",(event)=>{
  
  //오류 잡기
  // 6개까지 저장
  if(setSixNum.length >= 6) return
  
  // tr태그 오류 막기
  if(event.target.tagName !== "TD") return;

  // 이미 저장거 중복 막기
  if(setSixNum.includes(event.target.textContent)) return;

  //오류가 없다면
  setSixNum.push(event.target.textContent);
  
  $input.value = setSixNum;

  console.log(setSixNum);

});

// 배열 저장 = 입력
$inputText.addEventListener("click",()=>{
  // 오류 잡기
  if(setUsers.length >= 5) return;

  if(setSixNum.length < 6) return;

  // 오류가 없다면
  setUsers.push(setSixNum.sort((a,b) => a - b));

  // 색깔 바꾸기
  for(let i = 0; i < setSixNum.length ; i++){
    const $outSpan = document.createElement("span");
    $outSpan.textContent = setSixNum[i];
    setColor($outSpan);
    $outUsers.append($outSpan);
    $outUsers.innerHTML;
  }
  $outUsers.append(document.createElement("br"));
  
  setSixNum = [];
  
  $input.value = "";

  console.log("users에 저장 완료");
})


// 추첨
// 랜덤 번호를 뽑을 배열을 생성
let getRand = Array(45).fill(0).map((v,i) =>{
  return v + 1 + i;
})

// 번호 저장 배열
const setRandArr = [];
let bonus;
let lotto;

// 번호 추첨 이벤트
$draw.addEventListener("click",async () => {
  // 오류 잡기

  if(setRandArr.length >= 1) return; // 추첨 여러번

  if(setUsers.length < 1) return;
  
  $input.value =  "";
  // 넘버 패드 삭제
  for(let i = 0; i < 5; i++){
    for(let j = 0; j < 9; j++){
      numbers[i][j].style.display = "none";
    }
    await timePromis(1000);
  }
  $lotto.textContent = "당첨 번호 : ";
  $bonus.textContent = "보너스 번호 : ";
  $result.textContent = "당첨 결과 : ";

  // 오류 없을때
  for(;getRand.length > 0;){
    const randIndex = Math.floor(Math.random() * getRand.length);
    setRandArr.push(getRand[randIndex]);
    getRand.splice(randIndex,1);
  }
  // 번호 저장
  lotto = setRandArr.slice(0,6);
  bonus = setRandArr[6];
  //정렬
  lotto.sort((a,b) => a - b)

  await timePromis(1000);
  // 출력 이벤트 setTimeout으로 + async,await (promise) 사용해보기
  for(let i = 0; i < 6; i++){
    const $lottoMember = document.createElement("span");
    $lottoMember.textContent = lotto[i];
    setColor($lottoMember);
    $lotto.append($lottoMember);
    $lotto.innerHTML;
    await timePromis(1000);
  }
  const $lottoMember = document.createElement("span");
  $lottoMember.textContent = bonus;
  setColor($lottoMember);
  $bonus.append($lottoMember);
  $bonus.innerHTML;

  // 등수 표시
  for(let i = 0; i < setUsers.length; i++){
    let countLotto = 0;
    for(let j = 0; j < 6; j++){
      if(lotto.includes(setUsers[i][j])){
        countLotto+=1;
      }
    }
    if(countLotto === 6){
      $result.textContent += "1등 ";
    } else if(countLotto === 5){
      if(setUsers.includes(bonus)){
        $result.textContent += "2등 ";
      } else {
        $result.textContent += "3등 ";
      }
    } else if(countLotto === 4){
      $result.textContent += "4등 ";
    } else if (countLotto === 3){
      $result.textContent += "5등 " ;
    } else {
      $result.textContent += "꽝! ";
    }
    await timePromis(1000);
  }

});

  // 자동 입력 이벤트
$auto.addEventListener("click",()=>{
  const cycle = 5 - setUsers.length;
  console.log("auto clicked");

  for(let i = 0; i < cycle; i++){
    const autoArr = [];
    const autoGetRand = Array(45).fill(0).map((v,i) =>{
      return v + 1 + i;
    });
    
    for(let j = 0; j < 6; j++){
      const autoIndex = Math.floor(Math.random() * autoGetRand.length);
      autoArr.push(autoGetRand[autoIndex]);
      autoGetRand.splice(autoIndex,1);
    }
    
    setUsers.push(autoArr.sort((a,b) => a - b));

    // 색깔 바꾸기
    for(let i = 0; i < autoArr.length ; i++){
      const $outSpan = document.createElement("span");
      $outSpan.textContent = autoArr[i];
      setColor($outSpan);
      $outUsers.append($outSpan);
      $outUsers.innerHTML;
    }
    $outUsers.append(document.createElement("br"));

  }


});