/* global Vue */

/* weex initialized here, please do not move this line */
import mixins from '@/lib/utils.js'
import { httpRequest, getHttpUrl } from '../lib/http.js'
Vue.mixin(mixins)
const Report = require('../pages/ModWeexStyle2/CommentList.vue')
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$getHttpUrl = getHttpUrl
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root'}, Report))
