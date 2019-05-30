var fft = require("fft-js").fft;
var fftUtil = require("fft-js").util;
var Chart = require("chart.js");
const fs = require('fs');

var ctx = document.getElementById("data-row").getContext("2d");
ctx.canvas.width = 350;
ctx.canvas.height = 300;
var row_data_chart = new Chart(ctx, json);

var ctx = document.getElementById("data-ana").getContext("2d");
ctx.canvas.width = 350;
ctx.canvas.height = 300;
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
      analyze_data(x, y, -ui.value, true);
    }
  });
});

function analyze_data(x, y, cut_size = 0, sliding=false) {
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

  frequency = frequency.slice(0, upper_limit);
  magnitude = magnitude.slice(0, upper_limit);

  fft_json["data"]["labels"] = frequency;
  fft_json["data"]["datasets"][0]["data"] = magnitude;
  if (!sliding) {
    var Max_intensity = Math.max.apply(null, magnitude);
    var Min_intensity = Math.min.apply(null, magnitude);

    var Max_order = Math.floor(Math.log10(Max_intensity));
    var Min_order = Math.floor(Math.log10(Min_intensity));

    var Max_value = Math.ceil(Max_intensity / Math.pow(10, Max_order)) * Math.pow(10, Max_order);
    var Min_value =(Math.floor(Min_intensity / Math.pow(10, Min_order))) * Math.pow(10, Min_order);
    console.log(Math.ceil(Max_intensity / Math.pow(10, Max_order)));
    fft_json['options']['scales']['yAxes'][0]['ticks']['max'] = Max_value;
    fft_json['options']['scales']['yAxes'][0]['ticks']['min'] = Min_value;
  }

  row_data_chart.update({duration:0});
  fft_data_chart.update({duration:0});
}

document.getElementById("choose-folder").addEventListener("change", ev => {
  let file = ev.target.files[0];
  let absPath = file.path;
  let filenames = fs.readdirSync(absPath);
  let table = document.getElementById("file-list");
  for (let i = 0; i < filenames.length; i++)
  {
    let path = fs.statSync(absPath + "\\" + filenames[i]);
    if(!path.isDirectory())
    {
      let str = filenames[i];
      if (str.indexOf('csv') == -1 && str.indexOf('pxp') == -1
      && str.indexOf('ipynb') == -1)
      {
        let f = "<li>" + filenames[i] + "</li>";
        table.insertAdjacentHTML("beforeend", f);
      }
    }
  }
});