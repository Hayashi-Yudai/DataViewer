var ctx = document.getElementById("data-ana").getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;
var myChart = new Chart(ctx, json);