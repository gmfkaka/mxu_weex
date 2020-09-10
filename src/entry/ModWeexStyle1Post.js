/* global Vue */

/* weex initialized here, please do not move this line */
import mixins from '@/lib/utils.js'
import { httpRequest } from '../lib/http.js'
Vue.mixin(mixins)
const Post = require('../pages/ModWeexStyle1/Post.vue')


Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$getHttpUrl = getHttpUrl
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root'}, Post))
