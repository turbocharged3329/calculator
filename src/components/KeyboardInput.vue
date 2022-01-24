<template>
  <div class="keyboard-input">
    <input 
    type="text" 
    ref="input"
    class="input__field" 
    v-model="currentValue" 
    :maxlength="maxlength" 
    @input.prevent.stop="inputValue($event)" 
    @focus.prevent.stop="showInput($event)"
    :style="styles"
    :disabled="locked"
    />
    <keyboard 
    v-model="currentValue" 
    :maxlength="maxlength" 
    :shown="isShownKeyboard" 
    :position="keyboardPosition"
    @hide="isShownKeyboard = $event"
    @transform="isVertical = $event"
    @orient="showInput"
    />
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
    },
    styles: {
      type: Object,
      default() {
        return {}
      }
    },
    locked: {
      type: Boolean,
      default: false
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
    showInput() {
      this.isShownKeyboard = true;

      const coords = this.$refs.input.getBoundingClientRect();
      const documentWidth = document.documentElement.clientWidth 
      const documentHeight = document.documentElement.clientHeight 

      if (documentHeight - coords.bottom > 335) {
        this.setKeyboardPosition('bottom', coords)
      } else if (documentWidth - coords.right > 304) {
        this.setKeyboardPosition('right', coords)
      } else if (coords.top > 335) {
        this.setKeyboardPosition('top', coords)
      } else if (coords.left > 304) {
        this.setKeyboardPosition('left', coords)
      }
    },
    setKeyboardPosition(position, inputCoords) {
      const documentWidth = document.documentElement.clientWidth 
      const documentHeight = document.documentElement.clientHeight 


      if (position == 'bottom') {
        //если клавиатура расположена горизонтально
        if (!this.isVertical) {
          if (documentWidth - inputCoords.left < 304) {
            this.keyboardPosition = {
            top: `${inputCoords.height + 5}px`,
            left: `-${inputCoords.width}px`,
          }
        } else {
          this.keyboardPosition = {
            top: `${inputCoords.height + 5}px`,
            left: '0px',
          }
        } 
        } else {
          //если клавиатура расположена вертикально
          if (documentWidth - inputCoords.right < 184 && 184 > inputCoords.width) {
            this.keyboardPosition = {
              top: `${inputCoords.height + 5}px`,
              left: `-${184 - inputCoords.width}px`,
            }
          } else {
            this.keyboardPosition = {
              top: `${inputCoords.height + 5}px`,
              left: '0px',
            }
          }
        }
      } else if (position == 'right') {
        if (!this.isVertical) {
          //если горизонтальный и не хватает места снизу - перемещаем наверх
          if (documentHeight - inputCoords.top < 215) {
            this.keyboardPosition = {
            top: `${-215 + inputCoords.height}px`,
            left: `${inputCoords.width + 5}px`,
            }
          } else {
            this.keyboardPosition = {
            top: '0px',
            left: `${inputCoords.width + 5}px`,
            }
          }
        } else {
          //есди вертикальный, и не хватает места снизу
          if (documentHeight - inputCoords.top < 335) {
            this.keyboardPosition = {
            top: `${-335 + inputCoords.height}px`,
            left: `${inputCoords.width + 5}px`,
            }
          } else {
            this.keyboardPosition = {
            top: '0px',
            left: `${inputCoords.width + 5}px`,
            }
          }
        }
      } else if (position == 'top') {
        if (!this.isVertical) {
          if (documentWidth - inputCoords.left < 304) {
            this.keyboardPosition = {
            top: `${- 215 - 5}px`,
            left: `-${inputCoords.width}px`,
            }
          } else {
            this.keyboardPosition = {
              top: `${- 215 - 5}px`,
              left: `0px`,
            }}
        } else {
          //если клавиатура расположена вертикально
          if (documentWidth - inputCoords.right < 184 && 184 > inputCoords.width) {
            this.keyboardPosition = {
              top: `${- 335 - 5}px`,
              left: `-${184 - inputCoords.width}px`,
            }
          } else {
            this.keyboardPosition = {
              top: `${- 335 - 5}px`,
              left: '0px',
            }
          }
        } 
      } 
      // else if (position == 'left') {
      //   console.log('left');
      //    if (!this.isVertical) {
      //     //если горизонтальный и не хватает места снизу - перемещаем наверх
      //     if (documentHeight - inputCoords.top < 215) {
      //       this.keyboardPosition = {
      //       top: `${-215 + inputCoords.height}px`,
      //       left: `${inputCoords.width + 5}px`,
      //       }
      //     } else {
      //       this.keyboardPosition = {
      //       top: '0px',
      //       left: `${inputCoords.width + 5}px`,
      //       }
      //     }
      //   } else {
      //     this.keyboardPosition = {
      //       top: '0px',
      //       left: `-${304 + 5}px`,
      //     }
      //   }
        
      // }
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
.input__field:disabled {
  background: white;
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
