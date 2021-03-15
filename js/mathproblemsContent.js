const explanationData = [
    "Der vorgestellte mathematische Algorithmus hat 3 große Probleme:\
    <ul>\
    <li><i>Kommazahlen:</i> Floatzahlen können nicht alle Zahlen darstellen und 2er Potenzen sind unhandlich und ineffizient</li>\
    <li><i>Senden vor Ende des Algorithmus:</i> Es ist unmöglich vor Verarbeitung der gesamten Nachricht Informationen zu senden, da allgemein nicht vorraussehbar ist ob eine gewählte Zahl nach Ende des Algorithmus noch im Intervall ist.</li>\
    <li><i>Bitfehleranfälligkeit:</i> Ein einzelner Bitfehler bei der Übertragung der Nachricht kann die gesamte Nachricht zerstören.</li>\
    </ul>Im folgenden werden diese Probleme genauer beleuchtet.",

    "<i>Kommazahlen:</i><br>\
    <ul>\
    <li>Um das Problem zu verdeutlichen, nehmen wir das vorherige Beispiel zur Hand.</li>\
    <li>Sei eine neue Nachricht: \\(m=`cdabbcccdabbacdcdcdb`\\) mit 20 Zeichen.</li>\
    <li>Diese Nachricht kodieren wir mit dem bekannten Algorithmus.</li>",

    "<ul>\
    <li>Wir gehen den Algorithmus mal im Schnelldurchlauf durch.</li>\
    <li>Unser finales Interval lautet: \\([0.87837885728310770625; 0.87837885728311044)\\). Das sind 20 bzw. 17 Nachkommastellen!</li>\
    <li>Geben wir diese Zahlen in <a href='https://www.exploringbinary.com/floating-point-converter'>diesen Dezimal zu Gleitkomma-Konvertierer</a> ein, so sehen wir, dass beide Zahlen nur inexakt als float oder double darstellbar sind.</li>\
    <li>Die nächsten Zahlen wären für double-precision \\(0.87837885728310771682\\) bzw. \\(0.87837885728311049238\\).</li>\
    <li>Das bedeutet eine Differenz von \\(1.057\\times 10^{-17}\\) bzw. \\(5.238 \\times 10^{-17}\\)</li>\
    <li>Dies ist offensichtlich ein Problem, da dies bedeutet, dass wir weder in unserem Algorithmus noch bei der Übertragung mit Gleitkomma-Zahlen arbeiten können.</li>\
    </ul>",

    "<i>Senden vor Ende des Algorithmus:</i>\
    <ul>\
    <li>Aufgrund der vielen Berechnungen kann die Ausführung bei längeren Nachrichten durchaus Zeit in Anspruch nehmen. Zudem haben wir oft weiche oder harte Zeitanforderungen welche eingehalten werden müssen (bspw. bei Streaming).</li>\
    <li>Es wäre daher wünschenswert schon vor Ende mit der Übertragung zu beginnen.</li>\
    <li>Dies ist bei dem Algorithmus aber nicht möglich, wie nun gezeigt werden soll.</li>\
    </ul>",

    "<ul>\
    <li>Wir nehmen als Beispiel wieder die Zahlen des ersten Beispiel.</li>\
    <li>Unsere Nachricht lautet \\(m=`aaa`\\).</li>\
    <li>Wir kodieren das erste Symbol 'a'.</li>\
    </ul>",

    "<ul>\
    <li>Angenommen wir wollen nun mit dem Senden beginnen, obwohl wir nicht mit dem Kodieren der Nachricht fertig sind.</li>\
    <li>Welche Zahl genau würden wir senden? Wir könnten zwar jede Zahl im Intervall senden, aber woher wissen wir, dass diese Zahl nach dem nächsten Symbol noch korrekt ist?</li>\
    <li>Spielen wir dies beispielhaft mit \\(0.4\\) durch.</li>\
    </ul>",

    "<ul>\
    <li>Jetzt haben wir das zweite Symbol 'a' kodiert.</li>\
    <li>\\(0.4\\) liegt jetzt nicht mehr im Intervall, wir haben also nutzlose Information gesendet, genau das wollen wir mit Kompressionsalgorithmen verhindern.</li>\
    <li>Abschließend kann man also sagen, dass im allgemeinen Fall vor Ende dieses Algorithmus keine Daten sendbar sind.</li>\
    </ul>",

    "<i>Bitfehleranfälligkeit:</i><ul>\
    <li>Übertragungsmedien sind niemals perfekt, weshalb bei der Übertragung von Daten regelmäßig Fehler zu erwarten sind.</li>\
    <li>Wir können zwar meistens auf Checksummen in unteren Protokollschichten vertrauen, trotzdem können wir einen Algorithmus auf seine Fehleranfälligkeit überprüfen.</li>\
    <li>Wir überprüfen deshalb nun den mathematischen Algorithmus auf Bitfehleranfälligkeit.</li>\
    </ul>",

    "<ul>\
    <li>Nehmen wir hierfür wieder die Werte aus dem bekannten Beispiel zur Hand.</li>\
    <li>Kodiert wird die Nachricht \\(m=`abbd`\\).</li>\
    <li>Wir picken uns die Zahl \\(0.27978515625\\) aus dem Intervall zur Übertragung heraus.</li>\
    <li>Als Binärzahl mit Zweierpotenzen erhalten wir \\(0.01000111101\\).</li>\
    </ul>",

    "<ul>\
    <li>Wir flippen nun bei der Übertragung ein einzelnes Bit und erhalten\\(0.\\textcolor{red}{1}1000111101\\)</li>\
    <li>Als Dezimalzahl erhalten wir nun statt \\(0.27978515625\\) die Zahl \\(0.\\textcolor{red}{7}7978515625\\)</li>\
    <li>Wir dekodieren jetzt die Nachricht auf Empfängerseite und nehmen an, dass wir die Länge 4 der Nachricht kennen.</li>\
    </ul>",

    "<ul>\
    <li>Wir erhalten beim Dekodieren die falsche Nachricht \\(m=`cbdd`\\) statt \\(m=`abbd`\\) zurück!</li>\
    <li>Ein Großteil der Nachricht, exakt 50%, ist durch einen einzigen Bitfehler zerstört worden.</li>\
    <li>Abschließend lässt sich sagen, dass ein einzelner Bitfehler in der Übertragung mehr als ein Symbol der Nachricht verändern kann.</li>\
    <li><a href='fixedpointAlgorithm.html'>Im nächsten Kapitel</a> beleuchten wir eine alternative Implementierung des Algorithmus, welche ohne Dezimalzahlen auskommt und einige dieser Probleme umgeht.</li>\
    </ul>"
    
];

let textData = [
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
        ["0", "0.5", "0.6", "0.9", "1"],
        ["0", "", "", "", "0.5"],
        ["","0.25","0.3","0.45",""],
        ["0","0.5","0.6","0.9","1",],
        ["0","0.25","0.3","0.45","0.5",],
        ["0.25","0.275","0.28","0.295","0.3",],
        ["0.275","0.2775","0.278","0.2795","0.28",],
        ["0","0.5","0.6","0.9","1",],
        ["0.6","0.75","0.78","0.87","0.9",],
        ["0.75","0.765","0.768","0.777","0.78",],
        ["0.777","0.7785","0.7788","0.7797","0.78",],
]


const tableData = [
    [["a", "0.5", "0.0", "", ""], ["b", "0.1", "0.5", "", ""], ["c", "0.3", "0.6", "", ""], ["d", "0.1", "0.9", "", ""]],
    [["a", "0.5", "0"], ["b", "0.3", "10"], ["c", "0.2", "11"]]
];

let tableHeader = 
"\<tr>\
<th>Zeichen</th>\
<th>rel. Häufigkeit</th>\
<th>kumulative Häufigkeit</th>\
<th>unteres Limit</th>\
<th>oberes Limit</th>\
</tr>";

const animationActions = [
    function(replay) {
        addDiagram(replay, 200);
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
                addDiagram(true, 200);
                updateIntervalText();
            }
            addDiagram(false, 200);
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
    },
    function(replay) {
        //half assed reset
        updateExplanation();
        resetSVG();
        diagramIteration = 0;
        setMessageSpanText("");
    },
    function(replay) {
        updateExplanation();
        addDiagram(replay);
        updateIntervalText();
        setMessageSpanText("aaa");
    },
    function(replay) {
        updateExplanation();
        addDiagram(replay);
        updateIntervalText();
        drawLineBetweenDiagrams("min-line-1", "min-line-2");
        drawLineBetweenDiagrams("b-line-1", "max-line-2");
    },
    function(replay) {
        updateExplanation();
        updateIntervalText();
        highlightLetter("b-interval", 2);
        highlightLetter("min", 2);
        highlightLetter("a", 2);
    },
    function(replay) {
        updateExplanation();
        resetSVG();
        diagramIteration = 0;
        setMessageSpanText("");
    },
    function(replay) {
        updateExplanation();
        setMessageSpanText("abbd");
        addDiagram(true);
        updateIntervalText();
        addDiagram(true);
        updateIntervalText();
        addDiagram(true);
        updateIntervalText();
        addDiagram(replay);
        updateIntervalText();
        drawLineBetweenDiagrams("b-line-1","max-line-2");
        drawLineBetweenDiagrams("min-line-1","min-line-2");
        drawLineBetweenDiagrams("c-line-2","max-line-3");
        drawLineBetweenDiagrams("b-line-2","min-line-3");
        drawLineBetweenDiagrams("c-line-3","max-line-4");
        drawLineBetweenDiagrams("b-line-3","min-line-4");
        highlightLetter("d", 4);
        highlightLetter("d-interval", 4);
        highlightLetter("max", 4);
    },
    function(replay) {
        updateExplanation();
        resetSVG();
        diagramIteration = 0;
        setMessageSpanText("");
        document.getElementById("span-number").innerHTML = "Zahl = 0.77978515625";
    },
    function(replay) {
        updateExplanation();
        setMessageSpanText("cbdd");
        addDiagram(true);
        updateIntervalText();
        addDiagram(true);
        updateIntervalText();
        addDiagram(true);
        updateIntervalText();
        addDiagram(replay);
        updateIntervalText();
        drawLineBetweenDiagrams("d-line-1","max-line-2");
        drawLineBetweenDiagrams("c-line-1","min-line-2");
        drawLineBetweenDiagrams("c-line-2","max-line-3");
        drawLineBetweenDiagrams("b-line-2","min-line-3");
        drawLineBetweenDiagrams("max-line-3","max-line-4");
        drawLineBetweenDiagrams("d-line-3","min-line-4");
        highlightLetter("d", 4);
        highlightLetter("max", 4);
        highlightLetter("d-interval", 4);
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