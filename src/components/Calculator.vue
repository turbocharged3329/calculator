<template>
  <div class="calculator" v-show="!isHidden">
    <div class="calculator__wrapper">
      <div class="calculator__header">
        <button class="calculator__hide-btn" @click="hideCalc">
          <img src="../assets/close.png" class="close-btn__image" />
        </button>
      </div>
      <div class="calculator__display">
        <div class="screen">
          <p class="screen__value" ref="screen"></p>
        </div>
      </div>
      <div class="calculator__keyboard">
        <div class="keyboard__btn">MC</div>
        <div class="keyboard__btn">MR</div>
        <div class="keyboard__btn">MS</div>
        <div class="keyboard__btn">M+</div>
        <div class="keyboard__btn">M-</div>
        <div class="keyboard__btn" @click="deleteNumber">Del</div>
        <div class="keyboard__btn" @click="resetSecondOperand">CE</div>
        <div class="keyboard__btn" @click="resetCalcStateToDefault">C</div>
        <div class="keyboard__btn">Xy</div>
        <div class="keyboard__btn">√</div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(7)">
          7
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(8)">
          8
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(9)">
          9
        </div>
        <div class="keyboard__btn" @click="setOperation('div')">/</div>
        <div class="keyboard__btn">1/x</div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(4)">
          4
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(5)">
          5
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(6)">
          6
        </div>
        <div class="keyboard__btn" @click="setOperation('mult')">×</div>
        <div class="keyboard__btn">sin</div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(1)">
          1
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(2)">
          2
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(3)">
          3
        </div>
        <div class="keyboard__btn" @click="setOperation('subst')">-</div>
        <div class="keyboard__btn">cos</div>
        <div class="keyboard__btn" @click="changeSign">+/-</div>
        <div class="keyboard__btn" @click="addNumber(0)">0</div>
        <div class="keyboard__btn" @click="addNumber('.')">.</div>
        <div class="keyboard__btn" @click="setOperation('sum')">+</div>
        <div class="keyboard__btn" @click="makeCalculation">=</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  components: {},
  props: {
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prevValue: "", //значение, которое было на экране до введения второго операнда выражения
      operationName: "", //наименование операции
      isSecondOperand: false, //вводится ли второй операнд выражения в данный момент
      isMadeCalculation: false, 
      lastOperand: '', //последний используемый операнд для выражения
      lastOperation: '', //последняя совершенная операция
      isMadeWithoutSecondOperand: false,
      maxValueLength: 13,
    };
  },
  mounted() {
    this.$refs.screen.innerHTML = 0;
  },
  methods: {
    /**
     * скрытие калькулятора
     * @return void
     */
    hideCalc() {
      this.$emit('hidden', this.isHidden)
    },
    /**
     * добавление числа к значению на дисплее
     * @param {Number, String} number - число, которое нужно добавить к значению на дисплее калькулятора
     * @returns void
     */
    addNumber(number) {
      if (this.$refs.screen.innerHTML === '0') {
        this.$refs.screen.innerHTML = "";
      } 

      if (this.$refs.screen.innerHTML > 0 && this.isMadeCalculation) {
        this.isMadeCalculation = false;
        this.lastOperand = this.$refs.screen.innerHTML 
        this.$refs.screen.innerHTML = "";
      }

      if (!this.isSecondOperand) {
        if (this.prevValue && this.operationName) {
          this.isSecondOperand = true;
          this.$refs.screen.innerHTML = "";
        }
      }

      if (number == '.') {
        if (!this.$refs.screen.innerHTML.includes('.')) {
          this.$refs.screen.innerHTML = this.$refs.screen.innerHTML == 0 
          ? this.$refs.screen.innerHTML += '0.'
          : this.$refs.screen.innerHTML += '.';
        }
      } else {
        this.$refs.screen.innerHTML += number;
      }
      this.isMadeCalculation = false;
    },
    /**
     * удаление числа с конца значения на дисплее калькулятора
     * @returns void
     */
    deleteNumber() {
      let result = this.$refs.screen.innerHTML.split("");
      result.splice(result.length - 1, 1);

      this.$refs.screen.innerHTML = result.length == 0 ? 0 : result.join('');
    },
    /**
     * изменение знака значения на дисплее калькулятора
     * @returns void
     */
    changeSign() {
      this.$refs.screen.innerHTML = -this.$refs.screen.innerHTML;
    },
    /**
     * установление имени операции, которую нужно провести с введенным числом и значением на дисплее калькулятора
     * @param {String} name - наименование операции
     * @returns void
     */
    setOperation(name) {
      this.operationName = name;
      this.prevValue = this.$refs.screen.innerHTML; 
    },
    /**
     * проведение вычислений
     * @returns void
     */
    makeCalculation() {
      switch (this.operationName) {
        case 'sum':
          this.lastOperand = this.isMadeWithoutSecondOperand ? Number(this.prevValue) : Number(this.$refs.screen.innerHTML);
          this.lastOperation = 'sum';
                    
          this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand 
          ? Number(this.$refs.screen.innerHTML) + Number(this.prevValue)
          : Number(this.prevValue) + Number(this.$refs.screen.innerHTML);
          
          this.isMadeWithoutSecondOperand = false;
          break;
        case 'subst':
          this.lastOperand = this.isMadeWithoutSecondOperand ? Number(this.prevValue) : Number(this.$refs.screen.innerHTML);
          this.lastOperation = 'subst';
          
          this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand 
          ? Number(this.$refs.screen.innerHTML) - Number(this.prevValue)
          : Number(this.prevValue) - Number(this.$refs.screen.innerHTML)

          this.isMadeWithoutSecondOperand = false;
          break;
        case 'mult':
          this.lastOperand = this.isMadeWithoutSecondOperand ? Number(this.prevValue) : Number(this.$refs.screen.innerHTML);
          this.lastOperation = 'mult'

          this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand 
          ? Number(this.$refs.screen.innerHTML) * Number(this.prevValue)
          : Number(this.prevValue) * Number(this.$refs.screen.innerHTML)
          
          this.isMadeWithoutSecondOperand = false;
          break;
        case 'div': 
          this.lastOperand = this.isMadeWithoutSecondOperand ? Number(this.prevValue) : Number(this.$refs.screen.innerHTML);
          this.lastOperation = 'div'
          
          this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand 
          ? Number(this.$refs.screen.innerHTML) / Number(this.prevValue)
          : Number(this.prevValue) / Number(this.$refs.screen.innerHTML)
          
          this.isMadeWithoutSecondOperand = false;
          break;
        case '': 
          break;
      }

      if (this.$refs.screen.innerHTML > 0 && this.operationName == '' && !this.isMadeCalculation && this.lastOperand) {
        this.$refs.screen.innerHTML = this.lastOperand
      }

      if (this.lastOperation && this.isMadeCalculation && this.lastOperand) {
        this.prevValue = this.lastOperand;
        this.operationName = this.lastOperation
        this.isMadeCalculation = false
        this.isMadeWithoutSecondOperand = true;
        this.makeCalculation()
      }

        this.isSecondOperand = false;
        this.isMadeCalculation = true;
        this.prevValue = '';
        this.operationName = '';
    },
    /**
     * сброс значения второго операнда
     * @returns void
     */
    resetSecondOperand() {
      this.$refs.screen.innerHTML = 0
    },
    /**
     * возврат калькулятора в дефолтное состояние
     * @returns void
     */
    resetCalcStateToDefault() {
      this.$refs.screen.innerHTML = 0
      this.isSecondOperand = false;
      this.prevValue = '';
      this.operationName = '';
      this.lastOperand = '';
      this.lastOperation = '';
    }
  },
};
</script>

<style lang="css" scoped>
@font-face {
    font-family: Noto Sans; /* Имя шрифта */
    src: url(../assets/fonts/NotoSans-Regular.ttf); /* Путь к файлу со шрифтом */
}

.calculator {
  display: block;
  width: 306px;
  height: 468px;
  background: #00838f;
  border-radius: 10px 10px 5px 5px;
}
.calculator__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.calculator__header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
  background: #00838f;
  border-radius: 10px 10px 0px 0px;
}
.calculator__hide-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
}
.close-btn__image {
  display: block;
  width: 14px;
  height: 14px;
}
.calculator__display {
  background: #008f9e;
  height: 76px;
  padding: 3px;
}
.screen {
  background: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 40px;
  line-height: 36px;
}
.screen__value {
  margin: 14px 7px 15px 8px;
  width: 100%;
  text-align: right;
}
.calculator__keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.keyboard__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.keyboard__btn-number {
  background: #0097a7;
}
</style>
