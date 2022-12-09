const text1 = document.querySelector(".text1");
const input1 = document.querySelector(".input1");
const scoreEl = document.querySelector(".score");
const time = document.querySelector(".time");
const modal = document.querySelector(".modal");
const text3 = document.querySelector(".text3");
const btn5 = document.querySelector(".btn5");
const HightScore = document.querySelector(".HightScore");
const levelEl = document.getElementById("level");



let word;
let score = 0;
let times = 10;
let hightscore = localStorage.getItem("hightscore")
  ? localStorage.getItem("hightscore")
  : 0;
let level = localStorage.getItem("level")
  ? localStorage.getItem("level")
  : "Easy";
   
 levelEl.value=localStorage.getItem("level")

input1.addEventListener("input", func1);
levelEl.addEventListener("change", func2);

const api_link ="https://random-words-api.vercel.app/word"
const randomWord = async (api) => {
  const req = await fetch(api);
  const data = await req.json();
  //  console.log(data[0].word)
     word=data[0].word.toLowerCase()
     text1.textContent=word
};
 
randomWord(api_link);
function func1() {
  const checkword = input1.value;
  if (checkword == text1.textContent) {
    input1.value = "";
    score++;
    scoreEl.textContent = score;
    randomWord(api_link);
    if (level=="Easy"){
      times +=3
      time.textContent +="+3"
    } else if(level =="Medium"){
      times +=5
      time.textContent +="+5"
    }
     else{
      times +=7
      time.textContent +="+7"
    }
  }
}
const counter = setInterval(() => {
  if (times > 0) {
    times--;
    time.textContent = `time: ${times}`;
  } else if (times == 0) {
    clearInterval(counter);
    modal.style.display = " block";
    text3.textContent = `sizning natijangiz: ${score}`;
    if (score > hightscore) {
      localStorage.setItem("hightscore", score);
      hightscore = score;
    } else if (score < hightscore) {
      localStorage.setItem("hightscore", hightscore);
      hightscore = hightscore;
    }
  }
}, 1000);
   function func2 (){
    localStorage.setItem("level" ,levelEl.value)
    level=levelEl.value
   }
// localStorage.clear()
HightScore.textContent = `HightScore: ${hightscore}`;
