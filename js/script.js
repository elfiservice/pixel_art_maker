$(function() {


var model = {
  input_height: '',
  input_width: '',
  colorPicker: '#000'
};

var octupus = {
  setGrid: function(height, width) {
    model.input_height = height;
    model.input_width = width;
  },

  getGrid: function() {
    var Grid = function (height, width) {
      this.height = height;
      this.width = width;
    }

    return new Grid(model.input_height, model.input_width);
  },

  setColor: function(color) {
    model.colorPicker = color;
  },

  getColor: function() {
    return model.colorPicker;
  },

  init: function() {
    view.init();
  }
}

var view = {
  init: function() {
    view.changeColor();
    $("#sizePicker").on("submit", function(){
      var input_height = $("#input_height").val();
      var input_width = $("#input_width").val();
      octupus.setGrid(input_height, input_width);

      view.render();

      return false;
    });

    $("#colorPicker").on("change", function() {
      view.changeColor();
    });

  },

  changeColor: function() {
    var colorPicker = $("#colorPicker").val();
    octupus.setColor(colorPicker);
  },

  render: function() {
    var Grid = octupus.getGrid();
    var gridStructure = "";
    for (var i = 0; i < Grid.height; i++) {
      gridStructure += "<tr>";
      for (var k = 0; k < Grid.width; k++) {
        gridStructure += "<td class='cell"+ i + "0" + k +"'></td>";
      }
      gridStructure += "</tr>";
    }
    $("#pixel_canvas tr").remove();
    $("#pixel_canvas").append(gridStructure);

    for (var i = 0; i < Grid.height; i++) {
      for (var k = 0; k < Grid.width; k++) {
        $("#pixel_canvas tr td").on("click", function(cb) {
          $("." + cb.target.className).css("background-color", octupus.getColor());
        });
      }
    }

  }
}

octupus.init();

});
