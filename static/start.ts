const oneDeviceButton = document.getElementById("oneDevice") as HTMLButtonElement;
const createRoomButton = document.getElementById("createRoom") as HTMLButtonElement;
const joinRoomButton = document.getElementById("joinRoom") as HTMLElement;
let codeRoom;

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