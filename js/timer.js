let startTime = sessionStorage.getItem("startTime");
let navigationType = performance.getEntriesByType("navigation")[0].type;

if (!startTime || navigationType === 1) {
    startTime = Date.now();
    sessionStorage.setItem("startTime", startTime);
    sessionStorage.removeItem("elapsedTime");
}

window.addEventListener("beforeunload", () => {
    if (navigationType !== 1) {
        sessionStorage.setItem("elapsedTime", Date.now() - parseInt(startTime));
    }
});

const elapsedTime = parseInt(sessionStorage.getItem("elapsedTime")) || 0;
setInterval(() => {
    const totalTime = Date.now() - parseInt(startTime);
    const hours = Math.floor(totalTime / 3600000)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((totalTime % 3600000) / 60000)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor((totalTime % 60000) / 1000)
        .toString()
        .padStart(2, "0");
    document.getElementById(
        "timer"
    ).textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);
