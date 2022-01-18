<template>
  <div class="keyboard-input">
    <input class="input__field" v-model="value" />
    <div 
    class="input__keyboard"
    :class="{'keyboard-vertical': isVertical, 'keyboard-horizontal' : !isVertical}"
    >
      <div class="keyboard__wrapper">
        <div class="keyboard__header">
          <button class="keyboard__header-btn header__orientation-btn" @click="changeKeyboardOrientation">
            <img
              :src="require(`../assets/keyboard/${!isVertical ? 'vertical' : 'horizontal'}.svg`)"
              class="orientation-btn__image"
            />
          </button>
          <button class="keyboard__header-btn header__hide-btn">
            <img src="../assets/keyboard/close.png" class="close-btn__image" />
          </button>
        </div>
        <div class="keyboard__keys" :class="{'keyboard__keys-vertical': isVertical, 'keyboard__keys-horizontal' : !isVertical}">
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-15' : 'initial'}">
            <img src="../assets/keyboard/number7.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-14' : 'initial'}">
            <img src="../assets/keyboard/number8.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-13' : 'initial'}">
            <img src="../assets/keyboard/number9.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-5' : 'initial'}">
            <img src="../assets/keyboard/+_-.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-3' : 'initial'}">
            <img src="../assets/keyboard/del.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-12' : 'initial'}">
            <img src="../assets/keyboard/number4.svg"/>
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-11' : 'initial'}">
            <img src="../assets/keyboard/number5.svg"/>
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-10' : 'initial'}">
            <img src="../assets/keyboard/number6.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-4' : 'initial'}">
            <img src="../assets/keyboard/dot.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-2' : 'initial'}">
            <img src="../assets/keyboard/enter.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-9' : 'initial'}">
            <img src="../assets/keyboard/number1.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-8' : 'initial'}">
            <img src="../assets/keyboard/number2.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-7' : 'initial'}">
            <img src="../assets/keyboard/number3.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-6' : 'initial'}">
            <img src="../assets/keyboard/number0.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-1' : 'initial'}">
            <img src="../assets/keyboard/ac.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyboardInput",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      isVertical: true,
    };
  },
  methods: {
    changeKeyboardOrientation() {
      this.isVertical = !this.isVertical
    }
  },
};
</script>

<style lang="css" scoped>
.keyboard-input {
  display: block;
  width: 500px;
  height: 500px;
  background: dimgray;
}
.input__keyboard {
  background: #00838f;
  border-radius: 10px 10px 5px 5px;
  overflow: hidden;
}
.keyboard-vertical {
  width: 184px;
  height: 334px;
}
.keyboard-horizontal {
  width: 304px;
  height: 214px;
}
.keyboard__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.keyboard__header {
  width: 100%;
  height: 30px;
  background: #00838f;
  border-radius: 10px 10px 0px 0px;
  position: relative;
}
.keyboard__header-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
}
.header__orientation-btn {
  position: absolute;
  left: 0px;
  border-radius: 10px 0px 0px 0px;
}
.header__hide-btn {
  border-radius: 0px 10px 0px 0px;
  position: absolute;
  right: 0px;
}
.keyboard__header-btn:hover {
  background: #00727e;
}
.keyboard__keys {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  background: #0097A7
}
.keyboard__keys-horizontal {
  height: 184px;
}
.keyboard__keys-vertical {
  height: 304px;
}
.keyboard__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background: #0097A7;
}
.keyboard__btn:hover {
  background: #00727e;
}
.keyboard__btn-number {
  background: #0097a7;
}
.close-btn__image {
  display: block;
  width: 14px;
  height: 14px;
}
</style>
