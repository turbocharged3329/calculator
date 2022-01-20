<template>
  <div class="calculator" v-if="!hidden">
    <div class="calculator__wrapper">
      <div class="calculator__header">
        <button class="calculator__hide-btn" @click.prevent.stop="hideCalc">
          <img :src="require('@/assets/img/calculator/close.png')" class="close-btn__image" />
        </button>
      </div>
      <div class="calculator__display">
        <div class="screen">
          <div class="screen__memory-sign" v-show="memoryValue">
            <div class="sign__wrapper">
              <img :src="require('@/assets/img/calculator/memo.svg')" class="memory-sign__image" />
            </div>
          </div>
          <div class="screen__error-sign" v-show="isError">
            <img :src="require('@/assets/img/calculator/error.svg')" class="error-sign__image" />
          </div>
          <p class="screen__value" ref="screen">{{ screenValue }}</p>
        </div>
      </div>
      <div class="calculator__keyboard">
        <div class="keyboard__btn" @click.prevent.stop="memoryClear">
          <img :src="require('@/assets/img/calculator/mc.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="memoryRecovery">
          <img :src="require('@/assets/img/calculator/mr.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="memorySave">
          <img :src="require('@/assets/img/calculator/ms.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="increaseMemoryValue">
          <img :src="require('@/assets/img/calculator/mincr.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="decreaseMemoryValue">
          <img :src="require('@/assets/img/calculator/mdecr.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="deleteNumber">
          <img :src="require('@/assets/img/calculator/del.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="resetSecondOperand">
          <img :src="require('@/assets/img/calculator/ce.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="resetCalcStateToDefault">
          <img :src="require('@/assets/img/calculator/c.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="setOperation('pow')">
          <img :src="require('@/assets/img/calculator/x_y.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="getSqrt">
          <img :src="require('@/assets/img/calculator/sqrt.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(7)">
          <img :src="require('@/assets/img/calculator/number7.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(8)">
          <img :src="require('@/assets/img/calculator/number8.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(9)">
          <img :src="require('@/assets/img/calculator/number9.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="setOperation('div')">
          <img :src="require('@/assets/img/calculator/slash.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="getInverseProportionality">
          <img :src="require('@/assets/img/calculator/1-x.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(4)">
          <img :src="require('@/assets/img/calculator/number4.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(5)">
          <img :src="require('@/assets/img/calculator/number5.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(6)">
          <img :src="require('@/assets/img/calculator/number6.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="setOperation('mult')">
          <img :src="require('@/assets/img/calculator/multiply.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="getSinOrCosValue('sin')">
          <img :src="require('@/assets/img/calculator/sin.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(1)">
          <img :src="require('@/assets/img/calculator/number1.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(2)">
          <img :src="require('@/assets/img/calculator/number2.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(3)">
          <img :src="require('@/assets/img/calculator/number3.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="setOperation('subst')">
          <img :src="require('@/assets/img/calculator/minus.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="getSinOrCosValue('cos')">
          <img :src="require('@/assets/img/calculator/cos.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number keyboard__btn-left-bottom-rounded" @click.prevent.stop="changeSign">
          <img :src="require('@/assets/img/calculator/+_-.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(0)">
          <img :src="require('@/assets/img/calculator/number0.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-number" @click.prevent.stop="addNumber(',')">
          <img :src="require('@/assets/img/calculator/dot.svg')" />
        </div>
        <div class="keyboard__btn" @click.prevent.stop="setOperation('sum')">
          <img :src="require('@/assets/img/calculator/plus.svg')" />
        </div>
        <div class="keyboard__btn keyboard__btn-right-bottom-rounded" @click.prevent.stop="makeCalculation">
          <img :src="require('@/assets/img/calculator/equal.svg')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Decimal} from 'decimal.js';
export default {
  name: "Calculator",
  props: {
    hidden: {
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
      isMadeWithoutSecondOperand: false, //последняя операция выполнена без указания 2 операнда
      maxValueLength: 13, //максимальная длина значения на экране калькулятора
      memoryValue: "", //значения в ячейке памяти калькулятора
      isError: false, //ошибка, сообщающая о превышении допустимого значения калькулятора
      screenValue: '',
    };
  },
  computed: {
    //максимальное значения для калькулятора
    maxValue() {
      let value = "";

      for (let i = 0; i < this.maxValueLength; i++) {
        value += 9;
      }

      return value;
    },
  },
  mounted() {
    //при монтировании компонента на экране калькулятора появляется число 0
    this.screenValue = '0';
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
        if (this.screenValue === "0") {
          this.screenValue = "";
        }
        //если на экране результат только что выполненного вычисления, то записываем его в переменную
        if (this.screenValue !== 0 && this.isMadeCalculation) {
          this.isMadeCalculation = false;
          this.lastOperand = this.screenValue;
          this.screenValue = "";
        }
        //если уже был введен первый операнд, то активируем флаг и позволяем вводить значение второго операнда
        if (!this.isSecondOperand) {
          if (this.prevValue && this.operationName) {
            this.isSecondOperand = true;
            this.screenValue = "";
          }
        }
        //если вводится запятая
        if (number == ",") {
          //если в значении на экране еще нет запятой
          if (!String(this.screenValue).includes(",")) {
            this.screenValue =
              this.screenValue == 0
                ? (this.screenValue += "0,")
                : (this.screenValue += ",");
          }
        } else {
          //если значение превышает допустимую длину, то показываем ошибку
          if ((this.screenValue + number).length > this.maxValueLength - 1) {
            return
          } else {
            this.screenValue += number;
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
        let result = String(this.screenValue).split("");
        result.splice(result.length - 1, 1);
  
        this.screenValue = result.length == 0 || result == '-' ? 0 : result.join("");
    },
    /**
     * изменение знака значения на дисплее калькулятора
     * @returns void
     */
    changeSign() {
      if (!this.isError) {
        this.screenValue = String(this.screenValue).replace(',', '.')
        this.screenValue = -this.screenValue;
        this.transformResult()
        this.screenValue = String(this.screenValue).replace('.', ',')
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
        this.prevValue = String(this.screenValue).replace(',', '.');
      }
    },
    /**
     * проведение вычислений
     * @returns void
     */
    makeCalculation() {
      if (!this.isError) {
        //если после вычислений нажимают сразу на знак равно
        if (this.prevValue === '' && this.isMadeCalculation && this.lastOperand !== '' && this.lastOperation !== '') {
          this.prevValue = this.lastOperand
          this.operationName = this.lastOperation;
          this.isMadeWithoutSecondOperand = true
        }
        //если нажимают на равно без указания операции, то возвращаем последний операнд
        if (
          this.screenValue > 0 && this.operationName == "" && !this.isMadeCalculation && this.lastOperand
        ) {
          this.screenValue = this.lastOperand;
          return
        }

        //заменяем запятую на точку в значениях
        this.screenValue = String(this.screenValue).replace(',', '.');
        this.prevValue = String(this.prevValue).replace(',', '.');
        
        this.screenValue = new Decimal(this.screenValue)
        const screenResult = new Decimal(this.screenValue)
        this.prevValue = new Decimal(this.prevValue)
        
        //производим вычисления
        switch (this.operationName) {
          case "sum":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "sum";
            this.screenValue = this.isMadeWithoutSecondOperand
              ? screenResult.plus(this.prevValue) 
              : this.prevValue.plus(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "subst":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "subst";
  
            this.screenValue = this.isMadeWithoutSecondOperand
              ? screenResult.minus(this.prevValue)
              : this.prevValue.minus(screenResult);
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "mult":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "mult";
  
            this.screenValue = this.isMadeWithoutSecondOperand
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
              //исключаем делеие на 0
              if (this.prevValue == '0') {
                this.screenValue = 0;
                this.isError = true;
              } else {
                this.screenValue = screenResult.div(this.prevValue)
              }
            } else {
              //исключаем делеие на 0
              if (this.screenValue == '0') {
                this.screenValue = 0;
                this.isError = true;
              } else {
                this.screenValue = this.prevValue.div(screenResult)
              }
            }
  
            this.isMadeWithoutSecondOperand = false;
            break;
          case "pow":
            this.lastOperand = this.isMadeWithoutSecondOperand
              ? this.prevValue
              : screenResult;
            this.lastOperation = "pow";
  
            this.screenValue = this.isMadeWithoutSecondOperand
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
        this.screenValue = String(this.screenValue).replace('.', ',');
      }
    },
    /**
     * преобразование результата на экране к формату с допустимым количеством знаков
     * @returns void
     */
    transformResult() {
      //если получившийся результат больше допустимого значения, то показываем ошибку
      if (Number(String(this.screenValue)) > this.maxValue || String(this.screenValue).includes('e')) {
        this.screenValue = 0;
        this.isError = true;
      } else {
        let result = String(this.screenValue).split("");
        //записываем в переменную количество знаков с конца значения, которое нужно удалить, чтобы значение поместилось на экране
        const numbersCountToDelete = String(this.screenValue).length - this.maxValueLength;

        if (numbersCountToDelete > 0) {
          result.splice(
            result.length - 1 - numbersCountToDelete,
            numbersCountToDelete
          );
          //если значение вычисляемого квадратного корня максимально близко к единице и превышает по длине максимальное кол-во символов на экране,
          //то присваиваем значению на экране 1
          if (result.filter(elem => elem === '0').length == this.maxValueLength - 3) {
            result = [1]
          }
          this.screenValue = result.join("");
        }
      }
    },
    /**
     * операция выделения квадратного корня из числа
     * @returns void
     */
    getSqrt() {
      if (!this.isError) {
        this.screenValue = String(this.screenValue).replace(',', '.');
        const screenResult = new Decimal(this.screenValue)
        //исключаем выделение квадратного корня из отрицательного числа
        if (screenResult.toNumber() < 0) {
          this.screenValue = 0;
          this.isError = true;
        } else {
          this.screenValue = screenResult.sqrt()
          this.transformResult();
          this.isMadeCalculation = true;
        }
  
        this.screenValue = String(this.screenValue).replace('.', ',');
      }
    },
    /**
     * вывод обратной пропорциональности значения на экране
     * @returns void
     */
    getInverseProportionality() {
      if (!this.isError) {
        this.screenValue = String(this.screenValue).replace(',', '.');
        this.screenValue = 1 / Number(this.screenValue);
        this.transformResult();
        this.screenValue = String(this.screenValue).replace('.', ',');
        this.isMadeCalculation = true;
      }
    },
    /**
     * вывод синуса и косинуса числа на экране
     * @returns void
     */
    getSinOrCosValue(operation) {
      this.screenValue = String(this.screenValue).replace(',', '.');
      this.screenValue = Math[operation](
        Number(this.screenValue)
      );
      this.transformResult();
      this.screenValue = String(this.screenValue).replace('.', ',');
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
     * сохранение в ячейку памяти значения на экране
     * @returns void
     */
    memorySave() {
      if (!this.isError) {
        this.memoryValue = new Decimal(String(this.screenValue).replace(',', '.'));
        this.isMadeCalculation = true;
      }
    },
    /**
     * вывод значения в ячейке памяти на экран калькулятора
     * @returns void
     */
    memoryRecovery() {
      if (!this.isError) {
        this.screenValue =
          this.memoryValue == "" ? 0 : String(this.memoryValue.toNumber()).replace('.', ',');
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
            ? this.memoryValue = new Decimal(Number(String(this.screenValue).replace(',', '.')))
            : new Decimal(Number(String(this.screenValue).replace(',', '.'))).plus(this.memoryValue);
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
            ? this.memoryValue = new Decimal(0).sub(new Decimal(Number(String(this.screenValue).replace(',', '.'))))
            : this.memoryValue.sub(new Decimal(Number(String(this.screenValue).replace(',', '.'))));
        this.isMadeCalculation = true;
      }
    },
    /**
     * сброс значения второго операнда
     * @returns void
     */
    resetSecondOperand() {
      if (!this.isError) {
        this.screenValue = '0';
      }
    },
    /**
     * возврат калькулятора в дефолтное состояние
     * @returns void
     */
    resetCalcStateToDefault() {
      this.screenValue = '0';
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
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}
.calculator__header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  flex-wrap: nowrap;
  width: 100%;
  height: 30px;
  background: #00838f;
  border-radius: 10px 10px 0px 0px;
}
.calculator__hide-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 40px;
  line-height: 36px;
  position: relative;
  color: black
}
.screen__value {
  margin: 14px 7px 15px 8px;
  width: 100%;
  text-align: right;
}
.calculator__keyboard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 0 3px 3px 3px;
}
.keyboard__btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
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
  z-index: 2;
  bottom: 3px;
  left: 5px;
}
.screen__error-sign {
  display: block;
  width: 26px;
  height: 28px;
  font-size: 15px;
  position: absolute;
  z-index: 3;
  top: 3px;
  left: 5px;
}
.sign__wrapper {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}
.memory-sign__image {
  position: absolute;
  z-index: 2;
  bottom: 0px;
  left: 0px;
}
.error-sign__image {
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 0px;
}
</style>
