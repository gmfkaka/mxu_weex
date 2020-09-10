<template>
<div class="home-wrapper" :style="{'background-color':formatColor(config.attrs.listBackground)}">
    <div class="home-wrapper">
      <!-- 头部  start-->
      <div class="head-box flex-center">
        <div class="weather-box flex-center">
          <image :src="getLocalImgUrl('icon_weather3x.png')" class="weather-img"></image>
          <text class="weather-text">8°C</text>
        </div>
        <image :src="getLocalImgUrl('pic_hoge_logo3x.png')" class="logo-img"></image>
        <div class="search-box" @click="goSearchPage()">
          <image :src="getLocalImgUrl('icon_search3x.png')" class="search-img"></image>
        </div>
    </div>
    <!-- 头部  end-->
    <WxcFullPage ref="wxc-tab-page"
                  :tab-titles="tabTitles"
                  :tab-styles="tabStyles"
                  title-type="text"
                  :tab-page-height="tabPageHeight"
                  @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected"
                  >
      <!-- 首页 -->
      <list  :style="{ height: tabPageHeight  + 'px' }" v-for="(item,index) in datasList" :key="index"
            class="item-container"  >
        <refresh class="loading-box" @refresh="homeOnrefresh"  :display="homeRefreshing ? 'show' : 'hide'">
          <refresh-style style="position:absolute;bottom:0"></refresh-style>
          <!-- <text style="position:absolute;bottom:0">refresh</text> -->
        </refresh>
        <cell class="cell" v-if="item.list">
          <Slide :data-list="item.slide"
          v-if="item.slide.length" style="margin-top:60px;margin-bottom:10px;"></Slide>
            <!-- icon+文字卡片 start -->
          <!-- 暂时 没对 -->
          <!-- <tab-card :card-list="cardList"></tab-card> -->
          <!-- icon+文字卡片 end -->
          <!-- <div class="dividing-line" ></div> -->
          <!-- 广告滚动 start-->
          <!-- <roll-announce :adv-list="advList" ></roll-announce> -->
          <!-- 广告滚动 end-->
          <!-- top -->
          <div v-if="item.top">
            <div v-for="(data,index) in item.top"
            :key="index" @click="jumpDetail(data)">
              <!-- 视频  start-->
              <!-- 视频标题 日期icon -->
              <list21 :data="data" v-if="data.css_id!==0"></list21>
                <!-- 视频标题 icon -->
              <list22 :data="data" v-if="data.css_id!==0"></list22>
                <!-- 图片标题 icon -->
              <list23 :data="data" v-if="data.css_id!==0"></list23>
              <!-- 视频  end-->
              <!-- 上标题 下播放器 下栏目时间阅读数-->
              <list7 :data="data" v-if="data.css_id!==0"></list7>
              <!-- 上标题 下播放器 下日期阅读数 -->
              <list13 :data="data" v-if="data.css_id!==0"></list13>
              <!-- 专题 start -->
              <!-- 上图 下标题 下专题名 专题（几篇）-->
              <list8 :data="data" v-if="data.css_id!==0"></list8>
              <!-- 专题 视频 -->
              <list18 :data="data" v-if="data.css_id!==0"></list18>
              <!-- 专题 图集 -->
              <list19 :data="data" v-if="data.css_id!==0"></list19>
              <!-- 专题 新闻 -->
              <list20 :data="data" v-if="data.css_id!==0"></list20>
              <!-- 专题 end -->
              <!-- 上标题 下图广告标签 -->
              <list9 :data="data" v-if="data.css_id!==0"></list9>
              <!-- 上文字下三图  start-->
              <list1 :data="data" v-if="data.css_id!==0"></list1>
              <!-- 左标题右图  上标题 下栏目阅读数start-->
              <list2 :data="data" v-if="data.css_id!==0"></list2>
              <!-- 左标题右图  上标题 下日期阅读数start-->
              <list14 :data="data" v-if="data.css_id!==0"></list14>
              <!-- 右标题左图  上标题 下栏目阅读数start-->
              <list11 :data="data" v-if="data.css_id!==0"></list11>
              <!-- 右标题左图  上标题 下日期阅读数start-->
              <list15 :data="data" v-if="data.css_id!==0"></list15>
              <!-- 上标题 下大图带video 下栏目 start -->
              <list3 :data="data" v-if="data.css_id!==0"></list3>
              <!-- 上标题  下栏目 start -->
              <list16 :data="data" v-if="data.css_id!==0"></list16>
              <!-- 上标题  下日期阅读数 start -->
              <list17 :data="data" v-if="data.css_id!==0"></list17>
              <!-- 上标题 下图 下日期阅读数 -->
              <list4 :data="data" v-if="data.css_id!==0"></list4>
              <!-- 上文字 下三图（左大右二小） -->
              <list5 :data="data" v-if="data.css_id!==0"></list5>
              <!-- 上标题 下两图 下 阅读数 日期 -->
              <list6 :data="data" v-if="data.css_id!==0"></list6>
              <!-- 上标题 中图  下栏目日期阅读数 -->
              <list12 :data="data" v-if="data.css_id!==0"></list12>
            </div>

          </div>
          <!-- hot -->
          <div v-if="item.hot">
            <div v-for="(data,index) in item.hot" :key="index"
            @click="jumpDetail(data)">
              <!-- 视频  start-->
              <!-- 视频标题 日期icon -->
              <list21 :data="data" v-if="data.css_id!==0"></list21>
              <!-- 视频标题 icon -->
              <list22 :data="data" v-if="data.css_id!==0"></list22>
              <!-- 图片标题 icon -->
              <list23 :data="data" v-if="data.css_id!==0"></list23>
              <!-- 视频  end-->
              <!-- 上标题 下播放器 下栏目时间阅读数-->
              <list7 :data="data" v-if="data.css_id!==0"></list7>
              <!-- 上标题 下播放器 下日期阅读数 -->
              <list13 :data="data" v-if="data.css_id!==0"></list13>

              <!-- 专题 start -->
              <!-- 上图 下标题 下专题名 专题（几篇）-->
              <list8 :data="data" v-if="data.css_id!==0"></list8>
              <!-- 专题 视频 -->
              <list18 :data="data" v-if="data.css_id!==0"></list18>
              <!-- 专题 图集 -->
              <list19 :data="data" v-if="data.css_id!==0"></list19>
              <!-- 专题 新闻 -->
              <list20 :data="data" v-if="data.css_id!==0"></list20>
              <!-- 专题 end -->
              <!-- 上标题 下图广告标签 -->
              <list9 :data="data" v-if="data.css_id!==0"></list9>
              <!-- 上文字下三图  start-->
              <list1 :data="data" v-if="data.css_id!==0"></list1>
              <!-- 左标题右图  上标题 下栏目阅读数start-->
              <list2 :data="data" v-if="data.css_id!==0"></list2>
              <!-- 左标题右图  上标题 下日期阅读数start-->
              <list14 :data="data" v-if="data.css_id!==0"></list14>
              <!-- 右标题左图  上标题 下栏目阅读数start-->
              <list11 :data="data" v-if="data.css_id!==0"></list11>
              <!-- 右标题左图  上标题 下日期阅读数start-->
              <list15 :data="data" v-if="data.css_id!==0"></list15>
              <!-- 上标题 下大图带video 下栏目 start -->
              <list3 :data="data" v-if="data.css_id!==0"></list3>
              <!-- 上标题  下栏目 start -->
              <list16 :data="data" v-if="data.css_id!==0"></list16>
              <!-- 上标题  下日期阅读数 start -->
              <list17 :data="data" v-if="data.css_id!==0"></list17>
              <!-- 上标题 下图 下日期阅读数 -->
              <list4 :data="data" v-if="data.css_id!==0"></list4>
              <!-- 上文字 下三图（左大右二小） -->
              <list5 :data="data" v-if="data.css_id!==0"></list5>
              <!-- 上标题 下两图 下 阅读数 日期 -->
              <list6 :data="data" v-if="data.css_id!==0"></list6>
              <!-- 上标题 中图  下栏目日期阅读数 -->
              <list12 :data="data" v-if="data.css_id!==0"></list12>
            </div>

          </div>
                <!-- list -->
          <div v-if="item.list" :class="[item.slide.length ? '' : 'mt40']">
            <div v-for="(data,index) in item.list" :key="index"
            @click="jumpDetail(data)">
              <!-- 视频  start-->
              <!-- 视频标题 日期icon -->
              <list21 :data="data" v-if="data.type=='video'"></list21>
              <!-- 视频标题 icon -->
              <!-- <list22 :data="data" v-if="data.bundle_id=='livmedia'"></list22> -->
              <!-- 图片标题 icon -->
              <!-- <list23 :data="data" v-if="data.css_id!==0"></list23> -->
              <!-- 视频  end-->
              <!-- 上标题 下播放器 下栏目时间阅读数-->
              <!-- <list7 :data="data" v-if="data.css_id!==0"></list7> -->
              <!-- 上标题 下播放器 下日期阅读数 -->
              <!-- <list13 :data="data" v-if="data.css_id!==0"></list13> -->

              <!-- 专题 start -->
              <!-- 上图 下标题 下专题名 专题（几篇）-->
              <!-- <list8 :data="data" v-if="data.css_id!==0"></list8> -->
              <!-- 专题 视频 -->
              <!-- <list18 :data="data" v-if="data.css_id!==0"></list18> -->
              <!-- 专题 图集 -->
              <list19 :data="data" v-if="data.type=='gallery'"></list19>
              <!-- <list20 :data="data" v-if="data.bundle_id=='tuji'"></list20> -->
              <!-- 专题 end -->
              <!-- 上标题 下图广告标签 -->
              <!-- <list9 :data="data" v-if="data.css_id!==0"></list9> -->
              <!-- 上标题 中两图+标题 下头像参与数 -->
              <!-- 暂时无 -->
              <!-- <list10 :data="data" v-if="data.css_id!==0"></list10> -->
                <!-- 上文字下三图  start-->
              <!-- <list1 :data="data" v-if="data.css_id!==0"></list1> -->
              <!-- 左标题右图  上标题 下栏目阅读数start-->
              <!-- <list2 :data="data" v-if="data.css_id!==0"></list2> -->
                <!-- 左标题右图  上标题 下日期阅读数start-->
              <!-- <list14 :data="data" v-if="data.css_id!==0"></list14> -->
              <!-- 右标题左图  上标题 下栏目阅读数start-->
              <!-- <list11 :data="data" v-if="data.css_id!==0"></list11> -->
                <!-- 右标题左图  上标题 下日期阅读数start-->
              <list15 :data="data" v-if="data.type=='article'"></list15>
                <!-- 上标题 下大图带video 下栏目 start -->
              <!-- <list3 :data="data" v-if="data.css_id!==0"></list3> -->
                <!-- 上标题  下栏目 start -->
              <!-- <list16 :data="data" v-if="data.css_id!==0"></list16> -->
                <!-- 上标题  下日期阅读数 start -->
              <!-- <list17 :data="data" v-if="data.css_id!==0"></list17> -->
                <!-- 上标题 下图 下日期阅读数 -->
              <!-- <list4 :data="data" v-if="data.css_id!==0"></list4> -->
              <!-- 上文字 下三图（左大右二小） -->
              <!-- <list5 :data="data" v-if="data.css_id!==0"></list5> -->
              <!-- 上标题 下两图 下 阅读数 日期 -->
              <!-- <list6 :data="data" v-if="data.css_id!==0"></list6> -->
                <!-- 上标题 中图  下栏目日期阅读数 -->
              <!-- <list12 :data="data" v-if="data.css_id!==0"></list12> -->
            </div>

          </div>
          <div  v-if="!item.list.length" class="no-data">
            <image :src="getLocalImgUrl('applant_no_data3x.png')" class="no-data-img"></image>
            <text class="no-data-text">这里什么都没有</text>
          </div>
        </cell>
        <loading class="loading-box" @loading="homeOnloading" :display="homeLoadinging ? 'show' : 'hide'">
            <text class="loading-text">加载中...</text>
        </loading>
      </list>
      <!-- 首页 end-->
    </WxcFullPage>
  </div>
</div>

</template>

<script>
import { WxcFullPage, WxcPanItem, BindEnv, Utils } from 'weex-ui'
import { nativeUtil } from '../../lib/nativeUtils'
import Slide from '../../components/slide/Slide1'
import List2 from '../../components/list/List2'
import List10 from '../../components/list/List10'
import List9 from '../../components/list/list9'
import List3 from '../../components/list/List3'
import TabCard from '../../components/card/TabCard'
import RollAnnounce from '../../components/RollAnnounce'
import List1 from '../../components/list/List1'
// 图说
import List4 from '../../components/list/List4'
import List5 from '../../components/list/List5'
import List6 from '../../components/list/List6'
// 视频
import List7 from '../../components/list/List7'
// 专题
import List8 from '../../components/list/List8'
import List11 from '../../components/list/List11'
import List12 from '../../components/list/List12'
import List13 from '../../components/list/List13'
import List14 from '../../components/list/List14'
import List15 from '../../components/list/List15'
import List16 from '../../components/list/List16'
import List17 from '../../components/list/List17'
import List18 from '../../components/list/List18'
import List19 from '../../components/list/List19'
import List20 from '../../components/list/List20'
import List21 from '../../components/list/List21'
import List22 from '../../components/list/List22'
import List23 from '../../components/list/List23'
import RefreshStyle from '../../components/common/RefreshStyle'
// const config = require('../../configs/home')
export default {
  components: {
    WxcFullPage,
    WxcPanItem,
    Slide,
    List1,
    List2,
    List10,
    List9,
    List3,
    List4,
    List5,
    List6,
    List7,
    List8,
    List11,
    List12,
    List13,
    List14,
    List15,
    List16,
    List17,
    List18,
    List19,
    List20,
    List21,
    List22,
    List23,
    TabCard,
    RollAnnounce,
    RefreshStyle
  },
  data: () => ({
    datasList: [],
    showList: [],
    // nav
    tabTitles: [],
    slideIndex: 0,
    tabPageHeight: 1334,
    tabStyles: {
      bgColor: '#FFFFFF',
      titleColor: '#a5a1a1',
      activeTitleColor: 'red',
      width: 127,
      height: 60,
      fontSize: 32,
      // textPaddingLeft: 16,
      // textPaddingRight: 16,
      leftOffset: 32,
      rightOffset: 32
    },
    // 广告滚动
    advList: [
      {title: '1近期雨水量较大，大家出行注意安全，带好雨具安全，带好雨具'},
      {title: '2近期雨水量较大，大家出行注意安全，带好雨具'},
      {title: '3近期雨水量较大，大家出行注意安全，带好雨具'},
      {title: '4近期雨水量较大，大家出行注意安全，带好雨具'}
    ],
    // icon卡片
    cardList: [
      {icon: 'icon_TV3x.png', title: '看电视'},
      {icon: 'icon_radio3x.png', title: '听广播'},
      {icon: 'icon_bus3x.png', title: '查公交'},
      {icon: 'icon_number3x.png', title: '号码通'}
    ],
    homeRefreshing: false,
    homeLoadinging: false,
    offset: 0,
    config: {},
    api: {}
  }),
  created () {
    // 获取tabPageHeight高度
    this.tabPageHeight = Utils.env.getPageHeight() - 90
    // this.config = config.default.config // 暂时没对
    this.homeRefreshing = true
    this.getConfig()
  },
  methods: {
    // 首页下拉刷新
    homeOnrefresh () {
      this.offset = 0
      this.homeRefreshing = true
      this.getData(this.tabTitles[this.slideIndex].id)
    },
    // 首页上拉加载更多
    homeOnloading () {
      this.offset += 20
      this.homeLoadinging = true
      this.getData(this.tabTitles[this.slideIndex].id)
    },
    wxcPanItemPan (e) {
      if (BindEnv.supportsEBForAndroid()) {
        this.$refs['wxc-tab-page'].bindExp(e.element)
      }
    },
    // 切换栏目
    wxcTabPageCurrentTabSelected (e) {
      this.offset = 0
      this.slideIndex = parseInt(e.page)
      setTimeout(() => {
        this.homeRefreshing = true
        this.homeLoadinging = false
        if (!this.datasList[this.slideIndex].length) {
          this.getData(this.tabTitles[this.slideIndex].id)
        }
      }, 300)
    },
    // 获取栏目数据
    getNavData () {
      const param = {
        fid: 142,
        site_id: 1
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.hasOwnProperty('ErrorCode')) {
          this.tabTitles = res.map((obj, index) => {
            obj.title = obj.name
            return obj
          })
          this.datasList = new Array(this.tabTitles.length).fill({})
          this.getData(this.tabTitles[0].id)
        } else {
          this.messageTip(res.ErrorText)
        }
      }, (e) => {
      })
    },
    // 获取栏目下列表等数据
    getData (id) {
      const param = {
        offset: this.offset,
        column_id: id,
        count: 20
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.hasOwnProperty('ErrorCode')) {
          if (this.offset === 0) {
            this.datasList.splice(this.slideIndex, 1, res)
          } else {
            if (res.list.length) {
              this.datasList[this.slideIndex].list = this.datasList[this.slideIndex].list.concat(res.list)
              if (res.list.length < 20) {
                nativeUtil.alert('没有更多了')
              }
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          setTimeout(() => {
            this.homeRefreshing = false
            this.homeLoadinging = false
          }, 1000)
        } else {
          this.messageTip(res.ErrorText)
        }
      }, (e) => {
      })
    },
    // 跳转详情页
    jumpDetail (item) {
      if (item.type === 'article') {
        this.jumpWithParams('NewsDetail', {id: item.id})
      } else if (item.type === 'gallery') {
        this.jumpWithParams('GalleryDetail', {id: item.id})
      } else if (item.type === 'topic') {
        this.jumpWithParams('TopicDetail', {id: item.id})
      }
    },
    // 跳转搜索页
    goSearchPage () {
      this.jumpWithParams('Search', {})
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '9711',
          'uniqueid': 'home',
          'type': '1',
          'name': '首页',
          'ename': 'home',
          'custom_name': 'home',
          'url': '',
          'is_master': '1',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle2',
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
            'content_detail': 'http://mapi-test.plus.hoge.cn/api/v1/item.php',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'home_column': 'http://mapi-test.plus.hoge.cn/api/v1/column.php',
            'home_list': 'http://mapi-test.plus.hoge.cn/api/v1/news.php',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getNavData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getNavData()
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../style/common.scss";
@import "../../style/home/head.scss";
.home-wrapper{
  flex:1;
 }
.item-container {
  width: 750px;
  flex:1;
  background-color: #ffffff;
}
.mt80{
  margin-top:80px;
}
.cell {
  width: 750px;
}
.content{
  width:750px;
  flex:1;
  align-items: center;
  justify-content: center;
}
.mt40{
  margin-top: 60px;
}
.loading-box{
  width: 750px;
  height: 180px;
}
.loading-text{
  width: 750px;
  text-align: center;
}
.no-data{
  margin-top: 80px;
  height: 1000px;
  align-items: center;
  justify-content: center;
}
.no-data-img{
  width: 255px;
  height: 185px;
}
.no-data-text{
  color:#bbb;
  font-size: 24px;
  margin-top: 20px;
}
</style>
