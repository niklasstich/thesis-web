var selectedElement = false;
var drawingEnabled = false;
const svg = document.getElementById("svg");
const svgDoc = svg.ownerDocument;
const vectorXOffset = 90;
const vectorFootY = 199;
const vectorTopYOffset = 10;
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

//adds a vector to the svg 
function createVectorInSVG(y1=vectorFootY, y2=vectorFootY-vectorTopYOffset, xOffset=vectorXOffset, color) {
    const vector = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line");
    const viewBox = svg.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])-iterationWidth;
    const height = parseInt(viewBox.split(" ")[3]);
    vector.classList.add("vector-line");
    vector.classList.add(`iteration-${diagramIteration}`);
    vector.setAttribute("x1", width+xOffset);
    vector.setAttribute("x2", width+xOffset);
    vector.setAttribute("y1", y1);
    vector.setAttribute("y2", y2);
    if (color!==undefined) {
        vector.setAttribute("stroke", color);
    } else {
        vector.setAttribute("stroke", "black");
    }
    vector.setAttribute("marker-end", "url(#arrowHead)");
    svg.appendChild(vector);
    return vector;
}

//create a vector for drawing and enables drawing
function createVectorForInteraction() {
    selectedElement = createVectorInSVG();
    drawingEnabled = true;
}

function startDraw(evt) {
    if (drawingEnabled) {
        if (!selectedElement) {
            //check if a line already exists
            var line = svgDoc.getElementById("vector-line");
            if (line==null) {
                createVectorForInteraction();
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
    clearVectors();
}

function getMousePosition(evt) {
    const CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

//deletes all vectors from given iteration or all that are found
function clearVectors(iteration) {
    let vectors;
    if (iteration !== undefined) {
        vectors = svg.getElementsByClassName(`iteration-${iteration}`);
    } else {
        vectors = svg.getElementsByClassName("vector-line");
    }
    vectors.forEach(element => {
        svg.remove(element);
    });
}