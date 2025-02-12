document.addEventListener("DOMContentLoaded", function () {
    checkCSSFiles();
    checkJSFiles();
});

// Function to check if CSS files are loaded
function checkCSSFiles() {
    let stylesheets = document.styleSheets;
    let loadedCSS = [];

    for (let i = 0; i < stylesheets.length; i++) {
        try {
            if (stylesheets[i].href) {
                loadedCSS.push(stylesheets[i].href);
            }
        } catch (error) {
            console.error("Error loading CSS file:", stylesheets[i].href, error);
        }
    }

    if (loadedCSS.length > 0) {
        console.log("✅ CSS Files Loaded Successfully:", loadedCSS);
    } else {
        console.warn("⚠️ No CSS files loaded!");
    }
}

// Function to check if JS files are loaded
function checkJSFiles() {
    let scripts = document.getElementsByTagName("script");
    let loadedJS = [];

    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src) {
            loadedJS.push(scripts[i].src);
        }
    }

    if (loadedJS.length > 0) {
        console.log("✅ JS Files Loaded Successfully:", loadedJS);
    } else {
        console.warn("⚠️ No JS files loaded!");
    }
}