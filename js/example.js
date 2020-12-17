let animationIteration = 0;
let diagramIteration = 0;
let barValueTextIteration = 0;
let explanationIteration = 0;
const updatableTextFields = 5;
const height = 200;
const barWidth = 20; 

function addDiagram() {
    diagramIteration++;
    // get svg
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    // make room for new diagram
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])
    const height = parseInt(viewBox.split(" ")[3])
    svgObject.setAttributeNS(null, "viewBox", "0 0 " + (width+120) + " " + (height));
    
    // add groups
    let group = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    group.id = "diagram-"+diagramIteration;
    let lineGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    let textGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    let barGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    lineGroup.setAttribute("stroke", "black");
    lineGroup.id = "line-group-"+diagramIteration;
    textGroup.id = "text-group-"+diagramIteration;
    barGroup.id = "bar-group-"+diagramIteration;
    // draw lines
    lineData.forEach(element => {
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line");
        newShape.setAttribute("x1", element[0]+width);
        newShape.setAttribute("x2", element[1]+width);
        newShape.setAttribute("y1", element[2]);
        newShape.setAttribute("y2", element[3]);
        if (element[4] != undefined) {
            newShape.id = element[4]+diagramIteration;
        }
        newShape.classList.add("fade-in");
        lineGroup.appendChild(newShape);
    })
    textData.forEach(element => {
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text")
        newShape.setAttribute("x", element[0] + width);
        newShape.setAttribute("y", element[1]);
        newShape.textContent = element[2];
        newShape.classList.add("diagram-text");
        newShape.classList.add("fade-in");
        newShape.id = element[3] + diagramIteration;
        textGroup.appendChild(newShape);
    });
    group.appendChild(barGroup);
    group.appendChild(lineGroup);
    group.appendChild(textGroup);
    svgObject.appendChild(group);

    //slide slider to the right slowly, if applicable
    //TODO: Figure out a way to scroll nicely, perhaps with jQuery 
    // see https://stackoverflow.com/a/51005649/8901348
    /*const div = svgObject.parentElement;
    div.scrollLeft += 600;*/
}

function resetSVG() {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    while(svgObject.firstChild) {
        svgObject.removeChild(svgObject.lastChild);
    }
    svgObject.setAttribute("viewBox", "0 0 0 " + height);
}

function resetState() {
    resetSVG();
    animationIteration = 0;
    diagramIteration = 0;
    barValueTextIteration = 0;
    explanationIteration = 0;
    enableAnimationProgress();
    //updateExplanation();
    initializePage();
}

function updateExplanation() {
    const explanationP = document.getElementById("explanation");
    if (explanationIteration > 0){
        explanationP.innerHTML = "A={a, b, c, d}, p={0.5, 0.1, 0.3, 0.1}, m=\"dcba\"</br>" + explanationData[explanationIteration];
    } else {
        explanationP.innerHTML = explanationData[explanationIteration];
    }
    explanationIteration++;
}

function updateBarValueText() {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    for (let i = 0; i < updatableTextFields; i++) {
        if (intervalNumbers[barValueTextIteration][i] == "") {
            continue;
        }
        const idPrefix = textData[i][3];
        const element = svgDoc.getElementById(idPrefix + diagramIteration);
        if (element.innerHTML == ""){
            element.innerHTML = intervalNumbers[barValueTextIteration][i];
        } else {
            element.innerHTML += ": "+ intervalNumbers[barValueTextIteration][i];
        }
    }
    barValueTextIteration++;
}


function createBar(iteration, upperY, lowerY) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "rect");
    const middleLine = svgDoc.getElementById("middle-line-"+iteration);
    const middleX = middleLine.getAttribute("x1");
    newShape.setAttribute("x", middleX-(barWidth/2));
    newShape.setAttribute("y", upperY);
    newShape.setAttribute("width", barWidth);
    newShape.setAttribute("height", lowerY - upperY);
    newShape.classList.add("draggable");
    newShape.classList.add("fade-in");
    newShape.id = "bar-"+iteration;
    svgObject.getElementById("bar-group-"+iteration).appendChild(newShape);
}


function advanceAnimation() {
    enableAnimationProgress();
    animationActions[animationIteration]();
    animationIteration++;
    /*
    if (diagramIteration < animationData.length-1) {
        addDiagram();
        //createBar(diagramIteration, animationData[diagramIteration][0], animationData[diagramIteration][1]);
    }*/
}

function reverseAnimation() {
    const prevIteration = animationIteration -1;
    resetState();
    while (animationIteration < prevIteration) {
        advanceAnimation();
    }
}

function initializePage() {	
    const explanationP = document.getElementById("explanation");	
    explanationP.innerHTML = explanationData[explanationIteration];
    explanationIteration++;
}

function changeLetterColor(letter, iteration, color){
    const element = document.getElementById(letter + "-" + iteration);
    element.setAttribute("fill", color);
    return element;
}

function highlightLetter(letter, iteration) {
    const element = changeLetterColor(letter, iteration, "red");
    const parent = element.parentElement;
    parent.removeChild(element);
    parent.appendChild(element);
}

function removeHighlight(letter, iteration){
    changeLetterColor(letter, iteration, "black");
}
function enableAnimationProgress() {{
    const element = document.getElementById("button-forward");
    element.removeAttribute("disabled", "false")
}}

function disableAnimationProgress() {
    const element = document.getElementById("button-forward");
    element.setAttribute("disabled", "true");
}

function drawLineBetweenDiagrams(fromLineId, toLineId) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const source = svgDoc.getElementById(fromLineId);
    const dest = svgDoc.getElementById(toLineId);
    let newElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line")
    newElement.setAttribute("x1", source.getAttribute("x2"));
    newElement.setAttribute("y1", source.getAttribute("y2"));
    newElement.setAttribute("x2", dest.getAttribute("x1"));
    newElement.setAttribute("y2", dest.getAttribute("y2"));
    newElement.setAttribute("stroke", "#fa5c28");
    newElement.classList.add("fade-in");
    svgObject.appendChild(newElement);
}

function checkQuiz1() {
    const element = document.getElementById("quiz");
    const value = element.value;
    if (value=="") {
        return;
    }
    const span = document.getElementById("quiz-result");
    if (value=="0.9" || value=="0,9" || value==".9" || value==",9") {
        span.innerHTML = "Richtige Antwort!";
    } else {
        span.innerHTML = "Leider falsch, richtig wäre gewesen: 0,9";
    }
    enableAnimationProgress();
}

const explanationData = [
    "Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen.<br/>\
    Gegeben sind Alphabet <b>A={a, b, c, d}</b>, Wahrscheinlichkeiten <b>p={0.5, 0.1, 0.3, 0.1}</b><br/>\
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
// draw letters
// x y text id
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
    //[0+67, 152, "Q1", "q1"],
    //[0+87, 102, "Q2", "q2"],
    //[0+67, 52, "Q3", "q3"]
]
// add shapes
// x1 x2 y1 y2
const lineData = [
    [0, 0+80, 1, 1, "max-line-"],
    [0, 0+80, 199, 199, "min-line-"],
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0+30, 0+50, 100, 100, "b-line-"],
    [0+30, 0+50, 80, 80, "c-line-"],
    [0+30, 0+50, 20, 20, "d-line-"]
    //[0+15, 0+85, 100, 100],
    //[0+35, 0+65, 50, 50],
    //[0+35, 0+65, 150, 150]
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
        addDiagram();
        updateExplanation();
        updateBarValueText();
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
        disableAnimationProgress();
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
//const maxDiagramIteration = festkommaText.length;