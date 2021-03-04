const explanationData = [
    "foobar"
];

const textData = [
    [0+82, 199, "Min", "min-"],
    [0+82, 6, "Max", "max-"],
    [0+52, 52, "Q3", "q3-label-" ],
    [0+52, 152, "Q1", "q1-label-"],
    [0+67, 102, "Q2", "q2-label-"]
];

//x1, x2, y1, y2
const lineData = [
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+30, 0+50, 50, 50, "q3-line-"],
    [0+30, 0+50, 150, 150, "q1-line-"],
    [0+15, 0+65, 100, 100, "q2-line-"]
];

const intervalNumbers = [];

const tableData = [
    [["a", "5", "5"], ["b", "1", "6"], ["c", "3", "9"], ["d", "1", "10"]]
];

const tableHeader = 
"<tr>\
<th>Zeichen</th>\
<th>absolute Häufigkeit</th>\
<th>kumulative Häufigkeit</th>";

const animationActions = [
    function(replay) {
        addDiagram(replay);
        createBar(1, 20, 100);
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