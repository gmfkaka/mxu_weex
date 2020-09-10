<template>
    <div class="warp">
        <div class="video" :style="videoStyle">
            <video-player v-if="currentSrc" :src='currentSrc' :options='videoPlayerOptions'></video-player>
        </div>
        <div style="flex:1;">
          <div class="nav">
              <div class="nav-text-box" @click='changeSlide(0)'>
                  <text class="nav-text" :class="[slideIndex === 0 ? 'nav-text-active' : '']">节目单</text>
                  <div class="nav-bottom" v-if='slideIndex === 0'></div>
              </div>
              <div class="nav-text-box" @click='changeSlide(1)'>
                  <text class="nav-text" :class="[slideIndex === 1 ? 'nav-text-active' : '']">聊天室</text>
                  <div class="nav-bottom"  v-if='slideIndex === 1'></div>
              </div>
          </div>
          <slider forbid-slide-animation="false"  bubble="false"
          auto-play="false" infinite="false" @change="slideChange" :index="slideIndex"
          style="flex:1;">
              <div class="content-program">
                  <div>
                      <text class="date date-text" v-for="(item,idx) in dayList" :key="idx" @click="getProgram(item.sign)" :class="[item.isActive ? 'active' : '']">{{item.day}}</text>
                  </div>
                  <scroller class="program" ref="live">
                      <div class="program-content" v-for="(item,index) in programList" :key="index" :ref="'item'+index" @click='selectNowPlay(item,index)'>
                          <text class="program-time" :class="[nowPlayIndex === index ? 'program-active' : '' , item.no_click ? 'program-no-click' : '']">{{item.start}}</text>
                          <text class="program-title" :class="[nowPlayIndex === index ? 'program-active' : '' , item.no_click ? 'program-no-click' : '']">{{item.theme}}</text>
                          <text class="program-now" v-if='nowPlayIndex === index'>正在播出</text>
                      </div>
                  </scroller>
              </div>
              <div class="content-chat">
                  <scroller class="content-chat-inner">
                      <div class="chat-inner" v-for="(item,index) in chatList" :key="index">
                          <image v-if="item.send_uavatar.host" :src="item.send_uavatar.host+item.send_uavatar.dir+item.send_uavatar.filepath+item.send_uavatar.filename" class="chat-img"></image>
                          <image v-else :src="getLocalImgUrl('pic_user_default3x.png')" class="chat-img"></image>
                          <div class="chat-text">
                              <text class="chat-user">{{item.send_uname}}</text>
                              <text class="chat-user-content">{{item.message}}</text>
                          </div>
                      </div>
                  </scroller>
                  <div class="content-chat-input">
                      <input class="content-chat-input-text" type="text" name="" id="" placeholder="说点什么吧">
                      <image :src="getLocalImgUrl('icon_emoji3x.png')" class="emoji-img"></image>
                  </div>
              </div>
          </slider>
        </div>
    </div>
</template>
<script>
import { nativeUtil } from '../../lib/nativeUtils'
import VideoPlayer from '../../components/common/video'
const dom = weex.requireModule('dom')
export default {
  components: {VideoPlayer},
  data () {
    return {
      slideIndex: 0,
      dayList: [
        {day: '周一', sign: 1, isActive: false},
        {day: '周二', sign: 2, isActive: false},
        {day: '周三', sign: 3, isActive: false},
        {day: '周四', sign: 4, isActive: false},
        {day: '周五', sign: 5, isActive: false},
        {day: '周六', sign: 6, isActive: false},
        {day: '周日', sign: 7, isActive: false}
      ],
      programList: [],
      videoPlayerOptions: {width: 750, height: 420},
      channelDetail: {},
      nowPlayIndex: null, // 当前播放节目下标
      baseIndex: null, // 今天播放的下标 今天0 明天1 昨天-1
      channelId: 5,
      zone: 0,
      currentSrc: '',
      chatList: [],
      config: {},
      api: {},
      platform: ''
    }
  },
  methods: {
    // 切换日期
    getProgram (idx) {
      this.nowPlayIndex = null
      this.zone = idx - 1 - this.baseIndex
      this.getProgramList()
      this.dayList.forEach(v => {
        v.isActive = false
        if (v.sign === idx) {
          v.isActive = true
        }
      })
    },
    slideChange (event) {
      this.slideIndex = event.index
    },
    changeSlide (index) {
      this.slideIndex = index
    },
    // 获取频道详情
    getChannelDetail () {
      const param = {
        appid: 36,
        appkey: 'mmv6bfo799vcDHqfZBlqtDp4NHCCb4xn',
        channel_id: this.channelId
      }
      this.$httpRequest(this.api.content_detail, param, 'get').then(res => {
        this.channelDetail = res[0]
        this.currentSrc = this.channelDetail.m3u8
      }, (e) => {
        console.log(e)
      })
    },
    // 获取节目列表
    getProgramList () {
      const param = {
        appid: 36,
        appkey: 'mmv6bfo799vcDHqfZBlqtDp4NHCCb4xn',
        zone: this.zone,
        channel_id: this.channelId
      }
      this.$httpRequest(this.api.home_list_mine, param, 'get').then(res => {
        // 今天之后的节目都设置为不可点击
        if (this.zone > 0) {
          res.forEach(ele => {
            ele['no_click'] = true
          })
        }
        this.programList = res
        const tmpIndex = this.programList.findIndex(ele => ele.now_play === 1)
        if (tmpIndex !== -1) {
          // 设置当前播放时段后面的节目都不可以点击
          for (let i = tmpIndex + 1; i < this.programList.length; i++) {
            this.programList[i]['no_click'] = true
          }
          // 滚动到当前播放位置
          this.nowPlayIndex = tmpIndex
          setTimeout(() => {
            this.$nextTick(() => {
              const el = this.$refs['item' + (tmpIndex - 2)][0]
              dom.scrollToElement(el, {})
            })
          }, 200)
        } else {
          this.$nextTick(() => {
            const el = this.$refs.item0[0]
            dom.scrollToElement(el, {})
          })
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取聊天室列表
    getChatList () {
      const param = {
        appid: 36,
        appkey: 'mmv6bfo799vcDHqfZBlqtDp4NHCCb4xn',
        chatroom_id: 27
      }
      this.$httpRequest(this.api.detail_comment_list, param, 'get').then(res => {
        this.chatList = res.messages
      }, (e) => {
        console.log(e)
      })
    },
    // 选择当前播放节目
    selectNowPlay (item, index) {
      if (item.no_click) return
      this.nowPlayIndex = index
      this.currentSrc = item.m3u8
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
        this.getChannelDetail()
        this.getProgramList()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'live'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getChannelDetail()
        this.getProgramList()
      }
    }
  },
  watch: {
    slideIndex: function (val) {
      if (val === 1 && !this.chatList.length) {
        this.getChatList()
      }
    }
  },
  computed: {
    videoStyle () {
      if (this.getPlatform() === 'android') {
        return { 'height': '480px', 'padding-top': '60px' }
      }
    }
  },
  created () {
    let today = new Date().getDay()
    this.dayList.forEach((v, idx) => {
      if (v.sign === today) {
        v.day = '今天'
        v.isActive = true
        this.baseIndex = idx
      }
    })
    this.getConfig()
  }
}
</script>
<style scoped>
.warp{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.video{
    width: 750px;
    height: 420px;
    background-color: #000;
}
.content-program{
    width: 750px;
    flex:1;
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #f0f0f0;
}
.date{
    width: 176px;
    background-color: #f6f6f6;
    color: #333333;
}
.date-text{
    height: 118px;
    line-height: 118px;
    font-size: 28px;
    text-align: center;
}
.program{
    width: 574px;
    height: 826px;
    background-color: #ffffff;
}
.program-content{
    flex-direction: row;
    margin-left: 24px;
}
.program-time{
    width: 100px;
    height: 80px;
    line-height: 80px;
    color:#333;
    font-size: 28px;
}
.program-title{
    height: 80px;
    line-height: 80px;
    color:#333;
    font-size: 28px;
}
.program-no-click{
    color:#A6A6A6;
}
.program-now{
    height: 80px;
    line-height: 80px;
    position: absolute;
    right: 16px;
    color: #E02929;
    font-size: 28px;
}
.active{
    background-color: #ffffff;
    color: #E02929;
}
.content-chat{
    width: 750px;
    flex: 1;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #f0f0f0;
}
.content-chat-inner{
    width: 750px;
    height: 726px;
    background-color: #f6f6f6;
}
.chat-inner{
    margin-top: 32px;
    margin-left: 32px;
    flex-direction: row;
}
.chat-img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.chat-user{
    font-size: 22px;
    color: #A6A6A6;
    margin-bottom: 10px;
}
.chat-text{
    margin-left: 20px;
}
.chat-user-content{
    width: 626px;
    font-size: 28px;
    color: #4F4F4F;
    border-width: 1px;
    border-style: solid;
    border-color: #f0f0f0;
    background-color: #FFFFFF;
    border-top-left-radius: 0px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    padding-top:20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.content-chat-input{
    width: 750px;
    height: 90px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    padding-left: 30px;
    flex-direction: row;
    align-items: center;
}
.content-chat-input-text{
    width: 620px;
    height: 50px;
    padding-left: 20px;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #f0f0f0;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #f0f0f0;
    margin-right: 20px;
    font-size: 24px;
    padding-left: 30px;
}
.nav{
    flex-direction: row;
    height: 88px;
}
.nav-text-box{
    width: 375px;
    height: 88px;
    position: relative;
}
.nav-text{
    font-size: 28px;
    color:#333333;
    height: 88px;
    line-height: 88px;
    text-align: center;
}
.nav-text-active{
    font-size: 30px;
    color: #E02929;
}
.nav-bottom{
    background-color: #E44328;
    width: 40px;
    height: 4px;
    position: absolute;
    left: 168px;
    bottom: 4px;
}
.program-active{
    color:#E44328;
}
.emoji-img{
    width: 48px;
    height: 48px;
}
</style>
