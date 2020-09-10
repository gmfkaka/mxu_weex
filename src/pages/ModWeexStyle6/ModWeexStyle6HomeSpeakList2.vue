
<template>
     <div class="home-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
       <head :title="main_title ? main_title :'首页'"></head>
       <list class="list" show-scrollbar="false">
         <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'" class="refresh">
            <refresh-style :mLeft="340"></refresh-style>
          </refresh>
          <cell>
            <List3
                  v-if="bookList.length"
                  :data="bookList"
                  :title="title"
                  :showMore='false'></List3>
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
import List3 from '../../components/feature/List3'
import List8 from '../../components/feature/List8'
import Head from '../../components/feature/Head'
export default {
  name: 'HomeSpeakList2',
  components: {
    List3,
    List8,
    Head,
    RefreshStyle
  },
  data () {
    return {
      id: null,
      title: '',
      refreshing: true,
      loading: false,
      hasMore: true,
      offset: 0,
      bookList: [],
      config: {},
      api: {},
      main_title: ''
    }
  },
  methods: {
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.id,
        offset: this.offset,
        count: 10
      }
      this.$httpRequest(this.api.dept_list, param, 'get').then(res => {
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
        this.title = this.getQuery().title
        this.id = this.getQuery().id
        this.main_title = this.getQuery().main_title
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.title = this.getQuery().title
        this.id = this.getQuery().id
        this.main_title = this.getQuery().main_title
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
.head{
  width: 730px;
  height: 66px;
  margin-bottom: 30px;
  position: relative;
}
.title{
  width: 730px;
  height: 66px;
  line-height: 66px;
  font-size: 36px;
  text-align: center;
}
.back-icon{
  width: 44px;
  height: 44px;
  position: absolute;
  top: 11px;
  left: 0;
}
.search-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  right: 0;
  top: 0;
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
