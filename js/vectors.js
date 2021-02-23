var selectedElement = false;
var drawingEnabled = false;
const svg = document.getElementById("svg");
const svgDoc = svg.ownerDocument;
const vectorXOffset = 90;
const vectorFootY = 199;
const lowerBoundY = 0;
const upperBoundY = 200;
//registers event listeners
function initDrawing(evt) {
    const svg = evt.target;
    svg.addEventListener('mousedown', startDraw);
    svg.addEventListener('mousemove', updateDraw);
    svg.addEventListener('mouseup', endDraw);
    svg.addEventListener('mouseleave', endDraw);
}

//create a vector for drawing and enable it
function createVector() {
    //create a new line with fixed x1y1 and x2, and variable y2
    line = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line");
    const viewBox = svg.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])-iterationWidth;
    const height = parseInt(viewBox.split(" ")[3]);
    line.id = "vector-line";
    line.setAttribute("x1", width+vectorXOffset);
    line.setAttribute("x2", width+vectorXOffset);
    line.setAttribute("y1", vectorFootY);
    line.setAttribute("y2", vectorFootY-10);
    line.setAttribute("stroke", "black");
    line.setAttribute("marker-end", "url(#arrowHead)");
    svg.appendChild(line);
    selectedElement = line;
    drawingEnabled;
}

function startDraw(evt) {
    if (drawingEnabled) {
        if (!selectedElement) {
            //check if a line already exists
            var line = svgDoc.getElementById("vector-line");
            if (line==null) {
                createVector();
            } else {
                selectedElement = line;
            }
        }
    }
}

function updateDraw(evt) {
    if (drawingEnabled && selectedElement!=false) {
        evt.preventDefault();
        const pos = getMousePosition(evt);
        const line = svgDoc.getElementById("vector-line");
        line.setAttribute("y2", pos.y);
    } 
}

function endDraw(evt) {
    if (selectedElement != false) {
        selectedElement = false;
    }
}

function resetDraw(evt) {
    selectedElement = false;
    drawingEnabled = false;
    const line = svgDoc.getElementById("vector-line");
    if (line != null) {
        svgDoc.removeChild(line);
    }
}

function getMousePosition(evt) {
    const CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}