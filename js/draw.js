var Chart = require("chart.js");

var ctx = document.getElementById("data-row").getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;
var row_data_chart = new Chart(ctx, json);

var ctx = document.getElementById("data-ana").getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;
var fft_data_chart = new Chart(ctx, fft_json);