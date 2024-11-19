const { body } = document;
// top
const $header = document.createElement("div");
const $number = document.createElement("span");
$number.textContent = 1;

$header.appendChild($number);
$header.appendChild(document.createTextNode("번째 차례"));

// mid 
const $word = document.createElement("div");
$word.textContent = "제시어 : ";
const $outWord = document.createElement("span");
$word.appendChild($outWord);

// bottom
const $input = document.createElement("input");
const $button = document.createElement("button");
$button.textContent = "입력";

// function 
const checkWord = (newWord) => {
    if(newWord.length !== 3){
        return alert("3글자가 아닙니다.");
    }

    if(!newWord.trim()){
        return alert("공백 입력했습니다.");
    }

    if(saveWord.includes(newWord)) {
        return alert("중복되는 단어 입니다.");
    }

    return true;
}

const checkNum = () => {
    let number;
    while(true){
        number = prompt("몇 명인가요? 최대 9명");
        
        if(parseInt(number) > 0 && parseInt(number) < 10){
            break;
        }
        alert("입력이 잘못 되었습니다.");
    }

    return number;
}

// variable fild
let newWord = "";
let word = "";
let numbers = checkNum();
const saveWord = [];

// event

$input.addEventListener("input",()=> {
    newWord = $input.value;
});

$button.addEventListener("click", () => {
    if(!checkWord(newWord)) return;
    
    // 초기 제시어
    if(!word) {
        word = newWord;
        $outWord.textContent = word;
    }   
    // 제시어가 있다면 
    else if(word){
        if(word[word.length - 1] === newWord[0]){
            word = newWord;
            $outWord.textContent = word;
        } else {
            alert("잘못된 입력");
        }
    }

    // 차례
    const val = parseInt($number.textContent);
    if(val+1 > numbers){
        $number.textContent = 1;
    } else {
        $number.textContent = val + 1;
    }

    saveWord.push(word);
    $input.value = "";
});

// html 
body.append($header);
body.append($word);
body.append($input);
body.append($button);