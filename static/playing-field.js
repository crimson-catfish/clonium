const canvas = new fabric.Canvas('canvas');
console.log("script started");

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
        const angle = (i * Math.PI) / 3;
        points.push({
            x: x + size * Math.cos(angle),
            y: y + size * Math.sin(angle)
        });
    }

    const hexagon = new fabric.Polygon(points, {
        fill: createRadialGradient(size, 'lightblue', '#4285B4'),
        left: x,
        top: y,
        selectable: false
    });
    return hexagon;
}

const hexagon = createHexagon(100, 100, 50);
canvas.add(hexagon);
