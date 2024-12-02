// html 태그와 연결
const $table = document.querySelector("#table");
const $winner = document.querySelector("#winner");
const $retry = document.querySelector("#re");

// 변수
let player = "O";
const aiArry = [];
let stopTime = false;
let passClick = false;

// 3 x 3 배열 만들기
const arry = [];

for(let i = 0; i < 3; i++){
  const $tr = document.createElement("tr");
  const row = [];
  for(let j = 0; j < 3; j++){
    const $td = document.createElement("td");
    $td.classList.add("setBorder");
    const cell = $td;
    row.push(cell);
    $tr.append($td);
    aiArry.push([i,j]);
  }
  arry.push(row);
  $table.append($tr);
}
// 함수 
const delAIArr = (row, cell) => {
  if(aiArry.includes([row,cell])) return;

  for(let i = 0; i < aiArry.length; i++){
    let save = aiArry[i];
    const saveRow = save[0];
    const saveCell = save[1];

    if(saveRow === row && saveCell === cell){
      aiArry.splice(i,1);
      console.log("aiArry", "삭제완료", aiArry);
    }
  }

}

// 이벤트 함수
const checkError = (target) => {
  if(target.textContent) return true;
  
  return passClick;
}

const win = (target) => {
  const cell = target.cellIndex;
  const row = target.parentNode.rowIndex;
  
  console.log("win호출", player);
  delAIArr(row,cell);

  // 가로 승리 조건 [row][0] ~ [row][2]
  if(
    arry[row][0].textContent === player &&
    arry[row][1].textContent === player &&
    arry[row][2].textContent=== player 
  ) {
    return true;
  }
  // 세로 승리 조건 [cell][0] ~ [cell][2] 
  if(
    arry[0][cell].textContent === player &&
    arry[1][cell].textContent === player &&
    arry[2][cell].textContent === player 
  ) {
    return true;
  }
  // 왼쪽 대각선 승리 조건 [0][1] [1][1] [2][2]
  if(
    arry[0][0].textContent === player &&
    arry[1][1].textContent === player &&
    arry[2][2].textContent=== player 
  ){
    return true;
  }
  
  // 오른쪽 대각선 승리 조건 [0][2] [1][1] [2][0]
  if(
    arry[0][2].textContent === player && 
    arry[1][1].textContent === player &&
    arry[2][0].textContent === player 
  ) {
    return true;
  }

  return false;
}

const change = (player) => {
  return player === "O" ? "X" : "O";
}

const ai = () => {
  const index = Math.floor(Math.random() * aiArry.length);
  const value = aiArry[index];
  const row = value[0];
  const cell = value[1];

  arry[row][cell].textContent = player;

  if(win(arry[row][cell])){
    $winner.textContent = `${player}의 승리!!`;
    stopTime = true;
    $table.removeEventListener("click",clicked);
  };

  player = change(player);
}

// 이벤트 정의
const clicked = (event) => {
  // 오류 검사
  if(checkError(event.target)) return;

  passClick = true;

  // 오류 통과
  event.target.textContent = player;

  // 승자 결정
  if(win(event.target)){
    $winner.textContent = `${player}의 승리!!`;
    stopTime = true;
    $table.removeEventListener("click",clicked);
  };

  // 공수 교체
  player = change(player);

  // AI 구현
  setTimeout(()=>{ 
    if(aiArry.length && !stopTime){
      ai();
      passClick = false;
    }
  },1000);

}

// 이벤트
$table.addEventListener("click", clicked);


