// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/'

// mock
// import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import i18n from './locales'

import './core/global_components'

Vue.config.productionTip = false;

Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app')
