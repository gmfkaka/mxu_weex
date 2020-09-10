<template>
     <div class="home-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
        <head :title="'我看'"></head>
        <div class="nav-box">
            <text class="nav-item"
              :class="[currentIndex === index ? 'nav-active':'']"
              v-for="(item,index) in navList"
              :key="index"
              @click='changeSlide(index)'
              >{{item}}
          </text>
          <div class="divider"></div>
        </div>
        <slider class="slider" forbid-slide-animation="false" bubble="false"
        auto-play="false" infinite="false" @change="slideChange" :index="currentIndex" >
          <scroller class="slider-box" show-scrollbar="false">
              <refresh @refresh="onEbookRefresh" :display="ebookRefreshing ? 'show' : 'hide'" class="refresh">
                  <refresh-style :mLeft="340"></refresh-style>
              </refresh>
              <list1
                  v-for="(item,index) in bookList"
                  :key="index"
                  :data="item.data[0].data"
                  :title="item.name"
                  :id="item.id"
                  :target="'special2'"
                  :showMore="true"></list1>
          </scroller>
          <scroller class="slider-box" show-scrollbar="false">
              <!-- <List3 v-if="videoList.length" :data="videoList" :type="'video'" :title="'精彩视频'"></List3> -->
              <refresh @refresh="onVideoRefresh" :display="videoRefreshing ? 'show' : 'hide'" class="refresh">
                  <refresh-style :mLeft="340"></refresh-style>
              </refresh>
              <div v-if="videoList.length">
                <list8 v-for="(item,index) in videoList"
                    :key="index"
                    :data="item.data[0] ? item.data[0].data.slice(0,4) : []"
                    :title="item.name"
                    :id="item.id"
                    :target="'look'"></list8>
              </div>
          </scroller>
        </slider>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import List3 from '../../components/feature/List3'
import List1 from '../../components/feature/List1'
import Head from '../../components/feature/Head'
import List8 from '../../components/feature/List8'
export default {
  name: 'HomeLook',
  components: {
    List3,
    List1,
    List8,
    Head,
    RefreshStyle
  },
  data () {
    return {
      navList: ['电子书', '视频'],
      currentIndex: 0,
      bookList: [],
      videoList: [],
      config: {},
      api: {},
      ebookRefreshing: false,
      videoRefreshing: false
    }
  },
  methods: {
    changeSlide (index) {
      this.currentIndex = index
      index === 0 && this.getData()
      index === 1 && this.getVideoData()
    },
    slideChange (event) {
      this.currentIndex = event.index
      event.index === 0 && this.getData()
      event.index === 1 && this.getVideoData()
    },
    getData () {
      if (this.bookList.length) return
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        offset: 0,
        count: 20
      }
      this.$httpRequest(this.api.my_look, param, 'get').then(res => {
        this.bookList = res
        this.ebookRefreshing = false
      }, (e) => {
        console.log(e)
      })
    },
    // 视频列表
    getVideoData () {
      if (this.videoList.length) return
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj'
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/sp_get_content_info.php', param, 'get').then(res => {
        this.videoList = res
        // console.log(this.videoList[0].data[0].data)
        this.videoRefreshing = false
      }, (e) => {
        console.log(e)
      })
    },
    // 电子书刷新
    onEbookRefresh () {
      this.ebookRefreshing = true
      this.getData()
    },
    // 视频刷新
    onVideoRefresh () {
      this.videoRefreshing = true
      this.getVideoData()
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
        if (this.getQuery().type === 'video') {
          this.currentIndex = 1
          this.getVideoData()
        } else {
          this.getData()
        }
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        if (this.getQuery().type === 'video') {
          this.currentIndex = 1
          this.getVideoData()
        } else {
          this.getData()
        }
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
.nav-box{
    width: 730px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // margin-bottom: 20px;
    margin-top: -20px;
    height: 100px;
}
.nav-item{
    height: 100px;
    line-height: 100px;
    width: 140px;
    text-align: center;
    font-size: 32px;
    color:#D3D3D3;
}
.nav-active{
    color:#6AAF93;
    font-size: 32px;
}
.divider{
    width: 3px;
    height: 23px;
    background-color: #6AAF93;
    position: absolute;
    top: 38px;
    left: 368px;
}
.slider{
  width: 730px;
  flex:1;
}
.slider-box{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.refresh{
  height:80px;
}
</style>
