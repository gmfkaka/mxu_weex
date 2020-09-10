/* global Vue */

/* weex initialized here, please do not move this line */

import mixins from '@/lib/utils.js'
import { httpRequest, getHttpUrl, getHebeiHttpUrl } from '@/lib/http.js'
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$getHttpUrl = getHttpUrl
Vue.prototype.$getHebeiHttpUrl = getHebeiHttpUrl
const { router } = require('./router')
const App = require('@/index.vue')
// const meta = weex.requireModule('meta')
// register global mixins.
Vue.mixin(mixins)
// // 配置 viewport 的宽度为 375px
// meta.setViewport({
//   width: 375,
//   roundOffDeviation: false
// })
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App))
router.push('/')
