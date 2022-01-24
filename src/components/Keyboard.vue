<template>
  <div 
    class="input__keyboard"
    :class="{'keyboard-vertical': isVertical, 'keyboard-horizontal' : !isVertical}"
    :style="position"
    v-if="shown"
    >
      <div class="keyboard__wrapper">
        <div class="keyboard__header">
          <button class="keyboard__header-btn header__orientation-btn" @click.prevent.stop="changeKeyboardOrientation">
            <img
              :src="require(`@/assets/img/keyboard/${!isVertical ? 'vertical' : 'horizontal'}.svg`)"
              class="orientation-btn__image"
            />
          </button>
          <button @click.prevent.stop="hideKeyboard" class="keyboard__header-btn header__hide-btn">
            <img :src="require('@/assets/img/keyboard/close.png')" class="close-btn__image" />
          </button>
        </div>
        <div class="keyboard__keys" :class="{'keyboard__keys-vertical': isVertical, 'keyboard__keys-horizontal' : !isVertical}">
          <div class="keyboard__numbers">
          <div class="keyboard__btn"  @click.prevent.stop="addNumber('7')" :style="{'order' : isVertical ? '-15' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number7.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('8')" :style="{'order' : isVertical ? '-14' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number8.svg')" />
          </div>
          <div class="keyboard__btn"  @click.prevent.stop="addNumber('9')" :style="{'order' : isVertical ? '-13' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number9.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="changeSign" :style="{'order' : isVertical ? '-5' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/+_-.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('4')" :style="{'order' : isVertical ? '-12' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number4.svg')"/>
          </div>
          <div class="keyboard__btn"  @click.prevent.stop="addNumber('5')" :style="{'order' : isVertical ? '-11' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number5.svg')"/>
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('6')" :style="{'order' : isVertical ? '-10' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number6.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber(',')" :style="{'order' : isVertical ? '-4' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/dot.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('1')" :style="{'order' : isVertical ? '-9' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number1.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('2')" :style="{'order' : isVertical ? '-8' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number2.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('3')" :style="{'order' : isVertical ? '-7' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number3.svg')" />
          </div>
          <div class="keyboard__btn" @click.prevent.stop="addNumber('0')" :style="{'order' : isVertical ? '-6' : 'initial'}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/number0.svg')" />
          </div>
          </div>
          <div class="keyboard__operations">
          <div class="keyboard__btn" @click.prevent.stop="resetState" :style="{'order' : isVertical ? '-1' : 'initial'}" :class="{'keyboard__btn-dedicated' : isVertical}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/ac.svg')" />
          </div>
          <div class="keyboard__btn" :style="{'order' : isVertical ? '-2' : 'initial'}" :class="{'keyboard__btn-dedicated' : isVertical}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/enter.svg')"/>
          </div>
          <div class="keyboard__btn" @click.prevent.stop="deleteNumber" :style="{'order' : isVertical ? '-3' : 'initial'}" :class="{'keyboard__btn-dedicated' : isVertical}">
            <img class="btn__image" :src="require('@/assets/img/keyboard/del.svg')" />
          </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Keyboard',
  emits: ['input'],
  props: {
    value : {
      type: String
    },
    maxlength: {
      type: Number,
      default: 10,
    },
    shown: {
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
      this.$emit('transform', this.isVertical);
      this.$emit('orient');
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
  /* padding: 2px 0; */
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
.keyboard__btn-dedicated {
  background: #008f9e;
}
.close-btn__image {
  display: block;
  width: 14px;
  height: 14px;
}
.keyboard__numbers {
  display: flex;
  flex-flow: row wrap;
  height: 240px;
  padding: 2px 2px 0px 2px;
}
.keyboard__operations {
  display: flex;
  flex-flow: row wrap;
  height: 62px;
  background: #008f9e;
  width: 184px;
  justify-content: center;
}
</style>
