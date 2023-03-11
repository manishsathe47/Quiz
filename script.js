const questions = document.getElementById("questions");
const btn = document.getElementById("btn");
const scoreEl = document.getElementById("score");
var data;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = (e) => {
  let result = e.target;

  if (result.readyState === 4 && result.status === 200) {
    data = JSON.parse(result.response);
    renderQuestions();
  } else {
    // console.warn("Something is wrong, try again");
  }
};
xhttp.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
xhttp.send();

function renderQuestions() {
  let output = "";
  for (let i = 0; i < data.length; i++) {
    output += 
    `<div class="question">
        <h2>Q${i+1}. ${data[i].question}</h2>
        <label><input type="radio" id="${1}" name="id${i}">${data[i].options[0]}</label>
        <label><input type="radio" id="${2}" name="id${i}">${data[i].options[1]}</label>
        <label><input type="radio" id="${3}" name="id${i}">${data[i].options[2]}</label>
        <label><input type="radio" id="${4}" name="id${i}">${data[i].options[3]}</label>
    </div>`
  }
  questions.innerHTML = output;
}

btn.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < 5; i++) {
    let selector = `input[name="id${i}"]:checked`;
    let selectedOption = +document.querySelector(selector).id;
    if (selectedOption == data[i].answer) {
      score++;
    }
  }
  scoreEl.innerHTML = `${score} / 5`;
});