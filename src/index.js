import '~/js/common'
import '~/assets/css/main.css'
import '~/assets/scss/main.scss'

window.Vue = require('vue')
import store from './store'

window.Vue.component('example-component', require('./components/Example.vue').default)

const components = new Vue({
  store,
  el: '#components'
})