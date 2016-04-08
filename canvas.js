
var canvas;
var context;
var canvasWidth = 400;
var canvasHeight = 500;
var radio = 3;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var num = new Array();
var paint = false;
var outlineImage = new Image();
var drawingAreaX = canvasWidth/4;
var drawingAreaY = 10;
var drawingAreaWidth = 209;
var drawingAreaHeight = 416;
function prepareCanvas() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e)
    {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mouseup(function (e) {
        paint = false;
    });

    $('#canvas').mouseleave(function (e) {
        paint = false;
    });
    outlineImage.src = "silueta.png";
    outlineImage.onload = checkImage;
}
function checkImage(){
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}
function addClick(x, y)
{
    clickX.push(x);
    clickY.push(y);

}

function redraw()
{
    context.strokeStyle = "black";
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    for (var i = 0; i < clickX.length; i++)
    {
        num[i] = i+1;
        context.beginPath();
        context.moveTo(clickX[i]-1, clickY[i]);
        context.fillStyle = 'black';
        context.arc(clickX[i],clickY[i],radio,0,(Math.PI * 2),false);
        context.fill();
        context.closePath();
        context.stroke();
        context.beginPath();
        context.font = '14px Arial';
        context.fillStyle = 'red';
        context.fillText(""+num[i], clickX[i], clickY[i]);
        context.closePath();
    }
}
function clearCanvas()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    checkImage();
    clickX = [];
    clickY = [];
    clickDrag = [];
}

