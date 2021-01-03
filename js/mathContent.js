const explanationData = [
    "<ul>\
    <li>Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen.</li>\
    <li>Unterteilung eines Intervalls in Subintervalle abhängig von (relativer) Auftrittswahrscheinlichkeit der Zeichen</li>\
    </ul>",

    "Gegeben sind Alphabet <b>A={a, b, c, d}</b>, Wahrscheinlichkeiten <b>p={0.5, 0.1, 0.3, 0.1}</b><br/>\
    Die Nachricht sei: \"dcba\"",

    "Initialisiere Intervall min und max zunächst mit <b>0.0</b> und <b>1.0</b><br/>",

    "Berechne Subintervalle für alle Symbole in A, wobei l die Länge unseres Intervalls ist (also <b>l = Max-Min</b>).<br/>\
    Die Untergrenze u der Subintervalle ist <b>u<sub>i</sub> = Min+l&times;&Sigma;p<sub>j</sub></b>, mit <b>j&lt;i</b> und i als Index des Symbols.<br/>\
    Die Obergrenze v ist <b>v<sub>i</sub> = u+l&times;p<sub>i</sub></b><br/>\
    Beispielsweise für c also: <b>u<sub>2</sub> = 0,0 + 1,0&times;0,6 = <span class=\"emphasis\">0,6</span>; v<sub>2</sub> = 0,6 + 1,0&times;0,3 = <span class=\"emphasis\">0,9</span></b>",

    "Markiere das erste Symbol aus der Nachricht. Ersetze nun Min und Max im nächsten Diagramm mit der unteren und oberen Grenze des Intervals des Symbols.<br/>\
    Frage: Welchen Wert nimmt Min als Nächstes an? <input type=\"text\" id=\"quiz\"><button onclick=\"checkQuiz1()\">Absenden</button><br/><span id=\"quiz-result\"></span>",

    "Das Teilinterval [0,9;1.0) ist also unser neues Intervall. Berechne nun wieder die Subintervalle. Wir sind ab jetzt faul und berechnen nur noch für das nächste Symbol in der Nachricht, also c.",

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
    [0+52, 101, "", "b-interval-"],
    [0+52, 81, "", "c-interval-"],
    [0+52, 21, "", "d-interval-"],
    [0+82, 5, "Max", "max-"],
    [0+42, 151, "a", "a-"],
    [0+42, 91, "b", "b-"],
    [0+42, 51, "c", "c-"],
    [0+42, 11, "d", "d-"]
]

const lineData = [
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0+30, 0+50, 100, 100, "b-line-"],
    [0+30, 0+50, 80, 80, "c-line-"],
    [0+30, 0+50, 20, 20, "d-line-"]
];

const intervalNumbers = [
    ["0,0", "", "", "", "1,0"],
    ["", "0,5", "0,6", "0,9", ""],
    ["0,9", "", "", "", "1,0"],
    ["", "", "0,96", "0,99", ""],
    ["0,96", "0,975", "0,978", "", "0,99"],
    ["0,975", "0,9765", "", "", "0,978"],
    ["0,975", "", "", "", "0,9765"]
]

var animationActions = [
    function () {
        updateExplanation();
    },
    function () {
        addDiagram();
        updateExplanation();
        updateBarValueText();
        makeTableVisible();
    },
    function() {
        updateExplanation(); 
        updateBarValueText();
        highlightLetter("d-interval", 1);
        highlightLetter("c-interval", 1);
    },
    function() {
        addDiagram();
        updateExplanation();
        highlightLetter("d", 1);
        removeHighlight("d-interval", 1);
        removeHighlight("c-interval", 1);
    },
    function() {
        updateExplanation();
        removeHighlight("d", 1);
        updateBarValueText();
        drawLineBetweenDiagrams("max-line-1", "max-line-2");
        drawLineBetweenDiagrams("d-line-1", "min-line-2");
    },
    function() {
        updateExplanation();
        updateBarValueText();
        highlightLetter("c-interval", 2);
        highlightLetter("d-interval", 2);
    },
    function() {
        addDiagram();
        updateExplanation();
        updateBarValueText();
        drawLineBetweenDiagrams("d-line-2", "max-line-3");
        drawLineBetweenDiagrams("c-line-2", "min-line-3");
        removeHighlight("c-interval", 2);
        removeHighlight("d-interval", 2);
        highlightLetter("b-interval", 3);
        highlightLetter("c-interval", 3);
    },
    function() {
        addDiagram();
        updateExplanation();
        updateBarValueText();
        removeHighlight("b-interval", 3);
        removeHighlight("c-interval", 3);
        drawLineBetweenDiagrams("c-line-3", "max-line-4");
        drawLineBetweenDiagrams("b-line-3", "min-line-4");
        highlightLetter("min", 4);
        highlightLetter("b-interval", 4);
        disableAnimationProgress();
    }
]