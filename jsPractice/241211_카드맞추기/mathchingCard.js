// html과 연결
const $wrapper = document.querySelector("#wrapper");

// 변수
const countCard = 12;
const colors = ['url("./SRC/바이.png")', 'url("./SRC/바이올렛.png")', 'url("./SRC/제이스.png")', 'url("./SRC/징크스.png")', 'url("./SRC/케이틀린.png")', 'url("./SRC/파우더.png")'];
let getColors = colors.concat(colors);
let openCard = []; // 뒤집은 카드들 저장하여 비교 
let saveOpened = []; // 값이 같으면 저장
let clickCardAble = false;
let setColors = setRandom();

let startTime;
let endTime;

// 함수

function setRandom() {
  let setColors = [];
  for(;getColors.length;){
    const randIdx = Math.floor(Math.random() * getColors.length);
    setColors = setColors.concat(getColors.splice(randIdx,1));
  }

  return setColors;
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


  // 카드 세팅
function setCard(i) {
  // card
  const card = document.createElement("div");
  card.classList.add("card");
  //card-inner
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  // card-front
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  // card-back
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.style.backgroundImage = setColors[i];
  // 하나의 카드로 묶기
  cardInner.append(cardFront,cardBack);
  card.append(cardInner);
  return card;
}

// 이벤트 함수
async function onCardClick() {
  if( clickCardAble || this === openCard[0] ||
    saveOpened.includes(this)
  ) return;

  this.classList.toggle("flipped");
  openCard.push(this);

  if(openCard.length < 2 ) return;
  clickCardAble = true;
  const colorOne = openCard[0].querySelector(".card-back").style.backgroundImage;
  const colorTwo = openCard[1].querySelector(".card-back").style.backgroundImage;
  
  if(colorOne === colorTwo){
    saveOpened.push(openCard[0]);
    saveOpened.push(openCard[1]) 
  } else {
    await delay(1000);
    openCard[0].classList.toggle("flipped");
    openCard[1].classList.toggle("flipped");
  }
  openCard = [];
  clickCardAble = false;

  if(saveOpened.length === countCard){
    endTime = new Date();
    let resultTime = (endTime - startTime) / 1000;
    await delay(1000);
    if(!alert(`축하합니다! 걸린시간은 :${resultTime}초 입니다`)){
      
      getColors = colors.concat(colors);
      saveOpened = []; // 값이 같으면 저장
      setColors = setRandom();
      document.querySelectorAll(".card").forEach((value) => {
        value.remove();
      });
      gameStart();
    }
  }
}


// 시작 부분을 구현
function gameStart() {
  clickCardAble = true;
  // setting card
  for(let i = 0; i < countCard; i++){
    const card = setCard(i);
    card.addEventListener("click",onCardClick);
    $wrapper.append(card);
  }

  document.querySelectorAll(".card").forEach((value,index) => {
    setTimeout(() => {
      value.classList.add("flipped");
    }, 500 + 100 * index);
  });

  document.querySelectorAll(".card").forEach((value,index) => {
    setTimeout(() => {
      value.classList.remove("flipped");
      clickCardAble = false;
    }, 4000);
  });

  startTime = new Date();
}

gameStart();