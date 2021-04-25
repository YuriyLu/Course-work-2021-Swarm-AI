const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d");
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

canvas.addEventListener("mousemove", setMousePosition, false);

let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;

function getPosition(el) {
  let xPosition = 0;
  let yPosition = 0;

  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.arc(mouseX, mouseY, 50, 0, 2 * Math.PI, true);
  context.fillStyle = "#FF6A6A";
  context.fill();
}
