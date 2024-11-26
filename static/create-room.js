console.log("script started");

const canvas = new fabric.Canvas('c1');

function createDiamond(width, height, color) {
    const diamond = new fabric.Rect({
    originX: 'center',
    originY: 'center',
    width: width,
    height: height,
    fill: color,
    rx: 28,
    ry: 28,
    angle: 45
    });
    return diamond;
}

function createCircle(radius, color) {
    const circle = new fabric.Circle({
    originX: 'center',
    originY: 'center',
    radius: radius,
    fill: color
    });
    return circle;
}

function createText(text, fontSize, color) {
    const t = new fabric.Text(text, {
    fontSize: fontSize,
    fill: color,
    originX: 'center',
    originY: 'center'
    });
    return t;
}

function createCell(text, x, y, colorOfDiamond, colorOfSector, colorOfCircle) {
    const group = new fabric.Group([ createDiamond(92, 92, colorOfDiamond) ], {
    left: x,
    top: y,
    hoverCursor: 'pointer',
    selectable: false
    });
    group.add(createCircle(46, colorOfCircle));
    createSectors(group, 46, colorOfSector);
    group.add(createCircle(38, colorOfCircle));
    group.add(createCircle(35, colorOfSector));
    group.add(createCircle(33, colorOfCircle));
    group.add(createText(text, 13, 'yellow'));
    return group;
}

function createGreenCell(text, x, y) {
    const group = createCell(text, x, y, '#1E5945', '#004524', '#44944A');
    greenCells.push(group);
    return group;
}

function createBlueCell(text, x, y) {
    const group = createCell(text, x, y, '#1B5583', '#003153', '#1560BD');
    blueCells.push(group);
    return group;
}

function createRedCell(text, x, y) {
    const group = createCell(text, x, y, '#900020', '#7B001C', '#E32636');
    redCells.push(group);
    return group;
}

function createSector(color, angleStart, angleEnd, radius, centerX, centerY) {
    const startX = centerX + radius * Math.cos(angleStart);
    const startY = centerY + radius * Math.sin(angleStart);
    const endX = centerX + radius * Math.cos(angleEnd);
    const endY = centerY + radius * Math.sin(angleEnd);

    const path = new fabric.Path(
        `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`, {
            fill: color,
            selectable: false
        }
    );

    return path;
}

function createSectors(group, radius, colorOfSector) {
    const angle = Math.PI / 16;
    const centerX = 0;
    const centerY = 0;
    const r = radius;
    const sectors = [];
    for (let i = 0; i < 32; i += 2){
        sectors.push({color: colorOfSector, angleStart: i * angle, angleEnd: (i+1) * angle});
    }

    sectors.forEach(sector => {
        const { color, angleStart, angleEnd } = sector;
        const sectorPath = createSector(color, angleStart, angleEnd, r, centerX, centerY);
        group.add(sectorPath);
    });
    return group;
}

function add(object) {
    canvas.add(object);
}

const blueCells = [];
const redCells = [];
const greenCells = [];

const blueCell2 = createBlueCell('2', 135, 15);
const blueCell3 = createBlueCell('3', 135, 15);
const blueCell4 = createBlueCell('4', 135, 15);
add(blueCell4);
add(blueCell3);
add(blueCell2);

const redCellT = createRedCell('Треугольник', 535, 15);
const redCellS = createRedCell('Квадрат', 535, 15);
const redCellH = createRedCell('Гексагон', 535, 15);
add(redCellH);
add(redCellS);
add(redCellT);

const greenCell = createGreenCell('Начать игру', 335, 180);
const greenCellN = createGreenCell('Выберите\n   число\n  игроков', 335, 180);
const greenCellF = createGreenCell('Выберите\n   форму\n     поля', 335, 180);
add(greenCellF);
add(greenCellN);
add(greenCell);

const shadow = new fabric.Shadow({
            color: 'black',
            blur: 30
        });

canvas.on('mouse:over', function(e) {
    if (e.target && e.target != greenCellN && e.target != greenCellF) {
        if (e.target == greenCell && (!flagSelectedBlue || !flagSelectedRed)) {}
        else {
            e.target.set('shadow', shadow);
            canvas.requestRenderAll();
        }
    }
});

canvas.on('mouse:out', function(e) {
    if (e.target) {
        e.target.set('shadow', false);
        canvas.requestRenderAll();
    }
});

function doAnimation(object, direction, distance) {
    object.animate(direction, distance, {
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeOutCubic
    });
}

function setPriority3(object1, object2, object3){
    canvas.moveTo(object3, 1);
    canvas.moveTo(object2, 2);
    canvas.moveTo(object1, 3);
}

function setPriority2(object1, object2) {
    canvas.moveTo(object2, 1);
    canvas.moveTo(object1, 2);
}

let flagSelectedBlue = true;
let flagSelectedRed = true;
let flagGreenN = false;
let flagGreenF = false;
canvas.on('mouse:down',  function(e) {
    if (e.target && blueCells.includes(e.target)) {
        if (flagSelectedBlue) {
            doAnimation(blueCell2, 'left', '-=110');
            doAnimation(blueCell3, 'top', '+=110');
            doAnimation(blueCell4, 'left', '+=110');
            flagSelectedBlue = false;
        }
        else {
            doAnimation(blueCell2, 'left', '+=110');
            doAnimation(blueCell3, 'top', '-=110');
            doAnimation(blueCell4, 'left', '-=110');
            if (flagGreenN) {
                doAnimation(greenCellN, 'top', '-=100');
                flagGreenN = false;
            }
            if (e.target == blueCell2) {
                setPriority3(blueCell2, blueCell3, blueCell4);
                flagSelectedBlue = true;
            }
            else if (e.target == blueCell3) {
                setPriority3(blueCell3, blueCell2, blueCell4);
                flagSelectedBlue = true;
            }
            else if (e.target == blueCell4) {
                setPriority3(blueCell4, blueCell3, blueCell2);
                flagSelectedBlue = true;
            }
        }
    }
    else if (e.target && redCells.includes(e.target)) {
        if (flagSelectedRed) {
            doAnimation(redCellT, 'left', '-=110');
            doAnimation(redCellS, 'top', '+=110');
            doAnimation(redCellH, 'left', '+=110');
            flagSelectedRed = false;
        }
        else {
            doAnimation(redCellT, 'left', '+=110');
            doAnimation(redCellS, 'top', '-=110');
            doAnimation(redCellH, 'left', '-=110');
            if (flagGreenF) {
                doAnimation(greenCellF, 'top', '-=100');
                flagGreenF = false;
            }
            if (e.target == redCellT) {
                setPriority3(redCellT, redCellS, redCellH);
                flagSelectedRed = true;
            }
            else if (e.target == redCellS) {
                setPriority3(redCellS, redCellT, redCellH);
                flagSelectedRed = true;
            }
            else if (e.target == redCellH) {
                setPriority3(redCellH, redCellS, redCellT);
                flagSelectedRed = true;
            }
        }
    }
    else if (e.target && e.target == greenCell) {
        if (!flagSelectedBlue && !flagGreenN && !flagGreenF) {
            doAnimation(greenCellN, 'top', '+=100');
            flagGreenN = true;
        }
        if (!flagSelectedRed && !flagGreenF && !flagGreenN) {
            doAnimation(greenCellF, 'top', '+=100');
            flagGreenF = true;
        }
    }
});