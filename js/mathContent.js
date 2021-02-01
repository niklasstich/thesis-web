const explanationData = [
    "<ul>\
    <li>Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen.</li>\
    <li>Wir operieren auf einem Interval zwischen zwei Kommazahlen, initialisiert mit \\(\[0;1\)\\), die obere Intervallgrenze ist also immer ausgeschlossen.</li>\
    <li>Basierend auf den Auftrittswahrscheinlichkeiten der Symbole im Alphabet wird dieses Intervall in Subintervalle unterteilt.</li>\
    <li>Wir wählen dann immer das Subinterval als neues Interval, welches zum nächsten Symbol in unserer Nachricht gehört.</li>\
    <li>Wenn alle Zeichen der Nachricht fertig kodiert sind, dann geben wir eine Zahl aus dem finalen Intervall aus.</li>\
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
    <li>Mit der Nachricht \\(m=`dcba`\\) interessiert uns als erstes das Symbol 'd'.</li>\
    <li>Wir übernehmen für das nächste Intervall also \\(u_{d}\\) als \\(Min\\) und \\(v_{d}\\) als \\(Max\\).</li>\
    </ul>\
    Verständnisfrage: Welchen Wert nimmt Min als Nächstes an? <input type=\"text\" id=\"quiz1\" onkeydown=\"keyQuiz1(event)\"><button onclick=\"checkQuiz1()\">Absenden</button><br/>\
    <span id=\"quiz-result-1\"></span>",

    "<ul>\
    <li>Das Teilinterval [0,9;1.0) ist also unser neues Intervall.</li>\
    <li>Wir berechnen wieder die Subintervalle nach gleicher Vorgehensweise.</li>\
    <li>Beispielsweise für c, welches wir als nächstes Symbol brauchen:</li>\
    <li>\\(l=1.0-0.9=0.1\\)</li>\
    <li>\\(u_{c}=u_{2}=Min+l*\\sum_{i=0}^{n-1} p_i = 0.9+0.1*0.6 = 0.96\\)</li>\
    <li>\\(v_{c}=v_{2}=u_{2}+l*p_{2}=0.96+0.1*0.3=0,99\\)</li>\
    </ul>",

    "<ul>\
    <li>Nächstes zu codierendes Symbol ist 'c'</li>\
    <li>Zur Übersichtlichkeit wird nur noch das relevante Symbol in der Grafik angezeigt</li>\
    <li>Wir übernehmen die berechneten Grenzen für 'c' aus der Tabelle</li>\
    </ul>\
    Verständnisfrage: Wäre unsere Nachricht jetzt schon vorbei, also nur 'dc', was könnte ein möglicher Output-Wert des Algorithmus sein?<br>\
    <input type='text' id='quiz2' onkeydown='keyQuiz2(event)'><button onclick='checkQuiz2()'>Absenden</button><br>\
    <span id='quiz-result-2'></span>",

    "Im letzten Schritt übernehmen wir wieder das Subintervall von b und berechnen das finale Intervall:<br/>\
    <b>u = 0,975 + 0,003&times;0 = 0,975; v = 0,975 + 0,003&times;0,5 = 0,9765</b><br/>\
    Zu guter Letzt müssen wir uns eine Zahl im Interval aussuchen, die sich im besten Falle leicht mit Binärzahlen darstellen ließe, also idealerweise durch Zahlen der Form 2^i darstellbar ist.<br/>\
    TODO: Beispielhafte Zerlegung",

    "FILL ME IN"
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
    //first click
    function () {
        updateExplanation();
        makeTableVisible();
        updateTableData();
        fillMessageSpan("m='dcba'");
    },
    //second click
    function () {
        extendSVG();
        drawLines([0, 1, 2]);
        drawText([0, 1]);
        updateExplanation();
        updateBarValueText();
        //makeTableVisible(); TODO: uncomment when table is implemented
    },
    //third click
    function() {
        drawLines([3, 4, 5]);
        drawText([2, 3, 4, 5, 6, 7, 8]);
        updateExplanation(); 
        updateBarValueText();
        updateTableData();
        highlightLetter("d-interval", 0);
        highlightLetter("c-interval", 0);
    },
    //fourth click
    function() {
        updateExplanation();
        highlightLetter("d", 0);
        removeHighlight("d-interval", 0);
        removeHighlight("c-interval", 0);
    },
    //fifth click
    function() {
        addDiagram();
        updateExplanation();
        removeHighlight("d", 0);
        updateBarValueText();
        updateTableData();
        drawLineBetweenDiagrams("max-line-0", "max-line-1");
        drawLineBetweenDiagrams("d-line-0", "min-line-1");
    },
    //sixth click
    function() {
        updateExplanation();
        updateBarValueText();
        highlightLetter("c-interval", 1);
        highlightLetter("d-interval", 1);
    },
    //seventh click
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
    //eighth click
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

function keyQuiz1(evt) {
    if (evt.keyCode===13) {
        checkQuiz1();
    }
}

function keyQuiz2(evt) {
    if (evt.keyCode===13) {
        checkQuiz2();
    }
}

function checkQuiz1() {
    const element = document.getElementById("quiz1");
    const value = parseFloat(element.value.replace(',', '.'));
    if (value==NaN) {
        return;
    }
    const span = document.getElementById("quiz-result-1");
    if (value===0.9) {
        span.innerHTML = "Richtige Antwort! Das Subintervall 'd' wird unser nächstes Intervall, daher muss 0.9 die untere Grenze sein.";
    } else {
        span.innerHTML = "Leider falsch, richtig wäre 0.9 gewesen, denn das ist die untere Subintervallgrenze des Symbols 'd', welches unser nächstes Intervall wird.";
    }
    markCompleted(0);
}

function checkQuiz2() {
    const element = document.getElementById("quiz2");
    const value = parseFloat(element.value.replace(',', '.'));
    if (value==NaN) {
        return;
    }
    const span = document.getElementById("quiz-result-2");
    if (value===0.99){
        span.innerHTML = "Fast richtig! Das Intervall geht zwar von 0.96 bis 0.99, darin ist 0.99 aber <i>nicht enthalten</i>. Daher ist 0.99 falsch, aber z.B. 0.989 wäre richtig!";
    } else if (value < 0.99 && value >=0.96) {
        span.innerHTML = "Richtig! Diese Zahl liegt zwischen 0.96 (eingeschlossen) und 0.99 (ausgeschlossen) und wäre daher eine richtige Ausgabe des Algorithmus.";
    } else {
        span.innerHTML = "Leider falsch. Die Ausgabe des Algorithmus müsste zwischen 0.96 (eingeschlossen) und 0.99 (ausgeschlossen) liegen, um korrekt zu sein.";
    }
}