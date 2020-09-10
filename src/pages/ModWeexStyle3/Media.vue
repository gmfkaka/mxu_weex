<template>
  <div class="meida-wrapper">
       <!-- <wxc-loading :show="isShow" type="default"></wxc-loading> -->
       <div class="meida-wrapper">
        <image class="nav-img" v-if="slideIndex === 0" :src="getLocalImgUrl('pic_live_bg3x.png')"></image>
        <image class="nav-img" v-if="slideIndex === 1" :src="getLocalImgUrl('pic_VOD_bg3x.png')"></image>
        <!-- <nav1 :nav-list="navList" :slide-index="slideIndex" class="nav" @changeSlide="changeSlide"></nav1> -->
        <div class="nav">
          <div class="nav-item" v-for="(bar,index) in navList" :ref="'navitem'+index"
          :key="index" @click="changeSlide(index)"
          >
            <text class="nav-text" :class="[index === slideIndex ?'active-text':'common-text']">{{bar}}</text>
          </div>
        </div>
        <slider forbid-slide-animation="false"  class="main-slider" bubble="false"
        auto-play="false" @change="slideChage" infinite="false" :index="slideIndex">
        <div class="slider-item border-radius" ref="slideitem0">
            <scroller style="flex:1;">
              <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'" class="refresh">
                <refresh-style></refresh-style>
              </refresh>
              <!-- 电视 start-->
              <div class="tv-wrapper">
                  <text class="list-title">电视</text>
                  <div class="list-box">
                        <!-- 一排一项 -->
                          <list1 :data="tvList[0]"
                              :color="['rgba(0,0,0,0.00)','#E6553D' ]"
                              :width='"686px"'
                          ></list1>
                          <!-- 一排两项 -->
                          <div class="list" >
                              <div class="mt32" v-if="index>0" v-for="(item,index) in tvList" :key="index">
                                  <list1 :data="item"
                                  :color="['rgba(0,0,0,0.00)','#E6553D' ]"
                                  :width='"332px"'

                                  ></list1>
                              </div>

                          </div>

                  </div>
              </div>
              <div class="dividing-line"></div>
              <!-- 电视 end-->

              <!-- 广播 start -->
              <div class="broadcast-wrapper">
                  <text class="list-title">广播</text>
                  <div class="list-box" v-for="(item,index) in broadList" :key="index">
                      <list2 :data="item"
                      ></list2>
                  </div>
              </div>

              <!-- 广播 end -->
              <div class="dividing-line"></div>
          </scroller>

        </div>
        <scroller class="slider-item border-radius" ref="slideitem1">
          <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'" class="refresh">
            <refresh-style></refresh-style>
          </refresh>
          <!-- 电视 start-->
          <div class="tv-wrapper">
              <text class="list-title">电台</text>
              <div class="list-box">
                  <slide2 :data-list="imageSlide"
                  ></slide2>
              </div>
          </div>

          <!-- 电视 end-->
            <!-- 节目 start -->
          <div class="broadcast-wrapper">
              <text class="list-title">节目</text>
              <div class="list-box">
                <!-- 一排一项 -->
                      <list3 :data="proList[0]"
                          :color="['rgba(0,0,0,0.00)','#E6553D' ]"
                          :width='686'
                          :height='412'
                      ></list3>
                      <!-- 一排两项 -->
                      <div class="list" v-if="index>0" >
                          <div class="mt32" v-for="(item,index) in proList" :key="index">
                              <list3 :data="item"
                              :width='332'
                              :height='200'
                              ></list3>
                          </div>

                      </div>
              </div>
          </div>
        <!-- 节目 end -->
        </scroller>

        </slider>
       </div>

  </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import nav1 from '../../components/nav/Nav1'
import List1 from '../../components/media/List1'
import List2 from '../../components/media/List2'
import List3 from '../../components/media/List3'
import Slide2 from '../../components/slide/slide2'
import RefreshStyle from '../../components/common/RefreshStyle'
export default {
  name: 'Media',
  components: {
    nav1,
    List1,
    List2,
    List3,
    Slide2,
    RefreshStyle
  },
  data () {
    return {
      tvList: [],
      broadList: [],
      refreshing: false,
      navList: ['直播', '点播'],
      slideIndex: 0,
      // 轮播图
      imageSlide: [
        {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561110264065&di=96c8b99ff93d80eccfb7b3254ea49cb6&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019d2056ceaeba6ac7252ce6716a61.png'},
        {src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2998207543,1874748308&fm=26&gp=0.jpg'},
        {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561110487252&di=e1a9dc6891bc7b341d54c8872fb45ab9&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a0a25864bca4a801219c77c97e70.jpg'}
      ],
      proList: [],
      config: {},
      api: {}
    }
  },
  methods: {
    changeSlide (index) {
      this.slideIndex = index
    },
    // 主页面slide滑动切换
    slideChage (event) {
      this.slideIndex = event.index
      if (!this.proList.length) {
        this.refreshing = true
        this.getProm()
      }
    },
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
      this.getChannelList()
    },
    // 获取频道列表
    getChannelList () {
      this.$httpRequest(this.api.home_column, {}, 'get').then(res => {
        this.refreshing = false
        if (!res.hasOwnProperty('ErrorCode')) {
          this.tvList = res.filter(item => {
            return parseInt(item.audio_only, 10) === 0
          })
          this.broadList = res.filter(item => {
            return parseInt(item.audio_only, 10) === 1
          })
        } else {
          this.messageTip(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
        this.refreshing = false
      })
    },
    // 获取点播节目
    getProm () {
      this.$httpRequest(this.api.home_list, {}, 'get').then(res => {
        this.refreshing = false
        if (!res.error_code) {
          this.proList = res
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
        console.log(e)
        this.refreshing = false
      })
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '9712',
          'uniqueid': 'live',
          'type': '1',
          'name': '媒体',
          'ename': 'live',
          'custom_name': 'live',
          'url': '',
          'is_master': '1',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle3',
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
            'content_detail': 'http://mobile.ihytv.com/nhyapp/channel_detail.php',
            'dept_list': 'dept_list',
            'detail_comment_list': 'http://mobile.ihytv.com/nhyapp/get_chatroom_messages.php',
            'home_column': 'http://mapi-test.plus.hoge.cn/api/v1/channel.php',
            'home_list': 'http://mapi-test.plus.hoge.cn/api/v1/vod.php',
            'home_list_mine': 'http://mobile.ihytv.com/nhyapp/program.php',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getChannelList()
        this.getProm()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'live'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getChannelList()
        this.getProm()
      }
    }
  },
  created () {
    this.refreshing = true
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/home/mainSlider.scss";
  @import "../../style/common.scss";
.refresh{
  height:80px;
}
.meida-wrapper{
   flex:1;
   width: 750px;
   position: relative;
}
.nav-img{
    position: absolute;
    left:0;
    top:0;
    right:0;
    height:280px;
}
.nav{
    margin-top:92px;
    width: 750px;
   height:64px;
   padding-left:32px;
   padding-right:32px;
   flex-direction: row;
}
.main-slider{
   top:184px;
 }
 .border-radius{
   border-top-left-radius:24px;
   border-top-right-radius:24px;

  background-color: #ffffff;
 }
 .tv-wrapper{
    padding-top:32px;
    padding-bottom:32px;
    padding-left:32px;
    padding-right:32px;
    width: 750px;
    border-top-left-radius:24px;
    border-top-right-radius:24px;
 }
 .list-title{
    font-size: 36px;
    color: #333333;
    margin-bottom:32px;
 }
 .list{
     width:686px;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-between;
 }
 .mr22{
   margin-right:22px;
 }
 .mt32{
     margin-top:26px;
 }
 .broadcast-wrapper{
    padding-top:32px;
    padding-bottom:100px;
    padding-left:32px;
    padding-right:32px;
    width: 750px;
 }
 .nav-item{
  margin-right:64px;
  justify-content: center;
  width: 96px;
}
.nav-text{
  text-align: center;
  color:#fff;
}
.active-text{
  font-size: 46px;
}
.common-text{
  font-size:32px;
  opacity: 0.8;
}
</style>
