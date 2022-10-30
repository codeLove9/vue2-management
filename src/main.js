import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex'
import '@/plugins/elementCompomonts'
import '@/api/mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.commit('addRouter')
  },
  render: h => h(App)
}).$mount('#app')
