import { nativeUtil } from './nativeUtils'
const platform = weex.config.env.platform.toLowerCase()
export const global = {
  domain: 'http://mapi-test.plus.hoge.cn',
  hebeiDomain: 'http://mapi.plus.hebtv.com'
}
export const api = {
  // 首页
  homeColumn: '/api/v1/column.php',
  homeNews: '/api/v1/news.php',
  // 首页文稿图集详情
  newsDatail: '/api/v1/item.php',
  newsRelation: '/api/v1/related_content.php',
  // 专题详情
  topicDetail: '/api/v1/special_detail.php',
  topicContent: '/api/open/js/special_content',
  // 评论
  commentList: '/api/v1/comment.php',
  // 直播 频道
  channelList: '/api/v1/channel.php',
  // 报料
  reportColumnList: '/api/v1/contribute_column.php',
  reportShowList: '/api/v1/contribute_show.php',
  reportDetail: '/api/v1/contribute_detail.php',
  reportComment: '/api/v1/comment.php',
  reportSort: '/api/v1/contribute_sort.php',
  contribute: '/api/v1/contribute.php', // 发布
  contribute_self: 'api/v1/contribute_show_self.php',
  // 点播节目
  vodList: '/api/v1/vod.php',
  // 服务
  serviceList: '/api/open/mxu/life_service',
  // 搜索
  textsearch: '/api/v1/textsearch.php',
  searchType: '/api/v1/search_type.php',
  searchList: '/api/v1/search_list.php'
}
// 请求接口的方法 ，传入 api名称，参数 ，和 方法get post,put
const jsonEncode = (json) => {
  let keys = Object.keys(json).sort() // 将参数名按ASCII排序
  let arr = []
  keys.forEach(key => {
    if (json[key] !== undefined && json[key] !== null) {
      if (typeof json[key] === 'object') { // 如果值是对象或者数组，则序列化成 json 字符串
        arr.push(`${key}=${JSON.stringify(json[key])}`)
      } else {
        arr.push(`${key}=${json[key]}`)
      }
    }
  })
  return arr.join('&')
}

export const httpRequest = async (url, param, method) => {
  let options = {
    method,
    url,
    headers: {},
    type: 'json',
    body: ''
  }
  if (platform !== 'web') {
    const header = await nativeUtil.getRequestHeader()
    if (header) {
      Object.assign(options.headers, header)
    }
  }
  if (method.toLowerCase() === 'get') {
    options.url += '?' + encodeURI(jsonEncode(param))
  } else {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(param)
  }
  return new Promise(function (resolve, reject) {
    weex.requireModule('stream').fetch(options, function (response) {
      if (!response.ok) {
        reject(response)
      } else {
        resolve(response.data)
      }
    })
  })
}

export const getHttpUrl = (apiName) => {
  return `${global.domain}${api[apiName]}`
}
export const getHebeiHttpUrl = (apiName) => {
  return `${global.hebeiDomain}${api[apiName]}`
}
