<template>
  <div class="example-calculator">
    <draggable  
      :options="{
        handle: '.calculator__header',
      }">
      <calculator :hidden="false" />
    </draggable>
  </div>
</template>

<script>
import Draggable from "@/components/Draggable";
import Calculator from "@/components/Calculator";

export default {
  name: 'ExampleCalc',
  components: {
    Draggable,
    Calculator,
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="css" scoped></style>
