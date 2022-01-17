import Vue from 'vue'
import App from './App.vue'
import draggableDirective from '@/components/directives/draggable'
import resizableDirective from '@/components/directives/resizable'
import Decimal from 'decimal.js';

Vue.config.productionTip = false

Vue.directive('draggable', draggableDirective)
Vue.directive('resizable', resizableDirective)

new Vue({
  Decimal,
  render: h => h(App),
}).$mount('#app')


