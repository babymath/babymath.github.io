// Toggle Button Functionality
const toggleButton = document.getElementById('toggleView');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    content.classList.toggle('list-view');

    if (content.classList.contains('list-view')) {
        toggleButton.textContent = 'Switch to Gallery View';
    } else {
        toggleButton.textContent = 'Switch to List View';
    }
});
