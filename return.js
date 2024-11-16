const returnButton = document.getElementById("return") ;

async function returnToStart() {
    try {
        const response = await fetch('/request_start', {method: 'GET'});
        if (response.ok){
            window.location.href = '/';
        }
        else {
            console.log("чет не ок")
        }
    } catch (error) {
        console.log("error: ", error)
    }
}

console.log("script return started");
returnButton.addEventListener("click", returnToStart);