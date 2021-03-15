const explanationData = [
    "<h2>Kodierung</h2>\
    <ul>\
    <li>Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen (aus technischen Gründen mit der amerikanischen Schreibweise des Punktes statt des Kommas notiert).</li>\
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
    <li>Beginnen wir mit einer intuitiven Erklärung ohne Zahlen.</li>\
    <li>Unser erstes Zeichen ist 'd', also wollen wir das Intervall dieses Zeichens als neues Intervall haben.</li>\
    <li>Wir zeichnen einen Vektor zur unteren Grenze von d ein. Das wird unsere neue untere Grenze.</li>\
    <li>Dieser Vektor wird aus der Addition der Vektoren der Subintervalle vor dem Zeichen gebildet (siehe grüne Vektoren).</li>\
    </ul>",

    "<ul>\
    <li>Wir addieren den Vektor der Länge des Subintervalls auf diesen Vektor auf und erhalten die neue obere Grenze.</li>\
    </ul>",

    "<ul>\
    <li>Als Nächstes kodieren wir das Symbol 'c'.</li>\
    <li></li>\
    </ul>",

    "<ul>\
    <li>Wir initialisieren also zunächst wie bereits besprochen unser Intervall von 0 bis 1</li>\
    <li>Danach berechnen wir die Subintervalle für die Auftrittswahrscheinlichkeiten in aktuellen Intervall:</li>\
    <li>Die Länge des aktuellen Intervalls ist simpel \\(l=Max-Min\\)</li>\
    <li>Die untere Grenze eines Symbols ergibt sich aus dem Minimum und der Länge des aktuellen Intervalls und der kumulativen Wahrscheinlichkeit der Symbole vor dem Symbol im Alphabet: \
    \\(u_{i}=Min+l*\\sum_{j=0}^{i-1} p_j\\)</br>\
    Die untere Grenze des ersten Symbols ist gleich \\(Min\\)\</li>\
    <li>Die obere Grenze ergibt sich aus der unteren Grenze plus der Länge des aktuellen Intervalls mal der Auftrittswahrscheinlichkeit:\
    \\(v_{i}=u_{i}+l*p_{i}\\).</br>\
    Die obere Grenze des letzten Symbols im Alphabet ist demnach \\(Max\\)</li>\
    <li>Denkanstoß: Warum muss man lediglich einmal \\(u_{0}\\) berechnen und danach nur noch \\(v_{n-1}\\)?</br>\
    Antwort: <span class=\"blurred-text noselect\" id=\"blurr-1\" onclick=\"toggleBlur(\'blurr-1\')\">Das liegt daran, dass \\(v_{i}=u_{i+1}\\) und wir somit \\(u_{i+1}\\) nicht mehr berechnen müssen, wenn wir schon \\(v_{i}\\) kennen.</span> (Klicke auf den Text, nachdem du über die Frage nachgedacht hast.)</li>\
    </ul>",

    "<ul>\
    <li>Im Diagramm und Tabelle oben wurden die berechneten Werte eingetragen.</li>\
    <li>Als Beispiel einmal die Berechnung für den Buchstaben '<span class='purple'>c</span>':</li>\
    <li>\\(l=Max-Min=1.0-0.0={1.0}\\)</li>\
    <li>\\(u_{c}=u_{2}=Min+{l}*{\\sum_{i=0}^{n-1} p_i} = 0.0+{1.0}*{(0.5+0.1)}=0.0+0.6={0.6}\\)</li>\
    <li>\\(v_{c}=v_{2}={u_{i}}+{l}*{p_{i}}={0.6}+{1.0}*{0.3}={0.9}\\)</li>\
    </ul>",

    "<ul>\
    <li>Mit der Nachricht \\(m=`dcba`\\) interessiert uns als erstes das Symbol 'd'.</li>\
    <li>Wir übernehmen für das nächste Intervall also \\(u_{d}\\) als \\(Min\\) und \\(v_{d}\\) als \\(Max\\).</li>\
    </ul>\
    Verständnisfrage: Welchen Wert nimmt Min als Nächstes an? <input type=\"text\" id=\"quiz\" onkeydown=\"keyQuiz(event, 1)\"><button id='quiz-btn-1' onclick=\"checkQuiz(this)\">Absenden</button><br/>\
    <span id=\"quiz-result\"></span>",

    "<ul>\
    <li>Das Teilinterval \\([0.9;1.0)\\) ist also unser neues Intervall.</li>\
    <li>Wir berechnen wieder die Subintervalle nach gleicher Vorgehensweise.</li>\
    <li>Beispielsweise für c, welches wir als nächstes Symbol brauchen:</li>\
    <li>\\(l=1.0-0.9=0.1\\)</li>\
    <li>\\(u_{c}=u_{2}=Min+l*\\sum_{i=0}^{n-1} p_i = 0.9+0.1*0.6 = 0.96\\)</li>\
    <li>\\(v_{c}=v_{2}=u_{2}+l*p_{2}=0.96+0.1*0.3=0.99\\)</li>\
    </ul>",

    "<ul>\
    <li>Nächstes zu codierendes Symbol ist 'c'</li>\
    <li>Zur Übersichtlichkeit wird nur noch das relevante Symbol in der Grafik angezeigt</li>\
    <li>Wir übernehmen die berechneten Grenzen für 'c' aus der Tabelle</li>\
    </ul>\
    Verständnisfrage: Wäre unsere Nachricht jetzt schon vorbei, also nur 'dc', was könnte ein möglicher Output-Wert des Algorithmus sein?<br>\
    <input type='text' id='quiz' onkeydown='keyQuiz(event,2)'><button onclick='checkQuiz(2)'>Absenden</button><br>\
    <span id='quiz-result'></span>",

    "<ul>\
    <li>Wir übernehmen wieder die Grenzen des Subintervalls von 'c' als Min und Max.</li>\
    <li>Berechne neue Werte in der Tabelle mit \\(l=0.99-0.96=0.03\\).</li>\
    <li>Relevantes Symbol ist 'b', also wird unser neues Intervall \\([0.975;0.978)\\).</li>\
    </ul>",

    "<ul>\
    <li>Wir sind am letzten Symbol der Nachricht angekommen, zuletzt wird 'a' kodiert.</li>\
    <li>Min und Max vom vorherigen Zeichen wurden übernommen, neue Werte in der Tabelle berechnet für \\(l=0.978-0.975=0.003\\)</li>\
    Verständnisfrage: Bitte gebe die obere und untere Grenze des finalen Intervalls ein:<br>\
    <input type='text' id='quiz1' onkeydown='keyQuiz(event,3)' placeholder='untere Grenze'>&nbsp;<input type='text' id='quiz2' onkeydown='keyQuiz(event,3)' placeholder='obere Grenze'>&nbsp;<button onclick='checkQuiz(3)'>Absenden</button><br>\
    <span id='quiz-result'></span>\
    </ul>",

    "<ul>\
    <li>Wir suchen uns nun also eine Zahl aus dem Intervall aus. Dabei ist zu beachten, dass wir diese Zahl zur Übertragung in eine Binärdarstellung bringen müssen.</li>\
    <li>Es bietet sich daher an, eine Zahl aus dem Intervall zu wählen, welche sich aus <i>möglichst wenigen Zweierpotenzen</i> darstellen lässt.</li>\
    <li>Eine effiziente Möglichkeit aus unserem Beispiel wäre \\(0.9755859375\\). Dies ist zunächst konterintuitiv, da man denken würde, dass bspw. \\(0.975\\) ja offensichtlich kürzer ist, und daher weniger Bits zum übertragen benötigt.</li>\
    <li>Sieht man sich jedoch die Zerlegung der Zahlen in Binärdarstellung an, so erkennt man dass die erste Zahl deutlich kürzer ist:</li>\
    <li>\\( (0.9755859375)_{10} = (0.1111100111)_2\\)</li>\
    <li>\\( (0.975)_{10} = (0.1111100110011001101)_2\\)</li>\
    <li>Die erste Stelle vor dem Punkt können wir uns sparen, da die 1 nie im Intervall \\([0;1)\\) enthalten sein kann, dieses Bit kann daher nie 1 sein.</li>\
    <li>Wir benötigen daher für die Übertragung der Nachricht 'dcba' in unserem Beispiel also mindestens 10 Bits.</li>\
    </ul>",

    "<h2>Dekodierung</h2>\
    <ul>\
    <li>Die Dekodierung funktioniert fast gleich wie die Kodierung, mit dem Unterschied, dass die Auswahl des Subintervalls (und damit des dekodierten Zeichens) von der erhaltenen Zahl abhängt.</li>\
    <li>Wir formen die erhaltenen Bits zunächst wieder in eine Dezimalzahl um erhalten unsere Zahl \\(0.9755859375\\) zurück.</li>\
    <li>Zudem wird Min und Max wieder mit 0 und 1 initialisiert.</li>\
    </ul>",

    "<ul>\
    <li>Wieder alle Werte für die Subintervalle berechnen und in die Tabelle eintragen.</li>\
    <li>Da unsere Zahl zwischen 0.9 und 1.0 liegt, geben wir ein 'd' aus und übernehmen das Subintervall.</li>\
    </ul>",

    "<ul>\
    <li>Wieder Min und Max übernehmen und die Werte in der Tabelle ausrechen.</li>\
    </ul>\
    Verständnisfrage: Welcher Buchstabe muss nach den gelernten Regeln auf 'd' folgen?<br>\
    <button onclick='falseButton()' class='quiz-button'>'a'</button><button onclick='falseButton()' class='quiz-button'>'b'</button><button onclick='correctButton()' class='quiz-button'>'c'</button><button onclick='falseButton()' class='quiz-button'>'d'</button><br>\
    <span id='quiz-result'></span>",

    "<ul>\
    <li>Wir stellen mit der selben Methodik fest, dass 'b' und 'a' folgen müssen.</li>\
    <li>Damit haben wir das Ende der Originalnachricht erreicht.</li>\
    <li>Jedoch ist aus der Zahl alleine nicht ersichtlich, wann unsere Dekodierung terminieren sollte.</li>\
    <li>Wir müssen also bei der Übertragung der Nachricht zusätzlich in irgendeiner Form die Länge übermitteln oder ein zusätzliches Zeichen lediglich für die Terminierung des Algorithmus einführen.</li>\
    <li>Dies ist ein Problem, da es unter Umständen die erreichte Kompressionsrate verringern kann. Weitere Probleme des Algorithmus werden <a href='mathproblems.html'>im nächsten Kapitel aufgezeigt.</a></li>\
    </ul>"
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
    [["a", "0.5", "0.0", "<span class='fading-emphasis'>0.0</span>", "<span class='fading-emphasis'>0.5</span>"], ["b", "0.1", "0.5", "<span class='fading-emphasis'>0.5</span>", "<span class='fading-emphasis'>0.6</span>"], ["c", "0.3", "0.6", "<span class='fading-emphasis'>0.6</span>", "<span class='fading-emphasis'>0.9</span>"], ["d", "0.1", "0.9", "<span class='fading-emphasis'>0.9</span>", "<span class='fading-emphasis'>1.0</span>"]],
    [["a", "0.5", "0.0", "0.0", "0.5"], ["b", "0.1", "0.5", "0.5", "0.6"], ["c", "0.3", "0.6", "0.6", "0.9"], ["d", "0.1", "0.9", "0.9", "1.0"]],
    [["a", "0.5", "0.0", "0.0", "0.5"], ["b", "0.1", "0.5", "0.5", "0.6"], ["c", "0.3", "0.6", "0.6", "0.9"], ["d", "0.1", "0.9", "0.9", "1.0"]],
    [["a", "0.5", "0.0", "<span class='fading-emphasis'>0.9</span>", "<span class='fading-emphasis'>0.95</span>"], ["b", "0.1", "0.5", "<span class='fading-emphasis'>0.95</span>", "<span class='fading-emphasis'>0.96</span>"], ["c", "0.3", "0.6", "<span class='fading-emphasis'>0.96</span>", "<span class='fading-emphasis'>0.99</span>"], ["d", "0.1", "0.9", "<span class='fading-emphasis'>0.99</span>", "<span class='fading-emphasis'>1.0</span>"]],
    [["a", "0.5", "0.0", "<span class='fading-emphasis'>0.96</span>", "<span class='fading-emphasis'>0.975</span>"], ["b", "0.1", "0.5", "<span class='fading-emphasis'>0.975</span>", "<span class='fading-emphasis'>0.978</span>"], ["c", "0.3", "0.6", "<span class='fading-emphasis'>0.978</span>", "<span class='fading-emphasis'>0.987</span>"], ["d", "0.1", "0.9", "<span class='fading-emphasis'>0.987</span>", "<span class='fading-emphasis'>0.99</span>"]],
    [["a", "0.5", "0.0", "<span class='fading-emphasis'>0.975</span>", "<span class='fading-emphasis'>0.9765</span>"], ["b", "0.1", "0.5", "<span class='fading-emphasis'>0.9765</span>", "<span class='fading-emphasis'>0.9768</span>"], ["c", "0.3", "0.6", "<span class='fading-emphasis'>0.9768</span>", "<span class='fading-emphasis'>0.9777</span>"], ["d", "0.1", "0.9", "<span class='fading-emphasis'>0.9777</span>", "<span class='fading-emphasis'>0.978</span>"]],
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
    function (_) {
        updateExplanation();
        makeTableVisible();
        updateTableData();
        setMessageSpanText("'dcba'");
    },
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        createVectorInSVG(199, 20, 50, "red");
        createVectorInSVG(199, 100, 60, "green");
        createVectorInSVG(100, 80, 60, "green");
        createVectorInSVG(80, 20, 60, "green");
    },
    function(replay) {
        updateExplanation();
        createVectorInSVG(20,1,50,"red");
    },
    function (replay) {
        extendSVG(replay);
        drawLines([0, 1, 2]);
        drawText([0, 1]);
        updateExplanation();
        updateIntervalText();
        updateTableData();
        drawLengthBracket(1);
    },
    function(_) {
        drawLines([3, 4, 5]);
        drawText([2, 3, 4, 5, 6, 7, 8]);
        updateExplanation(); 
        updateIntervalText();
        changeLetterColor("c-interval", 0, "red");
        changeLetterColor("d-interval", 0, "red");
        changeLetterColor("bracket-text", 0, "red");
        updateTableData();
    },
    function(_) {
        updateExplanation();
        highlightLetter("d", 0);
        highlightLetter("max", 0);
        changeLetterColor("d-interval", 0, "red");
        removeHighlight("c-interval", 0);
        updateTableData();
        fadeSVGElement("bracket-0", "bracket-text-0");
    },
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        removeHighlight("d", 0);
        removeHighlight("max", 0);
        removeHighlight("d-interval", 0);
        updateIntervalText();
        updateTableData();
        drawLineBetweenDiagrams("max-line-0", "max-line-1");
        drawLineBetweenDiagrams("d-line-0", "min-line-1");
    },
    function(_) {
        updateExplanation();
        updateIntervalText();
        highlightLetter("c-interval", 1);
        highlightLetter("d-interval", 1);
        highlightLetter("c", 1);
    },
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        updateIntervalText();
        updateTableData();
        drawLineBetweenDiagrams("d-line-1", "max-line-2");
        drawLineBetweenDiagrams("c-line-1", "min-line-2");
        removeHighlight("c-interval", 1);
        removeHighlight("d-interval", 1);
        removeHighlight("c", 1)
        highlightLetter("b-interval", 2);
        highlightLetter("c-interval", 2);
        highlightLetter("b", 2);
    },
    function(replay) {
        addDiagram(replay);
        updateExplanation();
        updateIntervalText();
        updateTableData();
        removeHighlight("b-interval", 2);
        removeHighlight("c-interval", 2);
        removeHighlight("b", 2);
        drawLineBetweenDiagrams("c-line-2", "max-line-3");
        drawLineBetweenDiagrams("b-line-2", "min-line-3");
        highlightLetter("min", 3);
        highlightLetter("b-interval", 3);
        highlightLetter("a", 3);
    },
    function(_) {
        updateExplanation();
    },
    function(replay) {
        //RESET
        resetTable();
        diagramIteration = 0;
        barValueTextIteration = 0;
        tableIteration = 0;
        resetSVG();
        document.getElementById("span-number").innerHTML = "Zahl: \\(0.9755859375\\)"
        updateExplanation();
        extendSVG(replay);
        setMessageSpanText("");
        drawLines([0, 1, 2]);
        drawText([0, 1]);
        updateIntervalText();
    },
    function(_) {
        updateExplanation();
        drawLines([3, 4, 5]);
        drawText([2, 3, 4, 5, 6, 7, 8]);
        updateIntervalText();
        updateTableData();
        updateTableData();
        highlightLetter("d", 0);
        setMessageSpanText("d");
        highlightLetter("d-interval", 0);
        highlightLetter("max", 0);
 
    },
    function(replay) {
        updateExplanation();
        removeHighlight("d-interval", 0);
        removeHighlight("max", 0);
        addDiagram(replay);
        updateIntervalText();
        updateTableData();
        drawLineBetweenDiagrams("max-line-0", "max-line-1");
        drawLineBetweenDiagrams("d-line-0", "min-line-1");
        updateIntervalText();
        highlightLetter("c-interval", 1);
        highlightLetter("d-interval", 1);
        setMessageSpanText("d<span class='blurred-text' id='blurred-c'>c</span>");
    },
    function(replay) {
        removeHighlight("c-interval", 1);
        removeHighlight("d-interval", 1);
        updateExplanation();
        addDiagram(replay);
        updateIntervalText();
        updateTableData();
        addDiagram();
        updateIntervalText();
        updateTableData();
        drawLineBetweenDiagrams("d-line-1", "max-line-2");
        drawLineBetweenDiagrams("c-line-1", "min-line-2");
        drawLineBetweenDiagrams("c-line-2", "max-line-3");
        drawLineBetweenDiagrams("b-line-2", "min-line-3");
        highlightLetter("b", 2);
        highlightLetter("a", 3);
        setMessageSpanText("dcba");
    }

];

const checkQuizDataFunctions = [
    //quiz1 - min question
    function() {
        const value = parseFloat(document.getElementById(`quiz`).value.replace(',', '.'));
        if (value==NaN) {
            return;
        }
        const span = document.getElementById("quiz-result");
        if (value===0.9) {
            span.innerHTML = quizResponseData[0][0];
        } else {
            span.innerHTML = quizResponseData[0][1];
        }
        markCompleted(0);
    },
    //quiz2 - interval question
    function() {
        const value = parseFloat(document.getElementById(`quiz`).value.replace(',', '.'));
        if (value==NaN) {
            return;
        }
        const span = document.getElementById("quiz-result");
        if (value===0.99){
            span.innerHTML = quizResponseData[1][0];
        } else if (value < 0.99 && value >=0.96) {
            span.innerHTML = quizResponseData[1][1];
        } else {
            span.innerHTML = quizResponseData[1][2];
        }
        markCompleted(1);
    },
    //quiz3 - min and max final interval question
    function() {
        const val1 = parseFloat(document.getElementById('quiz1').value.replace(',', '.'));
        const val2 = parseFloat(document.getElementById('quiz2').value.replace(',', '.'));
        if (val1==NaN || val2==NaN){
            return;
        }
        const span = document.getElementById("quiz-result");
        if (val1 !== 0.975 && val2 !== 0.9765) {
            span.innerHTML = quizResponseData[2][0];
        } else if (val1 !== 0.975) {
            span.innerHTML = quizResponseData[2][1];
        } else if (val2 !== 0.9765) {
            span.innerHTML = quizResponseData[2][2];
        } else {
            span.innerHTML = quizResponseData[2][3];
        }
        markCompleted(2);
    }
];

const quizResponseData = [
    ["Richtige Antwort! Das Subintervall 'd' wird unser nächstes Intervall, daher muss 0.9 die untere Grenze sein.",
    "Leider falsch, richtig wäre 0.9 gewesen, denn das ist die untere Subintervallgrenze des Symbols 'd', welches unser nächstes Intervall wird."],

    ["Fast richtig! Das Intervall geht zwar von 0.96 bis 0.99, darin ist 0.99 aber <i>nicht enthalten</i>. Daher ist 0.99 falsch, aber z.B. 0.989 wäre richtig!",
    "Richtig! Diese Zahl liegt zwischen 0.96 (eingeschlossen) und 0.99 (ausgeschlossen) und wäre daher eine richtige Ausgabe des Algorithmus.",
    "Leider falsch. Die Ausgabe des Algorithmus müsste zwischen 0.96 (eingeschlossen) und 0.99 (ausgeschlossen) liegen, um korrekt zu sein."],

    ["Leider falsch. Da das letzte kodierte Symbol 'a' war, übernehmen wir die Grenzen dieses Subintervalls für unser Ergebnis. Korrekt wäre also 0.975 und 0.9765.",
    "Die obere Grenze ist korrekt, aber die untere Grenze sollte 0.975 sein, also die untere Grenze des 'a'-Subintervalls.",
    "Die untere Grenze ist korrekt, aber die obere Grenze sollte 0.9765 sein, also die obere Grenze des 'a'-Subintervalls.",
    "Richtige Antwort! Das Subintervall des Symbols 'a' ist unser finales Intervall."],

    ["Leider falsch. Richtig wäre 'c' gewesen, da unsere Zahl zwischen 0.96 und 0.99 liegt.", "Richtig! Es muss ein 'c' ausgegeben werden, da unsere Zahl zwischen 0.96 und 0.99 liegt."]
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

function remove(elem) {
    elem.parentNode.removeChild(elem);
}

function falseButton() {
    const element = document.getElementById("quiz-result");
    element.innerHTML = quizResponseData[3][0];
    markCompleted(3);
    unblurMessage();
}

function correctButton() {
    const element = document.getElementById("quiz-result");
    element.innerHTML = quizResponseData[3][1];
    markCompleted(3);
    unblurMessage();
}

