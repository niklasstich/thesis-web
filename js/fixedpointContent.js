const explanationData = [
    "foobar"
];

const textData = [
    [0+82, 199, "Min"]
];

//x1, x2, y1, y2
const lineData = [
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+30, 0+50, 50, 50, "Q3"],
    [0+30, 0+50, 150, 150, "Q1"],
    [0+15, 0+65, 100, 100, "Q2"]
];

const intervalNumbers = [];

const tableData = [];

const tableHeader = [];

const animationActions = [
    function(replay) {
        addDiagram(replay);
    },
    function(replay) {
        addDiagram(replay);
    },
    function(replay) {
        addDiagram(replay);
    },
];

const checkQuizDataFunctions = [];

const quizResponseData = [];

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