// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store'

import Loading from './components/Loading'

Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
	store,
	el: '#app',
	template: '<App/>',
	components: {
		App
	}
})
