<template>
  <div class="draggable" v-draggable="widgetOptions">
    <slot></slot>
  </div>
</template>

<script>
import jQuerryWidget from "@/mixins/jQuerryWidget";

export default {
  name: "Draggable",
  components: {},
  mixins: [ jQuerryWidget ],
  data() {
    return {
      functionsNames: ['create', 'drag', 'start', 'stop'], //имена функций, для которых возможно сделать переопределение
    }
  },
};
</script>

<style lang="css" scoped></style>
