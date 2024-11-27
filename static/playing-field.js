console.log("script started");
const canvas = new fabric.Canvas('canvas');
const width = 716.44;
const height = 650;

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
        /*strokeLineJoin: 'round',
        strokeWidth: 2,
        stroke: '#4285B4',*/
        selectable: false
    });
    return hexagon;
}

function createField() {
    size = height / 11;

    for (let y = 0; y < 9 * size + 0.1; y += 1.5 * size) {
        let offset = Math.abs(y / (1.5 * size) - 3) * (Math.sqrt(3) / 2) * size;
        for (let x = offset; x < width - offset - 0.1; x += Math.sqrt(3) * size) {
            add(createHexagon(x, y, size));
        }
    }
}

createField();

