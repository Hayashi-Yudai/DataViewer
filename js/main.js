var upload = document.getElementById("draw-graph");

upload.addEventListener("click", function() {
  var data = document.getElementById("upload-file");
  var data_content = data.files[0];

  var reader = new FileReader();
  reader.readAsText(data_content);
  console.log(reader);
});
