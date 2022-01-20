<template>
  <div 
  class="resizable" 
  v-resizable="widgetOptions"
  >
    <slot></slot>
  </div>
</template>

<script>
import jQuerryWidget from "@/mixins/jQuerryWidget";

export default {
  name: "Resizable",
  mixins: [ jQuerryWidget ],
  data() {
    return {
      functionsNames: ['create', 'resize', 'start', 'stop'], //имена функций, для которых возможно сделать переопределение
    }
  },
  computed: {
    startWidth() {
      return this.widgetOptions.startWidth + 'px'
    }
  },
};
</script>

<style lang="css" scoped>
</style>
