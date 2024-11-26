const oneDeviceButton = document.getElementById("oneDevice");
const createRoomButton = document.getElementById("createRoom");
const joinRoomButton = document.getElementById("joinRoom");
let codeRoom;

fetch('http://127.0.0.1:5000/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: "Ваня"})
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })
    .catch((error) => {
    console.error('Ошибка:', error);
    });

async function createRoom() {
    try {
            window.location.href = '/create-room';
    } catch (error) {
        console.log("error: ", error)
    }
}

async function joinRoom() {
    try {
            window.location.href = '/room';
    } catch (error) {
        console.log("error: ", error)
    }
}

console.log("script started");
joinRoomButton.addEventListener("click", joinRoom);
createRoomButton.addEventListener("click", createRoom);