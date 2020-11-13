// @ts-nocheck
var colorCanvas = document.getElementById("colorCanvas");
var context = colorCanvas.getContext("2d");
var colorGradient = { 0: 'rgba(100,255,51,1)', 0.167: 'rgba(153,255,51,1)', 0.333: 'rgba(204,255,51,1)', 0.5: 'rgba(255,255,71,0.8)', 0.667: 'rgba(255,250,150,1', 0.833: 'rgba(255,187,102,0.9)', 1: 'rgba(255,119,68,0.9)' };
var sortNumber = function (a, b) {
  return a - b;
};
var Picker = function () {
  this.range = [50, 100, 150, 200, 300];
  this.drawColor = function () {
    var grad = context.createLinearGradient(0, 0, colorCanvas.width, colorCanvas.height);
    for (var gradient in colorGradient) {
      grad.addColorStop(gradient, colorGradient[gradient]);
    }
    context.fillStyle = grad;
    context.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
  };
  this.drawRange = function () {
    var rangeCanvas = document.getElementById("rangeCanvas");
    var width = rangeCanvas.width;
    var ctx = rangeCanvas.getContext("2d");
    var len = this.range.length;
    var maxValue = this.range.sort(sortNumber)[len - 1];//数组最大value
    ctx.drawLine = function (beginX, beginY, endX, endY) {
      this.moveTo(beginX, beginY);
      this.lineTo(endX, endY);
    };
    ctx.fillText("0", 0, 14);
    ctx.save();
    ctx.translate(0.5, 0.5); //消除锯齿
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.drawLine(0, 0, 0, 4); //第一个刻度
    for (var i = 0; i < len - 1; i++) {
      var px = Math.round(width * this.range[i] / maxValue);
      ctx.fillText(this.range[i], px - 8, 14);
      ctx.drawLine(px, 0, px, 4);
    }
    var endPx = Math.round(width * this.range[len - 1] / maxValue);
    ctx.fillText(this.range[len - 1], endPx - 18, 14);
    ctx.drawLine(endPx - 1, 0, endPx - 1, 4); //最后一个刻度
    ctx.stroke();
  };
  this.drawCircle = function (point, color) {
    context.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
    this.drawColor();
    context.beginPath();
    context.arc(point.X, point.Y, 2, 0, 360, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "#000";
    context.stroke();
    context.save();
    context.closePath();
  };
  this.d2Hex = function (d) {
    // Converts a decimal number to a two digit Hex value
    var hex = Number(d).toString(16);
    while (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex.toUpperCase();
  };
  this.getRgbColor = function (point) {
    var imageData = context.getImageData(0, 0, colorCanvas.width, colorCanvas.height);
    var data = imageData.data;
    var i = ((point.Y * colorCanvas.width) + point.X) * 4;
    var rgb = [], color = '#', objRgbColor = { "rgb": rgb, "color": color };
    for (var j = 0; j < 3; j++) {
      rgb.push(data[i + j]);
      color += this.d2Hex(data[i + j]);
    }
    objRgbColor.color = color;
    return objRgbColor;
  };
  this.getIntOffset = function (e) {
    var evt = e || window.event;
    var srcObj = evt.target || e.srcElement;
    if (e.offsetX) {
      return { X: parseInt(e.offsetX), Y: parseInt(e.offsetY) };
    } else {
      var rect = srcObj.getBoundingClientRect();
      return { X: parseInt(e.clientX - rect.left), Y: parseInt(e.clientY - rect.top) };
    }
  };
  this.getValue = function (point) {
    return Math.round(this.range[this.range.length - 1] * point.X / colorCanvas.width);
  };
  this.setColor = function (point) {
    var objRgbColor = this.getRgbColor(point);
    var rgb = "rgb(" + objRgbColor.rgb.join(",") + ")";
    this.drawCircle(point, objRgbColor.color);
    document.getElementsByClassName("canvas-selColor")[0].style.background = rgb;
    console.log(rgb)
    document.getElementById("colorValue").value = this.getValue(point);
    document.getElementById("position").value = point.X + "," + point.Y;
    document.getElementById("rgb").value = rgb;
    document.getElementById("color").value = objRgbColor.color;
  };
};
var initPicker = function () {
  var picker = new Picker();
  picker.drawColor();
  picker.drawRange();
  colorCanvas.onclick = function (e) {
    var point = picker.getIntOffset(e);
    picker.setColor(point);
  }
  // picker.onchange = 
}

export default initPicker