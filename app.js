const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 그릴선이 가지는 색
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5; // 선의 너비 2.5

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();    // 클릭하지 않고 마우스를 움직였을때  Path(선)를 시작 
        ctx.moveTo(x, y);   // Path를 만들면 마우스의 x,y 좌표로 path를 옮김
    } else {
        ctx.lineTo(x, y);
        ctx.stroke(); // 획을 긋는것
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // strokeStyle을 override하고 strokeStyle이 target에 있는 색상이 됨
    ctx.fillStyle = color; // 누군가가 color을 선택하면 strokeStyle 과 fillStyle 을 color 값으로 설정함
}

function handleRangeChange(event) {
   const size = event.target.value;
   ctx.lineWidth = size;  // lineWidth를 override하여 linewidth가 target의 사이즈가 됨
}

function hanldleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(event) {
    event.preventDefault()  // 우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);   // 사용자가 요소를 마우스오른쪽 단추로 클릭해 메뉴를 열 때 발생.
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range) {
   range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", hanldleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}