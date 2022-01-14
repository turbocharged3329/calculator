<template>
  <div id="app">
    <Draggable :options="{
      handle: '.calculator__header'
    }">
      <!-- <Resizable :options="{
        startWidth: 200,
        minWidth: 150,
        startHeight: 200,
        minHeight: 150,
        animate: true
      }"> -->
        <Calculator />
        <!-- <div class="test"></div>
      </Resizable> -->
    </Draggable>
  </div>
</template>

<script>
import Calculator from "@/components/Calculator";
import Draggable from "@/components/Draggable";
// import Resizable from "./components/Resizable";

export default {
  name: "App",
  components: {
    Calculator,
    Draggable,
    // Resizable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100vh;
}
.test {
  display: block;
  border: 1px solid black;
  background: #11ddaa;
  width: 100%;
  height: 100%;
}
</style>
