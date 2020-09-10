<template>
     <div class="home-wrapper">
       <!-- 头部 -->
      <nav :is-back="true"></nav>
      <no-date1 v-if="!comment.length" :height="'500px'"></no-date1>
      <list  class="comment-wrapper" show-scrollbar="false" v-if="!dataloading && comment.length">
        <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
            <refresh-style></refresh-style>
        </refresh>
        <cell class="comment-items" v-for="(item,idx) in comment"  :key="idx" :class="[idx!=comment.length-1?'borbottom':'']">
          <!-- 头部 -->
          <div class="comment-list-header">
            <div class="header-left">
              <div v-if="!(item.head_pic && item.head_pic.host)" class="person-avater border-avater">
                <image resize="contain" :src="getLocalImgUrl('icon_username3x.png')" class="person-avater"></image>
              </div>
              <image :src="item.head_pic.host + item.head_pic.dir +  '62x62/' +item.head_pic.filepath + item.head_pic.filename" class="person-avater" v-if="item.head_pic && item.head_pic.host"></image>

              <text class="person-name">{{item.user_name}}</text>
            </div>

            <div class="list-column-name">
              <text class="column-names">{{transTime(item.create_time)}}</text>
            </div>
          </div>
          <!-- 内容 -->
          <div class="comment-content">
              <text class="comment-content-text">{{item.content}}</text>
          </div>
        </cell>
         <!-- 加载更多 start -->
        <loading v-if="hasMore" class="loading-box" @loading="onloading" :display="loadingmore ? 'show' : 'hide'">
          <loading-indicator class="indicator"></loading-indicator>
          <text class="loading-text">加载中</text>
        </loading>
        <cell v-if="!hasMore&& comment.length">
          <text class="no-more-data">没有更多了</text>
        </cell>
      </list>
      <show-loading
              :show="dataloading"
              type="custom"
              m-url="loading.gif"
              m-width="120"
              m-height="120"
              m-backgroundcolor="#f2f6fa"
          >
      </show-loading>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
// const picker = weex.requireModule('picker')
import nav from '../../components/weexstyle16/nav'
import RefreshStyle from '../../components/common/RefreshStyle'
import { WxcLoading } from 'weex-ui'
import NoDate1 from '../../components/weexstyle16/NoDate1.vue'
import ShowLoading from '../../components/common/ShowLoading'
export default {
  name: 'ModWeexStyle16',
  data () {
    return {
      help_id: '',
      dataloading: true,
      config: {},
      custom_appid: '',
      custom_appkey: '',
      comment: [],
      hasMore: true,
      loadingmore: false,
      refreshing: true,
      pageOption: {
        page: 1,
        size: 10,
        total: 0
      },
      param: {}
    }
  },
  components: {
    nav,
    NoDate1,
    WxcLoading,
    RefreshStyle,
    ShowLoading
  },
  methods: {
    // 下拉刷新
    onrefresh () {
      this.pageOption.page = 1
      this.refreshing = true
      this.getData()
    },
    // 加载更多
    onloading () {
      this.loadingmore = true
      if (!this.hasMore) {
        this.loadingmore = false
        return
      }
      this.pageOption.page += 1
      this.getData()
    },
    // 获取用户信息
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '11984',
          'uniqueid': 'weexreport',
          'type': '1',
          'name': '新时代报料',
          'ename': 'weexreport',
          'custom_name': '新时代报料',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '1',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle16',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'ui_android_depends': '',
          'attrs': [ ],
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.fhtv.net.cn/fhtw/news_slide.php',
            'home_list': 'http://help-api.cloud.hoge.cn/index.php',
            // 'home_list': 'http://helpsc.cloud.hoge.cn/index.php',
            'home_list_mine': 'home_list_mine',
            'my_listen': 'my_listen',
            'my_look': 'my_look',
            'my_speak': 'my_speak',
            'my_write': 'my_write',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'weexreport'
        }
        // 获取api
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // 获取appid/appkey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          this.getData()
        }
      }
    },
    // 获取评论
    getData () {
      let param = {
        page: this.pageOption.page,
        size: this.pageOption.size,
        m: 'Apihelp',
        c: 'fact',
        a: 'comentList',
        help_id: this.help_id
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.hasMore = true
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          this.dataloading = false
          const comments = res.data.coment_list
          this.pageOption.total = res.data.total
          if (this.pageOption.page === 1) {
            this.comment = comments
          } else {
            this.comment = this.comment.concat(comments)
            if (comments.length && parseInt(comments.length, 10) < parseInt(res.data.total, 10)) {
              this.hasMore = true
            } else {
              this.hasMore = false
            }
          }
          this.dataloading = false
          this.loadingmore = false
          this.refreshing = false
        } else {
          nativeUtil.alert(res.message)
          this.dataloading = false
          this.loadingmore = false
          this.refreshing = false
        }
      }, (e) => {
        console.log(e)
      })
    }
  },

  created () {
    this.help_id = this.getQuery().id
    if (this.getPlatform() === 'web') {
      this.param.custom_appid = '154'
      this.param.custom_appkey = 'ihJhUxistGOuuJMT6dCveUyqupietbsB'
      this.param.access_token = '6fcb8fe9100d45b34fa0ea72767ea740'
    }
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">

.home-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.comment-wrapper{
  width: 750px;
  border-top-width:1px;
  border-top-color:#EDEDED;
  border-top-style:solid;
  padding-left:24px;
  padding-right:24px;
}
.comment-items{
  padding-top:24px;
  padding-bottom:19px;
  width: 702px;
}
.borbottom{
  border-bottom-style:dashed;
  border-bottom-width:1px;
  border-bottom-color: #D8D7D7;
}
//列表头部
.comment-list-header{
  flex-direction: row;
  width: 702px;
  align-items: center;
  height:62px;
  justify-content: space-between;
}
.header-left{
  flex-direction: row;
  align-items: center;
}
.person-avater{
  width: 62px;
  height:62px;
  border-bottom-left-radius:31px;
  border-bottom-right-radius:31px;
  border-top-left-radius:31px;
  border-top-right-radius:31px;
  margin-right:20px;
}
.border-avater{
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color: #EEEEEE;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color: #EEEEEE;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color: #EEEEEE;
   border-left-style:solid;
  border-left-width:1px;
  border-left-color: #EEEEEE;
}
.person-name{
  color:#999999;
  font-size: 24px;
}
.column-names{
  color:#BABABA;
  font-size:22px;
  line-height: 40px;
}
.comment-content{
  width: 702px;
  margin-top:20px;
}
.comment-content-text{
  color:#333;
  font-size: 28px;
}
//加载更多
.loading-box{
  width: 730px;
  height: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.loading-text{
  color: #9c9c9c;
}
.refresh{
  width: 750px;
  height:80px;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.no-more-data{
  color:#9c9c9c;
  width: 730px;
  text-align: center;
}
</style>
