<template>
  <div class="example-calculator">
    <button @click.prevent.stop="isShownCalc = true">
    Toggle Calc Visibility
    </button>
    <draggable  
      :options="{
        handle: '.calculator__header',
      }">
      <calculator 
      v-if="isShownCalc" 
      @hide="isShownCalc = $event"
      />
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
}
</script>

<style lang="css" scoped></style>
