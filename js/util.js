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
}

function reverseAnimation() {
    const prevIteration = animationIteration - 1;
    resetState();
    while (animationIteration < prevIteration) {
        advanceAnimation();
    }
}

function initializePage() {	
    const explanationP = document.getElementById("explanation");	
    explanationP.innerHTML = explanationData[explanationIteration];
    explanationIteration++;
    makeTableInvisible();
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

function makeTableVisible() {
    const element = document.getElementById("algo-table");
    element.style.visibility = "visible";
}

function makeTableInvisible() {
    const element = document.getElementById("algo-table");
    element.style.visibility = "hidden";
}

