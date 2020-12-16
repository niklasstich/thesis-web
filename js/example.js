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
        lineGroup.appendChild(newShape);
    })
    textData.forEach(element => {
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text")
        newShape.setAttribute("x", element[0] + width);
        newShape.setAttribute("y", element[1]);
        newShape.textContent = element[2];
        newShape.classList.add("diagram-text");
        newShape.id = element[3] + diagramIteration;
        textGroup.appendChild(newShape);
    });
    group.appendChild(barGroup);
    group.appendChild(lineGroup);
    group.appendChild(textGroup);
    svgObject.appendChild(group);

    
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
    //updateExplanation();
    initializePage();
}

function updateExplanation() {
    const explanationP = document.getElementById("explanation");
    explanationP.innerHTML = explanationData[explanationIteration];
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
    newShape.id = "bar-"+iteration;
    svgDoc.getElementById("bar-group-"+iteration).appendChild(newShape);
}


function advanceAnimation() {
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
}

function highlightLetter(letter, iteration) {
    changeLetterColor(letter, iteration, "red");
}

function removeHighlight(letter, iteration){
    changeLetterColor(letter, iteration, "black");
}

const explanationData = [
    "Wiederholen wir zunächst die Variante der arithmetischen Kodierung mit Kommazahlen.<br/>\
    Gegeben sind Alphabet <b>A={a, b, c, d}</b>, Wahrscheinlichkeiten <b>p={0.5, 0.1, 0.3, 0.1}</b><br/>\
    Die Nachricht sei: \"dcba\"",

    "A={a, b, c, d}, p={0.5, 0.1, 0.3, 0.1}, m=\"dcba\"</br>\
    Initialisiere Intervall min und max zunächst mit <b>0.0</b> und <b>1.0</b><br/>",

    "Berechne Intervalle für alle Symbole in A, wobei l die Länge unseres Intervalls ist (also Max-Min)<br/>\
    die Untergrenze des Intervalls Min+l&#215;&Sigma;p<sub>j</sub>, mit j&lt;i und i als Index des Symbols",
    "Test4"
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
    [0, 0+80, 1, 1],
    [0, 0+80, 199, 199],
    [0+40, 0+40, 1, 199, "middle-line-"],
    [0+30, 0+50, 100, 100, "b-line-"],
    [0+30, 0+50, 80, 80, "c-line-"],
    [0+30, 0+50, 20, 20, "d-line-"]
    //[0+15, 0+85, 100, 100],
    //[0+35, 0+65, 50, 50],
    //[0+35, 0+65, 150, 150]
];

const intervalNumbers = [
    ["0.0", "", "", "", "1.0"],
    ["", "0.5", "0.6", "0.9", ""]
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
    },
    function() {
        updateExplanation();
        highlightLetter("d", 1);
    },
    function() {
        updateExplanation();
        removeHighlight("d", 1);
    }
]
//const maxDiagramIteration = festkommaText.length;