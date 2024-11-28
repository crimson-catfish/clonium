console.log("script started");
const canvas = new fabric.Canvas('canvas');

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
        /*strokeLineJoin: 'round',
        strokeWidth: 2,
        stroke: '#4285B4',*/
        selectable: false
    });
    return hexagon;
}

const shadow = new fabric.Shadow({
            color: 'black',
            blur: 10
        });

canvas.on('mouse:over', function(e) {
    if (e.target && (blueCells.includes(e.target) || redCells.includes(e.target) || greenCells.includes(e.target))) {
        e.target.set('shadow', shadow);
        canvas.requestRenderAll();
    }
});

canvas.on('mouse:out', function(e) {
    if (e.target) {
        e.target.set('shadow', false);
        canvas.requestRenderAll();
    }
});

const field = new Field();
field.createField();

function setStart () {
    field.drawCell(-3, 1, 'red', 6);
    field.drawCell(-3, 5, 'blue', 5);
}

setStart();

