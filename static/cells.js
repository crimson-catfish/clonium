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

function createOnePoint(group) {
    return group.add(createSupportiveGroup([createCircle(sizeOfCell / 16.8, 'white')]));
}

function createTwoPoint(group) {
    point1 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, 0);
    point2 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, 0);
    return group.add(createSupportiveGroup([point1, point2]));
}

function createThreePoint(group) {
    point1 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, sizeOfCell / 12.92);
    point2 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), 0, -sizeOfCell / 12.92);
    point3 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, sizeOfCell / 12.92);
    return group.add(createSupportiveGroup([point1, point2, point3]));
}

function createFourPoint(group) {
    point1 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, sizeOfCell / 11.2);
    point2 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, sizeOfCell / 11.2);
    point3 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, -sizeOfCell / 11.2);
    point4 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, -sizeOfCell / 11.2);
    return group.add(createSupportiveGroup([point1, point2, point3, point4]));
}

function createFivePoint(group) {
    point1 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 9.88, sizeOfCell / 9.88);
    point2 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 9.88, sizeOfCell / 9.88);
    point3 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 9.88, -sizeOfCell / 9.88);
    point4 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 9.88, -sizeOfCell / 9.88);
    point5 = createCircle(sizeOfCell / 16.8, 'white');
    return group.add(createSupportiveGroup([point1, point2, point3, point4, point5]));
}

function createSixPoint(group) {
    point1 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, -sizeOfCell / 5.6);
    point2 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, -sizeOfCell / 5.6);
    point3 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, 0);
    point4 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, 0);
    point5 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), -sizeOfCell / 11.2, sizeOfCell / 5.6);
    point6 = moveObject(createCircle(sizeOfCell / 16.8, 'white'), sizeOfCell / 11.2, sizeOfCell / 5.6);
    return group.add(createSupportiveGroup([point1, point2, point3, point4, point5, point6]));
}

function addPoints(group, countOfPoints) {
    switch (countOfPoints) {
        case 1: return createOnePoint(group);
        case 2: return createTwoPoint(group);
        case 3: return createThreePoint(group);
        case 4: return createFourPoint(group);
        case 5: return createFivePoint(group);
        case 6: return createSixPoint(group);
        default: console.log("Невозможно нарисовать столько точек");
    }
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

function createFullCell(x, y, color, countOfPoints) {
    cell = createColorCell(x, y, color);
    return addPoints(cell, countOfPoints);
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

function createColorCell(x, y, color) {
    switch (color) {
        case 'red': return createRedCell(x, y);
        case 'blue': return createBlueCell(x, y);
        case 'green': return createGreenCell(x, y);
        default: console.log('Невозможно создать ячейку с таким цветом');
    }
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

function createRadialGradient(radius, color1, color2) {
    const gradient = new fabric.Gradient({
    type: 'radial',
    coords: {
      r1: radius,
      r2: 0,
      x1: radius,
      y1: radius,
      x2: radius,
      y2: radius
    },
    colorStops: [
        {offset: 0, color: color2 },
        { offset: 1, color: color1 }
    ]
    });
    return gradient;
}

function createHexagon(x, y, size) {
    const points = [];

    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 6 + (i * Math.PI) / 3;
        points.push({
            x: x + size * Math.cos(angle),
            y: y + size * Math.sin(angle)
        });
    }

    const hexagon = new fabric.Polygon(points, {
        fill: createRadialGradient(size, 'lightblue', '#4285B4'),
        left: x,
        top: y,
        hoverCursor: 'default',
        selectable: false
    });
    return hexagon;
}

function createShadow(color, blur) {
    const shadow = new fabric.Shadow({
        color: color,
        blur: blur
    });
    return shadow;
}

function add(object) {
    canvas.add(object);
}

function del(object) {
    canvas.delete(object);
}

function moveObject(object, left, top) {
    object.set({left: object.left + left});
    object.set({top: object.top + top});
    return object;
}

function createSupportiveGroup(arrayOfObjects) {
    let points = new fabric.Group(arrayOfObjects, {
    originX: 'center',
    originY: 'center',
    selectable: false
    });
    return points;
}

const blueCells = [];
const redCells = [];
const greenCells = [];