// Disable Right-Click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Disable Text Selection & Copying
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("copy", (event) => event.preventDefault());

