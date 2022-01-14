<template>
  <div 
  class="resizable" 
  v-resizable="widgetOptions"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Resizable",
  components: {},
  props: {
    //настройки компонента
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
      const options = { ...this.options}
      //имена функций, для которых нужно провести рефакторинг
      const functionsNames = ['create', 'resize', 'start', 'stop']

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
    startWidth() {
      return this.widgetOptions.startWidth + 'px'
    }
  },
  mounted() {
    console.log(this.widgetOptions);
  }
};
</script>

<style lang="css" scoped>
</style>
