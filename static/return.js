const returnButton = document.getElementById("return") ;

async function returnToStart() {
    try {
        window.location.href = '/';
    } catch (error) {
        console.log("error: ", error)
    }
}

console.log("script return started");
returnButton.addEventListener("click", returnToStart);