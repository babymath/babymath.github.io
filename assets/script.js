document.addEventListener("DOMContentLoaded", function () {
    function moveBubble(bubble) {
        const x = Math.random() * window.innerWidth * 0.8;
        const y = Math.random() * window.innerHeight * 0.6;

        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
    }

    function createBubble(x, y, size) {
        if (size < 10) return;

        const newBubble = document.createElement("img");
        newBubble.src = "assets/bubble.png";
        newBubble.classList.add("bubble");
        newBubble.style.width = `${size}px`;
        newBubble.style.height = `${size}px`;
        document.body.appendChild(newBubble);

        newBubble.style.left = `${x}px`;
        newBubble.style.top = `${y}px`;

        moveBubble(newBubble);

        newBubble.addEventListener("click", function () {
            splitBubble(newBubble);
        });

        setInterval(() => moveBubble(newBubble), 3000);
    }

    function splitBubble(bubble) {
        const rect = bubble.getBoundingClientRect();
        const newSize = bubble.clientWidth / 2;

        createBubble(rect.left, rect.top, newSize);
        createBubble(rect.left + 20, rect.top + 20, newSize);

        bubble.classList.add("shrink");
        setTimeout(() => bubble.remove(), 300);
    }

    const initialBubble = document.querySelector(".bubble");
    initialBubble.addEventListener("click", function () {
        splitBubble(initialBubble);
    });

    setInterval(() => moveBubble(initialBubble), 3000);
});
