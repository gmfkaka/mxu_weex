/* global Vue */

/* weex initialized here, please do not move this line */
import mixins from '@/lib/utils.js'
import {httpRequest} from '../lib/http.js'
Vue.mixin(mixins)
const ModWeexStyle19 = require('../pages/ModWeexStyle19/ModWeexStyle19.vue')
Vue.prototype.$httpRequest = httpRequest
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root'}, ModWeexStyle19))
