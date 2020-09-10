<template>
     <div class="home-wrapper">
         <!-- <wxc-loading :show="isShow"></wxc-loading> -->
         <!-- 搜索 -->
         <search2></search2>
         <scroller class="scroller" show-scrollbar="false">
            <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
                <refresh-style :mLeft="340"></refresh-style>
            </refresh>
            <!-- 轮播 -->
            <slider v-if="sliderList.length" class="slider" interval="5000" auto-play="true">
                <div class="slider-item" v-for="(item,idx) in sliderList" :key="idx" @click="goDetail(item.id)">
                  <image class="slider-img" resize="cover" :src="item.indexpic.host + item.indexpic.dir + '730x280/' + item.indexpic.filepath + item.indexpic.filename"></image>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
            <!-- 我的模块 -->
            <div class="icon-box" v-if="sliderList.length">
              <div class="icon-item" @click="goMyModule(0)">
                <image :src="getLocalImgUrl('feature_listen.png')" class="icon-image"></image>
                <text class="icon-text">我听</text>
              </div>
              <div class="icon-item" @click="goMyModule(1)">
                <image :src="getLocalImgUrl('feature_look.png')" class="icon-image"></image>
                <text class="icon-text">我看</text>
              </div>
              <div class="icon-item" @click="goMyModule(2)">
                <image :src="getLocalImgUrl('feature_write.png')" class="icon-image"></image>
                <text class="icon-text">我写</text>
              </div>
              <div class="icon-item" @click="goMyModule(3)">
                <image :src="getLocalImgUrl('feature_speak.png')" class="icon-image"></image>
                <text class="icon-text">我说</text>
              </div>
            </div>
            <!-- 书籍列表 -->
            <list4 v-if="recommendList.length" :data="recommendList" :title="recommendTitle" :id="recommendId"></list4>
            <list1 v-if="biographyList.length" :data="biographyList" :title="biographyTitle" :changeAble="true" :target="'look'" :hideAuthor="true"></list1>
            <List1 v-if="audioList.length" :data="audioList" :type="'audio'" :title="'热门音频'" :changeAble="true" :target="'listen'"  :hideAuthor="true"></List1>
            <list8 v-if="videoList.length" :data="videoList" :type="'sp'" :title="'精彩视频'" :showMore='true'></list8>
            <!-- <div style="flex-direction:row;margin-top:20px;">
              <text style="width:100px;" @click="goPage(1)">热点</text>
              <text style="width:100px;" @click="goPage(2)">出版</text>
              <text style="width:100px;" @click="goPage(3)">我的</text>
            </div> -->
         </scroller>
    </div>
</template>

<script>
import List1 from '../../components/feature/List1'
import List2 from '../../components/feature/List2'
import List3 from '../../components/feature/List3'
import List4 from '../../components/feature/List4'
import List8 from '../../components/feature/List8'
import Search2 from '../../components/feature/Search2'
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcLoading } from 'weex-ui'
import RefreshStyle from '../../components/common/RefreshStyle'
export default {
  name: 'Home',
  components: {
    List1,
    List2,
    List3,
    List4,
    List8,
    Search2,
    WxcLoading,
    RefreshStyle
  },
  data () {
    return {
      isShow: true,
      sliderList: [],
      recommendTitle: '',
      recommendList: [],
      recommendId: null,
      biographyTitle: '',
      biographyList: [],
      audioList: [],
      videoList: [],
      videoId: null,
      config: {},
      api: {},
      refreshing: true
    }
  },
  methods: {
    // 测试跳转其余模块
    goPage (flag) {
      flag === 1 && this.jumpWithParams('ModWeexStyle7', {})
      flag === 2 && this.jumpWithParams('ModWeexStyle8', {})
      flag === 3 && this.jumpWithParams('ModWeexStyle9', {})
    },
    // 跳转我的模块
    goMyModule (index) {
      index === 0 && this.jumpWithParams('ModWeexStyle6FeatureHomeListen', {})
      index === 1 && this.jumpWithParams('ModWeexStyle6FeatureHomeLook', {})
      index === 2 && this.jumpWithParams('ModWeexStyle6FeatureHomeWrite', {})
      index === 3 && this.jumpWithParams('ModWeexStyle6FeatureHomeSpeak', {})
    },
    // 获取首页数据
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        offset: 0,
        count: 20
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        res.forEach(element => {
          switch (element.name) {
            case '轮播图':
              this.sliderList = element.data[0].data
              break
            case '原创推荐':
              this.recommendList = element.data[0].data.slice(0, 2)
              this.recommendTitle = element.name
              this.recommendId = element.id
              break
            case '人物传记':
              this.biographyList = element.data[0].data
              this.biographyTitle = element.name
              break
            case '热门音频':
              this.audioList = element.data[0].data
              break
            // case '精彩视频':
            //   this.videoList = element.data[0].data.slice(0, 4)
            //   this.videoId = element.id
            //   break
          }
          this.isShow = false
          this.refreshing = false
        })
      }, (e) => {
        console.log(e)
      })
      // 获取视频专区
      const param1 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj'
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/home_app.php', param1, 'get').then(res => {
        this.videoList = res.tuijian.slice(0, 4)
      }, (e) => {
        console.log(e)
      })
    },
    // 跳转文章详情页
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id, type: 'article'})
    },
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
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
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
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
  // padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.scroller{
  width: 730px;
  flex:1;
  padding-bottom: 60px;
}
.slider{
  height: 280px;
  margin-bottom: 60px;
  background-color: #f2f6fa;
}
.slider-item{
  height: 280px;
}
.slider-img{
  width: 730px;
  height: 280px;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
}
.indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  item-color: #ddd;
  item-selected-color: rgb(119, 111, 101);
}
.weex-indicator-item{
  margin-left: 20px;
  margin-right: 20px;
}
.icon-box{
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.icon-item{
  align-items: center;
}
.icon-image{
  width: 82px;
  height: 82px;
}
.icon-text{
  color: #6aaf93;
  font-size: 28px;
  padding-top: 14px;
}
.refresh{
  height:80px;
}
</style>
