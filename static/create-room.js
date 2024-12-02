console.log("script started");

const canvas = new fabric.Canvas('c1');

let blueCell2 = createCellWithText(135, 15, 'blue', '2');
let blueCell3 = createCellWithText(135, 15, 'blue', '3');
let blueCell4 = createCellWithText(135, 15, 'blue', '4');
add(blueCell4);
add(blueCell3);
add(blueCell2);

let redCellT = createCellWithText(535, 15, 'red', 'Треугольник');
let redCellS = createCellWithText(535, 15, 'red', 'Квадрат');
let redCellH = createCellWithText(535, 15, 'red', 'Гексагон');
add(redCellH);
add(redCellS);
add(redCellT);

let greenCell = createCellWithText(335, 180, 'green', 'Начать игру');
let greenCellN = createCellWithText(335, 180, 'green', 'Выберите\n   число\n  игроков');
let greenCellF = createCellWithText(335, 180, 'green', 'Выберите\n   форму\n     поля');
add(greenCellF);
add(greenCellN);
add(greenCell);

canvas.on('mouse:over', function(e) {
    if (e.target && e.target != greenCellN && e.target != greenCellF) {
        if (e.target == greenCell && (!flagSelectedBlue || !flagSelectedRed)) {}
        else {
            e.target.set('shadow', createShadow('black', 10));
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
            doAnimation(blueCell2, -110, 0);
            doAnimation(blueCell3, 0, 110);
            doAnimation(blueCell4, 110, 0);
            flagSelectedBlue = false;
        }
        else {
            doAnimation(blueCell2, 110, 0);
            doAnimation(blueCell3, 0, -110);
            doAnimation(blueCell4, -110, 0);
            if (flagGreenN) {
                doAnimation(greenCellN, 0, -110);
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
            doAnimation(redCellT, -110, 0);
            doAnimation(redCellS, 0, 110);
            doAnimation(redCellH, 110, 0);
            flagSelectedRed = false;
        }
        else {
            doAnimation(redCellT, 110, 0);
            doAnimation(redCellS, 0, -110);
            doAnimation(redCellH, -110, 0);
            if (flagGreenF) {
                doAnimation(greenCellF, 0, -110);
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
            doAnimation(greenCellN, 0, 110);
            flagGreenN = true;
        }
        if (!flagSelectedRed && !flagGreenF && !flagGreenN) {
            doAnimation(greenCellF, 0, 110);
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
