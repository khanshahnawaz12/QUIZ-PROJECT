// selection all required element
const start_btn = document.querySelector(".start_btn ");
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const que_text = document.querySelector(".que_text");
const timeText = document.querySelector(".timer .time_left_text");
const timeCount = document.querySelector(".timer .timer_sec");
const time_line = document.querySelector("header .time_line");
const canvas = document.querySelector("#my-canvas");

var audio = new Audio('applause.mp3')

// if start quiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //this was show  info

}
// if ExitQuiz button clicked
exit_btn.onclick = function () {
    info_box.classList.remove("activeInfo"); //hide info box
}
// if continue button clickek
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");// hide info box
    quiz_box.classList.add("activeQuiz");// show the quiz box
    showQuestion(0); //calling show questions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15);//calling start timer
    startTimerLine(0);
    next_btn.classList.remove("show");

}

let que_count = 0;
let userScore = 0;
let que_numb = 1;
let timeValue = 15;
let counter = 0;
let counterLine;
let widthValue = 0;
//getting quetions and options from array
function showQuestion(index) {

    // console.log(questions[0].question)


    let que_tag = "<span>" + questions[index].numb + " . " + questions[index].question + "</span>";
    let option_tag = '<div class="option">' + questions[index].options[0] + '</div>'
        + '<div class="option">' + questions[index].options[1] + '</div>'
        + '<div class="option">' + questions[index].options[2] + '</div>'
        + '<div class="option">' + questions[index].options[3] + '</div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option")

    //console.log(option);

    //setting onclick attribute to a available option 
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if user clicked option
function optionSelected(answer) {
    clearInterval(counter) // stopping timer when user select an option
    let userAns = answer.textContent;// getting user selected option;
    let correctAns = questions[que_count].answer;// getting correct answer from user
    let alloptions = option_list.children.length;//getting all option item 
    clearInterval(counterLine);

    if (userAns == correctAns) {
        //if user selected option is equal to array correct answer
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("correct Answer")
        console.log("your score is " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("wrong Answer")

        for (i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }

    }

    for (i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");// once user select an option then disalbled all option

    }
    next_btn.classList.add("show")
}

function queCounter(index) {
    let totalQueCountTag = ' <span><p>' + index + '</p> of <p>' + questions.length + '</p>Questions</span>'
    bottom_ques_counter.innerHTML = totalQueCountTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;

        if (time < 9) {
            timeCount.textContent = '0' + timeCount.textContent;
        }

        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time End";
            const alloptions = option_list.children.length;
            let correctAns = questions[que_count].answer;

            for (i = 0; i < alloptions; i++) {
                if (option_list.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer 
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Auto selected correct answer.");
                }
            }
            for (i = 0; i < alloptions; i++) {
                option_list.children[i].classList.add("disabled");// once user select an option then disalbled all option

            }
            next_btn.classList.add("show")

        }
    }

}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29)
    function timer() {
        time += 1;
        time_line.style.width = time + "px";//incresing width of timeline wuith px 
        if (time > 549) { //when 549 greather than 
            clearInterval(counterLine);// clear internal
        }
    }
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if next Next button clicked 
next_btn.onclick = function () {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        startTimer(timeValue);
        timeText.textContent = 'Time Left';//change time end to time left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter);//clear counter
        clearInterval(counterLine);//clear counterLine
        showResult(); //calling show result function
    }

    function showResult() {
        info_box.classList.remove("activeInfo");//hide info box
        quiz_box.classList.remove("activeQuiz");//hide quiz bo
        result_box.classList.add("activeResult");//show result box
        const score_text = document.querySelector(".score_text");

        if (userScore >= 3) {
            let scoreTag = '<span>and congrats , You got ' + userScore + ' out of ' + questions.length + '</span>'
            score_text.innerHTML = scoreTag;
              canvas.classList.add("show_canvas");
            audio.play();
            audio.loop = true;
        }
        else if (userScore > 1) { // if user scored more than 1
            let scoreTag = '<span>and nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
            score_text.innerHTML = scoreTag;
        }
        else { // if user scored less than 1
            let scoreTag = '<span>and sorry , You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
            score_text.innerHTML = scoreTag;
        }

    }

}



const restart_quiz = document.querySelector(".result_box .buttons .restart");
const quit_quiz = document.querySelector(".result_box .buttons .quit");

//when quit quiz button clicked
quit_quiz.onclick = () => {
    window.location.reload();

}

//if restart button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box 
    result_box.classList.remove("activeResult");//hide result box
     canvas.classList.remove("show_canvas");
     audio.pause();
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0
    showQuestion(que_count);//calling showQestions function
    queCounter(que_numb);//passing que_numb value to queCounter
    clearInterval(counter);//clear counter
    clearInterval(counterLine);//clear counterLine
    startTimer(timeValue);//calling startTimer function
    startTimerLine(widthValue);//calling startTimerLine function
    timeText.textContent = 'Time Left';//change time end to time left
    next_btn.classList.remove("show"); //hide the next button

}
var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();