var questions = [{
        question: "What video game development company is the oldest?",
        answers: ["Sega", "Nintendo", "Electronic Arts", "Ubisoft"],
        correctAnswer: "Nintendo"
    },
    {
        question: "What was the name of the world`s first slot machine?",
        answers: ["Spacewar!", "Pac-man", "Space Invaders", "Nimatron"],
        correctAnswer: "Nimatron"
    },
    {
        question: "Who invented the first gamepad?",
        answers: ["Konami", "Atari", "Namco", "Dendi"],
        correctAnswer: "Atari"
    },
    {
        question: "What was the first online video game?",
        answers: ["Word of Warcraft", "Ultima", "Island of Kesmai", "Quake"],
        correctAnswer: "Island of Kesmai"
    },
    {
        question: "What company invented the first 3D video game?",
        answers: ["Blue Sky Productions", "Sony", "Electronic Arts", "Id Software"],
        correctAnswer: "Id Software"
    }
];

var counter = 0;
var rightAnswer = "";
var score = 0;
var stars = "";

var start = $(".start");
var greetingsWrap = $(".greetings-wrap");
var quizWrap = $(".quiz-wrap");
var quizQuestion = $(".quiz-question");
var next = $(".next-btn");
var body = $("body");
var variant = $(".variant");
var answer = $(".answer");

start.click(function() {
    greetingsWrap.addClass("hidden");
    quizWrap.addClass("active");
    quizQuestion.append(questions[counter].question);
    questions[counter].answers.forEach(elem => {
        $(".var-" + (questions[counter].answers.indexOf(elem) + 1)).append(elem);
    });
});

$(document).on("click", ".variant", function() {
    next.css("display", "block");
    answer.css("pointer-events", "none");
    questions[counter].answers.map(elem => {
        if (questions[counter].correctAnswer == elem) {
            $(".var-" + (questions[counter].answers.indexOf(elem) + 1)).addClass(
                "correct"
            );
        }
    });
    if ($(this).text() == questions[counter].correctAnswer) {
        body.css("background-color", "#19D621");
        next.addClass("is-success");
        score += 1;
        stars += `<i class="nes-icon is-large star"></i>`;
    } else {
        body.css("background-color", "#F4020C");
        next.addClass("is-error");
        questions[counter].answers.map(elem => {
            if (questions[counter].correctAnswer == elem) {
                $(this).addClass("wrong");
            }
        });
    }
});

next.click(function() {
    if (counter == questions.length - 1) {
        quizQuestion.empty().append(`Congrtulations! You scored ${score}/${questions.length}!`);
        answer.css("background-color", "#19D621").css("justify-content", "center").empty().append(stars);
        next.css("display", "none");
        body.css("background-color", "#709fb0");
    } else {
        counter += 1;
        body.css("background-color", "#709fb0");
        quizQuestion.empty().append(questions[counter].question);
        variant.removeClass("correct wrong").empty();
        questions[counter].answers.forEach(elem => {
            $(".var-" + (questions[counter].answers.indexOf(elem) + 1)).append(elem);
        });
        answer.css("pointer-events", "auto");
        next.removeClass("is-success is-error").css("display", "none");
    }
});