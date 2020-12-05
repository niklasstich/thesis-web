function addDiagram() {
    // get svg
    const svgObject = document.getElementById("svg");
    // make room for new diagram
    const viewBox = svgObject.getAttributeNS(null, "viewBox");
    const width = parseInt(viewBox.split(" ")[2])
    const height = parseInt(viewBox.split(" ")[3])
    svgObject.setAttributeNS(null, "viewBox", "0 0 " + (width+120) + " " + (height));
    // add shapes
    const svgDoc = svgObject.ownerDocument;
    const data = [
        [width, width+100, 1, 1],
        [width, width+100, 199, 199],
        [width+50, width+50, 1, 199],
        [width+15, width+85, 100, 100],
        [width+35, width+65, 50, 50],
        [width+35, width+65, 150, 150]
    ];
    data.forEach(element => {
        newShape = svgDoc.createElementNS("http://www.w3.org/2000/svg", "line");
        newShape.setAttributeNS(null, "x1", element[0]);
        newShape.setAttributeNS(null, "x2", element[1]);
        newShape.setAttributeNS(null, "y1", element[2]);
        newShape.setAttributeNS(null, "y2", element[3]);
        newShape.setAttributeNS(null, "stroke", "black");
        svgObject.appendChild(newShape);
    })
}