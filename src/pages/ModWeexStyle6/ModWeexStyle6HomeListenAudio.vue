<template>
     <div class="wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStyleTop" >
         <div class="mian-content">
            <div class="img-box">
                <image class="img" :src="picSrc"></image>
                <image v-if="!isPlay" class="icon" :src="getLocalImgUrl('feature_playingicon.png')" @click="playAudio"></image>
                <image v-else class="icon" :src="getLocalImgUrl('feature_audiopause.png')" @click="playAudio"></image>
            </div>
            <text class="main-title">{{audioTitle}}</text>
            <text class="main-author">{{audioAuthor}}</text>
            <!-- ios播放器 -->
            <div class="progress-wrap">
                <text class="progress-time-count">{{currentSecond}}</text>
                <!--进度展示-->
                <div class="progress-bar-wrap" ref="progressBarWrap">
                    <div class="progress-bar-activity" ref="progressBar"></div>
                    <!-- <div class="progress-bar-btn-wrap" ref="progressBtn"
                        @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
                        <div class="progress-bar-btn"></div>
                    </div> -->
                </div>
                <image class="progress-bar-btn-wrap" ref="progressBtn" :src="getLocalImgUrl('feature_audiotouch.png')"
                    @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></image>
                <text class="progress-total-time">{{totalSecond}}</text>
            </div>
            <div class="audio-icons-content">
                <image v-if="audioLast"  class="audio-last-icon" :src="getLocalImgUrl('feature_last_default.png')" @click="last"></image>
                <image v-else class="audio-last-icon" :src="getLocalImgUrl('feature_last.png')"></image>
                <image v-if="!isPlay" class="audio-icon" :src="getLocalImgUrl('feature_playingicon.png')" @click="playAudio"></image>
                <image v-else class="audio-icon" :src="getLocalImgUrl('feature_audiopause.png')" @click="playAudio"></image>
                <image v-if="audioNext" class="audio-next-icon" :src="getLocalImgUrl('feature_next_default.png')" @click="next"></image>
                <image v-else class="audio-next-icon" :src="getLocalImgUrl('feature_next.png')"></image>
            </div>
            <!-- android播放器-->
            <!-- <audioplayer v-if="platform === 'android'" class="android-audio-wrap" ref="androidAudioPlayer"></audioplayer> -->
         </div>
         <image :src="getLocalImgUrl('feature_back.png')" class="back-icon" @click="goback"></image>
          <div class="icon-box">
            <image :src="getLocalImgUrl('feature_share.png')" class="share-container-icon" @click="share()"></image>
            <image v-if='!collectState' :src="getLocalImgUrl('feature_collect.png')" class="share-container-icon" @click="goCollect()"></image>
            <image v-else :src="getLocalImgUrl('feature_collected.png')" class="share-container-icon" @click="delCollect()"></image>
        </div>
        <comment v-if="detail.iscomment === '1'" :data="detail"></comment>
    </div>
</template>

<script>
import Comment from '../../components/feature/Comment'
import { nativeUtil } from '../../lib/nativeUtils'
const domModule = weex.requireModule('dom')
const animationModule = weex.requireModule('animation')
const Steve = new BroadcastChannel('Avengers')
export default {
  name: 'HomeListenVideo',
  components: {
    Comment
  },
  data () {
    return {
      detail: {},
      src: '',
      picSrc: '',
      currentSecond: '00:00',
      totalSecond: '00:00',
      percent: 0, // 初始化播放与总时长的百分比
      isPlay: false,
      config: {},
      api: {},
      audioList: [],
      audioIndex: '',
      audioLast: Boolean,
      audioNext: Boolean,
      audioTitle: '',
      audioAuthor: '',
      collectState: false,
      platform: '',
      memberId: ''
    }
  },
  watch: {
    isPlay (state) {
      if (state) {
        // 判断是否获取了总宽度
        if (!this.totalAudioW) this.setAudioTotalW()
        else this.audioModule.play()
      } else {
        this.audioModule.pause()
      }
    },
    percent (val) {
      this.setOffsetWidth()
    }
  },
  methods: {
    share () {
      const param = {
        'title': this.detail.title,
        'brief': this.detail.brief,
        'imageLink': this.picSrc,
        'contentUrl': this.detail.content_url
      }
      nativeUtil.shareTo(param)
    },
    goback () {
      this.audioModule.destory()
      this.goBack()
    },
    operateTime (time) {
      return time < 10 ? '0' + time : time
    },
    intervalTime  (interval, format) {
      format = format || 'min:sec'
      return format
        .replace('min', this.operateTime(Math.floor(interval / 60)))
        .replace('sec', this.operateTime(Math.floor(interval % 60)))
      // return format
    },
    getDomInfo (refName, cbFunc) {
      this.$nextTick(() => {
        setTimeout(() => {
          let curEl = this.$refs[refName]
          domModule.getComponentRect(curEl, (res) => {
            cbFunc(res)
          })
        }, 30)
      })
    },
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: weex.config.id ? weex.config.id : this.getQuery().id
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/item.php', param, 'get').then(res => {
        this.detail = res[0]
        this.audioTitle = this.detail.title
        this.audioAuthor = this.detail.author
        this.picSrc = `${this.detail.indexpic.host}${this.detail.indexpic.dir}427x427/${this.detail.indexpic.filepath}${this.detail.indexpic.filename}`
        this.src = `${this.detail.video.host}/${this.detail.video.dir}${this.detail.video.filepath}${this.detail.video.filename}`
        this.totalSecond = this.intervalTime(this.detail.video.duration / 1000)
        const postInfo = {
          id: this.getQuery().id,
          indexpic: this.picSrc
        }
        Steve.postMessage(postInfo)
        this.audioModule = weex.requireModule('audioplayer') // 引入播放模块
        this.setInitParams() // 初始化参数
      }, (e) => {
        console.log(e)
      })
    },
    getAllDate () {
      const param2 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.getQuery().columnId,
        new_style: 2
      }
      this.$httpRequest(this.api.detail_comment_list, param2, 'get').then(res => {
        this.audioList = res
        this.audioIndex === this.audioList.length - 1 ? this.audioNext = false : this.audioNext = true
        this.audioIndex === 0 ? this.audioLast = false : this.audioLast = true
        // if (this.playingId) {
        //   this.playingIndex = this.audioList.findIndex(ele => ele.id === this.playingId)
        //   console.log(this.playingIndex)
        // }
      }, (e) => {
        console.log(e)
      })
    },
    last () {
      this.audioNext = true
      this.audioLast = true
      this.audioIndex -= 1
      this.picSrc = `${this.audioList[this.audioIndex].indexpic.host}${this.audioList[this.audioIndex].indexpic.dir}427x427/${this.audioList[this.audioIndex].indexpic.filepath}${this.audioList[this.audioIndex].indexpic.filename}`
      this.src = `${this.audioList[this.audioIndex].video.host}/${this.audioList[this.audioIndex].video.dir}${this.audioList[this.audioIndex].video.filepath}${this.audioList[this.audioIndex].video.filename}`
      this.audioTitle = this.audioList[this.audioIndex].title
      this.audioAuthor = this.audioList[this.audioIndex].author
      const postInfo = {
        id: this.audioList[this.audioIndex].id,
        indexpic: this.picSrc
      }
      Steve.postMessage(postInfo)
      this.audioModule = weex.requireModule('audioplayer') // 引入播放模块
      this.setInitParams() // 初始化参数
      this.audioModule.play()
      this.isPlay = true
      this.setAudioTotalW()
      if (this.audioIndex === 0) {
        this.audioLast = false
      }
    },
    next () {
      this.audioNext = true
      this.audioLast = true
      this.audioIndex += 1
      this.picSrc = `${this.audioList[this.audioIndex].indexpic.host}${this.audioList[this.audioIndex].indexpic.dir}427x427/${this.audioList[this.audioIndex].indexpic.filepath}${this.audioList[this.audioIndex].indexpic.filename}`
      this.src = `${this.audioList[this.audioIndex].video.host}/${this.audioList[this.audioIndex].video.dir}${this.audioList[this.audioIndex].video.filepath}${this.audioList[this.audioIndex].video.filename}`
      this.audioTitle = this.audioList[this.audioIndex].title
      this.audioAuthor = this.audioList[this.audioIndex].author
      const postInfo = {
        id: this.audioList[this.audioIndex].id,
        indexpic: this.picSrc
      }
      Steve.postMessage(postInfo)
      this.audioModule = weex.requireModule('audioplayer') // 引入播放模块
      this.setInitParams() // 初始化参数
      this.audioModule.play()
      this.isPlay = true
      this.setAudioTotalW()
      if (this.audioIndex === this.audioList.length - 1) {
        this.audioNext = false
      }
    },
    setInitParams () {
      // this.seekSecond = 15 // 快慢的固定描述
      this.progress = 0 // 时长的百分比
      this.percent = 0
      this.totalAudioW = 0 // 总共的音频元素宽度
      // this.initIconLoading = false // 是否初始化loading的滚动动画
      this.isShowAudio = false // 重载音频
      this.initAudio() // 初始化
      // 恢复播放位置
      if (this.getQuery().flag === 'back') {
        this.isPlay = true
      }
    },
    initAudio () {
      let audioModule = this.audioModule
      const backInfo = {
        playUrl: this.src
      }
      // 获取init以后的信息
      audioModule.initAudioPlayer(backInfo, (res) => {
        let data = JSON.parse(res)
        // this.totalSecond = this.intervalTime(data.duration)
        nativeUtil.log('~~~~~~~~~~~~~~~~~~', data)
        // 初始化音频的时候禁止IOS页面滑动返回
        nativeUtil.allowSlideBack(0)
        // this.nativeUtil.popMaxAllowedDistance(30)
        // 设置可见
        this.isShowAudio = true
      })
      // 监听加载是否可以播放
      audioModule.readyToPlay((state) => {
        if (state) this.isShowLoading = false
      })
      // 监听播放进度函数
      audioModule.setProgressListener(e => {
        let { progress, second } = JSON.parse(e)
        // 赋值回调的数据
        this.progress = progress
        // 赋值当前秒数
        if (second > 0) {
          this.currentSecond = this.intervalTime(second)
        }
        // 计算当前百分比
        this.percent = (progress / 100).toFixed(2)
        // 获取当前音乐播放的进度条宽度
        this.getDefaultOffsetLeft()
      })
      // 监听音频播放结束的函数
      audioModule.setOnCompleteListener((e) => {
        // audioModule.stop()
        this.next()
      })
    },
    setAudioTotalW () {
      this.$nextTick(() => {
        // 调用pageMixin中的方法
        this.getDomInfo('progressBarWrap', (info) => {
          this.totalAudioW = info.size.width
          // 直接播放
          this.audioModule.play()
        })
      })
    },
    getDefaultOffsetLeft () {
      // 获取播放装态进度条宽度
      this.getDomInfo('progressBar', (info) => {
        this.defaultLeft = info.size.width
      })
    },
    setOffsetWidth () {
      let progressBtnEl = this.$refs['progressBtn']
      let progressBarEl = this.$refs['progressBar']
      let percent = this.percent
      let offsetW = percent * this.totalAudioW
      if (offsetW <= 0) offsetW = 0
      // 移动当前的按钮
      animationModule.transition(progressBarEl, {
        styles: { width: `${offsetW}px` },
        duration: 300,
        timingFunction: 'linear',
        delay: 0
      })

      animationModule.transition(progressBtnEl, {
        styles: { transform: `translateX(${offsetW}px)` },
        duration: 300,
        timingFunction: 'linear',
        delay: 0
      })
    },
    touchStart (event) {
      this.startX = event.changedTouches[0].pageX
      this.nativeUtil.log(`xxx touchStart x:${this.startX}`)
      // 如果这边正在播放就让他停止
      if (this.isPlay) this.isPlay = false
      // 获取当前音乐播放的进度条宽度
      this.getDefaultOffsetLeft()
    },
    touchMove (event) {
      // if (!this.defaultLeft) return
      // this.setOffsetPercent(event) // 设置移动百分比
    },
    touchEnd (event) {
      this.setOffsetPercent(event) // 设置移动百分比
      // 设置音频播放的位置
      let seekPosition = this.percent * 100
      this.audioModule.seek(seekPosition, 0)
      // 调用下播放条状当前状态
      if (!this.isPlay) this.isPlay = true
    },
    setOffsetPercent (event) {
      this.deltaX = event.changedTouches[0].pageX - this.startX
      let totalAudioW = this.totalAudioW // 总共的宽度
      let moveLeft = this.defaultLeft + this.deltaX // 当前的总共的偏移宽度
      if (moveLeft <= 0) {
        moveLeft = 0
      } else if (moveLeft >= totalAudioW) {
        moveLeft = totalAudioW
      }
      this.percent = (moveLeft / totalAudioW).toFixed(2)
    },
    playAudio () {
      this.isPlay = !this.isPlay
    },
    // 获取收藏状态
    getCollectState () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.id': this.getQuery().id,
          'extends.type': 'audio'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/show', param, 'post').then(res => {
        if (res.data.length) {
          this.collectState = true
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 去收藏
    goCollect () {
      // outLink: 'local://weexJs/ModWeexStyle6HomeArticleDetail.js?id=' + this.getQuery().id + '&index=' + this.getQuery().audioIndex + '&columnId=' + this.getQuery().columnId
      const _this = this
      if (!this.memberId) {
        nativeUtil.goLogin().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              if (res.userid) {
                _this.memberId = res.userid
              }
            })
          }
        })
      } else {
        const param = {
          bucket_name: 'shoucang',
          extends: {
            id: this.getQuery().id,
            author: this.detail.author,
            title: this.detail.title,
            indexpic: this.detail.indexpic.host + this.detail.indexpic.dir + '200x200/' + this.detail.indexpic.filepath + this.detail.indexpic.filename,
            brief: this.detail.brief,
            member_id: this.memberId,
            type: 'audio',
            outLink: 'local://weexJs/ModWeexStyle6FeatureHomeListenAudio.js?id=' + this.getQuery().id + '&index=' + this.getQuery().audioIndex + '&columnId=' + this.getQuery().columnId
          }
        }
        this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/create', param, 'post').then(res => {
          if (res.data.uuid && res.msg === '请求成功') {
            nativeUtil.alert('收藏成功')
            this.collectState = true
          }
        }, (e) => {
          console.log(e)
        })
      }
    },
    // 取消收藏
    delCollect () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.id': this.getQuery().id,
          'extends.type': 'audio'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/delete', param, 'post').then(res => {
        if (res.msg === '请求成功') {
          nativeUtil.alert('取消收藏成功')
          this.collectState = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取配置文件
    async getConfig () {
      const _this = this
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
        this.getAllDate()
        this.audioIndex = parseInt(this.getQuery().index)
        this.getCollectState()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getData()
        this.getAllDate()
        nativeUtil.getLoginStatus().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              if (res.userid) {
                _this.memberId = res.userid
                _this.getCollectState()
              }
            })
          }
        })
        this.audioIndex = parseInt(this.getQuery().index)
      }
    }
  },
  created () {
    this.platform = this.getPlatform()
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.back-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  left: 30px;
  top: 60px;
}
.x-top{
  top: 80px;
}
.wrapper{
    width: 750px;
    flex:1;
    background-color: #fff;
}
.img-box{
    width: 427px;
    height: 427px;
    position: relative;
    margin-bottom: 54px;
    margin-top: 303px;
    margin-left: 162px;
}
.img{
    width: 427px;
    height: 427px;
    border-top-left-radius: 213px;
    border-top-right-radius: 213px;
    border-bottom-left-radius: 213px;
    border-bottom-right-radius: 213px;
}
.icon{
    width: 107px;
    height: 107px;
    position: absolute;
    top: 160px;
    left: 160px;
}
.progress-wrap{
  flex-direction: row;
  align-items: center;
  padding-left: 22px;
  padding-right: 22px;
  margin-top: 190px;
}
.progress-time-count{
  width: 70px;
  font-size: 24px;
  color:  #545454;
}

.progress-bar-wrap{
  position: relative;
  flex: 1;
  margin: 0 10px;
  height: 6px;
  background-color: #e6e6e6;
  border-radius: 3px;
}

.progress-bar-activity{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 6px;
  border-radius: 3px;
  background-color: #6aaf93;;
}

.progress-bar-btn-wrap{
  position: absolute;
  left: 92px;
  top:  -3px;
  width: 33px;
  height: 33px;
  align-items: center;
  justify-content: center;
}

.progress-bar-btn{
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #6aaf93;;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
/* box-shadow:0px 2px 10px 0px rgba(27,22,22,0.2); */
}

.progress-total-time{
  width: 70px;
  font-size: 24px;
  color:  #545454;
}
.audio-icons-content{
    width: 750px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top:30px;
    padding-bottom: 120px;
}
.audio-icon{
    width: 103px;
    height: 103px;
    margin-left: 100px;
    margin-right: 100px;
}
.audio-last-icon{
    width: 21px;
    height: 26px;
}
.audio-next-icon{
    width: 21px;
    height: 26px;
}
.mian-content{
    flex: 1;
    position: relative;
}
.main-title{
    width: 750px;
    text-align: center;
    font-size: 32px;
    color: #6a6a6a;
}
.main-author{
    font-size: 28px;
    width: 750px;
    text-align: center;
    color: #9c9c9c;
}
.icon-box{
  width: 115px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  right: 30px;
  top: 70px;
}
.share-container-icon{
    width: 43px;
    height: 43px;
}
.android-audio-wrap{
  width: 750px;
  height: 303px;
  padding: 54px 30px;
  background-color: #ffffff;
}
</style>
