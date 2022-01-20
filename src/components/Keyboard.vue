<template>
  <div 
    class="input__keyboard"
    :class="{'keyboard-vertical': isVertical, 'keyboard-horizontal' : !isVertical}"
    :style="position"
    v-show="isShown"
    >
      <div class="keyboard__wrapper">
        <div class="keyboard__header">
          <button class="keyboard__header-btn header__orientation-btn" @click="changeKeyboardOrientation">
            <img
              :src="require(`../assets/keyboard/${!isVertical ? 'vertical' : 'horizontal'}.svg`)"
              class="orientation-btn__image"
            />
          </button>
          <button @click="hideKeyboard" class="keyboard__header-btn header__hide-btn">
            <img src="../assets/keyboard/close.png" class="close-btn__image" />
          </button>
        </div>
        <div class="keyboard__keys" :class="{'keyboard__keys-vertical': isVertical, 'keyboard__keys-horizontal' : !isVertical}">
          <div class="keyboard__btn"  @click="addNumber('7')" :style="{'order' : isVertical ? '-15' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number7.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('8')" :style="{'order' : isVertical ? '-14' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number8.svg" />
          </div>
          <div class="keyboard__btn"  @click="addNumber('9')" :style="{'order' : isVertical ? '-13' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number9.svg" />
          </div>
          <div class="keyboard__btn" @click="changeSign" :style="{'order' : isVertical ? '-5' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/+_-.svg" />
          </div>
          <div class="keyboard__btn" @click="deleteNumber" :style="{'order' : isVertical ? '-3' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/del.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('4')" :style="{'order' : isVertical ? '-12' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number4.svg"/>
          </div>
          <div class="keyboard__btn"  @click="addNumber('5')" :style="{'order' : isVertical ? '-11' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number5.svg"/>
          </div>
          <div class="keyboard__btn" @click="addNumber('6')" :style="{'order' : isVertical ? '-10' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number6.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber(',')" :style="{'order' : isVertical ? '-4' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/dot.svg" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-2' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/enter.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('1')" :style="{'order' : isVertical ? '-9' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number1.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('2')" :style="{'order' : isVertical ? '-8' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number2.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('3')" :style="{'order' : isVertical ? '-7' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number3.svg" />
          </div>
          <div class="keyboard__btn" @click="addNumber('0')" :style="{'order' : isVertical ? '-6' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/number0.svg" />
          </div>
          <div class="keyboard__btn" @click="resetState" :style="{'order' : isVertical ? '-1' : 'initial'}">
            <img class="btn__image" src="../assets/keyboard/ac.svg" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Keyboard',
  components: {},
  emits: ['input'],
  props: {
    value : {
      type: String
    },
    maxlength: {
      type: Number,
      default: 10,
    },
    isShown: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isVertical: true,
      currentValue: '',
    }
  },
  methods: {
    changeKeyboardOrientation() {
      this.isVertical = !this.isVertical
    },
    /**
     * добавление числа к значению на дисплее
     * @param {Number, String} number - число, которое нужно добавить к значению на дисплее калькулятора
     * @returns void
     */
    addNumber(number) {
      this.currentValue = this.value
      if (this.value.length < this.maxlength) {
        //если вводится запятая
        if (number == ",") {
          //если в значении на экране еще нет запятой
            if (!this.currentValue.includes(",")) {
              this.currentValue = this.currentValue == '' ? "0," : this.currentValue += "," 
        }
      } else {
        this.currentValue += number
      }

      this.$emit('input', this.currentValue)
      }
    },
    /**
     * изменение знака значения на дисплее калькулятора
     * @returns void
     */
    changeSign() {
      this.currentValue = this.value
      this.currentValue = String(-Number(this.currentValue));
      this.$emit('input', this.currentValue)
    },
    resetState() {
      this.currentValue = ''
      this.$emit('input', this.currentValue)
    },
    /**
     * удаление числа с конца значения на дисплее калькулятора
     * @returns void
     */
    deleteNumber() {
      this.currentValue = this.value
      let result = this.currentValue.split('');
      result.splice(result.length - 1, 1);
      this.currentValue = result.length == 0 ? '' : result.join('');
      this.$emit('input', this.currentValue)
    },
    hideKeyboard() {
      this.$emit('hide', false)
    }
  }
}
</script>

<style lang="css" scoped>
.input__keyboard {
  background: #00838f;
  border-radius: 10px 10px 5px 5px;
  overflow: hidden;
  position: absolute;
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
