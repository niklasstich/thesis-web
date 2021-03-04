let animationIteration = 0;
let diagramIteration = 0;
let barValueTextIteration = 0;
let explanationIteration = 0;
let tableIteration = 0;
const updatableTextFields = 5;
const height = 200;
const barWidth = 20;
const iterationWidth = 140;

const bracketSVG = "/img/curlybracket_right_slim_verythin.svg";

//expands the svg size to make room for another iteration
function extendSVG(replay, deltaWidth=iterationWidth) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    // make room for new diagram
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])
    const height = parseInt(viewBox.split(" ")[3])
    svgObject.setAttributeNS(null, "viewBox", "0 0 " + (width+deltaWidth) + " " + (height));
    if(!replay){
        scrollSVGdiv();
    }
}

//finds or creates the groups lineGroup, textGroup, barGroup and metaGroup for the current diagramIteration and returns them
function createOrFindGroups(){
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    //first, try to find the group as a child of the document
    var metaGroup = svgDoc.getElementById("diagram-"+diagramIteration);
    if (metaGroup != null) {
        //we found it, return the groups
        const lineGroup = svgDoc.getElementById("line-group-"+diagramIteration);
        const textGroup = svgDoc.getElementById("text-group-"+diagramIteration);
        const barGroup = svgDoc.getElementById("bar-group-"+diagramIteration);
        return [lineGroup, textGroup, barGroup, metaGroup];
    }
    //didn't find metagroup, so create all groups and add them to the svg
    let group = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    group.id = "diagram-"+diagramIteration;
    let lineGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    let textGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    let barGroup = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    lineGroup.setAttribute("stroke", "black");
    lineGroup.id = "line-group-"+diagramIteration;
    textGroup.id = "text-group-"+diagramIteration;
    barGroup.id = "bar-group-"+diagramIteration;
    group.appendChild(barGroup);
    group.appendChild(lineGroup);
    group.appendChild(textGroup);
    svgObject.appendChild(group);
    return [lineGroup, textGroup, barGroup, metaGroup];
}

//Prints all lines found in lineData that are specified in indices
function drawLines(indices) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])-iterationWidth;
    const height = parseInt(viewBox.split(" ")[3])
    const [lineGroup, textGroup, barGroup, _] = createOrFindGroups();
    // draw lines
    indices.forEach(index => {
        const element = lineData[index];
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
    });
}

//Like drawLines but for textData
function drawText(indices) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])-iterationWidth;
    const height = parseInt(viewBox.split(" ")[3])
    const [lineGroup, textGroup, barGroup, _] = createOrFindGroups();
    indices.forEach(index => {
        const element = textData[index];
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text")
        newShape.setAttribute("x", element[0] + width);
        newShape.setAttribute("y", element[1]);
        newShape.textContent = element[2];
        newShape.classList.add("diagram-text");
        newShape.classList.add("fade-in");
        newShape.id = element[3] + diagramIteration;
        textGroup.appendChild(newShape);
    });
}

//draws the bracket and text showing the length of the current interval
function drawLengthBracket(length) {
    const offsetx = 2;
    //bracket
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const metaGroup = createOrFindGroups()[3];
    const middleLine = svgDoc.getElementById(`middle-line-${diagramIteration}`);
    const maxLine = svgDoc.getElementById(`max-line-${diagramIteration}`);
    const bracketposx = parseInt(maxLine.getAttribute("x2"), 10) + offsetx;
    const bracketposy = parseInt(maxLine.getAttribute("y2"), 10);
    const height = parseInt(middleLine.getAttribute("y2"), 10) - parseInt(middleLine.getAttribute("y1"), 10);
    const width = height/10;
    let bracketElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "image");
    bracketElement.setAttribute("x", bracketposx);
    bracketElement.setAttribute("y", bracketposy);
    bracketElement.setAttribute("height", height);
    bracketElement.setAttribute("width", width);
    bracketElement.setAttribute("href", bracketSVG);
    bracketElement.setAttribute("opacity", "0.5");
    bracketElement.id = `bracket-${diagramIteration}`;
    metaGroup.appendChild(bracketElement);
    //text
    const textposx = bracketposx + width;
    const textposy = bracketposy + height/2 + 1;
    let textElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", textposx);
    textElement.setAttribute("y", textposy);
    textElement.setAttribute("font-size", "4px");
    textElement.textContent = `l = ${length}`;
    textElement.id = `bracket-text-${diagramIteration}`;
    metaGroup.appendChild(textElement);
}

//adds a new line diagram with data from lineData and textData
function addDiagram(replay, deltaWidth) {
    diagramIteration++;
    // get svg
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])
    const height = parseInt(viewBox.split(" ")[3])
    extendSVG(replay, deltaWidth);
    drawLines([...lineData.keys()]);
    drawText([...textData.keys()]);
}

//resets the svg by restoring to initial viewbox and removing all child objects
function resetSVG() {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    while(svgObject.firstChild) {
        svgObject.removeChild(svgObject.lastChild);
    }
    svgObject.setAttribute("viewBox", "0 0 0 " + height);
}

//completely resets state of page by setting all iteration to 0, resetting svg and table and reinitializing the page
function resetState() {
    resetSVG();
    animationIteration = 0;
    diagramIteration = 0;
    barValueTextIteration = 0;
    explanationIteration = 0;
    tableIteration = 0;
    enableAnimationProgress();
    resetTable();
    initializePage();
}

//fetches next state from explanationData and updates explanation text
function updateExplanation() {
    const explanationP = document.getElementById("explanation");
    explanationP.innerHTML = explanationData[explanationIteration];
    explanationIteration++;
    MathJax.typeset();
}

//fetches next state from intervalNumbers and updates text elements in current diagram iteration
function updateIntervalText() {
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

//seems to be unused right now
//create a new bar in iteration from upperY to lowerY with width barWidth
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

//advances animation by one
function advanceAnimation(replay) {
    enableAnimationProgress();
    animationActions[animationIteration](replay);
    animationIteration++;
    updatePageProgress();
}

//resets animation completely and fast-forwards until previous iteration
function reverseAnimation() {
    const prevIteration = animationIteration - 1;
    resetState();
    while (animationIteration < prevIteration) {
        advanceAnimation(true);
    }
    scrollSVGdiv();
    updatePageProgress();
}

//initialized the page by setting first explanation text, making the table invisible, setting up mathjax
//and updating the animation progress
function initializePage() {	
    const explanationP = document.getElementById("explanation");	
    explanationP.innerHTML = explanationData[explanationIteration];
    explanationIteration++;
    makeTableInvisible();
    MathJax.typeset();
    updatePageProgress();
}

//change fontcolor of letter in iteration to color
function changeLetterColor(letter, iteration, color){
    const element = document.getElementById(letter + "-" + iteration);
    element.setAttribute("fill", color);
    return element;
}

//highlights letter in iteration red
function highlightLetter(letter, iteration) {
    const element = changeLetterColor(letter, iteration, "red");
    const parent = element.parentElement;
    parent.removeChild(element);
    parent.appendChild(element);
}

//removes the highlight from letter in iteration
function removeHighlight(letter, iteration){
    changeLetterColor(letter, iteration, "black");
}

//enables the forward button on the animation
function enableAnimationProgress() {{
    const element = document.getElementById("button-forward");
    element.removeAttribute("disabled", "false")
}}

//disables the forward button on the animation
function disableAnimationProgress() {
    const element = document.getElementById("button-forward");
    element.setAttribute("disabled", "true");
}

//draws a line from foot x2,y2 to tip x1,y1
function drawLineBetweenDiagrams(foot, tip) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    const source = svgDoc.getElementById(foot);
    const dest = svgDoc.getElementById(tip);
    let newElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line")
    newElement.setAttribute("x1", source.getAttribute("x2"));
    newElement.setAttribute("y1", source.getAttribute("y2"));
    newElement.setAttribute("x2", dest.getAttribute("x1"));
    newElement.setAttribute("y2", dest.getAttribute("y2"));
    newElement.setAttribute("stroke", "#ad2300");
    newElement.classList.add("fade-in");
    svgObject.appendChild(newElement);
}

//makes algo-table visible
function makeTableVisible() {
    const element = document.getElementById("algo-table");
    element.style.visibility = "visible";
}

//makes algo-table hidden
function makeTableInvisible() {
    const element = document.getElementById("algo-table");
    element.style.visibility = "hidden";
}

//fetches next table state from tableData and displays it in algo-table
function updateTableData() {
    const element = document.getElementById("algo-table");
    const iterationData = tableData[tableIteration];
    let iterationString = "";
    iterationData.forEach(row => {
        let rowString = "<tr>";
        row.forEach(cell => {
            rowString += "<td>" + cell + "</td>";
        });
        rowString += "</tr>";
        iterationString += rowString;
    });
    element.innerHTML = tableHeader + iterationString;
    tableIteration++;
}

//resets the innerHTML of the algo-table to nothing
function resetTable() {
    const element = document.getElementById("algo-table");
    element.innerHTML = "";
}

//toggles off blur of specified id
function toggleBlur(id) {
    const element = document.getElementById(id);
    if (element != null) {
        if(element.classList.contains("blurred-text")) {
            element.classList.remove("blurred-text");
        }
    }
}

//updates the animation progress in page-progress
function updatePageProgress() {
    const element = document.getElementById("page-progress");
    element.innerHTML = `Schritt: ${animationIteration+1}/${animationActions.length+1}`;
}

//scrolls the div containing the SVG to the rightmost position with easing
function scrollSVGdiv() {
    if (!$("#autoscroll-check")[0].checked){
        return;
    }
    const element = $("#svg-div")[0];
    const maxScroll = element.scrollWidth - element.clientWidth;
    const currScroll = element.scrollLeft;
    $(element).animate({scrollLeft: maxScroll}, 800, "easeInOutCubic");
}

//sets the text in span-message to the new message
function setMessageSpanText(text) {
    const element = document.getElementById("span-message");
    element.innerHTML = `Nachricht m='${text}'`;
}

//fades elements into invisibility in 2 seconds and removes it from the HTML document after 3 seconds
function fadeHTMLElement(...ids) {
    fadeElements(document, ...ids);
}

//fades elements into invisibility in 2 seconds and removes it from the SVG document after 3 seconds
function fadeSVGElement(...ids) {
    const svgObject = document.getElementById("svg");
    const svgDoc = svgObject.ownerDocument;
    fadeElements(svgDoc, ...ids);
}

//use fadeSVGElement or fadeHTMLElement instead
function fadeElements(parentDocument, ...ids) {
    ids.forEach(id => {
        const element = parentDocument.getElementById(id);
        element.classList.add("fade-out");
        (async function(element) {
            const parent = element.parentNode
            await sleep(3000);
            parent.removeChild(element);
        })(element);
    });
}

//returns a promise that resolves after ms milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function unblurMessage() {
    const element = document.getElementById("blurred-c");
    element.classList.remove("blurred-text");
}