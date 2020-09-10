<template>
    <div class="home-wrapper">
        <nav :is-back="true" :Title = navTitle></nav>
        <div class="map"></div>
            <div  class="list-box" ref="listBox" @swipe="handleSwipe">
                <div class="pop-tab">
                    <text class="pop-tab-text">全部</text>
                    <text class="pop-tab-text pop-middle">商业停车场</text>
                    <text class="pop-tab-text">公共停车场</text>
                </div>
                <list style="flex:1;width:750px">
                    <cell class="list-content">
                        <div class="list-top">
                            <div style=" flex-direction: row;">
                                <text class="list-title">楚翘城停车场</text>
                                <text class="list-state">满</text>
                            </div>
                            <image class="list-title-icon" :src="getLocalImgUrl('')"></image>
                        </div>
                        <div class="list-middle">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">200m | 雨花台区-华为路与宁双路交叉口西南200米</text>
                        </div>
                        <div class="list-bottom">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">半小时内免费，首小时6元，后每小时4元，最高32元</text>
                        </div>
                    </cell>
                        <cell class="list-content">
                        <div class="list-top">
                            <div style=" flex-direction: row;">
                                <text class="list-title">楚翘城停车场</text>
                                <text class="list-state">满</text>
                            </div>
                            <image class="list-title-icon" :src="getLocalImgUrl('')"></image>
                        </div>
                        <div class="list-middle">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">200m | 雨花台区-华为路与宁双路交叉口西南200米</text>
                        </div>
                        <div class="list-bottom">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">半小时内免费，首小时6元，后每小时4元，最高32元</text>
                        </div>
                    </cell>
                        <cell class="list-content">
                        <div class="list-top">
                            <div style=" flex-direction: row;">
                                <text class="list-title">楚翘城停车场</text>
                                <text class="list-state">满</text>
                            </div>
                            <image class="list-title-icon" :src="getLocalImgUrl('')"></image>
                        </div>
                        <div class="list-middle">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">200m | 雨花台区-华为路与宁双路交叉口西南200米</text>
                        </div>
                        <div class="list-bottom">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">半小时内免费，首小时6元，后每小时4元，最高32元</text>
                        </div>
                    </cell>
                        <cell class="list-content">
                        <div class="list-top">
                            <div style=" flex-direction: row;">
                                <text class="list-title">楚翘城停车场</text>
                                <text class="list-state">满</text>
                            </div>
                            <image class="list-title-icon" :src="getLocalImgUrl('')"></image>
                        </div>
                        <div class="list-middle">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">200m | 雨花台区-华为路与宁双路交叉口西南200米</text>
                        </div>
                        <div class="list-bottom">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">半小时内免费，首小时6元，后每小时4元，最高32元</text>
                        </div>
                    </cell>
                        <cell class="list-content">
                        <div class="list-top">
                            <div style=" flex-direction: row;">
                                <text class="list-title">楚翘城停车场</text>
                                <text class="list-state">满</text>
                            </div>
                            <image class="list-title-icon" :src="getLocalImgUrl('')"></image>
                        </div>
                        <div class="list-middle">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">200m | 雨花台区-华为路与宁双路交叉口西南200米</text>
                        </div>
                        <div class="list-bottom">
                            <image class="list-icon" :src="getLocalImgUrl('')"></image>
                            <text class="list-content-text">半小时内免费，首小时6元，后每小时4元，最高32元</text>
                        </div>
                    </cell>
                </list>

            </div>
    </div>
</template>

<script>
// import { nativeUtil } from '../../lib/nativeUtils'
import nav from '../../components/nav//Nav3'
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
// const dom = weex.requireModule('dom')
// import wxcPopup2 from '../../components/wxcPopup//wxcPopup2'
export default {
  name: 'ModWeexStyle19',
  data () {
    return {
      navTitle: '附近停车场',
      listState: 1,
      listHeight: ''
    }
  },
  components: {
    nav
  },
  methods: {
    handleSwipe (e) {
      if (e.direction === 'down' && this.listState === 1) {
        this.changeHeight('200')
        this.listState = 2
      } else if (e.direction === 'up' && this.listState === 2) {
        this.changeHeight('800')
        this.listState = 1
      } else if (e.direction === 'up' && this.listState === 1) {
        this.changeHeight('1200')
        this.listState = 3
      } else {
        this.changeHeight('800')
        this.listState = 1
      }
    },
    changeHeight (height) {
      let listBoxEl = this.$refs.listBox
      animation.transition(listBoxEl, {
        styles: {
          height: height
        },
        duration: 400, // ms
        timingFunction: 'linear',
        needLayout: true,
        delay: 100 // ms
      }, function () {
        modal.toast()
      })
    }
    // 获取用户信息
    // async getConfig () {
    //   if (this.getPlatform() === 'web') {
    //     this.config = {
    //       'id': '11984',
    //       'uniqueid': 'weexreport',
    //       'type': '1',
    //       'name': '新时代报料',
    //       'ename': 'weexreport',
    //       'custom_name': '新时代报料',
    //       'normal_pic': '',
    //       'press_pic': '',
    //       'url': '',
    //       'is_master': '0',
    //       'native_uniqueid': 'ModWeex',
    //       'is_stand_alone': '1',
    //       'native_depends': '',
    //       'ios_is_stand_alone': '0',
    //       'native_ios_depends': '',
    //       'native_ui': 'ModWeexStyle16',
    //       'android_min': null,
    //       'android_max': null,
    //       'ios_min': null,
    //       'ios_max': null,
    //       'ui_android_depends': '',
    //       'attrs': [ ],
    //       'api': {
    //         'content_detail': 'content_detail',
    //         'dept_list': 'dept_list',
    //         'detail_comment_list': 'detail_comment_list',
    //         'ebook_detail': 'ebook_detail',
    //         'ebook_list': 'ebook_list',
    //         'home_column': 'http://mobile.fhtv.net.cn/fhtw/news_slide.php',
    //         'home_list': 'http://help-api.cloud.hoge.cn/index.php',
    //         // 'home_list': 'http://helpsc.cloud.hoge.cn/index.php',
    //         'home_list_mine': 'home_list_mine',
    //         'my_listen': 'my_listen',
    //         'my_look': 'my_look',
    //         'my_speak': 'my_speak',
    //         'my_write': 'my_write',
    //         'send_content': 'send_content'
    //       }
    //     }
    //     this.api = this.config.api
    //     this.getData()
    //   } else {
    //     const param = {
    //       'isMain': '0',
    //       'moduleSign': 'weexreport'
    //     }
    //     // 获取api
    //     const res = await nativeUtil.getConfig(param)
    //     this.config = res
    //     this.api = this.config.api
    //     // 获取appid/appkey
    //     const result = await nativeUtil.getSystemInfo()
    //     if (result) {
    //       this.custom_appid = result.custom_appid
    //       this.custom_appkey = result.custom_appkey
    //       this.getData()
    //     }
    //   }
    // }
  },

  created () {
    // alert(111)
    //     if (this.getPlatform() === 'web') {
    //       this.param.custom_appid = '154'
    //       this.param.custom_appkey = 'ihJhUxistGOuuJMT6dCveUyqupietbsB'
    //       this.param.access_token = '6fcb8fe9100d45b34fa0ea72767ea740'
    //     }
    //     this.getConfig()
  },
  mounted () {

  },
  computed: {
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
.map{
    width: 750px;
    flex: 1;
    background-color: yellowgreen
}
   .pop-tab{
        height: 146px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .pop-tab-text{
        width: 200px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#3CA3FF;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3CA3FF;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #3CA3FF;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: #3CA3FF;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #3CA3FF;
    }
    .pop-middle{
        border-left: none;
        border-right: none
    }
    .list-box{
        width: 750px;
        height: 800px;
    }
    .list-content{
        width: 710px;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: auto;
        margin-right: auto;
        padding-top:20px;
        padding-bottom:20px;
        padding-left: 30px;
        padding-right: 30px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgba(235,235,235,1);
    }
    .list-top{
        flex-direction: row;
        justify-content: space-between;
        font-size: 32px;
        color:rgba(51,51,51,1);
    }
    .list-state{
        margin-left: 20px;
        width:40px;
        height:40px;
        line-height: 40px;
        font-size:22px;
        text-align: center;
        color:rgba(241,47,47,1);
        background-color: rgba(253,239,239,1);
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .list-middle{
        flex-direction: row;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    .list-content-text{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        color:rgba(102,102,102,1);
    }
</style>
