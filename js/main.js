var fft = require("fft-js").fft;
var fftUtil = require("fft-js").util;
var Chart = require("chart.js");

var ctx = document.getElementById("data-row").getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;
var row_data_chart = new Chart(ctx, json);

var ctx = document.getElementById("data-ana").getContext("2d");
ctx.canvas.width = 400;
ctx.canvas.height = 400;
var fft_data_chart = new Chart(ctx, fft_json);

var upload = document.getElementById("draw-graph");
var x = [];
var y = [];

upload.addEventListener("click", function() {
  var data = document.getElementById("upload-file");
  var data_content = data.files[0];

  var reader = new FileReader();
  reader.readAsText(data_content);
  reader.onload = function() {
    x = [];
    y = [];
    var value = reader.result;
    var word_list = value.split("\n");
    for (var i = 0; i < word_list.length - 1; i++) {
      var pair = word_list[i].split("\t");
      x.push(parseFloat(pair[0]) / 1000);
      y.push(parseFloat(pair[1]) * 1000);
    }
    analyze_data(x, y);
  };
});

$(function() {
  $("#slider").slider({
    min: -150,
    max: 0,
    slide: function(event, ui) {
      $("#slidervalue").html("value:" + ui.value);
      analyze_data(x, y, -ui.value);
    }
  });
});

function analyze_data(x, y, cut_size = 0) {
  json["data"]["labels"] = x.slice(0, x.length - cut_size);
  json["data"]["datasets"][0]["data"] = y.slice(0, y.length - cut_size);

  var padding_y = y.slice(0, y.length - cut_size);
  var times = 0;
  while (padding_y.length < 4096) {
    if (times % 2 == 0) {
      padding_y.unshift(0.0);
    } else {
      padding_y.push(0.0);
    }

    times++;
  }

  var delta_time = (6.0e-6 * 2) / 3.0e8;
  var sample_freq = 1 / delta_time;

  var phasors = fft(padding_y);
  var frequency = fftUtil.fftFreq(phasors, sample_freq),
    magnitude = fftUtil.fftMag(phasors);

  var upper_limit = 0;
  for (var i = 0; i < frequency.length; i++) {
    frequency[i] *= 1e-12;
    if (frequency[i] > 2.5) {
      break;
    }

    upper_limit++;
  }

  fft_json["data"]["labels"] = frequency.slice(0, upper_limit);
  fft_json["data"]["datasets"][0]["data"] = magnitude.slice(0, upper_limit);

  row_data_chart.update({duration:0});
  fft_data_chart.update({duration:0});
}
