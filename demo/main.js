
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Demo from './Demo.vue'

Vue.use(ElementUI)
new Vue({
  el: '#app',
  components: {
    demo: Demo
  },
  render: h => h(Demo)
})
