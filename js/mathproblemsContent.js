const explanationData = [
    "allo"
];

const textData = [
];

const lineData = [
];

const intervalNumbers = [
];

const tableData = [
];

const tableHeader = 
"";

var animationActions = [
];

const checkQuizDataFunctions = [
];

const quizResponseData = [
];

function keyQuiz(evt, id) {
    if (evt.keyCode===13) {
        checkQuiz(id);
    }
}

function checkQuiz(id) {
    if(typeof(id)!="number") {
        id = id.id.match(/(\d+)/)[0];
    }
    id--;
    checkQuizDataFunctions[id]();
}