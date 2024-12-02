console.log("script started");
const canvas = new fabric.Canvas('canvas');

const urlParts = window.location.href.split('/');
const codeRoom = urlParts.slice(-1).join('/');
const titleElement = document.querySelector('.title');
titleElement.textContent += ' ' + codeRoom;

async function handle(x, y, field, data) {
    field.addPoint(x, y);
    await delay(499);
    if (!data['isUnfold']) {
        return;
    }
    for (let i = 0; i < Object.keys(data).length - 1; i++) {
        for (let j = 0; j < data[i].length; j++) {
            console.log("i: " + i + ", j: " + j);
            field.divide(data[i][j]['srcCoordinates'], data[i][j]['dstCoordinates']);
        }
        await delay(998);
    }
}


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
    field.drawCell(-3, 1, 'red', 5);
    field.drawCell(-3, 5, 'blue', 5);
}

setStart();
field.drawCell(-3, 2, 'blue', 3);
field.drawCell(-2, 1, 'green', 5);
field.drawCell(-4, 2, 'green', 5);

canvas.on('mouse:down',  function(e) {
    if (e.target && field.cells.includes(e.target)) {
        let index = field.cells.indexOf(e.target);
        let coords = field.indexesToCells[index];
        /*field.addPoint(coords[0], coords[1]);*/
        handle(coords[0], coords[1], field, data);
    }
});
