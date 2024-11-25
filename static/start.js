const oneDeviceButton = document.getElementById("oneDevice");
const createRoomButton = document.getElementById("createRoom");
const joinRoomButton = document.getElementById("joinRoom");
let codeRoom;

async function createRoom() {
    try {
        const response = await fetch('/request_create_room', {method: 'GET'});
        if (response.ok){
            window.location.href = '/create-room';
        }
        else {
            console.log("чет не ок")
        }
    } catch (error) {
        console.log("error: ", error)
    }
}

async function joinRoom() {
    try {
        const response = await fetch('/request_room', {method: 'GET'});
        if (response.ok){
            window.location.href = '/room';
        }
        else {
            console.log("чет не ок")
        }
    } catch (error) {
        console.log("error: ", error)
    }
}

console.log("script started");
joinRoomButton.addEventListener("click", joinRoom);
createRoomButton.addEventListener("click", createRoom);
