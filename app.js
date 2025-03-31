let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 0;  // Start at the first item (index 0)
let leftTransform = 0;
let width_item = items[0].offsetWidth; // Dynamically get the width of the items

// Adjust the transform and active item index properly
next.onclick = () => {
    if (active < count - 1) {
        active++;
    } else {
        active = 0; // Loop back to the first item
    }
    runCarousel();
}

prev.onclick = () => {
    if (active > 0) {
        active--;
    } else {
        active = count - 1; // Loop back to the last item
    }
    runCarousel();
}

function runCarousel() {
    // Show or hide the buttons based on the current active index
    prev.style.display = (active === 0) ? 'none' : 'block';  // Hide prev button at the first item
    next.style.display = (active === count - 1) ? 'none' : 'block';  // Hide next button at the last item

    // Remove 'active' class from the previous active item
    let old_active = document.querySelector('.item.active');
    if (old_active) old_active.classList.remove('active');

    // Add 'active' class to the current item
    items[active].classList.add('active');

    // Recalculate the width of the items (in case of dynamic resizing)
    width_item = items[0].offsetWidth;  // Use the width of the first item for consistency
    leftTransform = width_item * active * -1; // Adjust transform according to the active index

    // Apply the transform to move the list
    list.style.transition = 'transform 0.8s ease-in-out';  // Smooth transition
    list.style.transform = `translateX(${leftTransform}px)`;
}

// Initialize the carousel and set initial transform position
function initializeCarousel() {
    // Initially, we set the active class on the first item
    items[active].classList.add('active');
    list.style.transform = `translateX(${leftTransform}px)`; // Set the correct starting position
}

initializeCarousel();  // Initialize the carousel

// Set Text on the Circle
let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan = document.createElement("span");
    newSpan.innerText = value;
    let rotateThisSpan = (360 / textCircle.length) * (key + 1);
    newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
    circle.appendChild(newSpan);
});
