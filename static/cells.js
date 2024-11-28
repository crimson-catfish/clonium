const width = 716.44;
const height = 650;
const sizeOfMesh = height / 11;
const sizeOfCell = 84;
const cellLeft = (Math.sqrt(3) * sizeOfMesh) / 2 - (Math.sqrt(2) * sizeOfCell) / 2;
const cellTop = (2 * sizeOfMesh) / 2 - (Math.sqrt(2) * sizeOfCell) / 2;

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

function addOnePoint(group) {
    group.add(createCircle(sizeOfCell / 16.8, 'white'));
    return group;
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

function createCell(x, y, colorOfDiamond, colorOfSector, colorOfCircle) {
    const group = new fabric.Group([ createDiamond(sizeOfCell, sizeOfCell, colorOfDiamond) ], {
    left: x,
    top: y,
    hoverCursor: 'pointer',
    selectable: false
    });
    group.add(createCircle(sizeOfCell / 2, colorOfCircle));
    createSectors(group, sizeOfCell / 2, colorOfSector);
    group.add(createCircle(sizeOfCell / 2.4, colorOfCircle));
    group.add(createCircle(sizeOfCell / 2.625, colorOfSector));
    group.add(createCircle(sizeOfCell / 2.71, colorOfCircle));
    return group;
}

function addText(group, text) {
    group.add(createText(text, 13, 'yellow'));
    return group;
}

function createGreenCell(x, y) {
    const group = createCell(x, y, '#1E5945', '#004524', '#44944A');
    greenCells.push(group);
    return group;
}

function createBlueCell(x, y) {
    const group = createCell(x, y, '#1B5583', '#003153', '#1560BD');
    blueCells.push(group);
    return group;
}

function createRedCell(x, y) {
    const group = createCell(x, y, '#900020', '#7B001C', '#E32636');
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

function del(object) {
    canvas.delete(object);
}

const blueCells = [];
const redCells = [];
const greenCells = [];