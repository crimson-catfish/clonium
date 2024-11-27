console.log("script started");

const canvas = new fabric.Canvas('c1');

let blueCell2 = createBlueCell(135, 15);
blueCell2 = addText(blueCell2, '2');
let blueCell3 = createBlueCell(135, 15);
blueCell3 = addText(blueCell3, '3');
let blueCell4 = createBlueCell(135, 15);
blueCell4 = addText(blueCell4, '4');
add(blueCell4);
add(blueCell3);
add(blueCell2);

let redCellT = createRedCell(535, 15);
redCellT = addText(redCellT, 'Треугольник');
let redCellS = createRedCell(535, 15);
redCellS = addText(redCellS, 'Квадрат');
let redCellH = createRedCell(535, 15);
redCellH = addText(redCellH, 'Гексагон');
add(redCellH);
add(redCellS);
add(redCellT);

let greenCell = createGreenCell(335, 180);
greenCell = addText(greenCell, 'Начать игру');
let greenCellN = createGreenCell(335, 180);
greenCellN = addText(greenCellN, 'Выберите\n   число\n  игроков');
let greenCellF = createGreenCell(335, 180);
greenCellF = addText(greenCellF, 'Выберите\n   форму\n     поля');
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

function getSettings(numberOfPlayers, formOfField) {
    return {numberOfPlayers: numberOfPlayers, formOfField:formOfField};
}

let flagSelectedBlue = true;
let flagSelectedRed = true;
let flagGreenN = false;
let flagGreenF = false;
let numberOfPlayers = 2;
let formOfField = 'triangle';

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
                numberOfPlayers = 2;
            }
            else if (e.target == blueCell3) {
                setPriority3(blueCell3, blueCell2, blueCell4);
                flagSelectedBlue = true;
                numberOfPlayers = 3;
            }
            else if (e.target == blueCell4) {
                setPriority3(blueCell4, blueCell3, blueCell2);
                flagSelectedBlue = true;
                numberOfPlayers = 4;
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
                formOfField = 'triangle';
            }
            else if (e.target == redCellS) {
                setPriority3(redCellS, redCellT, redCellH);
                flagSelectedRed = true;
                formOfField = 'square';
            }
            else if (e.target == redCellH) {
                setPriority3(redCellH, redCellS, redCellT);
                flagSelectedRed = true;
                formOfField = 'hexagon';
            }
        }
    }
    else if (e.target && e.target == greenCell) {
        if (flagSelectedBlue && flagSelectedRed) {
            sendSettingsAndGo(getSettings(numberOfPlayers, formOfField));
        }
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

async function sendSettingsAndGo(data) {
    try {
        const response = await fetch('/request_room_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = (await response.json());
        room_code = result.room_code;
        window.location.href = `/create-room/${room_code}`;
    } catch (error) {
        alert('Упс! Что-то пошло не так');
    }
}
