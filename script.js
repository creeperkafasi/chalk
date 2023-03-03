const colors = [
    '--chalk-white',
    '--chalk-red',
    '--chalk-blue',
    '--chalk-green',
    '--chalk-yellow',
    '--chalk-orange',
    '--chalk-brown',
    '--chalk-purple',
    '--chalk-pink',
    '--chalk-grey'
];

const colormap = colors.map(colorvar => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(colorvar);
});


const cursor = document.getElementById('cursor');

//smooth follow mouse
document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

//change color on click
document.addEventListener('click', e => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.setProperty('--selected-color', `var(${randomColor})`);
    ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue(randomColor);
});




const canvas = document.getElementById('draw');

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'white';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

let isDrawing = false;

let eraser = false;

let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    console.log(e.target);
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    if(eraser){
        ctx.clearRect(e.clientX - 50, e.clientY - 100, 100, 200);
        return;
    }
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    lastX = e.clientX;
    lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
    // ctx.stroke();
});

document.getElementById('selector').addEventListener('click', (e) => {
    eraser = document.getElementById("cursor").dataset.selected == "1";
});