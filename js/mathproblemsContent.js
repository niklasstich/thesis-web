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
    <li>Sei eine neue Nachricht: \\(m=`cdabbcccdabbacdcdcdb`\\) mit 20 Zeichen.</li>\
    <li>Diese Nachricht kodieren wir mit dem bekannten Algorithmus.</li>",

    "<ul>\
    <li>Wir gehen den Algorithmus mal im Schnelldurchlauf durch.</li>\
    <li>Unser finales Interval lautet: \\([0.87837885728310770625; 0.87837885728311044)\\). Das sind 20 bzw. 17 Nachkommastellen!</li>\
    <li>Geben wir diese Zahlen in <a href='https://www.exploringbinary.com/floating-point-converter'>diesen Dezimal zu Gleitkomma-Konvertierer</a> ein, so sehen wir, dass beide Zahlen nur inexakt als float oder double darstellbar sind.</li>\
    <li>Dies ist offensichtlich ein Problem, da dies bedeutet, dass wir weder in unserem Algorithmus noch bei der Übertragung mit Gleitkomma-Zahlen arbeiten können.</li>"
];

const textData = [
    [0+82, 199, "Min", "min-"],
    [0+52, 101, "", "b-interval-"],
    [0+52, 81, "", "c-interval-"],
    [0+52, 21, "", "d-interval-"],
    [0+82, 6, "Max", "max-"],
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
        ["0","0.5","0.6","0.9","1",],
        ["0.6","0.75","0.78","0.87","0.9",],
        ["0.87","0.885","0.888","0.897","0.9",],
        ["0.87","0.8775","0.879","0.8835","0.885",],
        ["0.8775","0.87825","0.8784","0.87885","0.879",],
        ["0.87825","0.878325","0.87834","0.878385","0.8784",],
        ["0.87834","0.8783625","0.878367","0.8783805","0.878385",],
        ["0.878367","0.87837375","0.8783751","0.87837915","0.8783805",],
        ["0.8783751","0.878377125","0.87837753","0.878378745","0.87837915",],
        ["0.878378745","0.8783789475","0.878378988","0.8783791095","0.87837915",],
        ["0.878378745","0.87837884625","0.8783788665","0.87837892725","0.8783789475",],
        ["0.87837884625","0.878378856375","0.8783788584","0.878378864475","0.8783788665",],
        ["0.878378856375","0.8783788573875","0.87837885759","0.8783788581975","0.8783788584",],
        ["0.878378856375","0.87837885688125","0.8783788569825","0.87837885728625","0.8783788573875",],
        ["0.8783788569825","0.878378857134375","0.87837885716475","0.878378857255875","0.87837885728625",],
        ["0.878378857255875","0.8783788572710625","0.8783788572741","0.8783788572832125","0.87837885728625",],
        ["0.8783788572741","0.87837885727865625","0.8783788572795675","0.87837885728230125","0.8783788572832125",],
        ["0.87837885728230125","0.878378857282756875","0.878378857282848","0.878378857283121375","0.8783788572832125",],
        ["0.878378857282848","0.8783788572829846875","0.878378857283012025","0.8783788572830940375","0.878378857283121375",],
        ["0.8783788572830940375","0.87837885728310770625","0.87837885728311044","0.87837885728311864125","0.878378857283121375",],
]


const tableData = [
    [["a", "0.5", "0.0", "", ""], ["b", "0.1", "0.5", "", ""], ["c", "0.3", "0.6", "", ""], ["d", "0.1", "0.9", "", ""]],
];

const tableHeader = 
"\<tr>\
<th>Buchstabe</th>\
<th>rel. Häufigkeit</th>\
<th>kumulative Häufigkeit</th>\
<th>unteres Limit</th>\
<th>oberes Limit</th>\
</tr>";

const animationActions = [
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        makeTableVisible();
        updateTableData();
    },
    function(replay){
        setMessageSpanText("cdabbcccdabbacdcdcdb");
        updateExplanation();
        updateIntervalText();
        (async function() {
            for (let i = 0; i < 18; i++) {
                addDiagram(true);
                updateIntervalText();
                await sleep(50);
            }
            addDiagram(false);
            updateIntervalText();
            highlightLetter("b", 20);
            highlightLetter("b-interval", 20);
            highlightLetter("c-interval", 20);
            drawLineBetweenDiagrams("d-line-1","max-line-2");
            drawLineBetweenDiagrams("c-line-1","min-line-2");
            drawLineBetweenDiagrams("max-line-2","max-line-3");
            drawLineBetweenDiagrams("d-line-2","min-line-3");
            drawLineBetweenDiagrams("b-line-3","max-line-4");
            drawLineBetweenDiagrams("min-line-3","min-line-4");
            drawLineBetweenDiagrams("c-line-4","max-line-5");
            drawLineBetweenDiagrams("b-line-4","min-line-5");
            drawLineBetweenDiagrams("c-line-5","max-line-6");
            drawLineBetweenDiagrams("b-line-5","min-line-6");
            drawLineBetweenDiagrams("d-line-6","max-line-7");
            drawLineBetweenDiagrams("c-line-6","min-line-7");
            drawLineBetweenDiagrams("d-line-7","max-line-8");
            drawLineBetweenDiagrams("c-line-7","min-line-8");
            drawLineBetweenDiagrams("d-line-8","max-line-9");
            drawLineBetweenDiagrams("c-line-8","min-line-9");
            drawLineBetweenDiagrams("max-line-9","max-line-10");
            drawLineBetweenDiagrams("d-line-9","min-line-10");
            drawLineBetweenDiagrams("b-line-10","max-line-11");
            drawLineBetweenDiagrams("min-line-10","min-line-11");
            drawLineBetweenDiagrams("c-line-11","max-line-12");
            drawLineBetweenDiagrams("b-line-11","min-line-12");
            drawLineBetweenDiagrams("c-line-12","max-line-13");
            drawLineBetweenDiagrams("b-line-12","min-line-13");
            drawLineBetweenDiagrams("b-line-13","max-line-14");
            drawLineBetweenDiagrams("min-line-13","min-line-14");
            drawLineBetweenDiagrams("d-line-14","max-line-15");
            drawLineBetweenDiagrams("c-line-14","min-line-15");
            drawLineBetweenDiagrams("max-line-15","max-line-16");
            drawLineBetweenDiagrams("d-line-15","min-line-16");
            drawLineBetweenDiagrams("d-line-16","max-line-17");
            drawLineBetweenDiagrams("c-line-16","min-line-17");
            drawLineBetweenDiagrams("max-line-17","max-line-18");
            drawLineBetweenDiagrams("d-line-17","min-line-18");
            drawLineBetweenDiagrams("d-line-18","max-line-19");
            drawLineBetweenDiagrams("c-line-18","min-line-19");
            drawLineBetweenDiagrams("max-line-19","max-line-20");
            drawLineBetweenDiagrams("d-line-19","min-line-20");

        })();
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