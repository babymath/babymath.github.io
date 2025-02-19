// Start Playing Button
document.getElementById("start-playing").addEventListener("click", function () {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("second-screen").style.display = "flex";
});

// Disable Right Click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable Keyboard Shortcuts
document.addEventListener("keydown", function (e) {
    if (
        e.ctrlKey && (e.key === "u" || e.key === "U") || // CTRL+U
        e.key === "F12" || // F12
        e.ctrlKey && e.shiftKey && e.key === "I" || // CTRL+SHIFT+I
        e.ctrlKey && e.shiftKey && e.key === "J" || // CTRL+SHIFT+J
        e.ctrlKey && e.key === "S" || // CTRL+S
        e.ctrlKey && e.key === "P" // CTRL+P
    ) {
        e.preventDefault();
    }
});

// Disable Copy, Cut, Paste
document.addEventListener("copy", function (e) {
    e.preventDefault();
});
document.addEventListener("cut", function (e) {
    e.preventDefault();
});
document.addEventListener("paste", function (e) {
    e.preventDefault();
});

// Detect DevTools Open
setInterval(function () {
    function detectDevTools() {
        let before = new Date().getTime();
        debugger;
        let after = new Date().getTime();
        return after - before > 100;
    }

    if (detectDevTools()) {
        window.close();
        window.location.href = "about:blank";
    }
}, 1000);





if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log("Service Worker Registered:", reg))
    .catch(err => console.error("Registration Failed:", err));
}