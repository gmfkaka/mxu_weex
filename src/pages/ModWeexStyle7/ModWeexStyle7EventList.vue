<template>
     <div class="home-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
       <head :title="'热门'"></head>
       <list class="list" show-scrollbar="false" v-if="bookList.length">
         <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
              <refresh-style :mLeft="340"></refresh-style>
          </refresh>
          <cell>
              <list6 :data="bookList" :title="title"></list6>
          </cell>
          <loading v-if="hasMore" class="loading-box" @loading="onloading" :display="loading ? 'show' : 'hide'">
              <loading-indicator class="indicator"></loading-indicator>
              <text class="loading-text">加载中</text>
          </loading>
          <cell v-if="!hasMore">
              <text class="no-more-data">没有更多了</text>
          </cell>
       </list>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import List6 from '../../components/feature/List6'
import Head from '../../components/feature/Head'
export default {
  name: 'HomeListenList',
  components: {
    List6,
    Head,
    RefreshStyle
  },
  data () {
    return {
      title: '',
      refreshing: true,
      loading: false,
      hasMore: true,
      offset: 0,
      bookList: [],
      config: {},
      api: {}
    }
  },
  methods: {
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        offset: this.offset,
        count: 10,
        column_id: this.id
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (this.offset === 0) {
          this.bookList = res.list
        } else {
          if (res.length) {
            this.bookList = this.bookList.concat(res)
            if (res.length < 10) {
              this.hasMore = false
            }
          } else {
            this.hasMore = false
          }
        }
        this.refreshing = false
        this.loading = false
      }, (e) => {
        nativeUtil.alert(e)
      })
    },
    // 下拉刷新
    onrefresh () {
      this.offset = 0
      this.refreshing = true
      this.getData()
    },
    // 上拉加载
    onloading () {
      this.loading = true
      if (!this.hasMore) {
        this.loading = false
        return
      }
      this.offset += 10
      this.getData()
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10432',
          'uniqueid': 'redian2',
          'type': '1',
          'name': '热点',
          'ename': 'redian2',
          'custom_name': '热点',
          'normal_pic': {
            'id': '29991',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0806/29/',
            'filename': '29945199831279fb35e3ed1455f12ec5.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '54',
            'imgheight': '54',
            'filesize': '5084'
          },
          'press_pic': {
            'id': '29992',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0806/67/',
            'filename': '673b77378e90df9081a77f820952a420.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '51',
            'imgheight': '51',
            'filesize': '5042'
          },
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle7',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#ff4576e0',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ff333333',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'http://mobile.tjpress.com/tjpress/special_detail.php',
            'dept_list': 'dept_list',
            'detail_comment_list': 'http://mobile.tjpress.com/tjpress/special_content.php',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.tjpress.com/tjpress/get_content_info_redian.php',
            'home_list': 'http://mobile.tjpress.com/tjpress/mx_news.php',
            'home_list_mine': 'http://mobile.tjpress.com/tjpress/special_content.php',
            'my_listen': 'my_listen',
            'my_look': 'my_look',
            'my_speak': 'my_speak',
            'my_write': 'my_write',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.id = this.getQuery().id
        this.title = this.getQuery().title
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'redian2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.id = this.getQuery().id
        this.title = this.getQuery().title
        this.getData()
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.home-wrapper{
  width: 750px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 60px;
  padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.x-top{
  padding-top: 90px;
}
.list{
  width: 730px;
  flex:1;
}
.refresh{
  height:80px;
}
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
