const areaWidth = 140;
const sliderWidth = 30-1;
const middleLineX = 59;
const sliderHeight = 240-1;

var selectedElement : Element | null = null;
var offset : {x: number, y: number} | null;

function makeDraggable(evt : Event){
    const svg = evt.target;
    svg?.addEventListener('mousedown', startDrag);
    svg?.addEventListener('mousemove', drag);
    svg?.addEventListener('mouseup', endDrag);
    svg?.addEventListener('mouseleave', endDrag);
}


function startDrag(evt : Event){
    if((<Element>evt.target)?.classList?.contains('draggable')){
        selectedElement = <Element>evt.target;
        offset = getMousePosition(<MouseEvent>evt);
        if (offset == null){
            offset = {
                x: 0,
                y: 0
            };
            return;
        }
        const x = selectedElement.getAttribute("x");
        const y = selectedElement.getAttribute("y");
        if (x==null || y==null){
            offset.x = 0;
            offset.y = 0;
            return;
        }
        offset.x -= parseFloat(x);
        offset.y -= parseFloat(y);
    }
}

function drag(evt : Event){
    if (selectedElement) {
        evt.preventDefault(); //prevents other handlers to do anything
        const coord = getMousePosition(<MouseEvent>evt);
        if (coord==undefined){
            return;
        }
        if(offset==null){
            selectedElement.setAttribute("x", String(coord.x));
            selectedElement.setAttribute("y", String(coord.y));
            return;
        }
        selectedElement.setAttribute("x", String(coord.x - offset.x));
        selectedElement.setAttribute("y", String(coord.y - offset.y));
    }
}

function endDrag(evt : Event){
    selectedElement = null;
}

function getMousePosition(evt : MouseEvent){
    const CTM = (<SVGGraphicsElement>evt.target)?.getScreenCTM();
    if (CTM==null){
        console.log("Couldn't get SVG CTM");
        return null;
    }
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

function main(){
    let slider = document.querySelector("#slider");
    if (slider==null){
        console.log("Couldn't get slider element");
        return;
    }
    slider.setAttribute('y', "0");
    slider.setAttribute('x', String(middleLineX - sliderWidth/2));
    slider.setAttribute('width', String(sliderWidth));
    slider.setAttribute('height', String(sliderHeight));
    
}

window.onload = main;