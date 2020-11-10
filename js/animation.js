"use strict";
var areaWidth = 140;
var sliderWidth = 30 - 1;
var middleLineX = 59;
var sliderHeight = 240 - 1;
var selectedElement = null;
var offset;
function makeDraggable(evt) {
    var svg = evt.target;
    svg === null || svg === void 0 ? void 0 : svg.addEventListener('mousedown', startDrag);
    svg === null || svg === void 0 ? void 0 : svg.addEventListener('mousemove', drag);
    svg === null || svg === void 0 ? void 0 : svg.addEventListener('mouseup', endDrag);
    svg === null || svg === void 0 ? void 0 : svg.addEventListener('mouseleave', endDrag);
}
function startDrag(evt) {
    var _a, _b;
    if ((_b = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('draggable')) {
        selectedElement = evt.target;
        offset = getMousePosition(evt);
        if (offset == null) {
            offset = {
                x: 0,
                y: 0
            };
            return;
        }
        var x = selectedElement.getAttribute("x");
        var y = selectedElement.getAttribute("y");
        if (x == null || y == null) {
            offset.x = 0;
            offset.y = 0;
            return;
        }
        offset.x -= parseFloat(x);
        offset.y -= parseFloat(y);
    }
}
function drag(evt) {
    if (selectedElement) {
        evt.preventDefault(); //prevents other handlers to do anything
        var coord = getMousePosition(evt);
        if (coord == undefined) {
            return;
        }
        if (offset == null) {
            selectedElement.setAttribute("x", String(coord.x));
            selectedElement.setAttribute("y", String(coord.y));
            return;
        }
        selectedElement.setAttribute("x", String(coord.x - offset.x));
        selectedElement.setAttribute("y", String(coord.y - offset.y));
    }
}
function endDrag(evt) {
    selectedElement = null;
}
function getMousePosition(evt) {
    var _a;
    var CTM = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.getScreenCTM();
    if (CTM == null) {
        console.log("Couldn't get SVG CTM");
        return null;
    }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}
function main() {
    var slider = document.querySelector("#slider");
    if (slider == null) {
        console.log("Couldn't get slider element");
        return;
    }
    slider.setAttribute('y', "0");
    slider.setAttribute('x', String(middleLineX - sliderWidth / 2));
    slider.setAttribute('width', String(sliderWidth));
    slider.setAttribute('height', String(sliderHeight));
}
window.onload = main;
