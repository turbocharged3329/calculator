import $ from "jquery";
import "jquery-ui/ui/widgets/resizable";

const defaultOptions = {
  alsoResize: false,
  animate: false,
  animateDuration: "slow",
  animateEasimg: "swing",
  aspectRatio: false,
  autoHide: false,
  cancel: "input,textarea,button,select,option",
  calsses: {
    "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se",
  },
  containment: false,
  delay: 0,
  disabled: false,
  distance: 1,
  ghost: false,
  grid: false,
  handles: "e, s, se",
  helper: false,
  startWidth: 10,
  startHeight: 10,
  maxHeight: null,
  maxWidth: null,
  minHeight: 10,
  minWidth: 10,
  create: function (event, ui) {
    return { event, ui };
  },
  resize: function (event, ui) {
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
    //присваиваем элементу начальную ширину в зависимости от указанных минимальных значений сжатия
    el.style.width = `${options.minWidth > options.startWidth  ? options.minWidth :  options.startWidth}px`
    el.style.height = `${options.minHeight > options.startHeight  ? options.minHeight :  options.startHeight}px`
    $(el).resizable({
      ...options,
    });
  },
};
