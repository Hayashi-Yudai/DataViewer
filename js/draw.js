function draw_graph(){
    var ctx = document.getElementById("data-row").getContext("2d");
    ctx.canvas.width = 400;
    ctx.canvas.height = 400;

    var myChart = new Chart(ctx, json);
}