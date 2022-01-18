<template>
  <div class="calculator" v-show="!isHidden">
    <div class="calculator__wrapper">
      <div class="calculator__header">
        <button class="calculator__hide-btn" @click="hideCalc">
          <img src="../assets/calculator/close.png" class="close-btn__image" />
        </button>
      </div>
      <div class="calculator__display">
        <div class="screen">
          <div class="screen__memory-sign" v-show="memoryValue">
            <img src="../assets/calculator/memo.svg" />
          </div>
          <div class="screen__error-sign" v-show="isError">
            <img src="../assets/calculator/error.svg" />
          </div>
          <p class="screen__value" ref="screen"></p>
        </div>
      </div>
      <div class="calculator__keyboard">
        <div class="keyboard__btn" @click="memoryClear">
          <img src="../assets/calculator/mc.svg" />
        </div>
        <div class="keyboard__btn" @click="memoryRecovery">
          <img src="../assets/calculator/mr.svg" />
        </div>
        <div class="keyboard__btn" @click="memorySave">
          <img src="../assets/calculator/ms.svg" />
        </div>
        <div class="keyboard__btn" @click="increaseMemoryValue">
          <img src="../assets/calculator/mincr.svg" />
        </div>
        <div class="keyboard__btn" @click="decreaseMemoryValue">
          <img src="../assets/calculator/mdecr.svg" />
        </div>
        <div class="keyboard__btn" @click="deleteNumber">
          <img src="../assets/calculator/del.svg" />
        </div>
        <div class="keyboard__btn" @click="resetSecondOperand">
          <img src="../assets/calculator/ce.svg" />
        </div>
        <div class="keyboard__btn" @click="resetCalcStateToDefault">
          <img src="../assets/calculator/c.svg" />
        </div>
        <div class="keyboard__btn" @click="setOperation('pow')">
          <img src="../assets/calculator/x_y.svg" />
        </div>
        <div class="keyboard__btn" @click="getSqrt">
          <img src="../assets/calculator/sqrt.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(7)">
          <img src="../assets/calculator/number7.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(8)">
          <img src="../assets/calculator/number8.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(9)">
          <img src="../assets/calculator/number9.svg" />
        </div>
        <div class="keyboard__btn" @click="setOperation('div')">
          <img src="../assets/calculator/slash.svg" />
        </div>
        <div class="keyboard__btn" @click="getInverseProportionality">
          <img src="../assets/calculator/1-x.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(4)">
          <img src="../assets/calculator/number4.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(5)">
          <img src="../assets/calculator/number5.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(6)">
          <img src="../assets/calculator/number6.svg" />
        </div>
        <div class="keyboard__btn" @click="setOperation('mult')">
          <img src="../assets/calculator/multiply.svg" />
        </div>
        <div class="keyboard__btn" @click="getSinOrCosValue('sin')">
          <img src="../assets/calculator/sin.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(1)">
          <img src="../assets/calculator/number1.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(2)">
          <img src="../assets/calculator/number2.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(3)">
          <img src="../assets/calculator/number3.svg" />
        </div>
        <div class="keyboard__btn" @click="setOperation('subst')">
          <img src="../assets/calculator/minus.svg" />
        </div>
        <div class="keyboard__btn" @click="getSinOrCosValue('cos')">
          <img src="../assets/calculator/cos.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number keyboard__btn-left-bottom-rounded" @click="changeSign">
          <img src="../assets/calculator/+_-.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(0)">
          <img src="../assets/calculator/number0.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click="addNumber(',')">
          <img src="../assets/calculator/dot.svg" />
        </div>
        <div class="keyboard__btn" @click="setOperation('sum')">
          <img src="../assets/calculator/plus.svg" />
        </div>
        <div class="keyboard__btn keyboard__btn-right-bottom-rounded" @click="makeCalculation">
          <img src="../assets/calculator/equal.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Decimal} from 'decimal.js';
export default {
  name: "Calculator",
  components: {},
  props: {
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prevValue: "", //значение, которое было на экране до введения второго операнда выражения
      operationName: "", //наименование операции
      isSecondOperand: false, //вводится ли второй операнд выражения в данный момент
      isMadeCalculation: false,
      lastOperand: "", //последний используемый операнд для выражения
      lastOperation: "", //последняя совершенная операция
      isMadeWithoutSecondOperand: false,
      maxValueLength: 13, //максимальная длина значения на экране калькулятора
      memoryValue: "", //значения в ячейке памяти калькулятора
      isError: false, //ошибка, сообщающая о превышении допустимого значения калькулятора
    };
  },
  computed: {
    maxValue() {
      let value = "";

      for (let i = 0; i < this.maxValueLength; i++) {
        value += 9;
      }

      return value;
    },
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
      this.$emit("hidden", this.isHidden);
    },
    /**
     * добавление числа к значению на дисплее
     * @param {Number, String} number - число, которое нужно добавить к значению на дисплее калькулятора
     * @returns void
     */
    addNumber(number) {
      if (!this.isError) {
        //если в данный момент на экране 0, то заменяем его новым введенным значением
        if (this.$refs.screen.innerHTML === "0") {
          this.$refs.screen.innerHTML = "";
        }
        //если на экране результат только что выполненного вычисления, то записываем его в переменную
        if (this.$refs.screen.innerHTML !== 0 && this.isMadeCalculation) {
          this.isMadeCalculation = false;
          this.lastOperand = this.$refs.screen.innerHTML;
          this.$refs.screen.innerHTML = "";
        }
  
        if (!this.isSecondOperand) {
          if (this.prevValue && this.operationName) {
            this.isSecondOperand = true;
            this.$refs.screen.innerHTML = "";
          }
        }
  
        if (number == ",") {
          if (!this.$refs.screen.innerHTML.includes(",")) {
            this.$refs.screen.innerHTML =
              this.$refs.screen.innerHTML == 0
                ? (this.$refs.screen.innerHTML += "0,")
                : (this.$refs.screen.innerHTML += ",");
          }
        } else {
          if ((this.$refs.screen.innerHTML + number).length > this.maxValueLength) {
            this.isError = true
          } else {
            this.$refs.screen.innerHTML += number;
          }
        }
        this.isMadeCalculation = false;
      }
    },
    /**
     * удаление числа с конца значения на дисплее калькулятора
     * @returns void
     */
    deleteNumber() {
      if (!this.isError) {
        let result = this.$refs.screen.innerHTML.split("");
        result.splice(result.length - 1, 1);
  
        this.$refs.screen.innerHTML = result.length == 0 ? 0 : result.join("");
      }
    },
    /**
     * изменение знака значения на дисплее калькулятора
     * @returns void
     */
    changeSign() {
      if (!this.isError) {
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, ',', '.')
        this.$refs.screen.innerHTML = -this.$refs.screen.innerHTML;
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, '.', ',')
      }
    },
    /**
     * установление имени операции, которую нужно провести с введенным числом и значением на дисплее калькулятора
     * @param {String} name - наименование операции
     * @returns void
     */
    setOperation(name) {
      if (!this.isError) {
        this.operationName = name;
        this.prevValue = this.stringReplace(this.$refs.screen.innerHTML, ',', '.');
      }
    },
    /**
     * проведение вычислений
     * @returns void
     */
    makeCalculation() {
      if (!this.isError) {
        if (this.prevValue === '' && this.isMadeCalculation && this.lastOperand !== '' && this.lastOperation !== '') {
          this.prevValue = this.lastOperand
          this.operationName = this.lastOperation;
          this.isMadeWithoutSecondOperand = true
        }

        if (
          this.$refs.screen.innerHTML > 0 && this.operationName == "" && !this.isMadeCalculation && this.lastOperand
        ) {
          this.$refs.screen.innerHTML = this.lastOperand;
          return
        }

        //заменяем запятую на точку в значениях
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, ',', '.')
        this.prevValue = this.stringReplace(this.prevValue, ',', '.')
  
        this.$refs.screen.innerHTML = new Decimal(this.$refs.screen.innerHTML)
        const screenResult = new Decimal(this.$refs.screen.innerHTML)
        this.prevValue = new Decimal(this.prevValue)
        
        //производим вычисления
        switch (this.operationName) {
          case "sum":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "sum";
            this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand
              ? screenResult.plus(this.prevValue) 
              : this.prevValue.plus(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "subst":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "subst";
  
            this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand
              ? screenResult.minus(this.prevValue)
              : this.prevValue.minus(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "mult":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "mult";
  
            this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand
              ? screenResult.mul(this.prevValue)
              : this.prevValue.mul(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "div":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "div";
  
            if (this.isMadeWithoutSecondOperand) {
              if (this.prevValue == '0') {
                this.$refs.screen.innerHTML = 0;
                this.isError = true;
              } else {
                this.$refs.screen.innerHTML = screenResult.div(this.prevValue)
              }
            } else {
              if (this.$refs.screen.innerHTML == '0') {
                this.$refs.screen.innerHTML = 0;
                this.isError = true;
              } else {
                this.$refs.screen.innerHTML = this.prevValue.div(screenResult)
              }
            }
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "pow":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "pow";
  
            this.$refs.screen.innerHTML = this.isMadeWithoutSecondOperand
              ? screenResult.pow(this.prevValue)
              : this.prevValue.pow(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "":
            break;
        }
  
        this.isSecondOperand = false;
        this.isMadeCalculation = true;
        this.prevValue = "";
        this.operationName = "";
        this.transformResult();
        //заменяем точку на запятую в получившемся значении
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, '.', ',')
      }
    },
    /**
     * преобразование результата на экране к формату с допустимым количеством знаков
     * @returns void
     */
    transformResult() {
      if (Number(this.$refs.screen.innerHTML) > this.maxValue) {
        this.$refs.screen.innerHTML = 0;
        this.isError = true;
      } else {
        const result = this.$refs.screen.innerHTML.split("");
        const numbersCountToDelete =
          this.$refs.screen.innerHTML.length - this.maxValueLength;

        if (numbersCountToDelete > 0) {
          result.splice(
            result.length - 1 - numbersCountToDelete,
            numbersCountToDelete
          );
          this.$refs.screen.innerHTML = result.join("");
        }
      }
    },
    /**
     * операция выделения квадратного корня из числа
     * @returns void
     */
    getSqrt() {
      if (!this.isError) {
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, ',', '.')
  
        if (Number(this.$refs.screen.innerHTML) < 0) {
          this.$refs.screen.innerHTML = 0;
          this.isError = true;
        } else {
          this.$refs.screen.innerHTML = Math.sqrt(
          Number(this.$refs.screen.innerHTML)
          );
          this.transformResult();
          this.isMadeCalculation = true;
        }
  
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, '.', ',')
      }
    },
    /**
     * вывод обратной пропорциональности значения на экране
     * @returns void
     */
    getInverseProportionality() {
      if (!this.isError) {
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, ',', '.')
        this.$refs.screen.innerHTML = 1 / Number(this.$refs.screen.innerHTML);
        this.transformResult();
        this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, '.', ',')
        this.isMadeCalculation = true;
      }
    },
    /**
     * вывод синуса и косинуса числа на экране
     * @returns void
     */
    getSinOrCosValue(operation) {
      this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, ',', '.')
      this.$refs.screen.innerHTML = Math[operation](
        Number(this.$refs.screen.innerHTML)
      );
      this.transformResult();
      this.$refs.screen.innerHTML = this.stringReplace(this.$refs.screen.innerHTML, '.', ',')
      this.isMadeCalculation = true;
      this.isError = false;
    },
    /**
     * очистка значения в ячейке памяти калькулятора
     * @returns void
     */
    memoryClear() {
      if (!this.isError) {
        this.memoryValue = "";
      }
    },
    /**
     * замена символа в строке (метод для замены запятых и точек в значении)
     * @param {Number, String} - строка со значением
     * @param {String} replacingElem - заменяемый символ или часть строки
     * @param {String} replacуTo - символ или часть строки, на который планируется замена
     * @returns {String}
     */
    stringReplace(value, replacingElem, replaceTo) {
      if (String(value).includes(replacingElem)) {
        const newValue = String(value).replace(replacingElem, replaceTo)
        return newValue
      } else {
        return value
      }
    },
    /**
     * сохранение в ячейку памяти значения на экране
     * @returns void
     */
    memorySave() {
      if (!this.isError) {
        this.memoryValue = this.stringReplace(this.$refs.screen.innerHTML, ',', '.');
        this.isMadeCalculation = true;
      }
    },
    /**
     * вывод значения в ячейке памяти на экран калькулятора
     * @returns void
     */
    memoryRecovery() {
      if (!this.isError) {
        this.$refs.screen.innerHTML =
          this.memoryValue == "" ? 0 : this.stringReplace(this.memoryValue, '.', ',');
      }
    },
    /**
     * увеличение значения в ячейке памяти на значение на экрене
     * @returns void
     */
    increaseMemoryValue() {
      if (!this.isError) {
        this.memoryValue =
          this.memoryValue == ""
            ? (this.memoryValue = 0 + Number(this.stringReplace(this.$refs.screen.innerHTML, ',', '.')))
            : Number(this.stringReplace(this.$refs.screen.innerHTML, ',', '.')) + this.memoryValue;
        this.isMadeCalculation = true;
      }
    },
    /**
     * увеличение значения в ячейке памяти на значение на экрене
     * @returns void
     */
    decreaseMemoryValue() {
      if (!this.isError) {
        this.memoryValue =
          this.memoryValue == ""
            ? (this.memoryValue = 0 - Number(this.stringReplace(this.$refs.screen.innerHTML, ',', '.')))
            : Number(this.stringReplace(this.$refs.screen.innerHTML, ',', '.')) - Number(this.memoryValue);
        this.isMadeCalculation = true;
      }
    },
    /**
     * сброс значения второго операнда
     * @returns void
     */
    resetSecondOperand() {
      if (!this.isError) {
        this.$refs.screen.innerHTML = 0;
      }
    },
    /**
     * возврат калькулятора в дефолтное состояние
     * @returns void
     */
    resetCalcStateToDefault() {
      this.$refs.screen.innerHTML = 0;
      this.isSecondOperand = false;
      this.prevValue = "";
      this.operationName = "";
      this.lastOperand = "";
      this.lastOperation = "";
      this.isError = false;
    },
  },
};
</script>

<style lang="css" scoped>
@font-face {
  font-family: Noto Sans;
  src: url(../assets/fonts/NotoSans-Regular.ttf);
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
  border-radius: 0px 10px 0px 0px;
}
.calculator__hide-btn:hover {
  background: #00727e;
}
.close-btn__image {
  display: block;
  width: 14px;
  height: 14px;
}
.calculator__display {
  background: #008f9e;
  height: 70px;
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
  position: relative;
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
  width: 300px;
  padding: 0 3px 3px 3px;
}
.keyboard__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.keyboard__btn:hover {
  background: #00727e;
}
.keyboard__btn-number {
  background: #0097a7;
}
.keyboard__btn-left-bottom-rounded {
  border-radius: 0px 0px 0px 5px;
}
.keyboard__btn-right-bottom-rounded {
  border-radius: 0px 0px 5px 0px;
}
.screen__memory-sign {
  display: block;
  width: 26px;
  height: 28px;
  font-size: 15px;
  position: absolute;
  bottom: 0px;
  left: 5px;
}
.screen__error-sign {
  display: block;
  width: 26px;
  height: 28px;
  font-size: 15px;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
