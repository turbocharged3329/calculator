import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";

const defaultOptions = {
  addClasses: true,
  appendTo: "parent",
  axis: false,
  cancel: "input,textarea,button,select,option",
  classes: {},
  connectToSortable: false,
  containment: false,
  cursor: "auto",
  cursorAt: false,
  delay: 0,
  disabled: false,
  distance: 1,
  grid: false,
  handle: false,
  helper: "original",
  iframeFix: false,
  opacity: false,
  refreshPositions: false,
  revert: false,
  revertDuration: 500,
  scope: "default",
  scroll: true,
  scrollSensitivity: 20,
  scrollSpeed: 20,
  snap: false,
  snapMode: "both",
  snapTolerance: 20,
  stack: false,
  zIndex: false,
  create: function (event, ui) {
    return { event, ui };
  },
  drag: function (event, ui) {
    return { event, ui };
  },
  start: function (event, ui) {
    return { event, ui };
  },
  stop: function (event, ui) {
    return { event, ui };
  },
};

export default {
  bind: function (el, binding) {
    let options = binding.value;

    options = !options
      ? defaultOptions
      : {
          ...defaultOptions,
          ...binding.value,
        };

    $(el).draggable({
        ...options
    });

    el.disableDrag = function (isDisabled) {
      $(el).draggable("option", "disabled", isDisabled);
    };
  },
};
