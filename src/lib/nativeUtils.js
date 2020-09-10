// 客户端方法
const nativeUtilModule = weex.requireModule('nativeUtil')
const fileModule = weex.requireModule('fileManage')
const storage = weex.requireModule('storage')
export const nativeUtil = {
  // 获取storage
  getStorageItem (key) {
    return new Promise((resolve, reject) => {
      storage.getItem(key, event => {
        let token = event.data
        if (token) {
          resolve(token)
        } else {
          reject(event)
        }
      })
    })
  },
  // 打印
  log (param) {
    nativeUtilModule.log(param)
  },
  // 分享
  shareTo (param) {
    nativeUtilModule.shareTo(param)
  },
  // 查看大图
  viewPictures (param) {
    nativeUtilModule.viewPictures(param)
  },
  // 跳链接
  linkTo (param) {
    nativeUtilModule.linkTo(param)
  },
  // 获取版本号
  getVersionName () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.getVersionName(res => {
        resolve(res)
      })
    })
  },
  // 获取登录状态
  getLoginStatus () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.seekLoginStatus(res => {
        resolve(res)
      })
    })
  },
  // 获取用户信息
  getUserInfo () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.seekUserInfo(res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 获取定位信息
  getLocation () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.seekLocationInfo(res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 获取配置文件
  getConfig (param) {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.seekConfigurationFile(param, res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 跳转登录页
  goLogin () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.pushLoginPage(res => {
        resolve(res)
      })
    })
  },
  // 跳转用户中心
  goUserCenter () {
    nativeUtilModule.pushUserCenter()
  },
  // 显示文本提示
  alert (param) {
    nativeUtilModule.displayTextPrompt(param)
  },
  // 是否开启侧滑
  allowSlideBack (param) {
    nativeUtilModule.allowSlideBack(param)
  },
  // 文件选择
  chooseFile (param) {
    return new Promise(function (resolve, reject) {
      fileModule.chooseFile(param, res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 跳转设置页面
  goSetting (param) {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.pushSettingPage(param, res => {
        resolve(res)
      })
    })
  },
  // 文件上传
  uploadFile (param) {
    return new Promise(function (resolve, reject) {
      fileModule.uploadFile(param, res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 获取签到状态
  getSignInStatus () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.loadSignInStatus(res => {
        resolve(res)
      })
    })
  },
  // 用户中心签到
  signIn () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.signInClick(res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 获取收藏状态
  obtainCollectedState (param) {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.obtainCollectedState(param, res => {
        resolve(res)
      })
    })
  },
  // 执行收藏操作
  executeCollectOperation (param) {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.executeCollectOperation(param, res => {
        resolve(res)
      })
    })
  },
  // 取消收藏
  cancelCollectOperation (param) {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.cancelCollectOperation(param, res => {
        resolve(res)
      })
    })
  },
  // 获取系统信息
  // isRoot 1为主模块 主模块底部有tabbar
  // tabBarHeight tabbar高度
  getSystemInfo () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.getSystemInfo(res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  },
  // 获取请求头加密信息
  getRequestHeader () {
    return new Promise(function (resolve, reject) {
      nativeUtilModule.getRequestHeader(res => {
        resolve(res ? JSON.parse(res) : {})
      })
    })
  }
}
