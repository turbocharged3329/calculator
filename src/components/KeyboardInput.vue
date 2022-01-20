<template>
  <div class="keyboard-input">
    <input 
    type="text" 
    class="input__field" 
    v-model="currentValue" 
    :maxlength="maxlength" 
    @input.prevent.stop="inputValue($event)" 
    @focus.prevent.stop="isShownKeyboard = true"
    @blur.prevent.stop="showInput($event)"
    />
    <Keyboard 
    v-model="currentValue" 
    :maxlength="maxlength" 
    :shown="isShownKeyboard" 
    :position="keyboardPosition"
    @hide="isShownKeyboard = $event"/>
  </div>
</template>

<script>
import Keyboard from "../components/Keyboard"
export default {
  name: "KeyboardInput",
  components: {
    Keyboard
  },
  props: {
    maxlength: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentValue: "",
      isVertical: true,
      allowedSymbols: ['1','2','3','4','5','6','7','8','9','0', '-', ','],
      isShownKeyboard: false,
      keyboardPosition: {},
    };
  },
  methods: {
    showInput(e) {
      const coords = e.target.getBoundingClientRect();
      // eslint-disable-next-line no-unused-vars
      const documentWidth = document.documentElement.clientWidth 
      // eslint-disable-next-line no-unused-vars
      const documentHeight = document.documentElement.clientHeight 

      console.log(coords);

      if (documentHeight - coords.bottom > 335) {
        this.keyboardPosition = {
          top: `${coords.height + 5}px`,
          left: '0px',
        }
      } else if ((documentWidth - coords.right > 304) && (documentHeight - coords.bottom - coords.height > 335)) {
        this.keyboardPosition = {
          top: '0px',
          left: `${coords.width + 5}px`,
        }
      } else if (coords.top > 335) {
        this.keyboardPosition = {
          top: `${0 - 335 - 5}px`,
          left: '0px',
        }
      } else if (coords.left > 304) {
        this.keyboardPosition = {
          top: '0px',
          left: `-${304 + 5}px`,
        }
      }

    },
    inputValue(e) {
      let value = e.target.value.split('')
      value = value.filter(elem => this.allowedSymbols.includes(elem))
      this.currentValue = value.join('')
    },
  }
};
</script>

<style lang="css" scoped>
.keyboard-input {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 500px;
  height: 500px;
  background: dimgray;
  position: relative;
  top: 500px;
  left: 400px;
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
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
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
  flex-wrap: nowrap;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
}
.header__orientation-btn {
  position: absolute;
  left: 0px;
  z-index: 2;
  border-radius: 10px 0px 0px 0px;
}
.header__hide-btn {
  position: absolute;
  z-index: 3;
  right: 0px;
  border-radius: 0px 10px 0px 0px;
}
.keyboard__header-btn:hover {
  background: #00727e;
}
.keyboard__keys {
  display: flex;
  flex-flow: row nowrap;
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
  flex-flow: row nowrap;
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
