<template>
     <div class="wrapper">
         <search></search>
         <div class="video">
             <image v-if="pasued" class="poster" :src="picSrc"></image>
             <image v-if="pasued" class="play-icon" :src="getLocalImgUrl('feature_playicon.png')" @click="playVideo"></image>
             <video-player v-if="!pasued && src" :src='src' :options='videoPlayerOptions'></video-player>
         </div>
         <div class="info">
             <text class="title">{{detail.title}}</text>
             <text class="author">{{detail.author}}</text>
             <text class="brief">{{detail.brief}}</text>
         </div>
         <div class="share-title">
           <text class="share-text">分享到</text>
         </div>
         <div class="share-box">
             <image class="share-item" :src="getLocalImgUrl('feature_sina.png')" @click="share('Sina')"></image>
             <image class="share-item" :src="getLocalImgUrl('feature_qq.png')" @click="share('QQFriend')"></image>
             <image class="share-item" :src="getLocalImgUrl('feature_pyq.png')"  @click="share('WeiXinTimeline')"></image>
             <image class="share-item" :src="getLocalImgUrl('feature_wechat.png')"  @click="share('WeiXinFriend')"></image>
         </div>
         <div class="icon-box" v-if="detail.title">
           <image :src="getLocalImgUrl('feature_share.png')" class="share-container-icon" @click="shareTo()"></image>
           <image v-if='!collectState' :src="getLocalImgUrl('feature_collect.png')" class="share-container-icon" @click="goCollect()"></image>
           <image v-else :src="getLocalImgUrl('feature_collected.png')" class="share-container-icon" @click="delCollect()"></image>
         </div>
         <comment v-if="detail.iscomment === '1'" :data="detail"></comment>
    </div>
</template>

<script>
import Search from '../../components/feature/Search'
import VideoPlayer from '../../components/common/video'
import Comment from '../../components/feature/Comment'
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'HomeListenVideo',
  components: {
    Search,
    VideoPlayer,
    Comment
  },
  data () {
    return {
      pasued: true,
      detail: {},
      picSrc: '',
      src: '',
      videoPlayerOptions: {width: 750, height: 381},
      config: {},
      api: {},
      collectState: false,
      memberId: ''
    }
  },
  methods: {
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: weex.config.id ? weex.config.id : this.getQuery().id
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/item.php', param, 'get').then(res => {
        this.detail = res[0]
        this.picSrc = `${this.detail.indexpic.host}${this.detail.indexpic.dir}750x381/${this.detail.indexpic.filepath}${this.detail.indexpic.filename}`
        this.src = `${this.detail.video.host}/${this.detail.video.dir}${this.detail.video.filepath}${this.detail.video.filename}`
      }, (e) => {
        console.log(e)
      })
    },
    // 播放视频
    playVideo () {
      this.pasued = false
    },
    // 分享
    share (type) {
      const param = {
        'title': this.detail.title,
        'brief': this.detail.brief,
        'imageLink': this.picSrc,
        'contentUrl': this.detail.content_url,
        'shareType': type
      }
      nativeUtil.shareTo(param)
    },
    // 按钮分享
    shareTo () {
      const param = {
        'title': this.detail.title,
        'brief': this.detail.brief,
        'imageLink': this.picSrc,
        'contentUrl': this.detail.content_url
      }
      nativeUtil.shareTo(param)
    },
    // 获取收藏状态
    getCollectState () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.id': this.getQuery().id,
          'extends.type': 'video'
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
            indexpic: this.detail.indexpic.host + this.detail.indexpic.dir + '650x290/' + this.detail.indexpic.filepath + this.detail.indexpic.filename,
            brief: this.detail.brief,
            member_id: this.memberId,
            type: 'video',
            outLink: 'local://weexJs/ModWeexStyle6FeatureHomeListenVideo.js?id=' + this.getQuery().id
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
          'extends.type': 'video'
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
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  width: 750px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.video{
  width: 750px;
  height: 381px;
  margin-left: -10px;
  justify-content: center;
  align-items: center;
}
.poster{
  width: 750px;
  height: 381px;
  position: absolute;
  left: 0;
  top: 0;
}
.play-icon{
  width: 69px;
  height: 126px;
  position: absolute;
  left: 356px;
  top: 100px;
}
.info{
    margin-top: 40px;
    margin-bottom: 80px;
    padding-left: 30px;
}
.share-title{
   padding-left: 20px;
   padding-right: 20px;
   background-color: #fff;
   width: 730px;
   font-size: 32px;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
}
.share-text{
   width: 690px;
   height: 60px;
   line-height: 60px;
   text-align: center;
   color:#9C9C9C;
   border-bottom-style: solid;
   border-bottom-color: #f2f6fa;
   border-bottom-width: 1px;
}
.share-box{
    width: 730px;
    height: 120px;
    background-color: #fff;
    padding-left: 77px;
    padding-right: 77px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.share-item{
    width: 70px;
    height: 70px;
}
.title{
    width: 550px;
    font-size: 32px;
    color: #6a6a6a;
    margin-bottom: 20px;
    lines:1;
    text-overflow:ellipsis;
}
.brief{
    font-size: 32px;
    color: #9c9c9c;
}
.icon-box{
  width: 115px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 560px;
  right: 30px;
}
.share-container-icon{
    width: 43px;
    height: 43px;
}
</style>
