$(function() {


var model = {
  input_height: '',
  input_width: '',
  colorPicker: '#000'
};

var octupus = {
  updateGrid: function(height, width, color) {
    model.input_height = height;
    model.input_width = width;
    model.colorPicker = color;
  },

  getGrid: function() {
    var Grid = function (height, width, color) {
      this.height = height;
      this.width = width;
      this.color = color;
    }

    return new Grid(model.input_height, model.input_width, model.colorPicker);
  },

  init: function() {
    view.init();
  }
}

var view = {
  init: function() {
    $("#sizePicker").on("submit", function(){
      var input_height = $("#input_height").val();
      var input_width = $("#input_width").val();
      var colorPicker = $("#colorPicker").val();
      octupus.updateGrid(input_height, input_width, colorPicker);

      view.render();

      return false;
    });


  },

  render: function() {
    var Grid = octupus.getGrid();
    var row = "";
    for (var i = 0; i < Grid.height; i++) {
      row += "<tr>";
      for (var k = 0; k < Grid.width; k++) {
        row += "<td class='cell"+ i + "0" + k +"'></td>";
      }
      row += "</tr>";
    }
    $("#pixel_canvas tr").remove();
    $("#pixel_canvas").append(row);

    for (var i = 0; i < Grid.height; i++) {
      for (var k = 0; k < Grid.width; k++) {
        $("#pixel_canvas tr td").on("click", function(cb) {
          $("." + cb.target.className).css("background-color", Grid.color);
        });
      }
    }

  }

}


octupus.init();


});
