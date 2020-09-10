/* global Vue */

/* weex initialized here, please do not move this line */
import mixins from '@/lib/utils.js'
import { httpRequest, getHttpUrl, getHebeiHttpUrl } from '../lib/http.js'
Vue.mixin(mixins)
const Report = require('../pages/ModWeexStyle2/NewsDetail.vue')
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$getHttpUrl = getHttpUrl
Vue.prototype.$getHebeiHttpUrl = getHebeiHttpUrl
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root'}, Report))
