<template>
  <div class="draggable" v-draggable="widgetOptions">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Draggable",
  components: {},
  props: {
    //настройки компонента для перемещения
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    //объект настроек, содержащий рефакторинг функций jQuerry UI под Vue.JS
    widgetOptions() {
      //копия оъекта настроек их входных данных
      const options = { ...this.options}
      //имена функций, для которых нужно провести рефакторинг
      const functionsNames = ['create', 'drag', 'start', 'stop']

      functionsNames.forEach(name => {
        options[name] = (event, ui) => {
          if (this.options[name]) {
            this.options[name]();
          }
          this.$emit(name, { event, ui });
        }
      })

      return options 
    },
  },
};
</script>

<style lang="css" scoped></style>
