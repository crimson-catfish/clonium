const createRoomButton = document.getElementById("createRoomButton") as HTMLButtonElement;
const joinRoomButton = document.getElementById("joinRoomButton") as HTMLButtonElement;
const roomCodeDisplay = document.getElementById("roomCodeDisplay") as HTMLElement;
const roomCodeElement = document.getElementById("roomCode") as HTMLElement;
const joinRoomCodeInput = document.getElementById("joinRoomCode") as HTMLInputElement;
const statusMessage = document.getElementById("statusMessage") as HTMLElement;

async function createRoom() {
    try {
        const response = await fetch('/create-room', {method: 'POST'});
        const data = await response.json();

        if (data && data.roomCode) {
            roomCodeElement.textContent = data.roomCode;
            roomCodeDisplay.style.display = 'block';
            statusMessage.textContent = "Room created successfully!";
        } else {
            throw new Error("Failed to create room.");
        }
    } catch (error) {
        statusMessage.textContent = "Error creating room. Please try again.";
    }
}

async function joinRoom() {
    const roomCode = joinRoomCodeInput.value.trim();

    if (!roomCode || roomCode.length !== 6) {
        statusMessage.textContent = "Please enter a valid 6-character room code.";
        return;
    }

    try {
        const response = await fetch(`/room/${roomCode}`, {method: 'POST'});
        const data = await response.json();

        if (data.success) {
            statusMessage.textContent = `Successfully joined room: ${roomCode}`;
        } else {
            statusMessage.textContent = `Failed to join room: ${roomCode}. Please check the code.`;
        }
    } catch (error) {
        statusMessage.textContent = "Error joining room. Please try again.";
    }
}

joinRoomButton.addEventListener("click", joinRoom);
createRoomButton.addEventListener("click", createRoom);
