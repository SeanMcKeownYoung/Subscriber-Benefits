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

const draggableElement = document.getElementById("draggableElement");
let isDragging = false;
let startX;

// 1. Listen for mousedown event to start dragging
draggableElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Record the starting horizontal position of the mouse
    startX = e.clientX;
    // Set cursor style while dragging
    draggableElement.style.cursor = 'grabbing';
});

// 2. Listen for mousemove event on the whole document
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Calculate how much the mouse has moved horizontally
    const dx = e.clientX - startX;
    
    // Get the element's current left position and add the change
    // Using offsetLeft provides the current position relative to the offsetParent
    let newLeft = draggableElement.offsetLeft + dx;

    // Optional: Restrict movement within the container boundaries
    const containerWidth = document.getElementById("container").offsetWidth;
    const elementWidth = draggableElement.offsetWidth;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > containerWidth - elementWidth) newLeft = containerWidth - elementWidth;

    // Update the element's horizontal position (moves right if dx is positive)
    draggableElement.style.left = newLeft + "px";
    
    // Update the starting X position for the next move event
    startX = e.clientX;
});

// 3. Listen for mouseup event on the whole document to stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
    draggableElement.style.cursor = 'grab';
});
