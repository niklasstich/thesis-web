const explanationData = [
    "Der vorgestellte mathematische Algorithmus hat 3 große Probleme:\
    <ul>\
    <li><i>Kommazahlen:</i> Floatzahlen können nicht alle Zahlen darstellen und 2er Potenzen sind unhandlich und ineffizient</li>\
    <li><i>Senden vor Ende des Algorithmus:</i> Es ist unmöglich vor Verarbeitung der gesamten Nachricht Informationen zu senden, da allgemein nicht vorraussehbar ist ob eine gewählte Zahl nach Ende des Algorithmus noch im Intervall ist.</li>\
    <li><i>Bitfehleranfälligkeit:</i> Ein einzelner Bitfehler bei der Übertragung der Nachricht kann die gesamte Nachricht zerstören.</li>\
    </ul>Im folgenden werden diese Probleme genauer beleuchtet.",

    "<i>Kommazahlen</i><br>\
    <ul>\
    <li>Um das Problem zu verdeutlichen, nehmen wir das vorherige Beispiel zur Hand.</li>\
    <li>Sei eine neue Nachricht: \\(m=`cdabbcccdabbacdcdcd`\\) mit 19 Zeichen.</li>\
    <li>Diese Nachricht kodieren wir mit dem bekannten Algorithmus.</li>",

    "asdfasdfsadf"
];

const textData = [
    [0+82, 199, "Min", "min-"],
    [0+82, 6, "Max", "max-"],
    [0+52, 101, "", "b-interval-"],
    [0+52, 81, "", "c-interval-"],
    [0+52, 21, "", "d-interval-"],
    [0+42, 151, "a", "a-"],
    [0+42, 91, "b", "b-"],
    [0+42, 51, "c", "c-"],
    [0+42, 11, "d", "d-"]
];

const lineData = [
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+30, 0+50, 100, 100, "b-line-"],
    [0+30, 0+50, 80, 80, "c-line-"],
    [0+30, 0+50, 20, 20, "d-line-"]
];

const intervalNumbers = [
    ["0.0", "1.0", "0.5", "0.6", "0.9"],
];

const tableData = [
];

const tableHeader = 
"";

const animationActions = [
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        makeTableVisible();
        updateTableData();
    }
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