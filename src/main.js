import Vue from 'vue'
import App from './App.vue'
import draggableDirective from '@/components/directives/draggable'
import resizableDirective from '@/components/directives/resizable'

Vue.config.productionTip = false

Vue.directive('draggable', draggableDirective)
Vue.directive('resizable', resizableDirective)

new Vue({
  render: h => h(App),
}).$mount('#app')


