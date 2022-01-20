<template>
  <div class="example-keyboard-input">
    <draggable>
      <keyboard-input :maxlength="10"/>
    </draggable>
  </div>
</template>

<script>
import KeyboardInput from "@/components/KeyboardInput"
import Draggable from "@/components/Draggable";

export default {
  name: 'ExampleKeyboardInput',
  components: {
    KeyboardInput,
    Draggable
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="css" scoped></style>
