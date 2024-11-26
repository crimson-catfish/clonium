const oneDeviceButton = document.getElementById("oneDevice");
const createRoomButton = document.getElementById("createRoom");
const joinRoomButton = document.getElementById("joinRoom");

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

console.log("script start started");
joinRoomButton.addEventListener("click", joinRoom);
createRoomButton.addEventListener("click", createRoom);