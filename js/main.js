var upload = document.getElementById("draw-graph");

upload.addEventListener("click", function() {
  var x = [];
  var y = [];
  var data = document.getElementById("upload-file");
  var data_content = data.files[0];

  var reader = new FileReader();
  reader.readAsText(data_content);
  reader.onload = function () {
    var value = reader.result;
    var word_list = value.split('\n');
    for (var i = 0; i < word_list.length - 1; i++){
      var pair = word_list[i].split('\t');
      x.push(parseFloat(pair[0])/1000);
      y.push(parseFloat(pair[1])*1000);

    json["data"]["labels"] = x;
    json["data"]["datasets"][0]["data"] = y;
    }

    draw_graph();
  }
});