<template>
  <div class="home-wrapper">
      <!-- 头部  start-->
      <div class="head-box flex-center">
          <div class="weather-box flex-center">
            <image :src="getLocalImgUrl('icon_weather3x.png')" class="weather-img"></image>
            <text class="weather-text">8°C</text>
          </div>
          <image :src="getLocalImgUrl('pic_hoge3x.png')" class="logo-img"></image>
          <div class="search-box">
            <image :src="getLocalImgUrl('icon_search3x.png')" class="search-img"></image>
          </div>
      </div>
      <!-- 头部  end-->

      <!-- 导航栏 start -->
      <scroller class="bar-box blue-bar-box"  scroll-direction="horizontal">
        <div class="bar-item" v-for="(bar,index) in barList" :ref="'baritem'+index"
        :class="[index==barList.length-1?'last-bar':'']"
        :key="index" @click="changeSlide(index)"
        >
        <text class="bar-text" :class="[slideIndex==index?'active-bar':'common-bar']">{{bar}}</text>
        </div>
      </scroller>
      <!-- 导航栏 end -->
      <!-- 主体部分 start-->
      <slider forbid-slide-animation="false"  class="main-slider" bubble="false"
      auto-play="false" @change="slideChage" infinite="false" :index="slideIndex">

        <scroller class="slider-item" ref="slideitem0"
        >
         <!-- 首页 start-->
          <div class="home-box">

             <!-- 轮播图 start-->
              <Slide :data-list="imageSlide"></Slide>
              <!-- 轮播图 end-->

              <!-- icon+文字卡片 start -->
              <tab-card :card-list="cardList"></tab-card>
              <!-- icon+文字卡片 end -->
               <div class="dividing-line"></div>
              <!-- 广告滚动 start-->
              <roll-announce :adv-list="advList"></roll-announce>
              <!-- 广告滚动 end-->
               <div class="dividing-line"></div>
               <!-- 上文字下三图  start-->
               <list1 :data="dataList[0]"></list1>

                <!-- 上文字下三图  end-->

                <!-- 左标题右图  上标题 下栏目阅读数start-->
                <list2 :data="dataList[0]"></list2>
                <!-- 左标题右图  end-->
                <div class="dividing-line"></div>

                <!-- 专题 start -->
                <List10 :data="dataList[0]"></List10>
                <!-- 专题 end -->
                <div class="dividing-line"></div>
                <!-- 上文字 下大图广告 start -->
                <list9 :data="dataList[0]"></list9>
                <!-- 上文字 下大图广告 end -->

                <div class="dividing-line"></div>

                <!-- 上标题 下大图带video 下栏目 start -->
                <list3 :data="dataList[0]"></list3>
                <!-- 上标题 下大图带video 下栏目 end -->

          </div>
          <!-- 首页 end-->

        </scroller>

        <scroller class="slider-item" ref="slideitem1">
            <div class="home-box">
                <list4 :data="dataList[0]"></list4>
                <div class="border-line"></div>
                <list5 :data="dataList[0]"></list5>
                <div class="border-line"></div>
                <list6 :data="dataList[0]"></list6>
            </div>
        </scroller>
        <scroller class="slider-item" ref="slideitem2">
           <div class="home-box">
                <list7 :data="dataList[0]"></list7>
                <list8 :data="dataList[0]"></list8>
            </div>
        </scroller>
        <scroller class="slider-item" ref="slideitem3"></scroller>
        <scroller class="slider-item" ref="slideitem4"></scroller>
        <scroller class="slider-item" ref="slideitem5"></scroller>
        <scroller class="slider-item" ref="slideitem6"></scroller>
        <scroller class="slider-item" ref="slideitem6"></scroller>

      </slider>
      <!-- 主体部分 end-->
  </div>
</template>

<script>
import Slide from '../../../../components/slide/Slide1'
import List2 from '../../../../components/list/List2'
import List10 from '../../../../components/list/List10'
import List9 from '../../../../components/list/list9'
import List3 from '../../../../components/list/List3'
import TabCard from '../../../../components/card/TabCard'
import RollAnnounce from '../../../../components/RollAnnounce'
import List1 from '../../../../components/list/List1'
// 图说
import List4 from '../../../../components/list/List4'
import List5 from '../../../../components/list/List5'
import List6 from '../../../../components/list/List6'
// 视频
import List7 from '../../../../components/list/List7'
// 专题
import List8 from '../../../../components/list/List8'
const dom = weex.requireModule('dom')
// const modal = weex.requireModule('modal')
export default {
  name: 'Home',
  components: {
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
    TabCard,
    RollAnnounce
  },
  data () {
    return {
      //
      barList: ['首页', '政务', '城事', '生活', '视频', '图说', '专题', '这个'],
      // 主页面公共
      slideIndex: 0,
      // 主页面公共
      // 轮播图
      imageSlide: [
        {src: 'http://img3.imgtn.bdimg.com/it/u=1752243568,253651337&fm=26&gp=0.jpg', title: '111'},
        {src: 'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg', title: '一城阳光风光美， 海滨新城靓如画一城阳光风光美， 海滨新城靓如画一城阳光风光美， 海滨新城靓如画'},
        {src: 'http://img3.imgtn.bdimg.com/it/u=1977473038,4194935805&fm=26&gp=0.jpg', title: ''},
        {src: 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg', title: ''}
      ],
      // icon卡片
      cardList: [
        {icon: 'icon_TV3x.png', title: '看电视'},
        {icon: 'icon_radio3x.png', title: '听广播'},
        {icon: 'icon_bus3x.png', title: '查公交'},
        {icon: 'icon_number3x.png', title: '号码通'}
      ],
      // 广告滚动
      advList: [
        {title: '1近期雨水量较大，大家出行注意安全，带好雨具安全，带好雨具'},
        {title: '2近期雨水量较大，大家出行注意安全，带好雨具'},
        {title: '3近期雨水量较大，大家出行注意安全，带好雨具'},
        {title: '4近期雨水量较大，大家出行注意安全，带好雨具'}
      ],
      // 列表
      dataList: [
        {
          type: 'three',
          title: '1近期雨水量较大，大家出行注意安全，带好雨具1近期雨水量较大，大家出行注意安全，带好雨具',
          index_pic: [
            {src: 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg'},
            {src: 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg'},
            {src: 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg'},
            {src: 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg'}
          ],
          num: 8
        }
      ]
    }
  },
  methods: {
    // 主页面slide滑动切换
    slideChage (event) {
      this.slideIndex = event.index
      this.getSize('baritem' + this.slideIndex)
      // this.scrollToEl('baritem' + this.slideIndex, -335)
    },
    // 头部导航栏点击
    changeSlide (index) {
      this.slideIndex = index
      this.getSize('baritem' + this.slideIndex)
      // this.scrollToEl('baritem' + this.slideIndex, -335)
    },
    // 获取元素宽度 得到偏移量
    getSize (el) {
      const currentBarRef = this.$refs[el][0]
      const firstRef = this.$refs['baritem0'][0]

      dom.getComponentRect(currentBarRef, option => {
        const opt = JSON.parse(JSON.stringify(option))
        const width = opt.size.width
        const scollWidth = (-(375 - width / 2))
        // this.scrollToEl(firstRef, opt.size.left)
        dom.getComponentRect(firstRef, options => {
          const opts = JSON.parse(JSON.stringify(options))
          if (opts.size.left <= 32 && this.slideIndex > 2) {
            this.scrollToEl(currentBarRef, scollWidth)
          } else {
            this.scrollToEl(firstRef, -32)
          }
        })
      })
    },
    // 触发导航栏滚动
    scrollToEl (el, num) {
      dom.scrollToElement(el, { offset: num })
    }
  },
  computed: {
  },
  mounted () {
    // 广告滚动
    this.advList.push(this.advList[0])
    setInterval(this.animation, 2000)
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
 @import "../../style/home/head.scss";
 @import "../../style/home/bar.scss";
 @import "../../style/home/mainSlider.scss";
 @import "../../style/home/adv.scss";
 .home-wrapper{
  flex:1;
 }
 .main-slider{
   top:170px;
   bottom:0;
   background-color: #f9f9f9;
 }
 .active-bar{

 }
</style>
