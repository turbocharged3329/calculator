export default {
  props: {
    //настройки виджета
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    //объект настроек, содержащий рефакторинг функций jQuerry UI под VueJS
    widgetOptions() {
      //копия оъекта настроек их входных данных
      const options = { ...this.options };

      this.functionsNames.forEach((name) => {
        options.name = (event, ui) => {
          if (this.options.name) {
            this.options.name();
          }
          this.$emit(name, { event, ui });
        };
      });

      return options;
    },
  },
  mounted() {},
};
