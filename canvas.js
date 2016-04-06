
var canvas;
var context;
var canvasWidth = 400;
var canvasHeight = 400;
var padding = 25;
var lineWidth = 8;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint = false;
var outlineImage = new Image();
var drawingAreaX = 111;
var drawingAreaY = 11;
var drawingAreaWidth = 300;
var drawingAreaHeight = 386;
function prepareCanvas() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {

        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });
    $('#canvas').mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    $('#canvas').mouseup(function (e) {
        paint = false;
    });

    $('#canvas').mouseleave(function (e) {
        paint = false;
    });
    outlineImage.src = "cuerpo.png";
    outlineImage.onload = checkImage;
}
function checkImage(){
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}
function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw()
{

    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 10;
    clearCanvas();
    //context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    for (var i = 0; i < clickX.length; i++)
    {
        context.beginPath();
        context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
        if(clickDrag[i] && i)
        {
            context.moveTo(clickX[i-1], clickY[i-1]);
        }
        else
        {
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        //context.lineTo(clickX[i],clickY[i]);
        context.arc(clickX[i],clickY[i],2,0,(Math.PI * 2),false);
        context.closePath();
        context.stroke();
    }

}
function clearCanvas()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}
