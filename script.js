var canvas = document.getElementById("graphCanvas");
var ctx = canvas.getContext("2d");
const width = 300;
const height = 250;
const pixelRatio = window.devicePixelRatio || 1;
const scale = 2;

var values=[0];
var names=[0];
var marginAbove = 0.2;
var marginBelow = 0.1;
var marginLeft = 0.1;
var marginRight = 0.1;


axisWidth =2;
originX = width*marginLeft;
originY = height*(1-marginBelow);
yAxisTop = height*(marginAbove);
xAxisMax = width*(1-marginRight);

canvas.width = scale * width * pixelRatio;
canvas.height = scale * height * pixelRatio;

canvas.style.width = `${scale * width}px`;
canvas.style.height = `${scale * height}px`;

ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

ctx.scale(scale * pixelRatio, scale * pixelRatio);

function init(){
  draw();
}

bars=1;
function CreateRow() {
  bars++;
  var table = document.getElementById("myTable");
  var row = table.insertRow(bars);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = "Bar "+bars;
  cell2.innerHTML = "<input>";
  cell3.innerHTML = "<input>";
}

function DeleteRow() { 
  if(bars!=0){
  document.getElementById("myTable").deleteRow(bars);
  bars--;
}
}

setInterval(function(){ 
  ctx.clearRect(0, 0, width, height);
  draw(); 
}, 100);

function draw(){
  drawBars();
  drawAxis();
  getValues();
  axisNumbers();
}

function getColour(){
  var e = document.getElementById("colours");
  return e.options[e.selectedIndex].text;
}

function getValues(){
    var table = document.getElementById('myTable');
    for (var r =1, n = table.rows.length; r < n; r++) {
            values[r]=table.rows[r].cells[2].children[0].value;
            names[r-1] =table.rows[r].cells[1].children[0].value;
   }
}


function axisNumbers(){
  max=Math.max.apply(null, values);
  numberOfPoints=5;
  for(i=0;i<numberOfPoints;i++){
    ctx.font = "10px futura";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText((max-i*max/(numberOfPoints)).toFixed(2),originX-12,(yAxisTop+5)+i*(originY-yAxisTop)/numberOfPoints);
  }
  ctx.fillText("0",originX-5,originY+5);
}


function drawBars(){
 color=getColour();
 ctx.strokeStyle = color; 
 ctx.fillStyle = color; 
for(i=0;i<bars;i++){
  if(values[i+1]!=0){
    axisLength=xAxisMax-originX;
    barWidth=(axisLength)/(2*bars);
    gap=(axisLength-bars*barWidth)/(bars+1);
    percentage=values[i+1]/Math.max.apply(null, values);

    var rectHeight = (height*(1-marginAbove-marginBelow))*(percentage);
    var cornerRadius = 0;//4/bars;

    console.log("rectHeight");

    var rectX = originX+gap*(i+1)+(i*barWidth);
    var rectY = height-rectHeight-height*marginBelow;

    //bar tags
    ctx.font = "10px futura";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(names[i],rectX+barWidth/2,originY+15);

    // Set rounded corners
    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;
    ctx.fillStyle = color; 
    // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
    ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), barWidth-cornerRadius, rectHeight-cornerRadius);
    ctx.fillRect(rectX,rectY+(cornerRadius/2), barWidth, rectHeight);
    
    }
}
}

function drawAxis(){
  ctx.font = "20px futura";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(document.getElementById("chartName").value,width/2,30);
  ctx.lineWidth = axisWidth;
  ctx.strokeStyle = "#BEBEBE"; 
  

  //top x,y
  ctx.moveTo(originX,yAxisTop);
  //origin
  ctx.lineTo(originX,originY);
  //right x,y
  ctx.lineTo(xAxisMax,originY);
  ctx.stroke();
}

function download_image(){
  var canvas = document.getElementById("graphCanvas");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}