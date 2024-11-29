console.log("script started");
const canvas = new fabric.Canvas('canvas');

canvas.on('mouse:over', function(e) {
    if (e.target && (blueCells.includes(e.target) || redCells.includes(e.target) || greenCells.includes(e.target))) {
        e.target.set('shadow', createShadow('black', 10));
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

function setStart () {
    field.drawCell(-3, 1, 'red', 1);
    field.drawCell(-3, 5, 'blue', 5);
}

setStart();

canvas.on('mouse:down',  function(e) {
    if (e.target && cells.includes(e.target)) {
        let index = cells.indexOf(e.target);
        let coords = field.indexesToCoords[index]
        console.log(coords[0], coords[1]);
        field.addPoint(coords[0], coords[1]);
    }
});
