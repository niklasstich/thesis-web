let diagramIteration = 0;

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
    lineGroup.setAttribute("stroke", "black");
    lineGroup.classList += "lines";
    textGroup.classList += "text";

    // add shapes
    // x1 x2 y1 y2
    const lineData = [
        [width, width+100, 1, 1],
        [width, width+100, 199, 199],
        [width+50, width+50, 1, 199],
        [width+15, width+85, 100, 100],
        [width+35, width+65, 50, 50],
        [width+35, width+65, 150, 150]
    ];
    // draw lines
    lineData.forEach(element => {
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line");
        newShape.setAttribute("x1", element[0]);
        newShape.setAttribute("x2", element[1]);
        newShape.setAttribute("y1", element[2]);
        newShape.setAttribute("y2", element[3]);
        lineGroup.appendChild(newShape);
    })
    // draw letters
    // x y text
    const textData = [
        [width+102, 5, "Max", "max"],
        [width+102, 199, "Min", "min"],
        [width+67, 152, "Q1", "q1"],
        [width+87, 102, "Q2", "q2"],
        [width+67, 52, "Q3", "q3"]
    ]
    textData.forEach(element => {
        let newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "text")
        newShape.setAttribute("x", element[0]);
        newShape.setAttribute("y", element[1]);
        newShape.textContent = element[2];
        newShape.id = element[3];
        textGroup.appendChild(newShape);
    }); 
    group.appendChild(lineGroup);
    group.appendChild(textGroup);

    svgObject.appendChild(group);
}