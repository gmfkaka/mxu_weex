import { Utils } from 'weex-ui'
import { nativeUtil } from './nativeUtils'
const navigator = weex.requireModule('navigator')
const platform = weex.config.env.platform.toLowerCase()
export default {
  data () {
    return {
      platform: '',
      androidStyleTop: {},
      androidStyleMarginTop: {},
      androidStylePaddingTop: {}
    }
  },
  computed: {
    // 是否为客户端
    isClient () {
      return (platform === 'android' || platform === 'ios')
    }
  },
  methods: {
    // 获取当前终端类型
    getPlatform () {
      return platform
    },
    // 判断是否iphonex
    isIphoneX () {
      return Utils.env.isIPhoneX()
    },
    // 图片区分 客户端和web端
    getLocalImgUrl (url) {
      if (platform === 'android') {
        return '/src/assets/weexImage/' + url
      } else if (platform === 'ios') {
        return 'local:///' + url
      } else {
        return '../../src/images/' + url
      }
    },
    // 封面图裁剪拼接
    cutCover (img, width, height) {
      return `${img}?imageView/0/h/${height}/w/${width}`
    },
    // 返回上一页
    goBack () {
      if (this.isClient) {
        navigator.pop({animated: 'true'})
      } else {
        this.$router.back()
      }
    },
    // 跳转页面
    jumpWithParams (to, params = {}) {
      if (this.isClient) {
        let q = this.createQuery(params)
        navigator.push({
          url: 'local://weexJs/' + to + '.js' + q,
          animated: 'true'
        }, event => {
        })
      } else {
        if (this.$router) {
          this.$router.push({path: to, query: params})
        }
      }
    },
    // object 转 URL 参数
    createQuery (obj) {
      if (obj === null || obj === '' || obj.length === 0) {
        return ''
      }
      let url = '?'
      for (let key in obj) {
        if (obj[key] !== null) {
          url += (key + '=' + encodeURIComponent(obj[key]) + '&')
        }
      }
      return url.substring(0, url.lastIndexOf('&'))
    },
    // 'xxx.js?name=aa' 转 {name: 'aa'}
    // 获取页面参数
    getQueryData (url) {
      url = url.substring(url.indexOf('.js?') + 3)
      let result = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          result[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
      }
      return result
    },
    // 获取URL参数
    getQuery () {
      if (this.isClient) {
        return this.getQueryData(weex.config.bundleUrl)
      } else {
        return this.$route.query
      }
    },
    // 获取URL中的参数链接 ?后面的
    getUrlParam () {
      let str = weex.config.bundleUrl
      let num = str.indexOf('?')
      str = str.substr(num + 1)
      return str
    },
    add0 (m) { return m < 10 ? '0' + m : m },
    // 格式化时间格式
    format (timestamp, splitMarker) {
      const marker = splitMarker || '-'
      let time = new Date(timestamp)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()
      let mm = time.getMinutes()
      let s = time.getSeconds()
      return y + marker + this.add0(m) + marker + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    // 颜色转换
    formatColor (color) {
      // #ff 000000
      let rgb1 = color.substring(3, 5)
      rgb1 = parseInt(rgb1, 16)
      let rgb2 = color.substring(5, 7)
      rgb2 = parseInt(rgb2, 16)
      let rgb3 = color.substring(7, 9)
      rgb3 = parseInt(rgb3, 16)
      let opacity = color.substring(1, 3)
      opacity = parseInt(opacity, 16).toFixed(2)
      return `rgba(${rgb1},${rgb2},${rgb3},${opacity})`
    },
    // 发布时间转换
    transTime (dataTime) {
      let forwardTime
      let upadtaTime = dataTime * 1000
      let currentTime = new Date().getTime()
      let minutes = parseInt((currentTime - upadtaTime) / 60000)
      if (minutes < 1) {
        forwardTime = '刚刚'
      } else if (minutes >= 1 && minutes < 60) {
        forwardTime = minutes + '分钟前'
      } else if (minutes >= 60 && minutes < 1440) {
        forwardTime = parseInt(minutes / 60) + '小时前'
      } else if (minutes >= 1440) {
        let date = new Date(upadtaTime)
        // let Y1 = new Date().getFullYear()
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        // if (Y1 === Y) {
        //   forwardTime = M + '-' + D
        // } else {
        forwardTime = Y + '-' + M + '-' + D
        // }
      }
      return forwardTime
    },
    // 图片裁剪
    cutImg  (obj, width, height) {
      const imgwidth = width || obj.imgwidth
      const imgheight = height || obj.imgheight
      let url = obj.host + obj.dir + obj.filepath + obj.filename
      url = url.replace('{$hgPicSizeStart}', '').replace('{$hgPicSizeWidth}', imgwidth).replace('{$hgPicSizeHeight}', imgheight).replace('{$hgPicSizeEnd}', '')
      return url
    },
    // 获取图片高度
    getImgHeight (obj, width) {
      const height = width / 750 * obj.imgheight
      return height
    },
    // 按指定长度切割数组
    chunk (array, size) {
      // 获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
      const length = array.length
      // 判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return []
      }
      // 核心部分
      let index = 0 // 用来表示切割元素的范围start
      let resIndex = 0 // 用来递增表示输出数组的下标

      // 根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size))
      // 进行循环
      while (index < length) {
        // 循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size))
      }
      // 输出新数组
      return result
    }
  },
  created () {
  },
  beforeCreate () {
    if (this.isClient) {
      nativeUtil.getSystemInfo().then(res => {
        if (res.statusbar_height) {
          this.androidStyleMarginTop = {
            marginTop: `${res.statusbar_height}px`
          }
          this.androidStylePaddingTop = {
            paddingTop: `${res.statusbar_height}px`
          }
          this.androidStyleTop = {
            top: `${res.statusbar_height}px`
          }
        }
      })
    }
  }
}
