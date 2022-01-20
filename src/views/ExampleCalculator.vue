<template>
  <div class="example-calculator">
    <button @click.prevent.stop="showCalc">Toggle Calc Visibility</button>
    <draggable  
      :options="{
        handle: '.calculator__header',
      }">
      <calculator :shown="isShownCalc" @hide="isShownCalc = false" />
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
  data() {
    return {
      isShownCalc: false,
    }
  },
  methods: {
    showCalc() {
      this.isShownCalc = true
    }
  }
}
</script>

<style lang="css" scoped></style>
