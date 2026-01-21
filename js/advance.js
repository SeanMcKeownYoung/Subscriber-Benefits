var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

const modal = document.getElementById('draggable-modal');
let isDragging = false;
let startY;
let initialTop;
const CLOSE_THRESHOLD = 100; // Pixels to drag down to close

function closeModal() {
    modal.style.display = 'none';
}

modal.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    // Get current top position, parse as integer, or default to 0 if not set
    initialTop = parseInt(modal.style.top) || 50; 
    modal.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startY;
    // Move the modal by updating its 'top' position
    modal.style.top = `${initialTop + deltaY}px`;
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    modal.style.cursor = 'grab';

    const currentTop = parseInt(modal.style.top);
    // Check if the drag distance exceeds the threshold
    if (currentTop > (initialTop + CLOSE_THRESHOLD)) {
        closeModal();
    } else {
        // If not closed, return to the original position
        modal.style.top = `${initialTop}px`;
    }
});
