<template>
     <div class="main">
        <show-loading
            :show="isShow"
            type="custom"
            m-url="loading.gif"
            m-width="120"
            m-height="120"
            m-backgroundcolor="#f2f6fa"
        >
        </show-loading>
        <div style="padding-left:10px;padding-right:10px;">
          <search></search>
        </div>
        <scroller class="wrapper" show-scrollbar="false">
            <div style="display:flex;flex-direction:row;">
              <div class="content-title" v-if="type === 'article'" style="margin-left:30px;flex:1;">
                  <div style="flex:1;">
                    <text class="content-title-text">{{detail.title}}</text>
                    <text class="content-title-author">{{detail.author}}</text>
                    <text class="content-title-time">{{detail.create_time_format.substring(0,16)}}</text>
                  </div>
              </div>
              <!-- <text v-if="type === 'article' && detail.brief !== ''" class="brief">{{detail.brief}}</text> -->
              <div class="info" v-if="type !== 'article'" style="margin-left:30px;flex:1;">
                  <image class="info-img" :src="src"></image>
                  <div style="flex:1;">
                      <text class="title-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{bookTitle}}</text>
                      <text class="author-text" v-if="detail.author !== ''">{{detail.author}}</text>
                  </div>
              </div>
              <div class="icon-box" v-if="detail.title">
                  <image :src="getLocalImgUrl('feature_share.png')" class="share-container-icon" @click="share()"></image>
                  <image v-if='!collectState' :src="getLocalImgUrl('feature_collect.png')" class="share-container-icon" @click="goCollect()"></image>
                  <image v-else :src="getLocalImgUrl('feature_collected.png')" class="share-container-icon" @click="delCollect()"></image>
              </div>
            </div>
            <div class="article-content" :ref="scollTop">
                <rich-text v-if="richContent" :style="richTextStyle" :content="richContent" @finished="finished"></rich-text>
            </div>
            <!-- <div v-html="detail.content" class="article-content"></div> -->
            <div style="display: flex;justify-content: space-between;flex-direction: row; margin-bottom: 50px" v-if ="!isShow && fromSingle">
              <text class="prew" :class="[showPrew ? '' : 'unclick']" @click="prew()">上一章</text>
              <text class="next" :class="[showNext ? '' : 'unclick']" @click="next()">下一章</text>
            </div>
        </scroller>
        <comment :data="detail" v-if="detail.iscomment === '1'"></comment>
     </div>
</template>

<script>
import Search from '../../components/feature/Search'
import Comment from '../../components/feature/Comment'
import ShowLoading from '../../components/common/ShowLoading'
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcPartLoading } from 'weex-ui'
const EBook = new BroadcastChannel('EBook')
const dom = weex.requireModule('dom')
export default {
  name: 'HomeArticleDetail',
  components: {
    Search,
    Comment,
    ShowLoading,
    WxcPartLoading
  },
  data () {
    return {
      isShow: true,
      type: '',
      detail: {
        column_info: {name: ''}
      },
      fromSingle: 0,
      detailNext: {},
      src: '',
      richTextStyle: {},
      config: {},
      api: {},
      collectState: false,
      bookTitle: '',
      bookNextTitle: '',
      memberId: '',
      scollTop: 'scollTop',
      showNext: false,
      showPrew: false,
      bookList: [], // 章节列表
      bookIndex: '', // 当前章节在列表的序号
      id: ''// 书本id
    }
  },
  methods: {
    getAllData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.id,
        new_style: 2
      }
      this.$httpRequest(this.api.detail_comment_list, param, 'get').then(res => {
        this.bookList = res
        if (this.bookIndex === this.bookList.length - 1) {
          this.showNext = false
        } else {
          this.showNext = true
        }
        if (this.bookIndex === 0) {
          this.showPrew = false
        } else {
          this.showPrew = true
        }
        this.getNextData(this.bookList[this.bookIndex + 1].id)
      }, (e) => {
        console.log(e)
      })
    },
    getNextData (id) {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: id
        // id: 3036
      }
      this.$httpRequest(this.api.content_detail, param, 'get').then(res => {
        this.detailNext = res[0]
        this.bookNextTitle = this.detailNext.title
        this.src = this.detailNext.indexpic.host + this.detailNext.indexpic.dir + '32x48/' + this.detailNext.indexpic.filepath + this.detailNext.indexpic.filename
        // 插入图片 material替换div的节点
        let content = this.detailNext.content.match(/<div m2o_mark="(.*?)" style="display:none"><\/div>/g)
        for (let i = 0; i < content.length; i++) {
          let picsrc = this.detailNext.material[i]['pic']['host'] + this.detailNext.material[i]['pic']['dir'] + this.detailNext.material[i]['pic']['filepath'] + this.detailNext.material[i]['pic']['filename']
          this.detailNext.content = this.detailNext.content.replace(content[i], '<p><img src="' + picsrc + '"/></p>')
        }
        const postInfo = {
          id: this.getQuery().id
        }
        EBook.postMessage(postInfo)
      }, (e) => {
        console.log(e)
      })
    },
    getData (id) {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: id
        // id: 3036
      }
      this.$httpRequest(this.api.content_detail, param, 'get').then(res => {
        this.detail = {
          column_info: {name: ''}
        }
        this.detail = res[0]
        this.bookTitle = this.detail.title
        this.src = this.detail.indexpic.host + this.detail.indexpic.dir + '32x48/' + this.detail.indexpic.filepath + this.detail.indexpic.filename
        // 插入图片 material替换div的节点
        let content = this.detail.content.match(/<div m2o_mark="(.*?)" style="display:none"><\/div>/g)
        for (var i = 0; i < content.length; i++) {
          var picsrc = this.detail.material[i]['pic']['host'] + this.detail.material[i]['pic']['dir'] + this.detail.material[i]['pic']['filepath'] + this.detail.material[i]['pic']['filename']
          this.detail.content = this.detail.content.replace(content[i], '<p><img src="' + picsrc + '"/></p>')
        }
        const postInfo = {
          id: this.getQuery().id
        }
        EBook.postMessage(postInfo)
      }, (e) => {
        console.log(e)
      })
    },
    // 富文本加载完成
    finished (e) {
      this.setRichTextStyle(e)
      this.isShow = false
    },
    // 设置富文本高度
    setRichTextStyle (res) {
      let { width, height } = res
      // 不同机型宽高不定 按比例计算
      let scale = 750 / width
      height = height * scale
      if (height <= 50) height = 50
      this.richTextStyle = { height: `${height}px`, width: '750px' }
    },
    // 分享
    share () {
      const param = {
        title: this.detail.title,
        brief: this.detail.brief,
        imageLink: this.detail.indexpic.host + this.detail.indexpic.dir + this.detail.indexpic.filepath + this.detail.indexpic.filename,
        contentUrl: this.detail.content_url
      }
      nativeUtil.shareTo(param)
    },
    // 获取收藏状态
    getCollectState () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.id': this.getQuery().id,
          'extends.type': 'article'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/show', param, 'post').then(res => {
        if (res.data.length) {
          this.collectState = true
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 去收藏
    goCollect () {
      const _this = this
      if (!this.memberId) {
        nativeUtil.goLogin().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              if (res.userid) {
                _this.memberId = res.userid
              }
            })
          }
        })
      } else {
        const param = {
          bucket_name: 'shoucang',
          extends: {
            id: this.getQuery().id,
            author: this.detail.author,
            title: this.detail.title,
            indexpic: this.detail.indexpic.host + this.detail.indexpic.dir + '170x250/' + this.detail.indexpic.filepath + this.detail.indexpic.filename,
            brief: this.detail.brief,
            member_id: this.memberId,
            type: 'article',
            outLink: 'local://weexJs/ModWeexStyle6FeatureHomeArticleDetail.js?id=' + this.getQuery().id + '&type=' + this.getQuery().type
          }
        }
        this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/create', param, 'post').then(res => {
          if (res.data.uuid && res.msg === '请求成功') {
            nativeUtil.alert('收藏成功')
            this.collectState = true
          }
        }, (e) => {
          console.log(e)
        })
      }
    },
    // 取消收藏
    delCollect () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.id': this.getQuery().id,
          'extends.type': 'article'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/delete', param, 'post').then(res => {
        if (res.msg === '请求成功') {
          nativeUtil.alert('取消收藏成功')
          this.collectState = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取配置文件
    async getConfig () {
      const _this = this
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10127',
          'uniqueid': 'home2',
          'type': '1',
          'name': '首页',
          'ename': 'home2',
          'custom_name': '首页',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle6',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '特写',
            'button_backgroundcolor': '#ff000000',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ff333333',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'http://mobile.tjpress.com/tjpress/item.php',
            'dept_list': 'http://mobile.tjpress.com/tjpress/mx_news.php',
            'detail_comment_list': 'http://mobile.tjpress.com/tjpress/special_content.php',
            'ebook_detail': 'http://mobile.tjpress.com/tjpress/ebooks_top_column.php',
            'ebook_list': 'http://mobile.tjpress.com/tjpress/ebooks_list.php',
            'home_column': 'home_column',
            'home_list': 'http://mobile.tjpress.com/tjpress/get_content_info.php',
            'home_list_mine': 'http://mobile.tjpress.com/tjpress/special_detail.php',
            'my_listen': 'http://mobile.tjpress.com/tjpress/wt_get_content_info.php',
            'my_look': 'http://mobile.tjpress.com/tjpress/wd_get_content_info.php',
            'my_speak': 'http://mobile.tjpress.com/tjpress/ws_get_content_info.php',
            'my_write': 'http://mobile.tjpress.com/tjpress/wx_get_content_info.php',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.type = this.getQuery().type
        // this.bookTitle = this.getQuery().title
        this.id = this.getQuery().columnId
        this.fromSingle = this.getQuery().fromSingle
        let id = weex.config.id ? weex.config.id : this.getQuery().id
        this.bookIndex = parseInt(this.getQuery().index)
        this.getData(id, 1)
        this.getCollectState()
        this.getAllData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.type = this.getQuery().type
        // this.bookTitle = this.getQuery().title
        this.id = this.getQuery().columnId
        this.fromSingle = this.getQuery().fromSingle
        let id = weex.config.id ? weex.config.id : this.getQuery().id
        this.bookIndex = parseInt(this.getQuery().index)
        this.getData(id, 1)
        this.getAllData()
        nativeUtil.getLoginStatus().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              if (res.userid) {
                _this.memberId = res.userid
                _this.getCollectState()
              }
            })
          }
        })
      }
    },
    next () {
      if (!this.showNext) return
      this.detail = this.detailNext
      this.bookTitle = this.bookNextTitle
      this.bookIndex += 1
      // 获取当前index+1的数据
      let id = this.bookList[this.bookIndex + 1].id
      this.getNextData(id)
    },
    prew () {
      if (!this.showPrew) return
      this.bookIndex -= 1
      let id = this.bookList[this.bookIndex].id
      let nextId = this.bookList[this.bookIndex + 1].id
      this.getData(id)
      this.getNextData(nextId)
    }
  },
  computed: {
    richContent () {
      if (this.detail.content) {
        if (this.getPlatform() === 'ios') {
          let content = `
                  <html>
                      <head>
                          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                      </head>
                      <style>
                        p{text-indent:2em !important;margin:0;}
                        span{line-height:unset !important;}
                        img{display:block;max-width:100%;margin:0 auto;}
                      </style>
                      <body>${this.detail.content}</body>
                  </html>
                `
          return content
        } else {
          let content = `<style>p{text-indent:2em !important;margin:0;}span{line-height:unset !important;}img{display:block;max-width:100%;margin:0 auto;}</style>${this.detail.content}`
          return content
        }
      }
    }
  },
  watch: {
    bookIndex () {
      if (this.bookIndex === this.bookList.length - 1) {
        this.showNext = false
      } else {
        this.showNext = true
      }
      if (this.bookIndex === 0) {
        this.showPrew = false
      } else {
        this.showPrew = true
      }
      var el = this.$refs.scollTop
      dom.scrollToElement(el, {offset: 0})
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.main{
  width: 750px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.prew{
  width: 375px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #6AAF93;
  color: #fff;
  flex-shrink: 1;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:#ccc;
}
.next{
  width: 375px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #6AAF93;
  color: #fff;
  flex-shrink: 1;
}
.unclick{
  background-color: #ccc;
}
.wrapper{
    width: 750px;
    flex:1;
    padding-bottom: 100px;
}
.info{
    flex-direction: row;
}
.info-img{
    width: 32px;
    height: 48px;
    position: absolute;
    top: 0;
    left: 0;
}
.brief{
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #fff;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 22px;
    color:#6A6A6A;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.title-text{
    font-size:36px;
    color:#6a6a6a;
    margin-bottom: 8px;
    lines: 2;
    text-overflow:ellipsis;
    width: 600px;
}
.author-text{
    font-size: 28px;
    color:#9c9c9c;
}
.article-content{
    width: 750px;
    margin-top: 20px;
    background-color: #fff;
}
.loading-box{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
}
.loading-icon{
  width: 150px;
  height: 150px;
}
.content-title{
    flex-direction: row;
    justify-content: space-between;
}
.icon-box{
  width: 125px;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
}
.share-container-icon{
    width: 43px;
    height: 43px;
}
.content-title-text{
  font-size:36px;
  color:#6a6a6a;
  // width:580px;
  // lines:2;
  // text-overflow:ellipsis;
}
.content-title-author{
  font-size:28px;
  color:#9c9c9c;
  margin-top:10px;
  margin-bottom:10px;
}
.content-title-time{
  font-size:28px;
  color:#9c9c9c;
}
</style>
