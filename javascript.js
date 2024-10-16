const container = document.querySelector('.container');

// Adding Elements

const title = document.createElement("p");
const sketchContainer = document.createElement("div");
const leftDiv = document.createElement("div");
const rightDiv = document.createElement("div");
const gridContainer = document.createElement("div");
const rangeText = document.createElement("p");
const slider = document.createElement("input");
const colorText = document.createElement("p");
const colorPicker = document.createElement("input");
const color = document.createElement("button");
const rainbow = document.createElement("button");
const grid = document.createElement("button");
const eraser = document.createElement("button");
const clear = document.createElement("button");

// Positioning the Newly Added Elements

container.appendChild(title);
container.appendChild(sketchContainer);
sketchContainer.appendChild(leftDiv);
sketchContainer.appendChild(rightDiv);
leftDiv.appendChild(colorText);
leftDiv.appendChild(colorPicker);
leftDiv.appendChild(color);
leftDiv.appendChild(rainbow);
leftDiv.appendChild(grid);
leftDiv.appendChild(eraser);
leftDiv.appendChild(clear);
leftDiv.appendChild(rangeText);
leftDiv.appendChild(slider);
rightDiv.appendChild(gridContainer);

// Adding Classes to Elements

title.classList.add("title");
sketchContainer.classList.add("sketchContainer");
leftDiv.classList.add("leftDiv");
rightDiv.classList.add("rightDiv");
gridContainer.classList.add("gridContainer");
colorText.classList.add("colorText");
colorPicker.classList.add("colorPicker");
color.classList.add("color", "active");
rainbow.classList.add("rainbow");
grid.classList.add("grid");
eraser.classList.add("eraser");
clear.classList.add("clear");
rangeText.classList.add("rangeText");
slider.classList.add("slider");

// Adding Inner Texts

title.innerText = "Etch-a-Sketch";
color.innerText = "Solid Color";
rainbow.innerText = "Rainbow Color";
grid.innerText = "Disable Grid";
eraser.innerText = "Erase";
clear.innerText = "Clear";
rangeText.innerText = "16 x 16";

// Customizing the Color Picker

colorText.innerText = "Color Picker"

colorPicker.setAttribute('type', 'color');

// Customizing the Slider

slider.setAttribute('type', 'range');
slider.setAttribute('min', '1');
slider.setAttribute('max', '100');
slider.setAttribute('value', '16');

slider.oninput = function() {
    let size = this.value;
    rangeText.textContent = `${size} x ${size}`;
    createGrid(size);
    gridSetting();
}

// Creating Grid

function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('flexItem');
        gridContainer.appendChild(gridItem);
    }
    gridSetting();
}

// Initial Grid Creation

createGrid(slider.value);

// Functionalities for the Buttons

let currentMode = "color";

const buttons = document.querySelectorAll('button');
const flexItems = document.querySelectorAll('.flexItem');

buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.classList.contains('color')) {
            currentMode = 'color';
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        }
        else if (button.classList.contains('rainbow')) {
            currentMode = 'rainbow';
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        }
        else if (button.classList.contains('grid')) {
            gridSetting();
        }
        else if (button.classList.contains('eraser')) {
            currentMode = 'eraser';
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        }
        else if (button.classList.contains('clear')) {
            const flexItems = document.querySelectorAll('.flexItem');
            flexItems.forEach(item => {
                item.style.backgroundColor = 'white';
            });
        }
    })
})

// Function for Enabling/Disabling the Grid

function gridSetting() {
    const flexItems = document.querySelectorAll('.flexItem');

    if (grid.innerText === "Enable Grid") {
        grid.innerText = "Disable Grid";
        gridContainer.style.margin = "1px";
        flexItems.forEach(item => {
            item.classList.add('showGrid');
        });
    } else {
        grid.innerText = "Enable Grid";
        gridContainer.style.margin = "0";
        flexItems.forEach(item => {
            item.classList.remove('showGrid');
        });
    }
}

// Sketching in the Grid

let isSketching = false;

gridContainer.addEventListener("mousedown", startSketch);
gridContainer.addEventListener('mouseover', sketch);
document.addEventListener('mouseup', stopSketch);

function startSketch(e) {
    isSketching = true;
    sketch(e);
}

function sketch (e) {
    if (!isSketching) {
        return
    }
    if (e.target.classList.contains('flexItem')) {
        e.target.style.transition = 'background-color 0.3s ease-in-out';
        
        if (currentMode == 'color') {
            e.target.style.backgroundColor = colorPicker.value;
            e.target.dataset.opacity = 1;
        }
        else if (currentMode == 'rainbow') {
            e.target.style.backgroundColor = getRandomColor();
            e.target.dataset.opacity = 1;
        }
        else if (currentMode == 'eraser') {
            e.target.style.backgroundColor = "white";
        }
    }
}

function getRandomColor() {
    return `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
}

function stopSketch() {
    isSketching = false;
}