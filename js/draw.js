function draw_graph(cvs, data) {
  var ctx = document.getElementById(cvs).getContext("2d");
  ctx.canvas.width = 400;
  ctx.canvas.height = 400;

  var myChart = new Chart(ctx, data);
}
