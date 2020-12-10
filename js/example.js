let diagramIteration = 0;
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
        newShape.classList.add(element[3]);
        textGroup.appendChild(newShape);
    });
    group.appendChild(barGroup);
    group.appendChild(lineGroup);
    group.appendChild(textGroup);
    svgObject.appendChild(group);

    updateExplanation();
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
    diagramIteration = 0;
    updateExplanation();
}

function updateExplanation() {
    const explanationP = document.getElementById("explanation");
    explanationP.innerHTML = festkommaText[diagramIteration];   
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
    newShape.id = "bar-"+iteration;
    svgDoc.getElementById("bar-group-"+iteration).appendChild(newShape);
}


function advanceAnimation() {
    addDiagram();
    createBar(diagramIteration, 60, 140);
    addDiagram(); 
    createBar(diagramIteration, 40, 100);
    addDiagram();
    createBar(diagramIteration, 20, 60);

}

function initializePage() {
    const explanationP = document.getElementById("explanation");
    explanationP.innerHTML = festkommaText[diagramIteration];
}

const festkommaText = [
    "Test1",
    "Test2",
    "Test3",
    "Test4"
]
// draw letters
// x y text id
const textData = [
    [0+102, 5, "Max", "max"],
    [0+102, 199, "Min", "min"],
    [0+67, 152, "Q1", "q1"],
    [0+87, 102, "Q2", "q2"],
    [0+67, 52, "Q3", "q3"]
]
// add shapes
// x1 x2 y1 y2
const lineData = [
    [0, 0+100, 1, 1],
    [0, 0+100, 199, 199],
    [0+50, 0+50, 1, 199, "middle-line-"],
    [0+15, 0+85, 100, 100],
    [0+35, 0+65, 50, 50],
    [0+35, 0+65, 150, 150]
];

//const maxDiagramIteration = festkommaText.length;