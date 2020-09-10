/* global Vue */

/* weex initialized here, please do not move this line */
import mixins from '@/lib/utils.js'
import { httpRequest } from '../lib/http.js'
Vue.mixin(mixins)
Vue.prototype.$httpRequest = httpRequest
const HomeCommentList = require('../pages/ModWeexStyle6/ModWeexStyle6HomeCommentList.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root'}, HomeCommentList))
