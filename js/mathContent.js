const explanationData = [
    "<ul>\
    <li>Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen.</li>\
    <li>Wir operieren auf einem Interval zwischen zwei Kommazahlen, initialisiert mit \\(\[0;1\)\\)</li>\
    <li>Basierend auf den Auftrittswahrscheinlichkeiten der Symbole im Alphabet wird dieses Intervall in Subintervalle unterteilt.</li>\
    <li>Wir wählen dann immer das Subinterval als neues Interval, welches zum nächsten Symbol in unserer Nachricht gehört.</li>\
    </ul>",

    "<ul><li>Erläutern wir dies an einem Beispiel. Gegeben sind:<br/></li>\
    <li>Ein Alphabet <b>\\(A=\\{a, b, c, d\\}\\)</b></li>\
    <li>Auftrittswahrscheinlichkeiten <b>\\(p=\\{0.5, 0.1, 0.3, 0.1\\}\\)</b>. Das Symbol \"a\" tritt also mit einer Wahrscheinlichkeit von 50% auf, das Symbol \"b\" mit einer Wahrscheinlichkeit von 10% usw.</li>\
    <li>Die Nachricht sei: \\(m=`dcba`\\)</li>\
    <li>Das Alphabet und die Auftrittswahrscheinlichkeiten tragen wir in die Tabelle oben ein.</li>\
    </ul>",

    "<ul>\
    <li>Wir initialisieren also zunächst wie bereits besprochen unser Intervall von 0 bis 1</li>\
    <li>Danach berechnen wir die Subintervalle für die Auftrittswahrscheinlichkeiten in aktuellen Intervall:</li>\
    <li>Die Länge des aktuellen Intervalls ist simpel \\(l=Max-Min\\)</li>\
    <li>Die untere Grenze eines Symbols ergibt sich aus dem Minimum und der Länge des aktuellen Intervalls und der kumulativen Wahrscheinlichkeit der Symbole vor dem Symbol im Alphabet: \
    \\(u_{i}=Min+l*\\sum_{j=0}^{i-1} p_j\\)</br>\
    Die untere Grenze des ersten Symbols ist gleich \\(Min\\)\</li>\
    <li>Die obere Grenze ergibt sich aus der unteren Grenze plus der Länge des aktuellen Intervalls mal der Auftrittswahrscheinlichkeit:\
    \\(v=_{i}u_{i}+l*p_{i}\\).</br>\
    Die obere Grenze des letzten Symbols im Alphabet ist demnach \\(Max\\)</li>\
    <li>Denkanstoß: Warum muss man lediglich einmal \\(u_{0}\\) berechnen und danach nur noch \\(v_{n-1}\\)?</br>\
    Antwort: <span class=\"blurred-text noselect\" id=\"blurr-1\" onclick=\"toggleBlur(\'blurr-1\')\">Das liegt daran, dass \\(v_{i}=u_{i+1}\\) und wir somit \\(u_{i+1}\\) nicht mehr berechnen müssen, wenn wir schon \\(v_{i}\\) kennen.</span></li>\
    </ul>",

    "<ul>\
    <li>Im Diagramm und Tabelle oben wurden die berechneten Werte eingetragen.</li>\
    <li>Als Beispiel einmal die Berechnung für den Buchstaben 'c':</li>\
    <li>\\(l=Max-Min=1.0-0.0=1.0\\)</li>\
    <li>\\(u_{c}=u_{2}=Min+l*\\sum_{i=0}^{n-1} p_i = 0.0+1.0*(0.5+0.1)=0.0+0.6=0.6\\)</li>\
    <li>\\(v_{c}=v_{2}=u_{i}+l*p_{i}=0.6+1.0*0.3=0.9\\)</li>\
    </ul>",

    "<ul>\
    <li>Mit der Nachricht \\(m=`dcba`\\) interessiert uns als erstes das Symbol 'd'</li>\
    <li>Wir übernehmen für das nächste Intervall also \\(u_{d}\\) als \\(Min\\) und \\(v_{d}\\) als \\(Max\\)</li>\
    </ul>\
    Verständnisfrage: Welchen Wert nimmt Min als Nächstes an? <input type=\"text\" id=\"quiz\"><button onclick=\"checkQuiz1()\">Absenden</button><br/><span id=\"quiz-result-1\"></span>",

    "<ul>\
    <li>Das Teilinterval [0,9;1.0) ist also unser neues Intervall.</li>\
    <li>Wir berechnen wieder die Subintervalle nach gleicher Vorgehensweise.</li>\
    <li>Beispielsweise für c, welches wir als nächstes Symbol brauchen:</li>\
    <li>\\(l=1.0-0.9=0.1\\)</li>\
    <li>\\(u_{c}=u_{2}=Min+l*\\sum_{i=0}^{n-1} p_i = 0.9+0.1*0.6 = 0.96\\)</li>\
    <li>\\(v_{c}=v_{2}=u_{2}+l*p_{2}=0.96+0.1*0.3=0,99\\)</li>\
    </ul>",

    "Wir berechnen für c das Teilintervall: <br/><b>c = 0,9 + 0,1&times;0,6 = 0,96; v = 0,96 + 0,1&times;0,3 = 0,99</b>",

    "Das Subintervall von c wird wieder unser neues Gesamtinterval.<br/> Wir berechnen das Teilinterval für b, das nächste Symbol und erhalten:<br/>\
    <b>u = 0,96 + 0,03&times;0,5 = 0,975; v = 0,975 + 0,03&times;0,1 = 0,978</b>",

    "Im letzten Schritt übernehmen wir wieder das Subintervall von b und berechnen das finale Intervall:<br/>\
    <b>u = 0,975 + 0,003&times;0 = 0,975; v = 0,975 + 0,003&times;0,5 = 0,9765</b><br/>\
    Zu guter Letzt müssen wir uns eine Zahl im Interval aussuchen, die sich im besten Falle leicht mit Binärzahlen darstellen ließe, also idealerweise durch Zahlen der Form 2^i darstellbar ist.<br/>\
    TODO: Beispielhafte Zerlegung"
]
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
]

const lineData = [
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+30, 0+50, 100, 100, "b-line-"],
    [0+30, 0+50, 80, 80, "c-line-"],
    [0+30, 0+50, 20, 20, "d-line-"]
];

const intervalNumbers = [
    ["0.0", "1.0", "", "", ""],
    ["", "", "0.5", "0.6", "0.9"],
    ["0.9", "1.0", "", "", ""],
    ["", "", "", "0.96", "0.99"],
    ["0.96", "0.99", "0.975", "0.978", ""],
    ["0.975", "0.978", "0.9765", "", ""],
    ["0.975", "0.9765", "", "", ""]
];


const tableData = [
    [["a", "0.5", "0.0", "", ""], ["b", "0.1", "0.5", "", ""], ["c", "0.3", "0.6", "", ""], ["d", "0.1", "0.9", "", ""]],
    [["a", "0.5", "0.0", "0.0", "0.5"], ["b", "0.1", "0.5", "0.5", "0.6"], ["c", "0.3", "0.6", "0.6", "0.9"], ["d", "0.1", "0.9", "0.9", "1.0"]],
    [["a", "0.5", "0.0", "0.9", "0.95"], ["b", "0.1", "0.5", "0.95", "0.96"], ["c", "0.3", "0.6", "0.96", "0.99"], ["d", "0.1", "0.9", "0.99", "1.0"]],

]


const tableHeader = 
"\<tr>\
<th>Buchstabe</th>\
<th>rel. Häufigkeit</th>\
<th>kumulative Häufigkeit</th>\
<th>unteres Limit</th>\
<th>oberes Limit</th>\
</tr>"

var animationActions = [
    function () {
        updateExplanation();
        makeTableVisible();
        updateTableData();

    },
    function () {
        extendSVG();
        drawLines([0, 1, 2]);
        drawText([0, 1]);
        updateExplanation();
        updateBarValueText();
        //makeTableVisible(); TODO: uncomment when table is implemented
    },
    function() {
        drawLines([3, 4, 5]);
        drawText([2, 3, 4, 5, 6, 7, 8]);
        updateExplanation(); 
        updateBarValueText();
        updateTableData();
        highlightLetter("d-interval", 0);
        highlightLetter("c-interval", 0);
    },
    function() {
        updateExplanation();
        highlightLetter("d", 0);
        removeHighlight("d-interval", 0);
        removeHighlight("c-interval", 0);
    },
    function() {
        addDiagram();
        updateExplanation();
        removeHighlight("d", 0);
        updateBarValueText();
        updateTableData();
        drawLineBetweenDiagrams("max-line-0", "max-line-1");
        drawLineBetweenDiagrams("d-line-0", "min-line-1");
    },
    function() {
        updateExplanation();
        updateBarValueText();
        highlightLetter("c-interval", 1);
        highlightLetter("d-interval", 1);
    },
    function() {
        addDiagram();
        updateExplanation();
        updateBarValueText();
        drawLineBetweenDiagrams("d-line-1", "max-line-2");
        drawLineBetweenDiagrams("c-line-1", "min-line-2");
        removeHighlight("c-interval", 1);
        removeHighlight("d-interval", 1);
        highlightLetter("b-interval", 2);
        highlightLetter("c-interval", 2);
    },
    function() {
        addDiagram();
        updateExplanation();
        updateBarValueText();
        removeHighlight("b-interval", 2);
        removeHighlight("c-interval", 2);
        drawLineBetweenDiagrams("c-line-2", "max-line-3");
        drawLineBetweenDiagrams("b-line-2", "min-line-3");
        highlightLetter("min", 3);
        highlightLetter("b-interval", 3);
        disableAnimationProgress();
    }
];

function checkQuiz1() {
    const element = document.getElementById("quiz");
    const value = element.value;
    if (value=="") {
        return;
    }
    const span = document.getElementById("quiz-result-1");
    if (value=="0.9" || value=="0,9" || value==".9" || value==",9") {
        span.innerHTML = "Richtige Antwort!";
    } else {
        span.innerHTML = "Leider falsch, richtig wäre gewesen: 0.9";
    }
}
